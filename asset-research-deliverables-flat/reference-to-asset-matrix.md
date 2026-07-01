# GTG Reference-to-Asset Matrix

Status: working matrix  
Date: 2026-06-30  
Source detail: `docs/reference-asset-research.md`
Unique asset recommendations: `docs/gtg-unique-asset-recommendations.md`
Risk register: `docs/gtg-asset-risk-register.md`

## Purpose

This matrix connects external reference families to GTG-owned assets. It is a guard against copying reference visuals directly.

## Matrix

| Reference Family | Useful Pattern | GTG-Owned Asset | Format | Priority | Copy Risk |
|---|---|---|---|---:|---|
| Customer proof / B2B SaaS | Logo proof, industry grouping, customer trust | Customer Card System, Industry Proof Grid | SVG frame, PNG/WebP, HTML/CSS | 1 | Low if logos are used in GTG-owned frames and names remain semantic. |
| Data platform websites | Data movement, analytics layers, platform capability maps | GTG Capability Map, Data & Analytics Topology | SVG + semantic text | 3 | Medium; avoid vendor product motifs and fake product UI. |
| Streaming platforms | Event flow, signal path, stream/connect/query | Data Streaming Topology, Signal Motif | SVG path + CSS/GSAP | 4 | Medium; avoid Kafka/Confluent-specific marks and copy. |
| Infrastructure automation | Nodes, provisioning states, policy layers, multi-cloud topology | Infrastructure Automation Topology, Platform Golden Path | SVG | 5 | Medium; avoid HashiCorp/Azure/Google icon language. |
| DORA / DevOps quality | Delivery flow, traceability, quality gates, failure/recovery concepts | Release Confidence Matrix, Test Traceability Map | SVG + HTML labels | 6 | Low if no fake metrics are shown. |
| Observability / IT operations | Trace/metric/log correlation, service dependency, incident path | Diagnostic Topology, Signal Correlation Map | SVG | 7 | Medium; avoid product dashboards. |
| Consulting/SI | Capability clarity, engagement flow, client proof | Capability Map, Engagement Flow Map, Industry Proof Grid | SVG + HTML | 2 | Low if scale/partner/certification claims are not invented. |
| Brand identity systems | Official logo masters, color documentation, reusable templates | Brand Master Assets, Visual Motif Palette, OG/Deck System | SVG, PNG/WebP, docs | 0 | Low if based on approved GTG brand sources. |
| Design systems | Accessibility, data visualization clarity, reusable primitives | GTG Topology SVG Kit, GTG Primitives | SVG | 2 | Low if used as principles only. |
| Image / SVG accessibility | Decorative vs informative image treatment, alt text, clear-space rules | Customer Logo Audit, QA Rubric, Accessible Diagram Rules | Docs + SVG/HTML patterns | 1 | Low if meaning stays in semantic HTML and logos are preserved. |
| Motion systems | Purposeful motion, attention guidance, reduced alternatives | GTG Motion Motif | SVG/CSS/GSAP | 8 | Medium; avoid adding motion where static proof is stronger. |
| WebGL/creative sites | 3D carousel grammar and spatial reveal | Existing Hero ring, customer card texture composition | CanvasTexture / R3F | 9 | High if copying layout/timing/assets; only reuse interaction grammar. |

## Asset Conversion Rules

1. Convert references into primitives, not screenshots.
2. Keep GTG's palette and angular logo motif as the identity source.
3. Prefer SVG for diagrams and HTML for meaning.
4. Use CanvasTexture only for the approved Hero media.
5. Use customer logos as proof, not decoration alone.
6. Do not use vendor product icons as GTG-owned assets.
7. Do not invent metrics or case outcomes.
8. Avoid motion-only proof.
9. Preserve customer logo clear space and original proportions.
10. Keep official brand color and logo variants documented separately from provisional samples.

## Best Conversion Candidates

0. Brand identity references -> `Brand Master Assets` and documented visual motif rules.
1. Customer proof references -> `Customer Card System`.
2. Design system/topology references -> `GTG Topology SVG Kit`.
3. Consulting/SI capability references -> `GTG Capability Map`.
4. Observability references -> `Diagnostic Topology`.
5. DORA/platform references -> `Release Confidence Matrix` and `Platform Golden Path`.

## Lowest-Value Conversions

1. Awwwards-style generic WebGL effects.
2. AI gradient backgrounds.
3. Fake dashboard mockups.
4. Vendor logo collages.
5. Large full-screen bitmap artwork before SVG masters are approved.
