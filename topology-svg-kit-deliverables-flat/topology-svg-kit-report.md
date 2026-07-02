# GTG Topology SVG Kit Report

Date: 2026-07-01  
Branch: `codex/topology-svg-kit`  
Status: Accept candidate

## Source Availability

The current branch does not contain several asset-research draft documents named in the task prompt, including `docs/asset-research-index.md`, `docs/gtg-asset-qa-rubric.md`, and related asset ranking files. This report follows the task prompt, `AGENTS.md`, existing GTG visual constraints, and the approved Customer Card System baseline.

## 1. Generated SVG List

- `public/generated/topology/gtg-primitives.svg`
- `public/generated/topology/gtg-data-analytics.svg`
- `public/generated/topology/gtg-data-streaming.svg`
- `public/generated/topology/gtg-infrastructure-automation.svg`
- `public/generated/topology/gtg-devops-quality.svg`
- `public/generated/topology/gtg-consulting-support.svg`

The existing `public/generated/solution-*.svg` assets were not overwritten.

## 2. Primitive Definitions

`gtg-primitives.svg` defines a reusable topology vocabulary:

- node
- active node
- edge
- directional edge
- grid
- layer plane
- queue segment
- database cylinder
- quality gate
- diagnostic marker
- angular GTG marker
- signal trace
- dependency edge

These primitives use a black and charcoal base, warm-white topology lines, neutral gray secondary structure, and a restrained red intervention marker.

## 3. Design Rationale

The kit is intentionally structural rather than illustrative. It avoids fake dashboards, vendor icons, customer logos, metric-like numbers, and decorative glow. Each diagram presents one central topology concept so the visuals can later support Solution backgrounds, Company capability mapping, and Engagement Flow assets without creating unsupported claims.

## 4. Solution Diagram Intent

Data & Analytics: layered data grid, query path, analytical node, and aggregation layer. It avoids dashboard panels or fake chart values.

Data Streaming: directional event stream, pulse sequence, split/merge path, and handoff. It does not copy Kafka or Confluent visual identity.

Infrastructure Automation: provisioning mesh, structured nodes, policy path, and repeatable platform route. It does not use cloud-provider icons.

DevOps & Quality: release confidence matrix, quality gate, test traceability, and validation path. It does not include DORA numbers or fake test metrics.

Consulting & Technical Support: diagnostic topology, signal correlation, support action point, and dependency path. It avoids observability product dashboard imitation.

## 5. Accessibility Approach

Each SVG includes a `<title>` and `<desc>` because the diagrams convey relationships. Future site integration should still keep important Solution names and descriptions in semantic HTML outside the SVG. The active state does not rely on red alone: active items also use heavier stroke, marker shape, or position.

## 6. Claim Safety Approach

The topology kit does not include:

- vendor product logos;
- customer logos;
- partner or certification wording;
- fake dashboard UI;
- fake performance metrics;
- ROI, cost, or outcome claims;
- product-specific customer use claims.

The SVG text is structural only: labels such as `query path`, `quality gate`, `support action`, and `handoff` describe topology roles rather than business outcomes.

## 7. Mobile Usage Notes

For mobile integration, use these SVGs as decorative or supporting visuals behind HTML headings and lists. Avoid placing dense text inside the SVG at narrow widths. If used in a card or section background, crop around the central concept and keep the semantic description in HTML.

## 8. Performance Notes

The assets are static SVGs with no script, no filters, no external image requests, and no WebGL. They can be served as cacheable local files and reused as image backgrounds or inline SVG where needed.

## 9. Site Integration Proposal

Recommended next integration order:

1. Use the five topology SVGs as optional alternate backgrounds for Solution slides after design approval.
2. Reuse primitives in a future Company capability map.
3. Reuse directional edge, quality gate, and diagnostic marker in an Engagement Flow Map.
4. Keep the existing Hero WebGL and Customer Card System untouched.

## 10. QA Rubric Self-Score

Score: 32 / 33  
Decision: Accept candidate

| Category | Score | Notes |
|---|---:|---|
| GTG identity | 3 | Uses GTG charcoal, warm-white lines, and restrained red angular intervention marker. |
| Proof value | 3 | Clarifies GTG solution domains without inventing results. |
| Asset feasibility | 3 | Local static SVGs only. |
| Accessibility | 2 | Titles and descriptions exist; future HTML integration must carry full explanatory copy. |
| Claim safety | 3 | No vendor logos, fake metrics, customer logos, outcomes, or partner claims. |
| Logo handling | 3 | No customer or vendor logos are used. |
| Reference originality | 3 | Uses GTG-owned topology primitives rather than copied product or reference UI. |
| Motion restraint | 3 | Static assets with no motion dependency. |
| Mobile resilience | 3 | Central-concept diagrams can crop or scale without losing HTML meaning. |
| Maintainability | 3 | Shared primitive vocabulary and per-solution files. |
| Performance | 3 | Lightweight local SVGs, no script, no new WebGL. |

## 11. Baseline Confirmation

This task does not intentionally modify:

- Hero WebGL geometry;
- Hero camera, FOV, ring radius, orbit, pullback, or handoff;
- Customer Card System design;
- Solution pinned motion;
- Solution section layout;
- WebGL scope.

The new topology assets live only in `public/generated/topology/`.
