# Performance and accessibility stabilization report

Date: 2026-07-11

Baseline: `876c164aadcf28e089cb3a1d971d3bc6708b4e5f` on `codex/hero-basepath-stabilization`

This report records production-build measurements for the Hero performance and accessibility hardening stage. The values below are measurements from the local production server and Chromium, not product performance claims or estimates of an end user's device.

## Measurement method

- Built with `next build` and served with `next start` under `/hero`.
- Measured modern initial route chunks from the Next route bundle output and the actual gzip response bodies returned by `next start`.
- Identified the Three/R3F chunk from production chunk contents (`WebGLRenderer`, `ExtrudeGeometry`, or `R3F`) instead of relying on a build hash.
- Used fresh Chromium contexts for desktop, 390px mobile, and `prefers-reduced-motion: reduce`. Software WebGL verification used Chromium's `--enable-unsafe-swiftshader` flag.
- Installed pre-navigation telemetry for Canvas creation and DOM insertion, WebGL context requests, draw calls, resource deletion, animation frames, listeners, and IntersectionObserver cleanup.
- Compared locally generated 1280×720 and 1920×1080 Hero screenshots before and after the DPR change. No external image was downloaded or hotlinked.

## Baseline findings

### Production JavaScript

| Profile | Initial raw JS | Actual gzip JS | Three/R3F delivery |
| --- | ---: | ---: | --- |
| Desktop | 1,479,782 B | 409,199 B | Included in an initial 938,525 B raw / 252,400 B gzip chunk |
| Mobile 390px | 1,479,782 B | 409,199 B | Same initial chunk requested |
| Reduced motion | 1,479,782 B | 409,199 B | Same initial chunk requested |

The baseline HTML was identical for all three profiles, so the server could not prevent the mobile or reduced-motion client from receiving Three/R3F.

### Hydration and frame activity

| Profile | Canvas elements created | Canvas inserted into DOM | WebGL context requests | Current Canvas |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 2 | 1 | 2 | 1 |
| Mobile 390px | 1 | 0 | 1 | 0 |
| Reduced motion | 1 | 0 | 1 | 0 |

The mobile and reduced paths did not transiently mount the R3F Canvas, but `supportsWebGL()` still created an off-DOM Canvas and WebGL context during hydration. On desktop, one Canvas/context pair was the support probe and the other was the R3F renderer.

The existing viewport observer already paused the renderer correctly: during a 1.007 s sample at `#proof`, both WebGL draw calls and animation-frame callbacks were 0 while the Canvas remained mounted. This behavior was retained rather than redesigned.

### Texture and buffer evidence

- Current source and runtime create **0 `CanvasTexture` instances**. The earlier customer-card texture description in historical asset documents is not the current runtime fact.
- The renderer reported 5 internal WebGL texture allocations. The observed texture formats account for a 1,052 B texel-data lower bound. Browser APIs did not expose total driver/GPU allocation, so no total texture-memory number is reported.
- At device scale factor 2, the baseline 1.5 DPR cap produced a `676×590` CSS Canvas and a `1014×885` backing store. A four-byte logical color-buffer lower bound is therefore 3,589,560 B. Depth, multisampling, driver alignment, and compositor copies are intentionally excluded.

### `preserveDrawingBuffer`

The flag was enabled, but repository and runtime instrumentation found no Canvas export consumer: `toDataURL`, `toBlob`, and `readPixels` were called 0 times during the screenshot flow. Playwright captures the browser surface and does not require this context attribute. No current code or test established a need for the flag.

## Sequential changes and measurements

### 1. Dynamic HeroCanvas import

`HeroCanvas` became a conditional dynamic import. The production Three/R3F code moved to a lazy chunk.

| Measurement | Baseline | Step 1 | Change |
| --- | ---: | ---: | ---: |
| Initial raw JS | 1,479,782 B | 570,628 B | -909,154 B |
| Initial actual gzip JS | 409,199 B | 166,826 B | -242,373 B |
| Three/R3F chunk raw | 938,525 B | 909,651 B | -28,874 B |
| Three/R3F chunk actual gzip | 252,400 B | 242,697 B | -9,703 B |

Desktop requested the lazy chunk once. Mobile and reduced motion requested it 0 times. Desktop retained a nonblank Canvas and the offscreen draw/rAF count remained 0.

### 2–3. Device/preference gate and conservative first render

The WebGL probe and dynamic import now require all three confirmed conditions: desktop viewport, no reduced-motion preference, and no forced fallback. Unknown preference/viewport state renders the static Hero with no motion travel.

| Profile | Step 1 Canvas create / context | Final Canvas create / context | Three requests | First animation-frame Canvas |
| --- | ---: | ---: | ---: | ---: |
| Mobile 390px | 1 / 1 | 0 / 0 | 0 | 0 |
| Reduced motion | 1 / 1 | 0 / 0 | 0 | 0 |

One Step 2 production trace recorded mobile FCP at 224 ms and the final mobile mode at 278.5 ms; reduced-motion FCP at 284 ms and the final reduced mode at 324.6 ms. Both first paints were the conservative pending/static state with no Canvas. These timings describe that single local trace only.

Desktop still probes WebGL after the media-query decisions. The temporary support context is explicitly released through `WEBGL_lose_context`.

### 4. Offscreen frameloop

The existing `frameloop={active ? "always" : "never"}` contract was retained. Final production telemetry at `#proof` for 1.005 s recorded:

- WebGL draw calls: 0
- animation-frame callbacks from the renderer: 0
- `data-canvas-active`: `false`
- Canvas DOM count: 1

Returning to `#top` resumed draw activity in Playwright.

### 5. Drawing-buffer preservation

`preserveDrawingBuffer` was removed. Final context attributes report `preserveDrawingBuffer: false`; alpha, antialiasing, and depth remain enabled. The desktop render, framebuffer nonblank check, section screenshots, offscreen pause, and force-fallback tests passed after this isolated change.

### 6. Texture and DPR bounds

There are no application CanvasTextures to resize or remove, so no synthetic texture work was added. The desktop DPR ceiling changed from 1.5 to 1.25.

| Device scale factor 2 | Before | Final |
| --- | ---: | ---: |
| CSS Canvas | 676×590 | 676×590 |
| Backing store | 1014×885 | 845×738 |
| Backing pixels | 897,390 | 623,610 |
| Four-byte logical color lower bound | 3,589,560 B | 2,494,440 B |

The backing store contains 273,780 fewer pixels; the color-buffer lower bound is 1,095,120 B smaller. No total GPU-memory claim is made.

Screenshot evidence:

| Viewport | Changed pixels | Screen share | Mean absolute RGB delta | Difference bounds |
| --- | ---: | ---: | --- | --- |
| 1280×720 | 16,384 / 921,600 | 1.7777778% | 0.075387 / 0.008096 / 0.016076 | `(730,247)`–`(1056,553)`, Canvas region only |
| 1920×1080 | 4,472 / 2,073,600 | 0.2156636% | 0.007821 / 0.000810 / 0.001644 | `(1088,344)`–`(1599,822)`, Canvas region only |

The semantic HTML pixels outside the Canvas were unchanged in these comparisons. The two 1280×720 SHA-256 values are `C4FC1322E563FFFB0C9924DD047B7C33FF122D3615CE20CF447F0271108D35B9` (1.5) and `39783E9D5F37C2DF6F466FF63508BE0CA643F08377486877782BD9DF7D377AEF` (1.25). The 1920×1080 values are `98F507EE0D7AE1F537092D01D46E9C99B58E664028F11946377E4B451EAD41B3` and `DC7F01B3566C00DB782D26ADE69675B1343937FCF8EA3247853C1601D7CB2C63`.

### 7–8. Disposal, resize, and observer cleanup

Explicit `geometry.dispose()` and `material.dispose()` cleanup remains in `SymbolCore`; R3F continues to own generated JSX resources. In the final production desktop-to-mobile transition:

- Canvas: 1 → 0
- deleted WebGL buffers: +57
- deleted WebGL programs: +3
- explicit deleted WebGL textures: +0
- renderer context loss: +1
- active window scroll listeners: 8 → 1, with 7 removals
- active window resize listeners: 8 → 1, with 7 removals
- active IntersectionObservers: 4 → 2, with 2 disconnects

The renderer context loss is the resource-reclamation path for the remaining context-owned textures and framebuffers. The remaining listeners and observers are used by the mobile header and general page sections. The implementation contains no ScrollTrigger usage; the Hero cancels its pending animation frame, removes scroll/resize listeners, and disconnects its IntersectionObserver during cleanup.

## Final production bundle result

| Stage | Initial raw | Initial actual gzip | Three/R3F raw | Three/R3F actual gzip |
| --- | ---: | ---: | ---: | ---: |
| Baseline | 1,479,782 B | 409,199 B | 938,525 B | 252,400 B |
| Step 1 | 570,628 B | 166,826 B | 909,651 B | 242,697 B |
| Step 2 | 570,726 B | 166,882 B | 909,651 B | 242,697 B |
| Final | 570,726 B | 166,883 B | 909,627 B | 242,681 B |

Final behavior:

- Three/R3F lazy chunk: `3ajuywzxn6-y-.js`
- HTML Three script/preload/link references: 0
- Desktop: mode `motion`, Canvas 1, lazy request 1
- Mobile 390px: mode `mobile`, Canvas 0, lazy request 0
- Reduced motion: mode `reduced`, Canvas 0, lazy request 0
- Mobile/reduced initial savings from baseline: 909,056 B raw and 242,316 B actual gzip
- Desktop after the lazy request: 1,480,353 B raw and 409,564 B actual gzip; this is 571 B raw and 365 B gzip above the baseline desktop total, so the change is a delivery/accessibility optimization rather than a desktop total-byte reduction.

The final HTML was identical across the three profiles at 98,939 B with SHA-256 `386fd6a7a0df91a3e3b7554916e53a15ace4296a87f6a6e146fc86751b1a6854`, and it contained no Three chunk preload.

## Verification status

Final source verification on 2026-07-11:

| Command or check | Exact result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npm run lint` | Exit 0, ESLint warnings 0 |
| `npm run build` | Exit 0; compile 4.4 s, TypeScript 3.5 s, static-page generation 5/5 |
| `npm run test:e2e` | Exit 0; 21/21 passed in 1.1 min (20 Chromium tests and 1 WebKit semantic smoke test) |
| `git diff --check` | Exit 0; only Git's informational LF→CRLF working-copy warnings |
| In-app production browser inspection | `/hero` semantic DOM present; Hero screenshot nonblank; no visual hierarchy regression observed |

The persistent Playwright contracts cover first-frame reduced motion, mobile/forced-fallback no-WebGL paths, production chunk requests, offscreen pause/resume, context attributes, DPR, semantic fallback content, visual screenshots, deployment paths, assets, and console errors.
