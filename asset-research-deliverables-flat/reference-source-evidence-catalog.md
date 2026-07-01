# GTG Reference Source Evidence Catalog

Status: working evidence catalog  
Date: 2026-06-30  
Research log: `docs/reference-asset-research.md`  
Ranking: `docs/reference-asset-ranking.md`  
Reference-to-asset matrix: `docs/reference-to-asset-matrix.md`

## Purpose

This catalog records why each reference family matters and what GTG can safely convert into original assets. It is not a list of visuals to copy.

## Evidence Catalog

| Source Family | Representative Sources | Evidence Used | GTG Asset Decision | Confidence |
|---|---|---|---|---|
| Enterprise data streaming | Confluent, Redpanda | Data-in-motion, event flow, connect/query/control patterns. | Build `gtg-data-streaming.svg` and signal-line motifs. | High |
| Data platform / analytics | Databricks, Snowflake, Cloudera, MongoDB | Customer proof, industry/customer-story structures, data platform framing, analytics/platform capabilities. | Build Data & Analytics topology and capability map; use customer proof structure but avoid unapproved outcome metrics and fake dashboards. | High |
| Data movement / orchestration | Fivetran, Astronomer | Source-to-destination movement, orchestration path, pipeline framing. | Use flow/handoff path primitives in capability map and engagement flow. | Medium-high |
| Infrastructure automation / platform | HashiCorp, CNCF Platform Engineering, Red Hat | Nodes, platform paths, golden paths, reusable capabilities. | Build infrastructure topology and `gtg-platform-golden-path.svg`. | High |
| DevOps quality | DORA, Azure DevOps traceability | Delivery flow, traceability, quality gates, recovery/failure concepts. | Build release-confidence matrix and test-traceability map without fake metric values. | High |
| Observability / support | Grafana, Elastic, Splunk, Dynatrace, New Relic, ServiceNow, OpenTelemetry | Telemetry signals, dependency maps, service topology, trace/metric/log correlation. | Build diagnostic topology and signal-correlation map. | High |
| Consulting / SI | Thoughtworks, EPAM, SHI, Accenture, Capgemini, NTT DATA, Deloitte | Capability maps, engagement models, industry/service proof, case-study structures. | Build capability map, engagement flow map, and industry proof grid. | High |
| Korean cloud/SI context | MegazoneCloud, Bespin Global, LG CNS, Samsung SDS | Local enterprise/SI proof structures, service breadth, customer cases, partner ecosystem framing, industry/service navigation. | Use structure only: customer proof, service breadth, capability map, and delivery/support flow. Avoid partner-tier/certification/global-scale claims. | Medium-high |
| Design systems | IBM Carbon, IBM Design Language, Frontify, McGill, Digital.gov, USWDS, Microsoft Azure architecture icons, Google Cloud icons | Reusable primitives, visual identity documentation, accessible data visualization, diagram/icon usage constraints. | Build GTG primitives, topology kit, reusable proof templates, and documentation; do not use vendor icons as GTG assets. | High |
| Motion systems | IBM Carbon Motion, Atlassian Motion, WCAG, MDN `prefers-reduced-motion` | Purposeful motion, reduced/static alternatives, pause/stop/hide requirements. | Keep motion restrained; static assets remain the primary identity system. | High |
| SVG / image accessibility | W3C WAI decorative/complex images, Section508.gov alt text, data.europa.eu accessible SVG, MDN aria-hidden, MDN SVG title, USC logo alt text, UB clear space | Decorative vs informative image handling, SVG title/desc strategies, concise logo alternatives, logo clear-space rules. | Keep customer names in HTML; hide decorative frames; preserve customer logo clear space; provide text equivalents for meaningful diagrams. | High |
| WebGL implementation | Three.js CanvasTexture, TextureLoader, Next.js public assets | Canvas-generated textures and local public assets are feasible. | Use CanvasTexture only for Hero customer cards; keep other assets SVG/HTML/CSS. | High |

## Evidence-to-Ranking Notes

Why `Customer Card System` stays #1:

- Customer proof is confirmed.
- It upgrades the existing approved Hero without changing geometry.
- It can reuse local PNGs and GTG-owned framing.
- It supports fallback, reduced-motion, proof grid, and OG assets.

Why `GTG Topology SVG Kit` stays #2:

- Multiple source families support technical diagrams as the best representation of data, infrastructure, quality, and support.
- SVG is accessible, reusable, and compatible with the "WebGL only in Hero" constraint.

Why `GTG Capability Map` stays #3:

- Consulting/SI references repeatedly use capability clarity and service taxonomy.
- It explains GTG better than another decorative image.

Why `Industry Proof Grid` stays #4:

- Enterprise and consulting references consistently use customer proof and industry grouping.
- Static proof is more accessible than a motion-only logo carousel.

Why `Generic 3D Abstract Assets` remain rejected:

- They have weak proof value.
- They add QA/performance risk.
- They do not express GTG's customer, data, infrastructure, or support identity.

## Asset Safety Notes

Use:

- GTG-owned frames.
- GTG palette and angular red motif.
- Semantic HTML for names and labels.
- Customer logo clear space and original proportions.
- SVG primitives and static fallback.

Avoid:

- Vendor icon collage.
- Fake dashboard screenshots.
- Unapproved metrics or case outcomes.
- Unapproved partner-tier/certification/scale claims.
- Motion-only proof content.
