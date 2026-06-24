# Reference Analysis: OVA Motion Recording

Source: `docs/reference/ova-motion-reference.mp4`

This document analyzes the motion language of the supplied recording for GTG Solutions & Consult. It is a reference analysis only. Do not copy OVA imagery, video, source code, copy, logo, exact layout, brand treatment, or portfolio content.

## Analysis Method

- Requested tools: `ffprobe` and `ffmpeg`.
- Environment result: both `ffprobe` and `ffmpeg` were unavailable in PATH, in the bundled runtime, and in common local install locations checked during analysis.
- Fallback used for this pass:
  - Chrome + Playwright loaded the local MP4 directly and extracted frames through the browser video element.
  - A local MP4 box parser confirmed container metadata.
  - Frames were cropped to ignore the browser chrome and Windows taskbar in the recording.

Technical metadata observed:

- File size: 6,495,837 bytes.
- Duration: 38.767 seconds.
- Video: `avc1`, 1280x720, approximately 30fps, 1163 video samples.
- Audio: `mp4a`.

Ignored recording artifacts:

- Browser tabs and address bar.
- Bookmarks bar and browser controls.
- Windows taskbar.
- Mouse cursor.
- Windows Start menu around 16-22 seconds.
- Repeated scene after approximately 23 seconds, except to confirm the repeat.

## Timeline Summary

| Time Range | Observed Segment | Use For GTG |
|---|---|---|
| 0:00-0:05.4 | Cylindrical image carousel Hero | GTG service carousel rhythm and spatial grammar |
| 0:05.4-0:07.4 | Ring collapse and black transition | Hero-to-solutions camera transition |
| 0:07.4-0:15.8 | Full-screen portfolio slides | GTG solution slide sequence |
| 0:16-0:22 | Windows Start menu | Ignore completely |
| 0:23 onward | Hero sequence repeats | Ignore as content; confirms loop behavior |

## 0:00-0:05.4: Cylindrical Image Carousel Hero

### 1. Screen Composition

- The site content sits behind the browser recording UI; only the inner page area is relevant.
- The Hero uses a full-viewport atmospheric background with a warm horizon gradient: pale cream near the top, orange at the horizon, and muted gray/green darkness toward the bottom.
- A large centered headline sits above the image carousel.
- A small supporting paragraph sits below the carousel, centered and much smaller than the headline.
- Small navigation controls appear at the upper left and upper right of the page, but these should be treated as reference behavior only, not layout to duplicate.
- The image carousel occupies the horizontal middle band of the viewport, roughly around the horizon line.

### 2. Typography Hierarchy

- Primary headline:
  - Very large, thin sans-serif, white.
  - Center aligned.
  - Two-line composition.
  - The phrase changes during the Hero sequence.
- Supporting copy:
  - Small white text.
  - Center aligned.
  - Several short lines under the image band.
- Utility/navigation text:
  - Tiny uppercase labels.
  - High-contrast but visually secondary.

GTG implication: use a restrained, technical, confident type hierarchy. The Hero can carry one large strategic line, but solution copy should be compact and operational.

### 3. Image Ratios

- Hero carousel images are mostly wide landscape cards.
- Approximate visual ratio: 2.0:1 to 2.5:1 depending on perspective.
- Images are not displayed as uniform flat thumbnails; perspective makes near cards wider and far cards narrower.
- Cards appear as planes arranged around a cylinder, with visible depth and horizontal skew.

GTG implication: prepare seven custom Hero visuals with a wide landscape crop. Avoid OVA source imagery and avoid matching exact crops.

### 4. Cylindrical Carousel Structure

- The carousel behaves like a ring of image planes placed around a vertical cylinder.
- The camera faces the front arc of the cylinder.
- Several cards are visible at once:
  - Front cards are largest and most legible.
  - Side cards are compressed by perspective.
  - Rear cards become visible only during the collapse transition.
- The ring is larger than the viewport width, so cards enter and exit from outside the visible sides.
- The cylinder is spatial rather than a flat CSS carousel; depth, scale, and rotation sell the effect.

### 5. Image Movement Direction

- During the Hero, the front-facing cards drift from right to left across the screen.
- New cards enter from the right and older cards exit left.
- The motion reads as a continuous orbit around the viewer, not as discrete slide snapping.
- There is slight perspective parallax: side cards rotate away and recede while center cards face the viewer more directly.

### 6. Central Copy Transition

- At 0.0s the headline is mid-transition from an earlier phrase.
- By approximately 0.5s, the headline has settled into the next phrase.
- Around 4.5s-5.0s, the headline changes again.
- Transition style:
  - Crossfade.
  - Slight blur/softening.
  - Subtle vertical drift.
  - No hard cut.

GTG implication: central Hero text should change by opacity, blur, and slight y movement. Do not reuse OVA phrasing.

### 7. Background Color Evolution

- Early Hero: warm sunrise/sunset field with a visible horizon.
- Around 4.5s-5.4s: the palette cools and darkens.
- Star/noise-like texture becomes more visible in the upper field.
- The bottom area becomes blacker as the transition begins.

GTG implication: use a GTG-specific palette shift from warm operational clarity into a dark technical stage. Avoid one-note blue/purple or beige-only treatment.

