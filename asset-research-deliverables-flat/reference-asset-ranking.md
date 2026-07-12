# GTG Asset Reference Ranking

Status: working summary  
Date: 2026-06-30  
Research index: `docs/asset-research-index.md`
Source detail: `docs/reference-asset-research.md`
Production prompts: `docs/asset-production-prompts.md`
Completion audit: `docs/reference-research-completion-audit.md`
Final report draft: `docs/reference-research-final-report-draft.md`
Reference-to-asset matrix: `docs/reference-to-asset-matrix.md`
Evidence catalog: `docs/reference-source-evidence-catalog.md`
Asset style guide: `docs/gtg-asset-style-guide-draft.md`
QA rubric: `docs/gtg-asset-qa-rubric.md`
Unique asset recommendations: `docs/gtg-unique-asset-recommendations.md`
Scorecard: `docs/gtg-asset-scorecard.md`
Customer logo audit: `docs/customer-logo-asset-audit.md`
Brand asset gap audit: `docs/brand-asset-gap-audit.md`
Visual motif palette: `docs/gtg-visual-motif-palette.md`
Risk register: `docs/gtg-asset-risk-register.md`
Generated asset inventory: `docs/generated-asset-inventory.md`
Asset copy guardrails: `docs/asset-copy-guardrails.md`

## Current Recommendation

GTG should prioritize proof-and-systems assets over decorative 3D assets.

The most effective visual identity direction is:

```txt
Confirmed customer proof
  + GTG angular red logo motif
  + technical topology / capability maps
  + restrained motion
```

## Build Ranking

| Rank | Asset | Why It Ranks Here | Build Path | Risk |
|---:|---|---|---|---|
| 1 | Customer Card System | Highest immediate identity lift; uses real GTG customer proof; already fits Hero ring. | SVG frame + CanvasTexture + fallback `<Image>` cards. | Medium because it touches Hero media, but not geometry. |
| 2 | GTG Topology SVG Kit | Best long-term proprietary visual language for all Solution areas. | SVG primitives and five Solution diagrams. | Medium; needs careful visual design. |
| 3 | GTG Capability Map | Explains GTG's service breadth in one reusable consulting/SI asset. | Original SVG plus semantic text. | Low-medium. |
| 4 | Industry Proof Grid | Converts logos into a credible static proof section with industry grouping. | HTML/CSS grid with normalized customer cards. | Low-medium. |
| 5 | Engagement Flow Map | Shows GTG as a practical technical partner with a delivery method. | SVG connector + HTML process steps. | Low-medium. |
| 6 | Service Icon Family | Useful after topology primitives are defined. | Derive small SVG icons from `gtg-primitives.svg`. | Low. |
| 7 | OG/Social Image Package | Needed for release polish but depends on card/topology direction. | SVG composition exported to 1200x630 PNG/WebP. | Low-medium. |
| 8 | GTG Motion Motif | Adds signature motion but should follow static assets. | SVG/CSS/GSAP path, pulse, handoff assets. | Medium due to motion QA. |
| 9 | Full-screen Bitmap Backgrounds | Useful only after SVG masters are approved. | Export approved SVGs to WebP/PNG. | Medium-high. |
| 10 | Generic 3D Abstract Assets | Weak business identity, high QA/performance cost. | Do not start. | High. |

## Prepare First

1. Official GTG logo SVG.
2. Inverse logo SVG.
3. Favicon SVG and apple touch icon.
4. Official red accent value.
5. Logo clear-space and minimum-size rule.

## Build Now

1. `customer-card-frame.svg`
2. `customer-card-mask.svg`
3. `gtg-primitives.svg`
4. `gtg-capability-map.svg`
5. `gtg-industry-proof-grid.svg`

## Build Next

1. `gtg-data-analytics.svg`
2. `gtg-data-streaming.svg`
3. `gtg-infrastructure-automation.svg`
4. `gtg-devops-quality.svg`
5. `gtg-consulting-support.svg`
6. `gtg-diagnostic-topology.svg`
7. `gtg-signal-correlation-map.svg`
8. `gtg-platform-golden-path.svg`
9. `gtg-engagement-flow.svg`
10. `gtg-og-1200x630.png`

## Hold

- Customer case-study tiles until case copy and scope are approved.
- Full-screen bitmap backgrounds until SVG masters are approved.
- Vendor-logo capability diagrams unless partner/endorsement language is approved.
- Data governance/product map until GTG approves the language around data governance/data products.

## Reject For Now

- Generic 3D particle fields.
- Purple/blue AI gradient hero art.
- Fake dashboard screenshots.
- Vendor icon collage.
- Motion-only customer logo carousel.

## Recommended Branch Split

| Branch | Scope |
|---|---|
| `codex/brand-master-assets` | Official SVG/inverse/favicon assets and brand source cleanup. |
| `codex/customer-card-system` | Hero and fallback customer card composition. |
| `codex/topology-svg-kit` | SVG primitives and Solution diagrams. |
| `codex/capability-map` | Service breadth map. |
| `codex/industry-proof-grid` | Static customer proof section assets. |
| `codex/engagement-flow-map` | Delivery/process visual. |
| `codex/og-social-assets` | Social preview assets after visual system approval. |

## Decision

Start with `Customer Card System` and `GTG Topology SVG Kit`.

This pair gives the strongest combination of:

- Proof.
- Identity.
- Reuse.
- Compatibility with the approved Hero.
- Low dependency on unapproved claims.

Before accepting any generated asset into the baseline, score it with `docs/gtg-asset-qa-rubric.md`. Anything below the accept threshold should remain a branch artifact until revised.
