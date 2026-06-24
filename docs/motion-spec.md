# Motion Specification: GTG Solutions & Consult MVP

This specification translates the reference motion language into a distinct GTG homepage. It must not recreate OVA's exact layout, imagery, copy, logo, brand styling, or source behavior.

## Technical Direction

- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS plus scoped CSS where needed for complex motion layers.
- Animation: GSAP with ScrollTrigger.
- Hero 3D: React Three Fiber and Three.js.
- Verification: Playwright.

Scope constraint:

- Use WebGL only for the Hero.
- Use HTML, CSS, SVG, and GSAP for all sections after the Hero.

## Motion Principles

- Spatial, not decorative: depth and camera movement should clarify the service journey.
- Controlled momentum: transitions should feel smooth and deliberate, not playful or chaotic.
- High contrast: GTG content must remain readable during image transitions.
- Original expression: use the reference's interaction grammar, not its exact visual identity.

## Page Motion Architecture

1. Hero intro.
2. Cylindrical service carousel.
3. Camera pullback / ring collapse.
4. Black handoff.
5. Full-screen GTG solution slides.
6. Static or lightly animated supporting sections `[TBD]`.

ScrollTrigger should orchestrate the page-level sequence, but individual text/image transitions can be local GSAP timelines.

## Hero WebGL Scene

### Content

Hero carousel items:

1. Data & Analytics.
2. Data Streaming.
3. Infrastructure Automation.
4. DevOps & Quality.
5. Database Consulting.
6. Technical Support.
7. Training & Delivery.

Hero headline and supporting copy:

- Final copy is `[TBD]`.
- Temporary implementation copy may use neutral placeholders only if clearly marked `[TBD]`.
- Do not invent GTG claims, client outcomes, certifications, office locations, or metrics.

### Structure

- Full-viewport canvas.
- CSS background layer behind canvas:
  - Early state: warm neutral horizon with subtle technical atmosphere.
  - Transition state: darker charcoal/black.
- 7 image planes arranged around a vertical cylinder.
- Each plane uses a custom GTG visual, generated or commissioned separately.
- Preferred card ratio: approximately 2.2:1.
- Cards should use perspective and depth sorting so the center/front cards read as primary.

### Desktop Behavior

- Initial view shows several cards across the middle band.
- Cards orbit continuously or scroll-scrub from right to left across the front arc.
- Camera faces the front arc during the main Hero.
- Headline remains centered above the cards.
- Supporting copy remains below the cards.
- Scroll progress can drive:
  - ring rotation,
  - headline phrase changes,
  - background darkening,
  - camera pullback into the transition.

### Mobile Behavior

- Use fewer simultaneously visible cards.
- Reduce device pixel ratio and texture size.
- Prefer a shallow arc over a deep full cylinder.
- Keep text above the fold without overlap.
- Avoid requiring precision scrolling to understand the content.
- If performance is weak, use the WebGL fallback immediately.

### Hero Text Transition

Use one timeline per phrase:

- outgoing text: opacity to 0, slight blur, small upward or downward drift;
- incoming text: opacity from 0, blur to 0, small counter-drift;
- duration target: 400-700ms;
- easing: smooth non-bouncy ease, such as `power2.out` / `power2.inOut`.

Do not reproduce the reference phrases.

### Camera Pullback / Ring Collapse

Trigger near the end of the Hero scroll range:

- Camera pulls backward to reveal the ring as an ellipse.
- Ring scales down toward the center.
- Background darkens toward black.
- Optional reflection/double-arc impression may be used if it fits GTG, but it should not match the reference exactly.
- End state should be a near-black frame that allows the solution section to appear cleanly.

Implementation notes:

- Use a single normalized progress value for the WebGL transition.
- Keep the handoff deterministic so ScrollTrigger refreshes do not desync the canvas and HTML section.
- Dispose textures/materials on unmount.

## Solution Slide Section

### Content

Solution slides:

1. Data & Analytics.
2. Data Streaming.
3. Infrastructure Automation.
4. DevOps & Quality.
5. Consulting & Technical Support.

All detailed claims remain `[TBD]` until GTG confirms them.

### Structure

- HTML section, no WebGL.
- Full-screen slide stack.
- Each slide contains:
  - full-bleed image layer;
  - dark or light readability overlay depending on image;
  - left-aligned solution text;
  - compact category/metadata area;
  - right vertical index `01`-`05` on desktop.

### Desktop Behavior

- Section can be pinned while scroll advances through five slides.
- Image transitions use layered opacity and soft reveal movement.
- Text updates with a short fade/slide.
- Right index remains fixed while active tick moves to the current number.
- Avoid exact reference timing and spacing; preserve only the concept of a persistent numeric rail.

### Mobile Behavior

- Use vertical stacked solution panels or short snap sections.
- Replace the right vertical index with:
  - a compact progress row,
  - or a small `01 / 05` counter near the heading.
- Keep text above imagery when needed for readability.
- Avoid long pinned sections on mobile if they create scroll fatigue.

## Reduced-Motion Specification

When `prefers-reduced-motion: reduce` is active:

- Do not auto-orbit the Hero carousel.
- Do not scrub camera movement.
- Do not use blur-heavy text transitions.
- Show static Hero content with one primary card and adjacent service labels.
- Replace ring collapse with a short crossfade or immediate section transition.
- Replace solution slide motion with simple content changes and opacity transitions under 150ms.
- Disable parallax and momentum-based effects.

## WebGL Fallback Specification

Trigger fallback when:

- `canvas.getContext('webgl')` and `canvas.getContext('webgl2')` fail;
- the Three.js renderer throws during initialization;
- texture loading repeatedly fails;
- runtime performance falls below an agreed threshold `[TBD]` on mobile.

Fallback Hero:

- HTML/CSS only.
- Same seven service labels.
- Static or lightly scrollable card strip.
- Strong GTG headline `[TBD]`.
- Same navigation and CTA access as WebGL Hero.
- No user-facing technical error.

## Accessibility Requirements

- All service images need descriptive alt text or empty alt text when purely decorative.
- Do not put critical GTG copy only inside canvas.
- Mirror Hero service labels in semantic HTML for screen readers.
- Maintain keyboard access to navigation and CTAs.
- Verify text contrast against changing images.
- Respect reduced motion before initializing GSAP/Three timelines.

## Performance Requirements

- Lazy-load non-Hero section images.
- Preload only the first Hero visual set needed for initial render.
- Use compressed image assets with responsive sizes.
- Cap WebGL pixel ratio on high-density screens.
- Pause or reduce animation work when the tab is hidden.
- Avoid WebGL outside the Hero.

## Verification Plan

Use Playwright to verify:

- Desktop viewport: 1440x900.
- Laptop viewport: 1280x720.
- Mobile viewport: 390x844.
- Reduced-motion emulation.
- WebGL fallback by forcing renderer initialization failure in a test route or test flag.
- Screenshot states:
  - Hero initial.
  - Hero mid-carousel.
  - Hero collapse / black handoff.
  - Solution slide 1.
  - Solution slide 5.
- Check for text overlap, blank canvas, missing images, and unreadable contrast.

Manual checks:

- Smooth scroll timing on trackpad and mouse wheel.
- Touch scroll behavior on mobile.
- Browser back/refresh behavior with ScrollTrigger.
- No OVA assets, copy, logo, or exact layout.
