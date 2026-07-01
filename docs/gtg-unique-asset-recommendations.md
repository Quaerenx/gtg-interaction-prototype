# GTG Unique Asset Recommendations

Status: working recommendation from active reference research  
Date: 2026-06-30  
Research index: `docs/asset-research-index.md`
Related ranking: `docs/reference-asset-ranking.md`  
Style guide: `docs/gtg-asset-style-guide-draft.md`  
QA rubric: `docs/gtg-asset-qa-rubric.md`
Scorecard: `docs/gtg-asset-scorecard.md`
Customer logo audit: `docs/customer-logo-asset-audit.md`
Brand asset gap audit: `docs/brand-asset-gap-audit.md`
Visual motif palette: `docs/gtg-visual-motif-palette.md`
Risk register: `docs/gtg-asset-risk-register.md`
Generated asset inventory: `docs/generated-asset-inventory.md`
Asset copy guardrails: `docs/asset-copy-guardrails.md`

## Recommendation

GTG should prepare a compact asset system that says:

```txt
trusted customer work
  + data/platform engineering clarity
  + operational reliability
  + practical consulting delivery
```

The unique direction is not more 3D spectacle. The stronger identity is a reusable visual language built from customer proof cards, technical topology diagrams, capability maps, and a restrained red angular marker derived from the GTG logo geometry.

This should be treated as an asset system, not a one-off illustration set. The same primitives should work on the homepage, sales decks, one-page capability sheets, social previews, and internal proposal covers.

## Priority Assets

| Rank | Asset | Why It Helps GTG Identity | Best Format | MVP Feasibility |
|---:|---|---|---|---|
| 1 | Customer Proof Card System | Turns real customer logos into a GTG-owned proof object instead of a loose logo strip. | SVG frame + local PNG/WebP logo content + CanvasTexture for Hero. | High. Existing customer PNGs are available locally. |
| 2 | GTG Technical Topology Kit | Creates a recognizable language for analytics, streaming, infrastructure, DevOps, and support. | SVG primitives and section diagrams. | High. Can be generated locally with no external imagery. |
| 3 | Capability Map | Makes the company feel like a structured technical partner, not just a portfolio page. | SVG + semantic HTML. | High. Uses approved service names only. |
| 4 | Industry Proof Grid | Adds credibility by showing customer proof in a calm, scannable system. | HTML/CSS cards + local logos. | Medium-high. Needs industry labels approved or left generic. |
| 5 | Engagement Flow Map | Shows how GTG works with clients without inventing performance claims. | SVG path + HTML steps. | Medium-high. Needs final wording approval. |
| 6 | Signal Correlation / Diagnostics Map | Gives Technical Support a distinctive operations visual. | SVG topology with trace/log/metric style nodes. | Medium. Keep it abstract, not a fake product screenshot. |
| 7 | Platform Golden Path Diagram | Gives Infrastructure Automation and DevOps a clear delivery metaphor. | SVG staged pipeline/topology. | Medium. Avoid claiming a named proprietary methodology. |
| 8 | Red Angular Motion Motif | Adds a signature GTG transition language across sections. | CSS/GSAP SVG path. | Medium. Must remain subtle and reduced-motion safe. |
| 9 | Service Icon Family | Useful only after the topology primitives are approved. | Small SVG icons. | Medium. Derive from the topology kit, not vendor icons. |
| 10 | OG / Presentation Cover System | Extends the identity into sharing decks and social previews. | SVG master exported to PNG/WebP. | Medium. Should reuse the proof card and topology system. |

## Concrete Asset Pack

Prepare these source assets first:

1. Official GTG logo in SVG, PNG, and single-color variants.
2. Approved customer logo files, preferably SVG or high-resolution PNG.
3. Customer display names exactly as GTG wants them shown.
4. Optional customer industry grouping labels, only if approved.
5. Approved service taxonomy and one-line descriptions.
6. Any approved brand accent derived from the GTG logo.
7. Approved no-claim wording for customer proof, such as `Representative customers`.
8. Internal proposal/deck examples that show how GTG currently explains systems.

Build these first:

1. `customer-card-frame.svg`
2. `customer-card-mask.svg`
3. `gtg-primitives.svg`
4. `gtg-capability-map.svg`
5. `gtg-industry-proof-grid.svg`
6. `gtg-data-analytics.svg`
7. `gtg-data-streaming.svg`
8. `gtg-infrastructure-automation.svg`
9. `gtg-devops-quality.svg`
10. `gtg-consulting-support.svg`

Build next:

1. `gtg-diagnostic-topology.svg`
2. `gtg-signal-correlation-map.svg`
3. `gtg-platform-golden-path.svg`
4. `gtg-engagement-flow.svg`
5. `gtg-og-1200x630.png`
6. `gtg-deck-cover-16x9.png`

Prepare for later channels:

1. Proposal cover template.
2. One-page capability sheet.
3. Case-study tile template without unapproved result claims.
4. LinkedIn / social preview image set.
5. Email signature or small brand strip using the same red angular marker.
6. Presentation divider slide for each Solution area.

## Suggested Parallel Branches

