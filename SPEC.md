# Animation Specification

## Overview

A minimalist, high-contrast animation featuring geometric shapes and text against a dark background. The animation will be implemented using pure HTML and CSS.

## Visual Elements

### Background

-   Solid black backdrop (#000000)
-   Optional: Subtle starry effect with small white dots
-   High contrast design for visual impact

### Main Elements

1. Circular Components

    - White circular elements as primary focus
    - Glowing effect with soft, radiant halo
    - Options for:
        - Single glowing circle
        - Concentric circles (outer ring + inner filled)
        - Vertically aligned circles

2. Typography
    - Modern sans-serif font
    - White text (#FFFFFF)
    - Center-aligned
    - Example phrases:
        - "organize"
        - "and focus your mind"
        - "until your craziest"
        - "ideas become reality"

### Navigation Bar

-   Fixed position at bottom
-   Dark background
-   White icons including:
    -   Home
    -   Search
    -   Add
    -   Calendar
    -   Profile picture (with red notification dot)

## Animation Requirements

### Motion Effects

-   Smooth, slow-paced animations
-   Gentle pulsing/glowing effects on circles
-   Soft fade transitions for text
-   Optional: Subtle twinkling effect for background stars

### Timing

-   Continuous loop
-   Slow, meditative pace
-   Seamless transitions

## Animation Timeline

### Core Timing Constants

-   Base animation duration: 3000ms (3 seconds)
-   Transition duration: 800ms
-   Pause between sequences: 500ms

### Animation Sequence

1. Initial State (0ms)

    - Black background fade in
    - Stars (if present) begin twinkling

2. Text Introduction (500ms - 1500ms)

    - First text line fades in: "until your craziest"
    - Opacity transition: 300ms

3. Circle Animation (1500ms - 4500ms)

    - Circle appears with initial glow
    - Continuous pulse animation:
        - Scale: 1 → 1.1 → 1
        - Glow intensity: 0.6 → 1 → 0.6
        - Cycle duration: 2000ms

4. Secondary Text (2300ms - 3300ms)

    - Second text line fades in: "ideas become reality"
    - Opacity transition: 300ms

5. Complete Loop (6000ms)
    - All elements fade out
    - 200ms pause before next loop

### Animation Coordination

-   All animations must be synchronized using CSS animation-delay
-   Transitions should overlap slightly for smooth flow
-   Use CSS custom properties for maintainable timing values
-   Document timing dependencies between elements

## Technical Requirements

-   Pure HTML/CSS implementation
-   No JavaScript dependencies
-   Responsive design
-   Browser compatibility: Modern browsers (Chrome, Firefox, Safari)

## Performance Considerations

-   Optimize CSS animations for smooth rendering
-   Minimize DOM elements for better performance
-   Use appropriate CSS properties for hardware acceleration

## Accessibility

-   Sufficient contrast ratios
-   Readable text sizes
-   Appropriate ARIA labels where needed

## Success Criteria

-   Animation runs smoothly at 60fps
-   Loads instantly in browser
-   Maintains visual integrity across different viewport sizes
-   Creates a calm, focused atmosphere
