# GTG Solutions & Consult MVP Plan

> **Historical plan — not a current status document.** This file records the initial implementation plan and may conflict with the current code. Start with `docs/CURRENT.md`; use `docs/DECISIONS.md` for approved product direction and `docs/INDEX.md` for document routing.

This plan covers implementation after the reference-analysis step. No application code is implemented in this phase.

## Current Deliverables

Created/updated planning documents:

- `docs/reference-analysis.md`
- `docs/motion-spec.md`
- `docs/content-requirements.md`
- `PLAN.md`

Reference asset retained:

- `docs/reference/ova-motion-reference.mp4`

## Phase 0: Content And Asset Confirmation

Files to create/change:

- `docs/content-requirements.md` updates as GTG confirms copy.
- Future asset directory `[TBD]`, for example `public/images/`.

Technologies:

- Markdown for requirements.
- Image generation, commissioned design, or approved custom assets `[TBD]`.

Desktop behavior:

- Confirm full-screen visual direction for Hero and solution slides.

Mobile behavior:

- Confirm mobile-safe crops for all visuals.

Reduced-motion behavior:

- Confirm static Hero and solution copy states.

WebGL fallback:

- Confirm fallback static images and HTML copy.

Verification method:

- Content review against `[TBD]` list.
- Asset originality check: no OVA assets, logo, copy, or exact layout.

Completion criteria:

- All homepage copy approved or intentionally marked `[TBD]`.
- Required 7 Hero visuals and 5 solution visuals identified.

Risks:

- Unconfirmed company facts could delay final copy.
- Weak image contrast could make full-screen text unreadable.

Excluded from MVP:

- Case-study claims without GTG approval.
- Partner/client logo strips unless verified.

## Phase 1: Project Scaffold

Files to create/change:

- `package.json`
- `next.config.*`
- `tsconfig.json`
- `postcss.config.*`
- `tailwind.config.*`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

Technologies:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.

Desktop behavior:

- Full-page single-route homepage.

Mobile behavior:

- Responsive layout from the start.

Reduced-motion behavior:

- Global reduced-motion detection class or hook.

WebGL fallback:

- Scaffold a Hero boundary that can render either WebGL or HTML fallback.

Verification method:

- `npm run lint` `[TBD]`.
- `npm run build`.
- Initial Playwright smoke test.

Completion criteria:

- App boots locally.
- No blank route.
- Base responsive shell exists.

Risks:

- Dependency version mismatches.
- Tailwind/Next config drift.

Excluded from MVP:

- CMS integration.
- Backend services.

## Phase 2: Design Foundation

Files to create/change:

