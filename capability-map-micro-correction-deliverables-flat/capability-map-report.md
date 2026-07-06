# GTG Capability Map Report

Date: 2026-07-02  
Branch: `codex/capability-map`  
Status: Accept candidate

## 1. Generated Assets

- `public/generated/topology/gtg-capability-map.svg`
- `public/generated/topology/gtg-capability-map-mobile.svg`
- `tests/artifacts/capability-map/capability-map-contact-sheet.png`

The existing `public/generated/solution-*.svg` files and the approved Topology SVG Kit files were not overwritten.

## 2. Purpose

The Capability Map explains GTG service breadth in one visual field. It frames GTG as connecting data analytics, data streaming, infrastructure automation, DevOps quality, and consulting / technical support without implying a fixed delivery pipeline or a guaranteed sequence.

The central red marker was corrected from a directional arrow into a relationship / intervention marker. It now reads as a GTG connection point within the service field rather than as a required next-step arrow.

## 3. Desktop And Mobile Variants

Desktop uses a wide landscape composition with a central spine, forked relationship paths, and five capability nodes visible at once. The central GTG red form is a hub / intervention notch, not a rightward workflow arrow.

Mobile uses a simplified stacked composition so the five capability names remain readable at 390px without horizontal overflow. The mobile SVG uses broken relationship links and an active connector marker instead of a step-by-step pipeline.

Both maps describe service relationships. They do not claim that GTG always delivers the services in this order, and they do not guarantee a workflow sequence.

## 4. Topology Primitive Reuse

The map reuses the approved topology language:

- charcoal / black technical field;
- warm-white relationship lines;
- neutral grid;
- node and edge structure;
- red angular GTG marker;
- restrained active intervention point.

No new WebGL, shaders, post-processing, vendor icons, or new color system were added.

## 5. Claim Safety

Claim safety was rechecked after replacing the directional arrow with the relationship / intervention marker. Claim Safety remains 3 because the map avoids:

- customer logos;
- vendor logos and cloud-provider icons;
- fake dashboards or fake product UI;
- ROI, cost, DORA, certification, partner, or performance wording;
- customer outcome claims.

Labels are structural, such as `analytical layers`, `event handoff`, `provisioning mesh`, `validation gate`, and `diagnosis and action`. The labels do not include workflow-order claims such as step numbers, pipeline results, or guaranteed sequence language.

## 6. Accessibility

Both SVGs include `<title>` and `<desc>`. In the site integration, the SVG is treated as decorative because the important capability names and descriptors are available in semantic HTML through the `GTG capability map nodes` list.

The red marker is not the only indicator of meaning. Active or focus points also use stroke weight, shape, placement, and the adjacent relationship structure.

## 7. Mobile Handling

The Company section uses a mobile-specific SVG through a `<picture>` source. The semantic list remains visible below the visual, and the CSS constrains the image to the viewport so it does not create horizontal overflow.

Reduced-motion and force-fallback modes still render the same static Company section because the map has no animation or runtime dependency.

## 8. Company Section Integration

The map is integrated into `CompanyOverview` after the existing headline, copy, and current capability list. It does not replace the approved Company headline or description. The new block adds:

- a short map title and description from `src/content/site.ts`;
- a decorative responsive SVG visual;
- a semantic HTML list of the five capability nodes.

## 9. QA Rubric Self-Score

Score: 32 / 33  
Decision: Accept candidate

| Category | Score | Notes |
|---|---:|---|
| GTG identity | 3 | Uses charcoal field, warm-white topology lines, neutral grid, and red angular intervention marker. |
| Proof value | 2 | Clarifies service breadth but does not add new proof claims. |
| Asset feasibility | 3 | Static local SVGs plus HTML/CSS only. |
| Accessibility | 3 | SVGs have title/desc and the page includes a semantic HTML list. |
| Claim safety | 3 | No metrics, vendor/customer logos, partner, certification, or outcome wording. |
| Logo handling | 3 | No customer or vendor logos are used. |
| Reference originality | 3 | Uses GTG-owned topology primitives instead of copied reference or vendor UI. |
| Motion restraint | 3 | Static map, no motion requirement. |
| Mobile resilience | 3 | Dedicated mobile SVG and visible HTML list. |
| Maintainability | 3 | Content-driven node model and reusable topology assets. |
| Performance | 3 | Lightweight local SVGs, no scripts, no WebGL outside Hero. |

## 10. Baseline Confirmation

This task does not intentionally modify:

- Hero WebGL geometry;
- Hero camera, FOV, ring radius, orbit, pullback, or handoff;
- Customer Card System;
- Solution pinned motion;
- Header, Contact, or Footer structure;
- customer logos;
- existing topology kit SVG file contents;
- existing solution procedural assets;
- WebGL scope.

## 11. Remaining Approval Items

- Final visual approval for the Capability Map placement in the Company section.
- Final approved GTG brand red value.
- Confirmation whether the Capability Map should later appear in proposal or deck templates.
- Optional review of the English structural labels if GTG wants Korean labels in final production assets.
