# GTG Asset QA Rubric

Status: draft from reference research  
Date: 2026-06-30  
Style guide: `docs/gtg-asset-style-guide-draft.md`  
Ranking: `docs/reference-asset-ranking.md`

## Purpose

Use this rubric to evaluate whether a proposed visual asset should be accepted, revised, held, or rejected.

## Scoring

Each category is scored 0-3. Maximum score is 33.

- 3: Strong fit.
- 2: Acceptable with minor revision.
- 1: Weak or risky.
- 0: Reject.

Recommended threshold:

- 27-33: Accept.
- 21-26: Revise.
- 14-20: Hold.
- 0-13: Reject.

## Rubric

| Category | 3 | 2 | 1 | 0 |
|---|---|---|---|---|
| GTG identity | Uses GTG palette, angular red marker, and technical frame language. | Mostly GTG-aligned but needs polish. | Generic enterprise tech styling. | Looks like another brand or template. |
| Proof value | Clearly supports customer trust, service clarity, or technical credibility. | Some proof/service value. | Mostly decorative. | No clear GTG value. |
| Asset feasibility | Can be built as SVG/HTML/CSS/CanvasTexture/local PNG/WebP. | Feasible but needs conversion. | Requires fragile custom work. | Requires unsuitable external/hotlinked/proprietary assets. |
| Accessibility | Semantic text/fallback/reduced-motion strategy is clear. | Minor accessibility gaps. | Meaning is partly trapped in image/motion. | Essential meaning is inaccessible. |
| Claim safety | No unapproved metrics, certifications, partner tiers, or outcomes. | Slight copy/label ambiguity. | Could imply unsupported claims. | Explicit unsupported claim. |
| Logo handling | Preserves customer logo proportions, colors, clear space, and semantic name. | Minor spacing or scale issue. | Logo is crowded or ambiguous. | Logo is distorted, recolored, or combined into a new mark. |
| Reference originality | Reinterprets a pattern into GTG-owned primitives. | Some resemblance but not derivative. | Too close to reference style. | Copies reference layout, assets, or brand language. |
| Motion restraint | Motion clarifies a state or handoff and has static alternative. | Motion is acceptable but slightly decorative. | Motion distracts or lacks reduced alternative. | Motion-only proof or inaccessible continuous animation. |
| Mobile resilience | Works or can adapt cleanly at 390px width. | Minor crop/spacing issue. | Needs major mobile redesign. | Causes overflow or unreadable content. |
| Maintainability | Reusable primitives/content-driven structure. | Some hardcoded parts. | One-off artwork. | Cannot be maintained without redesign. |
| Performance | Lightweight SVG/HTML/CSS or bounded Hero texture. | Slightly heavy but manageable. | Heavy raster/animation cost. | Adds new WebGL or high-cost runtime effect outside Hero. |

## Automatic Rejects

Reject an asset if it:

- uses OVA images, video, code, copy, logo, or exact layout;
- uses external hotlinked imagery;
- uses vendor product icons as GTG-owned service icons;
- recolors or distorts customer logos;
- invents customer outcomes, metrics, partner tiers, certifications, or scale;
- adds WebGL outside Hero;
- is a generic 3D particle/glow asset without business meaning;
- requires motion to understand proof content.

## Review Questions

1. Does this asset make GTG more recognizable?
2. Does it clarify a service, customer proof, or delivery/support model?
3. Can it be generated locally and maintained?
4. Does it have a static/reduced-motion equivalent?
5. Does it avoid unsupported claims?
6. Does it fit one of the ranked asset packages?

## Source Principles

- Adobe Spectrum: colors in data visualization should carry meaning and remain systematic.
- Atlassian illustrations: use illustration intentionally; avoid decorative-only clutter.
- Fluent / Carbon motion: motion should be purposeful, consistent, and adaptive.
- USWDS / GOV.UK data guidance: visualizations need clarity and equivalent text access.
- W3C WAI / MDN: decorative and informative images need different accessibility treatment.
- Logo accessibility and clear-space guidance: customer marks need concise names, preserved proportions, and protected spacing.
- Section508.gov / data.europa.eu SVG guidance: informative graphics need meaningful alternatives, while inline SVG can use `<title>`, `<desc>`, and labeling when exposed.
