# GTG Reference Research Final Report

Status: final after 3-hour research goal  
Date: 2026-06-30  
Research index: `docs/asset-research-index.md`
Evidence base: `docs/reference-asset-research.md`  
Decision summary: `docs/reference-asset-ranking.md`  
Production prompts: `docs/asset-production-prompts.md`  
Completion audit: `docs/reference-research-completion-audit.md`
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
Final response source notes: `docs/final-response-source-notes.md`

## Executive Decision

GTG should build a proof-and-systems visual identity, not a generic WebGL/AI visual identity.

Generated assets should pass the QA rubric before they are treated as baseline site assets.

The highest-value direction is:

```txt
Confirmed customer proof
  + GTG angular red motif
  + technical topology diagrams
  + compact capability/engagement maps
  + restrained, accessible motion
```

## Final Ranking Draft

| Rank | Asset Package | Decision |
|---:|---|---|
| 1 | Customer Card System | Build first. Highest immediate identity and proof value. |
| 2 | GTG Topology SVG Kit | Build second. Core long-term GTG visual language. |
| 3 | GTG Capability Map | Build third. Explains service breadth clearly. |
| 4 | Industry Proof Grid | Build fourth. Turns customer logos into a credible static proof section. |
| 5 | Engagement Flow Map | Build fifth. Makes GTG feel like a practical technical partner. |
| 6 | Service Icon Family | Build after topology primitives are approved. |
| 7 | OG/Social Image Package | Build after card/topology direction is approved. |
| 8 | GTG Motion Motif | Build as restrained polish after static assets. |
| 9 | Full-screen Bitmap Backgrounds | Hold until SVG masters are approved. |
| 10 | Generic 3D Abstract Assets | Reject for now. |

## Top 5 For GTG Identity

1. Customer Card System  
   This is the most immediately unique asset because it uses GTG's confirmed customer proof and makes the approved Hero ring feel specific to GTG.

2. GTG Topology SVG Kit  
   This should become the site's long-term visual language: data flow, stream paths, infrastructure nodes, release quality, and support diagnostics.

3. Capability Map  
   This gives GTG a reusable consulting/SI visual that explains the whole service structure without inventing metrics or case outcomes.

4. Industry Proof Grid  
   This turns customer logos into a calm proof section. It should wait for logo normalization and approved grouping labels.

5. Engagement Flow Map  
   This makes GTG feel like a delivery partner by showing how discovery, implementation, quality, handoff, and support connect.

## Why This Ranking

Customer Card System ranks first because:

- Uses confirmed customer proof.
- Works with the already approved Hero ring.
- Can support fallback, reduced-motion, proof grid, and OG image.
- Low risk compared with new 3D effects.

GTG Topology SVG Kit ranks second because:

- Gives Solution sections a reusable technical visual identity.
- Works outside WebGL.
- Can be animated lightly with GSAP and remain static for reduced motion.

GTG Capability Map and Engagement Flow Map rank highly because:

- Consulting/SI references consistently rely on capability clarity and delivery model clarity.
- These assets help GTG look like a technical partner, not just a visual tech demo.

Industry Proof Grid ranks highly because:

- Customer proof is stronger when grouped by industry and presented semantically.
- A static proof grid is more accessible and credible than a motion-only logo carousel.

Generic 3D ranks last because:

- It is weakly connected to GTG's real identity.
- It adds performance and QA cost.
- It risks looking like a generic technology template.

## Reference Families Used

Enterprise data/platform:

- Confluent
- Databricks
- Snowflake
- Fivetran
- Aiven
- Redpanda
- Astronomer
- MongoDB
- Cloudera

Consulting/SI:

- Thoughtworks
- EPAM
- SHI
- Accenture
- Capgemini
- NTT DATA
- Red Hat Consulting
- MegazoneCloud
- Bespin Global
- LG CNS
- Samsung SDS

Observability / support / operations:

- Grafana
- Elastic
- Splunk
- Dynatrace
- New Relic
- ServiceNow
- CloudQuery