## 0:05.4-0:07.4: Ring Collapse And Black Transition

### 7. Hero-To-Next-Section Camera Movement

- The transition begins with the carousel still visible across the horizon.
- The camera pulls back quickly and the ring becomes visible as a full elliptical/cylindrical structure.
- The front arc collapses into a smaller band near the center of the screen.
- A reflected lower arc briefly appears, making the ring feel like it is hovering above a dark reflective surface.
- The frame darkens rapidly from 6.4s onward.
- By approximately 7.0s the Hero is almost completely black.
- Around 7.2s the first portfolio image begins to emerge from darkness.

GTG implication: use a scroll-driven camera pullback in WebGL, then hand off to an HTML section through a black overlay. The effect should feel like entering the GTG solution space, not like copying OVA's investment transition.

### 8. Background Color Change

- Warm horizon fades into charcoal and black.
- The black overlay increases while the ring shrinks.
- The next section appears from black, not from a white or transparent wipe.

## 0:07.4-0:15.8: Full-Screen Portfolio Slide Sequence

### 1. Screen Composition

- Each portfolio item is a full-screen image background.
- Text sits primarily on the left side, not centered.
- The right side carries a vertical numeric index.
- Top navigation remains small and secondary.
- Bottom-left metadata/category appears in very small type.

GTG implication: reframe this as a full-screen solution sequence using five GTG solutions, with HTML/CSS/SVG/GSAP rather than WebGL.

### 2. Typography Hierarchy

- Main slide copy:
  - Medium-large white paragraph.
  - Left aligned.
  - Multiple lines, with a generous line height.
- Category/metadata:
  - Very small uppercase label at bottom left.
- Index numbers:
  - Small monospaced or tabular-style numbers.
  - White or light gray depending on background contrast.

GTG implication: solution slides should use concise value statements, but unverified claims must remain `[TBD]`.

### 9. Portfolio Image Replacement

- Slides replace each other through layered full-screen image transitions.
- Transitions feel like crossfades plus soft cover/reveal movement rather than instant cuts.
- Some transitions briefly show the outgoing and incoming images together.
- Background images use `cover` behavior and crop heavily to fill the viewport.
- Text updates in sync with the active image, but can fade separately.

Observed approximate active frames:

- 7.4-8.4: dark figure/field image.
- 8.8-10.0: warm interior image.
- 10.6-11.4: pale flower image.
- 12.2: water/figure image.
- 13.0: abstract gold/finance-like image.
- 14.0-15.0: portrait image.
- 15.8: bright architectural image.

The reference has eight indexed portfolio items, but GTG MVP should use the five requested solution items.

### 10. Right Vertical Index

- A vertical index sits near the right edge.
- It contains numbers `01` through `08` in the reference.
- A thin vertical line runs alongside the list.
- The active item is indicated by a short horizontal tick extending toward the active number.
- The active number appears brighter or more emphasized.
- The index persists through slide changes.

GTG implication: use `01` through `05` for the five solution slides.

## 0:23 Afterward: Repeat

- At approximately 23.5s, the Hero carousel is visible again.
- This confirms the recording loops/repeats the opening sequence.
- The repeated section should not be analyzed as a new content section.

## 11. Desktop And Mobile Behavior Implications

Desktop:

- Use full-viewport pinned sections.
- Hero can use a true 3D ring in WebGL.
- Scroll can scrub the Hero rotation and camera pullback.
- Portfolio slides can use full-screen background images, left text, and a right-side numeric rail.

Mobile:

- Avoid a complex, wide cylinder that depends on horizontal space.
- Use a simplified arc of fewer visible cards or a static fallback carousel.
- Keep the main headline shorter and avoid multi-line overflow.
- Convert the right vertical index into a compact top/bottom progress indicator or a shorter side rail only when space allows.
- Avoid heavy pinned scroll sequences that trap small-screen users.

## 12. Reduced-Motion Alternative

- Disable continuous orbit and scrubbed camera movement.
- Show one static Hero composition with a small set of visible cards.
- Replace the ring collapse with a short opacity transition.
- Replace portfolio image motion with instant or very short crossfades.
- Respect `prefers-reduced-motion: reduce` at initial render, not after animations have started.

## 13. WebGL Failure Fallback

- If WebGL is unavailable or the renderer fails:
  - Use a static HTML/CSS Hero.
  - Present the seven Hero items as a horizontal card strip or stacked responsive grid.
  - Keep the same GTG content and calls to action.
  - Do not block access to the rest of the page.
- Log the failure in development only; do not show technical error copy to users.

## GTG Reinterpretation Notes

The reference's investment portfolio should become a GTG solutions narrative:

1. Data & Analytics.
2. Data Streaming.
3. Infrastructure Automation.
4. DevOps & Quality.
5. Consulting & Technical Support.

The Hero carousel should contain:

1. Data & Analytics.
2. Data Streaming.
3. Infrastructure Automation.
4. DevOps & Quality.
5. Database Consulting.
6. Technical Support.
7. Training & Delivery.

All unverified company facts, metrics, customer claims, office locations, certifications, and partner relationships must be marked `[TBD]`.