| Branch | Asset Scope | Dependency | Merge Risk |
|---|---|---|---|
| `codex/brand-master-assets` | Official SVG logo, inverse logo, favicon, apple touch icon, red accent documentation. | Official brand files from GTG. | Low if treated as asset prep only. |
| `codex/customer-card-system` | Final customer card frame, mask, logo normalization checks, fallback card treatment. | Current local logo PNGs. | Medium because it touches Hero media composition. |
| `codex/topology-svg-kit` | `gtg-primitives.svg` and five Solution topology masters. | Approved color/shape rules. | Low-medium because it can live under `public/generated/topology/`. |
| `codex/capability-map` | One reusable company/service capability map. | Approved service taxonomy. | Low if kept as SVG + semantic HTML. |
| `codex/industry-proof-grid` | Static customer proof grid and optional industry grouping. | Approved customer display names and group labels. | Medium because claims must be reviewed. |
| `codex/engagement-flow-map` | Delivery/support flow SVG and copy slots. | Approved engagement wording. | Low-medium. |
| `codex/og-and-deck-assets` | Social preview and deck cover exports derived from approved masters. | Customer card and topology approval. | Low after dependencies land. |

Avoid running multiple branches that edit Hero geometry, WebGL camera, or approved page motion. Asset branches should primarily add files under `public/generated/` and small content references.

## Why These Are More Unique

Customer cards are unique because GTG's actual customer proof is harder to imitate than abstract graphics. The frame, grid, and red marker make the logos feel part of GTG's own system while preserving the original customer logos.

Topology diagrams are unique because they can encode how GTG thinks: data movement, infrastructure provisioning, deployment quality, diagnostics, and consulting support. These diagrams should be simple enough to read but specific enough to avoid generic tech wallpaper.

Capability and engagement maps are unique because they clarify GTG's role as a technical consulting partner. They can be reused in the website, proposals, presentations, and sales material.

The red angular motion motif is unique only if it is small and consistent. It should be a signature accent, not a new animation feature.

## Customer Proof Maturity

Use now:

- Customer display names.
- Local customer logo files.
- Neutral proof label.
- GTG-owned card frame.
- Static or Hero-integrated presentation.

Use only after approval:

- Industry grouping labels.
- Customer story summaries.
- Outcome numbers.
- Project scope descriptions.
- Case-study tiles.
- Any endorsement-like wording.

## What To Avoid

- Generic AI purple gradients.
- Neon cyberpunk backgrounds.
- Fake dashboard screenshots.
- Vendor icon collages.
- Decorative 3D particle fields.
- Motion-only logo proof.
- Claims about customers, results, certifications, or partner status without approval.

## Acceptance Rules

Every proposed asset should pass `docs/gtg-asset-qa-rubric.md`.

Automatic acceptance candidates:

- Uses existing local customer logos without distortion.
- Uses GTG palette and red angular marker.
- Has semantic HTML or text equivalent.
- Works without motion.
- Does not add WebGL outside Hero.

Customer logo handling:

- Preserve original logo color and proportions.
- Keep a consistent clear-space field around each logo.
- Do not place other marks so close that they could be read as part of the customer logo.
- Expose customer names in semantic HTML.
- For standalone logo images, use concise alt text such as `[Customer name] logo`.
- For decorative repeated logo art where the name is already present nearby, hide the decorative duplicate from assistive technology.

Complex diagram handling:

- If the SVG communicates service structure, include a short accessible name and adjacent text explanation.
- If the SVG is decorative support for nearby text, set it as decorative and keep the meaning in HTML.
- Avoid dense diagram labels on mobile; use the adjacent HTML as the source of truth.

Automatic hold/reject candidates:

- Requires external image downloads or hotlinks.
- Looks like a copied vendor design system.
- Depends on unapproved claims.
- Adds visual complexity without explaining GTG services.
- Fails at 390px mobile width.

## Reference Principles

- IBM Design Language shows that mature technology brands maintain full systems across type, grid, icons, illustration, data visualization, diagrams, and motion: https://www.ibm.com/design/language/
- Carbon shows how an enterprise technology design system connects working code, design tools, resources, and human-interface guidance: https://carbondesignsystem.com/
- Frontify's visual identity guidance emphasizes that documentation is as important as the visual elements themselves for consistent adoption: https://www.frontify.com/en/guide/visual-identity
- McGill's visual identity guide frames official logos, colors, typography, templates, photography, graphics, and layouts as part of a full organizational identity: https://www.mcgill.ca/visual-identity/visual-identity-guide
- Digital.gov accessibility guidance recommends planning accessibility into the design process and testing throughout development: https://digital.gov/guides/accessibility-for-teams/visual-design/
- USWDS data visualization guidance prioritizes simplicity, clear intent, and equivalent access for information in graphics: https://designsystem.digital.gov/components/data-visualizations/
- Atlassian illustration guidance recommends using visuals intentionally to explain workflows or add context, not as decoration: https://atlassian.design/foundations/illustrations/
- Fluent motion guidance frames motion as a way to express relationships and transitions, with accessible no-motion alternatives: https://fluent2.microsoft.design/motion
- W3C WAI guidance separates decorative imagery from informative imagery, which supports the rule that GTG proof and service visuals need semantic equivalents: https://www.w3.org/WAI/tutorials/images/decorative/
- W3C WAI complex image guidance treats charts, flow charts, and diagrams as content that often needs more than short alt text: https://www.w3.org/WAI/tutorials/images/complex/
- University of South Carolina logo alt guidance supports concise logo alternatives in the format `[Organization name] logo`: https://sc.edu/about/offices_and_divisions/digital-accessibility/toolbox/best_practices/alternative_text/logo-alt-text/
- University at Buffalo clear-space guidance explains why protected space around marks preserves legibility and prevents accidental brand combinations: https://www.buffalo.edu/brand/identity/usage/Clear-space.html