DevOps / platform / governance:

- DORA
- CNCF Platform Engineering
- OpenTelemetry
- Data Mesh

Design systems / accessibility / motion:

- IBM Design Language
- IBM Carbon
- Frontify
- McGill Visual Identity
- USWDS
- W3C WAI
- Section508.gov
- data.europa.eu SVG accessibility
- MDN
- Adobe Spectrum
- Microsoft Azure architecture icons
- Google Cloud icons
- Atlassian motion

Implementation references:

- Three.js CanvasTexture
- Three.js TextureLoader
- Next.js public assets
- GSAP ScrollTrigger

## Key Source Links

- Databricks customers: https://www.databricks.com/customers
- Snowflake customers: https://www.snowflake.com/en/customers/
- Confluent customers: https://www.confluent.io/customers/
- IBM Design Language: https://www.ibm.com/design/language/
- Carbon Design System: https://carbondesignsystem.com/
- Frontify visual identity guide: https://www.frontify.com/en/guide/visual-identity
- McGill visual identity guide: https://www.mcgill.ca/visual-identity/visual-identity-guide
- Carbon Motion: https://carbondesignsystem.com/elements/motion/overview/
- Atlassian Motion: https://atlassian.design/foundations/motion/
- USWDS data visualization: https://designsystem.digital.gov/components/data-visualizations/
- W3C WAI images tutorial: https://www.w3.org/WAI/tutorials/images/
- W3C WAI complex images: https://www.w3.org/WAI/tutorials/images/complex/
- Section508.gov alternative text: https://www.section508.gov/create/alternative-text/
- Data.europa.eu accessible SVG and ARIA: https://data.europa.eu/apps/data-visualisation-guide/accessible-svg-and-aria
- Three.js CanvasTexture: https://threejs.org/docs/#api/en/textures/CanvasTexture

## Prepare First

1. `public/brand/gtg-logo.svg`
2. `public/brand/gtg-logo-inverse.svg`
3. `public/brand/favicon.svg`
4. `public/brand/apple-touch-icon.png`
5. Approved GTG red accent value

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

- Customer case-study tiles until approved case copy exists.
- Full-screen bitmap exports until SVG masters are approved.
- Vendor-logo capability diagrams unless partner/endorsement language is approved.
- Data governance/product map until GTG approves data governance/data product language.

## Reject

- Generic 3D particle fields.
- Purple/blue AI gradient visuals.
- Fake dashboard screenshots.
- Vendor icon collage.
- Motion-only proof carousel.

## Open Questions

- Should Hero show all 18 customers or a curated subset?
- Should the customer card label be `GTG CUSTOMER`, `REPRESENTATIVE CUSTOMER`, or omitted?
- Are SVG versions of customer logos available?
- Is the official GTG logo SVG available?
- What is the approved GTG red accent value?
- Is there an approved inverse logo and favicon set?
- Should the proof grid use English labels only or Korean/English labels?
- Which industry grouping labels are approved for public use?

## Finalization Checklist

Completed before marking the research goal complete:

- Confirm goal elapsed time is at least 3 hours. Confirmed at 10,833 seconds.
- Re-check `docs/reference-research-completion-audit.md`.
- Confirm final ranking is internally consistent.
- Confirm all reference sources are listed.
- Confirm asset feasibility is covered for SVG, CanvasTexture, PNG/WebP, HTML/CSS, GSAP, reduced-motion, and fallback.
- Confirm local document references resolve.
- Confirm no accidental `TODO`, `TBD`, or lorem placeholder text remains in the research deliverables.
- Confirm no external image hotlinks are introduced by the asset recommendations.
- Confirm final response includes the top-ranked assets and what to build first.

Final check result:

- Local document reference check: pass.
- Placeholder search: pass; only checklist text mentions `TODO`, `TBD`, and lorem.
- External image hotlink search: pass.
- `git diff --check`: pass with existing CRLF warnings on modified source files.