- `app/globals.css`
- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/ui/*` as needed.
- `lib/content.ts`

Technologies:

- Tailwind CSS.
- CSS custom properties.
- TypeScript content constants.

Desktop behavior:

- Minimal navigation and persistent brand presence.
- Avoid copying reference nav placement exactly.

Mobile behavior:

- Compact header.
- Accessible menu `[TBD]`.

Reduced-motion behavior:

- No decorative animation required.

WebGL fallback:

- Header and content must remain independent from canvas.

Verification method:

- Responsive screenshots.
- Keyboard navigation check.
- Contrast check.

Completion criteria:

- Design tokens and base layout are stable.
- GTG content can be rendered without WebGL.

Risks:

- Over-styling before content is approved.
- Palette becoming too close to the reference.

Excluded from MVP:

- Multi-page navigation.
- Account/login areas.

## Phase 3: WebGL Hero

Files to create/change:

- `components/hero/gtg-hero.tsx`
- `components/hero/hero-canvas.tsx`
- `components/hero/hero-fallback.tsx`
- `components/hero/service-card-material.tsx` `[TBD]`
- `lib/use-prefers-reduced-motion.ts`
- `lib/webgl-support.ts`

Technologies:

- React Three Fiber.
- Three.js.
- GSAP for timeline coordination.
- ScrollTrigger for scroll progress.

Desktop behavior:

- Seven service cards arranged around a cylindrical ring.
- Front arc moves right-to-left.
- Headline transitions by opacity/blur/y-offset.
- Scroll drives carousel progress and camera pullback.

Mobile behavior:

- Fewer visible cards.
- Lower texture resolution and capped pixel ratio.
- Simplified arc or fallback if performance is poor.

Reduced-motion behavior:

- Static Hero.
- No orbit.
- No camera pullback.
- No blur-heavy text transition.

WebGL fallback:

- HTML/CSS service card strip with the same seven labels.
- Fallback triggers on WebGL init failure or explicit test flag.

Verification method:

- Playwright screenshot at Hero initial/mid/end states.
- Canvas nonblank check.
- WebGL failure simulation.
- Mobile performance smoke test.

Completion criteria:

- Hero renders without blank canvas.
- No text/image overlap at desktop or mobile sizes.
- Fallback displays complete content.

Risks:

- Texture loading delays.
- ScrollTrigger and R3F state desync.
- Mobile GPU limits.

Excluded from MVP:

- Interactive 3D controls.
- User-draggable carousel unless later approved.

## Phase 4: Hero-To-Solutions Transition

Files to create/change:

- `components/hero/hero-transition.tsx` or integrated Hero timeline.
- `components/solutions/solutions-section.tsx`.

Technologies:

- GSAP.
- ScrollTrigger.
- React Three Fiber camera controls.
- CSS overlay.

Desktop behavior:

- Camera pulls back from the ring.
- Ring scales into a smaller ellipse.
- Black overlay completes the handoff.
- First solution slide appears from black.

Mobile behavior:

- Shorter transition.
- Avoid long pinned scroll.
- Prefer simple fade if WebGL load is reduced.

Reduced-motion behavior:

- Immediate or short crossfade from Hero to solutions.

WebGL fallback:

- HTML Hero fades into solution section with no camera motion.

Verification method:

- Playwright screenshots around transition progress.
- Manual scroll wheel and trackpad checks.

Completion criteria:

- No white flash.
- No stuck pinned state.
- Solution slide is readable after transition.

Risks:

- Scroll height tuning across devices.
- Browser refresh landing mid-animation.

Excluded from MVP:

- Exact reflective ring effect from the reference.

## Phase 5: Solution Slide Sequence

Files to create/change:

- `components/solutions/solutions-section.tsx`
- `components/solutions/solution-slide.tsx`
- `components/solutions/solution-index.tsx`
- `lib/content.ts`

Technologies:

- HTML.
- CSS.
- SVG for index/progress details.
- GSAP + ScrollTrigger.

Desktop behavior:

- Five full-screen solution slides.
- Full-bleed images.
- Left-aligned text.
- Right vertical index `01`-`05` with active tick.
- Layered crossfade/reveal image transitions.

Mobile behavior:

- Vertical solution cards or shorter snap panels.
- Compact `01 / 05` progress indicator.
- Text remains readable without relying on hover.

Reduced-motion behavior:

- No pinned scrub.
- Simple stacked sections or immediate content changes.

WebGL fallback:

- Not applicable after Hero; section is already HTML/CSS.

Verification method:

- Playwright desktop/mobile screenshots for each slide.
- Contrast and text overflow checks.
- Reduced-motion screenshots.

Completion criteria:

- All five solution slides render.
- Index updates correctly.
- No OVA copy/assets/layout duplication.

Risks:

- Full-screen image crops can hide important visual detail.
- Text contrast may vary by slide.

Excluded from MVP:

- Deep service detail pages.
- Dynamic filtering.
- Portfolio/case-study database.

## Phase 6: Supporting Sections And Contact

Files to create/change:

- `components/company-overview.tsx`
- `components/engagement-model.tsx`
- `components/contact-section.tsx`
- `components/site-footer.tsx`

Technologies:

- HTML.
- CSS/Tailwind.
- Small GSAP reveals only if motion-safe.

Desktop behavior:

- Clear post-Hero content flow.
- No nested decorative cards.

Mobile behavior:

- Single-column layout.
- Large tap targets.

Reduced-motion behavior:

- Static content.

WebGL fallback:

- Same content path as normal page.

Verification method:

- Responsive screenshots.
- Keyboard and screen-reader structure check.

Completion criteria:

- User can understand GTG offering and find contact path.

Risks:

- Content may remain `[TBD]` if GTG does not provide details.

Excluded from MVP:

- Contact form backend.
- CRM integration.
- Scheduling integration.

## Phase 7: QA And Release Readiness

Files to create/change:

- `tests/e2e/home.spec.ts`
- `playwright.config.ts`
- `README.md` setup notes `[TBD]`

Technologies:

- Playwright.
- Next.js production build.

Desktop behavior:

- Verify 1440x900 and 1280x720.

Mobile behavior:

- Verify 390x844 and one tablet viewport `[TBD]`.

Reduced-motion behavior:

- Playwright emulates reduced motion and verifies static alternatives.

WebGL fallback:

- Test flag forces fallback.
- Verify page remains complete and navigable.

Verification method:

- `npm run build`.
- `npm run lint`.
- `npm run test:e2e` `[TBD]`.
- Screenshot comparison or manual visual review.

Completion criteria:

- No blank canvas.
- No text overlap.
- No unreadable slide.
- No console errors in core path.
- WebGL fallback and reduced-motion paths pass.
- MVP contains no OVA assets/copy/logo/exact layout.

Risks:

- Browser-specific WebGL differences.
- ScrollTrigger refresh bugs after image load.
- Performance on low-end mobile devices.

Excluded from MVP:

- CMS.
- Analytics dashboards.
- Blog/news.
- Multi-language support.
- Client portal.
- Advanced shader effects beyond the Hero need.
- Exact replication of the reference site.

## Open Implementation Questions

- Final GTG headline and service copy: `[TBD]`.
- Approved GTG color palette and logo assets: `[TBD]`.
- Contact CTA destination: `[TBD]`.
- Whether solution slides should be strictly pinned on desktop or use hybrid pinned/normal scroll: `[TBD]`.
- Minimum supported browsers/devices: `[TBD]`.
- Whether generated imagery is acceptable for MVP: `[TBD]`.
