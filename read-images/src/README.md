# Video Frame Analysis

This script analyzes video files frame-by-frame using GPT-4 Vision, specifically designed for simple animations containing geometric shapes and stick figures.

## Core Functionality

1. Frame Extraction

    - Extracts one frame per second from input video
    - Converts frames to base64 for GPT-4 Vision analysis

2. Frame Analysis

    - Identifies geometric shapes and stick figures
    - Tracks position and movement of elements
    - Compares changes between consecutive frames
    - Maintains context between frame analyses

3. Output
    - Generates timestamped descriptions
    - Focuses on changes and movements
    - Creates a cohesive narrative of the animation

## Implementation

-   Uses LangGraph for state management and workflow control
-   Leverages GPT-4 Vision for image analysis
-   Employs FFmpeg for frame extraction
-   Handles cleanup of temporary files
