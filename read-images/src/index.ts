/**
 * Video Frame Analysis Script
 *
 * This script analyzes a video file frame by frame using GPT-4 Vision.
 * It extracts frames at 1 FPS and generates descriptions of the visual content,
 * focusing on geometric shapes and stick figures.
 *
 * Prerequisites:
 * - FFmpeg must be installed on your system
 * - OpenAI API key must be set in .env file
 *
 * Usage:
 * ```bash
 * # Install dependencies
 * pnpm install
 *
 * # Run the script
 * pnpm tsx src/index.ts path/to/your/video.mp4
 * ```
 *
 * The script will output timestamped descriptions of each frame,
 * tracking changes and movements throughout the video.
 */

import { PromptTemplate } from '@langchain/core/prompts'
import { Annotation, StateGraph } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'
import { config } from 'dotenv'
import ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs/promises'
import * as path from 'path'

config()

// Initialize OpenAI Vision model
const visionModel = new ChatOpenAI({
    modelName: 'gpt-4o',
    maxTokens: 1024,
})

// Define our base state type
type State = {
    frames: string[]
    currentFrame: number
    descriptions: string[]
    previousDescription: string
    tempDir: string
}

// Define graph state annotations
const GraphState = {
    // Input data
    frames: Annotation<string[]>({
        reducer: (x, y) => y ?? x ?? [],
    }),
    currentFrame: Annotation<number>({
        reducer: (x, y) => y ?? x ?? 0,
    }),
    descriptions: Annotation<string[]>({
        reducer: (x, y) => y ?? x ?? [],
    }),
    previousDescription: Annotation<string>({
        reducer: (x, y) => y ?? x ?? '',
    }),
    tempDir: Annotation<string>({
        reducer: (x, y) => y ?? x ?? '',
    }),
}

// Create prompt template for frame analysis
const frameAnalysisPrompt = PromptTemplate.fromTemplate(`
Analyze this frame from a simple animation video. Focus on:
1. Geometric shapes and stick figures present
2. Their positions and movements
3. Any changes from the previous frame

Previous frame description: {previousDescription}
Current timestamp: {timestamp} seconds

Describe what you see in a concise way.
`)

// Frame extraction function
async function extractFrames(videoPath: string): Promise<{ frames: string[]; tempDir: string }> {
    const tempDir = path.join(process.cwd(), 'frames', Date.now().toString())
    await fs.mkdir(tempDir, { recursive: true })

    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .outputOptions('-vf', 'fps=1')
            .output(path.join(tempDir, 'frame-%d.png'))
            .on('end', async () => {
                const files = await fs.readdir(tempDir)
                const framePaths = files.map((file) => path.join(tempDir, file))
                resolve({ frames: framePaths, tempDir })
            })
            .on('error', reject)
            .run()
    })
}

// Main function to analyze video
async function analyzeVideo(videoPath: string): Promise<string> {
    console.log('Starting video analysis...')
    const { frames, tempDir } = await extractFrames(videoPath)
    console.log(`Extracted ${frames.length} frames to ${tempDir}`)

    const descriptions: string[] = []
    let previousDescription = ''

    for (let i = 0; i < frames.length; i++) {
        console.log(`Analyzing frame ${i + 1}/${frames.length}`)
        const frameData = await fs.readFile(frames[i])
        const base64Image = frameData.toString('base64')

        try {
            const result = await visionModel.call([
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: frameAnalysisPrompt.format({
                                previousDescription: previousDescription || 'This is the first frame',
                                timestamp: i,
                            }),
                        },
                        {
                            type: 'image_url',
                            image_url: `data:image/png;base64,${base64Image}`,
                        },
                    ],
                },
            ])

            const description = result.content.toString()
            console.log(`Frame ${i} description:`, description)
            descriptions.push(`[${i}s] ${description}`)
            previousDescription = description
        } catch (error) {
            console.error(`Error analyzing frame ${i}:`, error)
            throw error
        }
    }

    // Cleanup
    await fs.rm(tempDir, { recursive: true, force: true })
    console.log('Cleanup complete')

    return descriptions.join('\n\n')
}

// Handle command line input
if (process.argv[1].endsWith('index.ts')) {
    const videoPath = process.argv[2]
    if (!videoPath) {
        console.error('Please provide a video file path')
        process.exit(1)
    }

    analyzeVideo(videoPath)
        .then(console.log)
        .catch((error) => {
            console.error('Error analyzing video:', error)
            process.exit(1)
        })
}

export { analyzeVideo }
