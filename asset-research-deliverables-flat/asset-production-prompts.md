# GTG Asset Production Prompts

Status: working prompt pack  
Date: 2026-06-30  
Source detail: `docs/reference-asset-research.md`  
Ranking summary: `docs/reference-asset-ranking.md`
Completion audit: `docs/reference-research-completion-audit.md`
Asset style guide: `docs/gtg-asset-style-guide-draft.md`
QA rubric: `docs/gtg-asset-qa-rubric.md`
Customer logo audit: `docs/customer-logo-asset-audit.md`
Brand asset gap audit: `docs/brand-asset-gap-audit.md`
Visual motif palette: `docs/gtg-visual-motif-palette.md`
Generated asset inventory: `docs/generated-asset-inventory.md`
Asset copy guardrails: `docs/asset-copy-guardrails.md`

## Purpose

These prompts turn the reference research into concrete Codex branch tasks. They are not image prompts for copying references. They are production prompts for creating GTG-owned local assets.

Global rules:

- Do not copy OVA assets, code, copy, logo, layout, timing, or imagery.
- Do not copy vendor diagrams, product icons, or brand styles.
- Use GTG's existing palette: black, charcoal, warm white, neutral gray, restrained red accent.
- Use WebGL only in the Hero.
- Keep core content in semantic HTML outside Canvas.
- Provide reduced-motion/static equivalents.
- Keep customer names in HTML when customer logos are used as proof.
- Do not add unapproved performance numbers, case outcomes, partner tiers, certifications, or metrics.
- Score each produced asset with `docs/gtg-asset-qa-rubric.md` before merging it into the baseline.

Reference principles:

- W3C WAI: decorative images should be ignored when adjacent text already conveys the information.
- MDN SVG: `<title>` provides a short accessible description for SVG graphics.
- USWDS data visualization: keep visualizations focused and provide equivalent access when information is embedded in graphics.
- Frontify visual identity guidance: scalable identity requires documented reusable assets and usage rules, not one-off decoration.

## Prompt 0: Brand Master Asset Prep

Branch:

`codex/brand-master-assets`

Goal:

Prepare the minimum GTG brand masters needed before broad asset production.

Inputs:

- Current `public/brand/gtg-logo.png`
- Any official GTG vector logo files provided by the business
- `docs/brand-asset-gap-audit.md`

Outputs:

- `public/brand/gtg-logo.svg`
- `public/brand/gtg-logo-inverse.svg`
- `public/brand/favicon.svg`
- `public/brand/apple-touch-icon.png`
- A short update to `docs/approved-content.md` if official assets are approved

Constraints:

- Do not trace the PNG if an official vector exists.
- Do not invent a new logo.
- Do not change approved page design or Hero geometry.
- Do not publish a guessed official color value as final.

Validation:

- SVG logo is crisp at small and large sizes.
- Inverse logo is readable on charcoal/black backgrounds.
- Favicon renders clearly at 16px, 32px, and 48px.
- Official red accent is documented only if approved.

## Prompt 1: Customer Card System

Branch:

`codex/customer-card-system`

Goal:

Create a GTG-owned customer card system for the existing Hero WebGL ring, fallback Hero, and future proof sections.

Inputs:

- `public/generated/customer-logos/*.png`
- `public/brand/gtg-logo.png`
- Existing `HeroCanvas` CanvasTexture flow
- Existing Hero geometry must remain unchanged

Outputs:

- `public/generated/customer-cards/customer-card-frame.svg`
- `public/generated/customer-cards/customer-card-mask.svg`
- Optional generated exports: `public/generated/customer-cards/{customer-id}.webp`
- Updated card composition code if needed

Visual direction:

- Charcoal technical frame.
- Warm-white logo field.
- Subtle grid outside the logo field.
- One small red angular GTG marker inspired by the GTG logo geometry.
- Customer name or index in restrained text.
- No logo recoloring.

Implementation guidance:

- Preserve each customer logo's original proportions.
- Normalize apparent visual size inside a shared safe area.
- Avoid blur/glow/neon effects.
- Keep the Hero panel count/radius/camera/pullback untouched.
- Fallback cards should use `object-fit: contain`.

Accessibility:

- Customer names must remain in semantic HTML outside Canvas.
- Card frame SVG is decorative unless it carries unique information.
- If exposed, SVG must include `<title>` and, if needed, `<desc>`.

Validation:

- All 18 customer logos fit without cropping.
- Long customer names do not overflow.
- No horizontal overflow at 390px width.
- Force fallback and reduced-motion states still show readable cards.
- Existing Hero E2E screenshots remain nonblank.

Acceptance criteria:

- The Hero feels like a GTG customer proof system, not a raw logo wall.
- No approved Hero geometry or handoff behavior changes.
- Customer proof is visible but not visually noisy.

## Prompt 2: GTG Topology SVG Kit

Branch:

`codex/topology-svg-kit`

Goal:

Create a reusable GTG technical diagram language for the five Solution areas.

Outputs:

- `public/generated/topology/gtg-primitives.svg`
- `public/generated/topology/gtg-data-analytics.svg`
- `public/generated/topology/gtg-data-streaming.svg`
- `public/generated/topology/gtg-infrastructure-automation.svg`
- `public/generated/topology/gtg-devops-quality.svg`
- `public/generated/topology/gtg-consulting-support.svg`
- `public/generated/topology/gtg-diagnostic-topology.svg`
- `public/generated/topology/gtg-signal-correlation-map.svg`

Primitive library:

- Node
- Active node
- Edge
- Directional edge
- Grid
- Layer plane
- Queue segment
- Database cylinder
- Quality gate
- Diagnostic marker
- Angular GTG marker
- Signal trace
- Dependency edge

