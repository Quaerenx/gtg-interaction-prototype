# GTG Asset Risk Register

Status: working risk register from active reference research  
Date: 2026-06-30  
Related QA: `docs/gtg-asset-qa-rubric.md`
Copy guardrails: `docs/asset-copy-guardrails.md`

## Purpose

This register captures risks that can make a visual asset unsuitable even when it looks polished.

## Risks

| Risk | Applies To | Why It Matters | Mitigation |
|---|---|---|---|
| Unsupported customer outcome claim | Customer proof grid, case tiles, proposal covers | A logo can become an implied case claim if paired with unapproved result copy. | Use neutral labels such as `Representative customers`; require approved case copy for outcomes. |
| Co-branding confusion | Customer cards, proof strips | GTG frame marks placed too close to a customer logo may imply co-branding or endorsement. | Preserve clear space and keep GTG marker outside the logo safe area. |
| Vendor endorsement implication | Capability maps, topology diagrams | Vendor icons or product names can imply partnership or certification. | Use GTG-owned primitives; separate product expertise from partner claims. |
| Fake dashboard problem | Data & Analytics, DevOps, Support visuals | Product-like UI screenshots may imply actual platform output or fabricated metrics. | Use abstract topology and matrix motifs with no fake numbers. |
| DORA metric overclaim | DevOps & Quality, proposal graphics | DORA-style visuals can imply measured delivery performance if numeric values are shown. | Use quality-gate and traceability structure only; do not show performance numbers without approved evidence. |
| Observability product imitation | Support diagnostics, signal maps | Trace/metric/log visuals can look like copied product dashboards. | Use OpenTelemetry-inspired signal categories as abstract primitives, not vendor UI. |
| Motion-only meaning | Hero, proof carousel, signal motif | Important information becomes inaccessible or easy to miss. | Keep semantic HTML and static/reduced-motion alternatives. |
| New WebGL scope creep | Generic 3D assets, section backgrounds | Violates approved constraint that WebGL is Hero-only. | Keep all non-Hero assets as SVG, HTML, CSS, PNG/WebP, or GSAP. |
| Mobile density | Capability maps, proof grids, topology diagrams | Dense labels become unreadable at 390px and can overflow. | Collapse to cards, lists, or simplified diagrams on mobile. |
| Brand color drift | All assets | Different reds or extra accents weaken the identity. | Use approved red when available; current `#E90207` is provisional only. |
| Reference imitation | Topology kit, motion motif | Too-close visual treatment can feel copied from references. | Convert patterns into GTG primitives and validate with originality score. |
| Asset maintenance burden | One-off backgrounds, raster diagrams | Future content changes require redesign. | Prefer SVG primitives, content-driven labels, and reusable card systems. |

## Highest-Risk Asset Types

1. Full-screen bitmap backgrounds.
2. Vendor-logo capability diagrams.
3. Fake dashboard screenshots.
4. Customer case-study tiles without approved copy.
5. Generic 3D abstract scenes outside Hero.

## Safest Asset Types

1. Customer proof card frame with local logos.
2. GTG-owned topology SVG primitives.
3. Capability map with semantic labels.
4. Static customer proof grid.
5. Engagement flow with approved step copy.