Visual direction:

- Warm-white topology lines on black/charcoal.
- Red only for intervention/active states.
- Dense enough to feel technical, sparse enough to read quickly.
- One concept per diagram.

Do not:

- Use vendor product icons.
- Create fake dashboards.
- Use purple AI gradients.
- Add WebGL outside Hero.

Accessibility:

- If diagram meaning is important, provide nearby semantic text.
- Do not rely on color alone.
- Decorative SVG layers can be `aria-hidden`.

Validation:

- SVGs render crisply on desktop and mobile.
- Color contrast is readable against current backgrounds.
- Reduced-motion state can use the same static SVG.
- Diagrams are reusable in Solution and Company sections.

Acceptance criteria:

- The five diagrams feel like one GTG system.
- Each Solution has a distinct but related visual.
- Technical Support assets should look like engineering diagnostics, not generic helpdesk illustration.

## Prompt 3: GTG Capability Map

Branch:

`codex/capability-map`

Goal:

Create a concise visual map explaining GTG's service breadth.

Outputs:

- `public/generated/topology/gtg-capability-map.svg`
- Optional mobile crop: `public/generated/topology/gtg-capability-map-mobile.svg`

Suggested labels:

- Data & Analytics
- Data Streaming
- Infrastructure Automation
- DevOps & Quality
- Consulting & Technical Support

Visual direction:

- Service domains connected as a handoff system.
- GTG red angular marker indicates intervention points.
- Use neutral technical labels.
- Avoid vendor logos and partner claims.

Accessibility:

- Labels should exist in semantic HTML or exposed SVG text.
- If the SVG is decorative, provide the map as adjacent HTML content.

Validation:

- Understandable in 10 seconds.
- Works inside Company or Engagement section.
- No unsupported claims.
- No mobile overflow.

Acceptance criteria:

- The asset explains "what GTG connects" better than a paragraph alone.

## Prompt 4: Industry Proof Grid

Branch:

`codex/industry-proof-grid`

Goal:

Turn customer logos into a credible static proof asset grouped by industry.

Outputs:

- Proof section component or `public/generated/proof/gtg-industry-proof-grid.svg`
- Content grouping in `src/content/site.ts`

Suggested groups:

- Finance / Data Trust
- Public / Government
- Healthcare
- Enterprise / Technology

Visual direction:

- Quiet grid.
- Normalized logo cards.
- Industry labels as text.
- GTG frame language.
- No auto-advancing-only carousel.

Accessibility:

- Each logo has an adjacent text name.
- Logo images can be decorative when text names are adjacent.
- Grid order should be meaningful in DOM order.

Validation:

- No horizontal overflow at 390px.
- Keyboard/screen reader order is sensible.
- No fake case metrics, outcomes, or summaries.

Acceptance criteria:

- The section communicates trust and breadth without overclaiming.

## Prompt 5: Engagement Flow Map

Branch:

`codex/engagement-flow-map`

Goal:

Show GTG as a practical technical partner with a clear delivery method.

Outputs:

- `public/generated/topology/gtg-engagement-flow.svg`

Suggested steps:

- Diagnose
- Design
- Implement
- Validate
- Operate / Support

Visual direction:

- Operational, technical, restrained.
- Use the GTG angular red marker sparingly.
- Avoid broad management-consulting tone.

Accessibility:

- Step text must be real HTML.
- SVG connector can be decorative.

Validation:

- Desktop can show a horizontal or staged flow.
- Mobile collapses to vertical flow.
- Reduced-motion is static.

Acceptance criteria:

- The map makes the engagement model easier to understand without adding unapproved claims.

## Prompt 6: Service Icon Family

Branch:

`codex/service-icons`

Goal:

Create small service icons derived from the topology primitives after the topology kit is approved.

Outputs:

- `public/generated/icons/icon-data-analytics.svg`
- `public/generated/icons/icon-data-streaming.svg`
- `public/generated/icons/icon-infrastructure-automation.svg`
- `public/generated/icons/icon-devops-quality.svg`
- `public/generated/icons/icon-consulting-support.svg`

Rules:

- Derive from `gtg-primitives.svg`.
- Keep icons monochrome/warm-white with optional red active marker.
- Do not use vendor marks.

Acceptance criteria:

- Icons look like children of the topology kit.
- Icons are legible at 24px and 48px.

## Prompt 7: OG/Social Image Package

Branch:

`codex/og-social-assets`

Goal:

Create a release-ready social preview image after customer card and topology direction are approved.

Outputs:

- `public/generated/og/gtg-og-1200x630.png`
- Source SVG or editable composition file if practical.

Visual direction:

- GTG brand name.
- Customer-card or topology motif.
- No prototype marker.
- No unapproved claims.

Validation:

- 1200x630 raster exists.
- File size is reasonable.
- Metadata can reference it once approved.

Acceptance criteria:

- Looks like GTG, not a generic SaaS template.

## Reject Prompts

Do not create:

- Generic 3D particle fields.
- Purple/blue AI gradient art.
- Fake dashboard screenshots.
- Vendor icon collages.
- Motion-only customer proof carousels.

Why:

- Weak GTG identity.
- Higher accessibility/performance risk.
- Higher risk of implying unsupported claims.

## Source Links

- Reference research: `docs/reference-asset-research.md`
- Ranking summary: `docs/reference-asset-ranking.md`
- W3C decorative images: https://www.w3.org/WAI/tutorials/images/decorative/
- MDN SVG title: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title
- USWDS data visualizations: https://designsystem.digital.gov/components/data-visualizations/
- Frontify visual identity: https://www.frontify.com/en/guide/visual-identity
- Three.js CanvasTexture: https://threejs.org/docs/#api/en/textures/CanvasTexture
