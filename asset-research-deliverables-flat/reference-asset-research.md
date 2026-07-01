# GTG Reference and Asset Research

Status: ongoing research log  
Date: 2026-06-30  
Scope: GTG homepage identity assets, Hero media language, customer proof visuals, and feasible implementation paths.
Decision summary: `docs/reference-asset-ranking.md`  
Production prompts: `docs/asset-production-prompts.md`
Completion audit: `docs/reference-research-completion-audit.md`
Unique asset recommendations: `docs/gtg-unique-asset-recommendations.md`
Scorecard: `docs/gtg-asset-scorecard.md`

## Executive Summary

The strongest asset direction for GTG is not a new decorative 3D style. It is a proof-and-systems visual language built from:

1. GTG's confirmed customer logos.
2. GTG's angular red logo motif.
3. GTG's service domains: data, streaming, infrastructure automation, DevOps quality, consulting, and support.

Current recommendation:

1. Build a `Customer Card System` first.
2. Build a `GTG Topology SVG Kit` second.
3. Build a `GTG Capability Map` third.
4. Build an `Industry Proof Grid` after customer logo normalization.
5. Add `Engagement Flow Map` and restrained `GTG Motion Motif` after the static identity assets are approved.
6. Avoid generic 3D particles, fake dashboards, purple AI gradients, and vendor-logo collages.

Why this direction:

- It uses real GTG proof.
- It works with the already approved Hero motion.
- It keeps WebGL limited to Hero.
- It can be produced locally as SVG, PNG/WebP, CanvasTexture, HTML, CSS, and GSAP.
- It avoids unsupported claims about performance, partner tiers, or customer outcomes.

## Research Goal

Find references that can help GTG look more distinctive without copying another site's image, layout, timing, source, copy, or brand system. Each reference is evaluated for whether it can become a GTG-owned asset system.

The current GTG baseline already has:

- WebGL Hero ring / cylindrical media carousel.
- Customer logo PNG assets in `public/generated/customer-logos/`.
- User-confirmed customer relationship for the logo assets.
- Five Solution sections.
- Warm white, charcoal, black, neutral gray, and restrained red accent.
- Reduced-motion and fallback requirements.

The current GTG logo has a strong angular red monogram. Its diagonal/prismatic structure can inform GTG-owned frames, nodes, and active-state markers without turning the page into a logo wallpaper.

This research therefore focuses on assets that deepen GTG identity rather than changing the approved interaction baseline.

## Evaluation Criteria

Score each direction from 1 to 5.

- Brand fit: Does it feel right for GTG's enterprise data, infrastructure, and consulting identity?
- Asset feasibility: Can we create it locally as SVG, CanvasTexture, WebP/PNG, CSS, or Three.js without relying on external assets?
- Motion fit: Can it work with the current Hero ring and Solution transitions?
- Differentiation: Does it make GTG feel less generic?
- Maintenance: Can future content changes be handled without rebuilding everything?

Weighted score used for ranking:

```txt
Weighted Score =
  Brand fit * 0.30
+ Asset feasibility * 0.20
+ Motion fit * 0.15
+ Differentiation * 0.20
+ Maintenance * 0.15
```

Reasoning:

- Brand fit and differentiation receive the most weight because the user asked for assets that express company identity.
- Feasibility matters because the final output must become local assets, not only visual inspiration.
- Motion fit matters because the approved Hero/Solution motion should not be redesigned.
- Maintenance matters because customer logos and service content may change later.

## Reference Shortlist

| Rank | Direction | Source References | GTG Asset Opportunity | Scores | Verdict |
|---:|---|---|---|---|---|
| 1 | Customer proof cards inside the Hero ring | Current GTG customer PNGs; B2B customer-logo-wall conventions | Build a GTG-owned customer-card frame system for Hero, fallback, and later proof sections. | Brand 5 / Feasibility 5 / Motion 5 / Differentiation 4 / Maintenance 5 = 4.80 | Highest priority. Already partially implemented and can become a strong identity asset. |
| 2 | Technical topology visual system | Google Cloud architecture diagrams, IBM data visualization guidance, Grafana/Elastic observability-style product visuals | Create service-specific abstract diagrams: data grid, stream flow, infra mesh, release matrix, diagnostics map. | Brand 5 / Feasibility 5 / Motion 4 / Differentiation 5 / Maintenance 4 = 4.70 | Best way to make GTG feel like a technical consulting firm rather than a generic corporate page. |
| 3 | Data streaming signal motif | Confluent data streaming category language; event pipeline visuals | Use directional lines, pulses, offsets, and queue-like segments as a recurring motif across Hero cards and Solution backgrounds. | Brand 5 / Feasibility 5 / Motion 5 / Differentiation 4 / Maintenance 4 = 4.65 | Strong GTG fit because one of the core services is data streaming. |
| 4 | Infrastructure node mesh motif | HashiCorp infrastructure automation category language; cloud provisioning diagrams | Build a structured node/mesh asset that suggests infrastructure state, policy, and provisioning without copying vendor art. | Brand 5 / Feasibility 5 / Motion 4 / Differentiation 4 / Maintenance 4 = 4.45 | Useful for both Solution 03 and the company overview. |
| 5 | Data intelligence / analytics layered grid | Databricks and Snowflake category websites; analytics dashboard grammar | Make layered data planes, query paths, and chart topology backgrounds for Data & Analytics. | Brand 5 / Feasibility 4 / Motion 4 / Differentiation 3 / Maintenance 4 = 4.10 | Important but must avoid looking like a generic dashboard screenshot. |
| 6 | Minimal product UI traces | Grafana, Elastic, observability and dashboard products | Create non-product-specific UI traces: panels, charts, status rows, log lines, matrix states. | Brand 4 / Feasibility 5 / Motion 3 / Differentiation 3 / Maintenance 5 = 4.00 | Good support layer, but should not dominate Hero. |
| 7 | Editorial case-study proof tiles | Enterprise SaaS customer proof sections | Later build customer/industry tiles: public, finance, healthcare, enterprise. | Brand 4 / Feasibility 4 / Motion 2 / Differentiation 4 / Maintenance 3 = 3.55 | Good for a later proof section, not urgent for Hero. |
| 8 | 3D abstract objects | Generic WebGL / Awwwards-style abstract objects | Could build torus, particles, or glass-like objects, but risk generic tech-site feel. | Brand 2 / Feasibility 3 / Motion 4 / Differentiation 2 / Maintenance 2 = 2.50 | Low priority. Avoid unless tied to actual GTG data/infrastructure motif. |

## Reference Notes

### 1. Customer Proof Cards

The strongest current direction is to turn customer logos into a custom GTG card system rather than a normal logo wall.

Recommended GTG-owned assets:

- `customer-card-frame.svg`: a reusable technical frame.
- `customer-card-1200x480.png`: export size for Hero/WebGL cards.
- `customer-card-mask.svg`: optional rounded rectangular mask.
- `customer-logo-index.json` or typed content array.
- One high-resolution or SVG logo per customer when available.

Design rules:

- Keep the logo centered on a warm-white field.
- Use charcoal frame and subtle grid lines outside the white logo field.
- Use one small red signal mark, not decorative glow.
- Do not over-animate logos.
- Preserve customer names in semantic HTML outside Canvas.

Asset feasibility:

- Already feasible with current `CanvasTexture` path.
- Can also pre-render to WebP/PNG if runtime canvas image loading becomes fragile.
- Fallback can use normal `<Image>` with `object-fit: contain`.

### 2. GTG Technical Topology Visual System

This should become the signature visual language for Solution sections and supporting cards.

Asset set:

- `gtg-topology-data-analytics.svg`
- `gtg-topology-data-streaming.svg`
- `gtg-topology-infrastructure.svg`
- `gtg-topology-devops-quality.svg`
- `gtg-topology-consulting-support.svg`

Visual grammar:

- Warm-white diagram lines on charcoal/black.
- Red accent only for active nodes or handoff points.
- Dense but readable grids.
- No neon, purple gradient, glassmorphism, or stock cloud imagery.
- Diagrams should feel generated from systems, not decorative wallpaper.

Implementation:

- Primary: SVG backgrounds plus CSS masks.
- Motion: GSAP can animate stroke-dashoffset, opacity, and small node pulses.
- Reduced motion: static SVG.
- WebGL: not needed outside Hero.

### 3. Data Streaming Signal Motif

This motif can connect Hero motion to Solution 02 and engagement flow.

Assets:

- Flow line SVG symbols.
- Event pulse sprites or CSS keyframes.
- Directional queue segments.
- Small red active-event dot.

Implementation:

- SVG path animation for desktop.
- Static path plus highlighted nodes for reduced motion.
- CSS-only fallback.

### 4. Infrastructure Automation Mesh

This direction fits HashiCorp-like concepts without copying HashiCorp visuals.

Assets:

- Node topology grid.
- Provisioning state layers.
- Policy/secret/cluster abstract icons.
- Structured mesh background.

Implementation:

- SVG symbols are enough.
- Use deterministic generated patterns so future pages can reuse the same mesh.

### 5. Analytics Layered Grid

Analytics needs to avoid becoming a fake dashboard screenshot. The better direction is a chart topology with layers.

Assets:

- Layered grid.
- Query path line.
- Aggregation node cluster.
- Minimal chart lines.

Implementation:

- SVG and Canvas can both work.
- For Solution full-screen backgrounds, export WebP/PNG from SVG if performance matters.

## Technical Feasibility

Current project supports the required implementation paths:

- Next.js public assets can serve local PNG/SVG files from `public/`.
- Three.js `CanvasTexture` can turn generated canvas drawings into Hero plane textures.
- Three.js image textures remain an option if we want direct `TextureLoader` use later.
- Fallback and reduced-motion can use semantic HTML plus static images.
- GSAP and CSS can animate SVG strokes outside WebGL.

Preferred production approach:

1. Keep WebGL only in Hero.
2. Use local SVG/PNG/WebP only.
3. Generate Hero card textures from local assets.
4. Use SVG for Solution diagrams.
5. Export large Solution backgrounds to WebP when final visuals are approved.

## Asset Format Feasibility Matrix

| Asset Type | Best Master Format | Runtime Format | Why | Avoid |
|---|---|---|---|---|
| Hero customer cards | SVG frame + original PNG/SVG logo | CanvasTexture in WebGL; `<Image>` for fallback | Keeps approved Hero geometry while allowing GTG-owned card composition. | Directly mapping many raw logos to planes without a shared frame. |
| Customer proof grid | PNG/SVG logos + semantic HTML | HTML/CSS grid | Accessible, stable, easier to maintain than an animated carousel. | Motion-only logo proof or canvas-only logos. |
| Solution topology diagrams | SVG | SVG background or inline SVG | Crisp, scalable, animatable with GSAP, easy reduced-motion fallback. | Raster-only diagrams before final art approval. |
| Data streaming signal motif | SVG primitives | SVG/CSS/GSAP | Stroke animation is lightweight and controllable. | Shader effects or particles outside Hero. |
| Capability map | SVG | SVG + semantic text list | Diagram can be visual while capability labels remain accessible. | Dense architecture charts that are unreadable on mobile. |
| Engagement flow map | SVG | HTML steps + decorative SVG connector | Good for responsive layouts and screen readers. | Putting process text only inside an image. |
| OG image | SVG composition source | 1200x630 PNG/WebP export | Social platforms need raster image; source should stay editable. | Auto-generated screenshot with hidden prototype markers. |
| Brand logo | SVG | SVG with PNG fallback if needed | Necessary for crisp header/footer/favicon variants. | Relying only on current large PNG. |
| Full-screen backgrounds | SVG master | WebP/PNG export after approval | Good performance for complex large visuals. | Premature bitmap painting that cannot be edited later. |

Recommended authoring order:

1. Define primitives in SVG.
2. Use primitives to compose topology/customer frames.
3. Use those assets in HTML/CSS and CanvasTexture.
4. Export raster only where the platform requires it.

Accessibility authoring rules:

- If an image is purely decorative and adjacent text already conveys the information, hide it from assistive tech.
- If a customer logo is used as proof, keep the customer name in semantic HTML outside Canvas.
- If an SVG diagram conveys relationships, provide a short textual equivalent nearby.
- Do not rely on color alone for active/inactive states.
- Do not animate essential information unless a static equivalent is also available.

## Reference Interpretation Notes

The following sources are not to be copied. They inform the type of asset system GTG should own.

| Source | Useful Pattern | What GTG Should Reinterpret | What To Avoid |
|---|---|---|---|
| Confluent | Data streaming as a platform story; strong use of customer stories and event-driven language. | Directional signal lines, event pulses, data-in-motion cards. | Vendor colors, exact diagrams, copy, Kafka-specific marks. |
| HashiCorp | Infrastructure automation and multi-cloud vocabulary. | Structured node meshes, provisioning states, policy-like layers. | Copying product icon style or IBM/HashiCorp palette. |
| Databricks | Data/AI platform framing. | Layered data planes and intelligence map metaphors. | Generic AI-gradient visuals or notebook screenshots. |
| Snowflake | Data cloud category language. | Clean, modular data platform diagrams. | Snowflake-specific cloud/snowflake motifs. |
| Fivetran | Source-to-destination data movement, connector catalog, customer proof, industry/use-case grouping. | A GTG data movement strip showing source, processing, analytics, automation, and support handoffs. | Copying connector logos as GTG capabilities or using unverified performance claims. |
| Aiven | Managed open-source data platform framing across Kafka, PostgreSQL, ClickHouse, OpenSearch, metrics, and Grafana. | A compact "managed data platform map" visual for service breadth. | Using third-party product marks as GTG icons or implying unsupported services. |
| Redpanda | Real-time data plane, governance/control, streaming/connect/query triad. | Stronger Data Streaming motif: stream, connect, query, control. | "Agentic AI" positioning unless GTG approves that narrative. |
| Astronomer | Orchestration framing for data and agent workflows. | Pipeline/orchestration path motif for engagement model and delivery sequence. | Apache Airflow-specific marks or product imitation. |
| DORA / Google Cloud DevOps research | Software delivery performance framing using deployment frequency, lead time for changes, change failure rate, and failed deployment recovery time. | A GTG release-confidence / quality-flow asset that visualizes delivery health without inventing GTG metrics. | Showing fake performance numbers or implying measured outcomes without approved data. |
| CNCF Platform Engineering | Internal developer platform concepts, golden paths, paved roads, and platform capabilities that reduce cognitive load. | Infrastructure Automation and DevOps assets can show a platform path / paved-road topology. | Claiming a platform product or maturity level GTG has not approved. |
| OpenTelemetry | Standardized telemetry signals: traces, metrics, logs, and context propagation. | Signal-correlation map for Technical Support and DevOps Quality. | Product UI screenshots or implying GTG operates a specific observability stack. |
| Data Mesh | Domain-oriented data ownership, data products, self-serve infrastructure, and federated governance. | A Data & Analytics / Data Streaming capability map can show domains, products, platform, and governance as abstract primitives. | Data mesh consulting claims unless approved. |
| Thoughtworks | Capability mapping and enterprise architecture framing for aligning business capabilities, journeys, and technology. | GTG capability map that connects service domains to delivery/operation flow. | Copying Thoughtworks consulting language or using broad transformation claims. |
| EPAM | Consulting/engineering homepage with client work, industries, and customer results. | Balance technical identity with client proof and service breadth. | Unverified global scale metrics, industry claims, or case-study outcomes. |
| SHI | Systems integrator language around selecting, deploying, managing, consulting, assessment, and reducing complexity. | Show GTG as a practical implementation/support partner, not only a visual tech studio. | Over-claiming procurement, managed services, or scale. |
| Accenture | Broad capability and industry navigation, case-study cards, recognition modules, and explicit carousel pause controls. | Use motion with controls/accommodation and pair proof with focused capability categories. | Global-scale claims, AI/reinvention positioning, or copying editorial card style. |
| Capgemini | Industry-first and services-first navigation; portfolio language that adapts to client needs; technology partners link. | Create a compact GTG services + industries visual that stays factual. | Over-expanding into industries/services that GTG has not approved. |
| NTT DATA | Industry/service taxonomy, client cases, partner list, consultative approach, practical/scalable IT solutions. | Position GTG as a practical technical partner using capability, engagement, and proof assets. | Implying NTT-scale global capabilities or partner network. |
| Red Hat | Hybrid cloud/open-source services, consulting, customer success, and community framing. | Balance technical credibility with support/consulting proof; make GTG look like an implementation partner. | Borrowing Red Hat's open-source brand language or community claims. |
| MongoDB | Product capability, use cases, customer proof, and developer-oriented trust signals. | Use capability/use-case framing without becoming product-marketing heavy. | Database-product UI imitation or unsupported developer ecosystem claims. |
| Cloudera | Hybrid data platform, analytics/AI, customer proof, industry framing. | Reinforce the data platform + industry proof pattern for GTG. | AI platform claims unless approved. |
| MegazoneCloud | Cloud/MSP positioning with customer cases, partner ecosystem, and service portfolio. | Treat GTG proof as a structured trust section and show service breadth clearly. | Partner-tier, certification, global-scale, or MSP claims unless approved. |
| Bespin Global | Cloud operating/management services, partner ecosystems, and customer cases. | Use operational support and engagement-flow visuals for GTG support identity. | Copying cloud-provider partner ecosystem framing or implying unapproved certifications. |
| LG CNS | Enterprise DX/SI structure with solutions, industries, case studies, and technical service breadth. | Use a restrained industry proof grid and capability taxonomy. | Large-enterprise SI scale claims or case outcome numbers. |
| Samsung SDS | Enterprise IT/cloud/logistics/data/security service portfolio and customer/industry framing. | Reinforce capability-map and industry-grouping pattern for Korean enterprise context. | Product/platform imitation or broad scale claims. |
| Deloitte capability model | Capability model as a way to configure transformation roadmap and align vision, ambition, and technology-enabled change. | Use a lightweight GTG map as a clarity asset, not a management-consulting diagram overload. | Broad strategy-consulting tone that dilutes GTG's technical implementation focus. |
| Grafana | Observability and dashboard grammar. | Minimal telemetry traces, panels, status rows, alert nodes. | Product dashboard imitation. |
| Elastic | Search/observability/security category blend. | Query path, search trace, index topology. | Elastic color system and exact shape language. |
| Splunk | Observability/security/platform framing with customer proof and data-to-action language. | Use signal correlation and event-path visuals for support/quality assets. | Splunk-specific dashboard/product UI imitation. |
| Dynatrace | Observability, automation, service topology, and dependency awareness. | Build GTG diagnostic topology with service dependencies and intervention points. | AI/automation claims unless approved. |
| New Relic | Observability platform, telemetry, issue detection, and customer proof. | Use telemetry traces and incident paths as abstract support visuals. | Product UI imitation or unsupported monitoring platform claims. |
| ServiceNow | IT operations, service mapping, workflow, and operational resilience. | Use workflow/support handoff visuals for engagement and support maps. | Workflow-product look or platform partnership implication. |
| IBM / Carbon data visualization | Data viz as a governed design system. | A GTG mini data-viz system with accessible labels, texture, and contrast. | IBM blue-centric identity or their exact chart styling. |
| Google Cloud icon/diagram library | Technical diagram asset library model. | A small GTG-owned diagram kit for services and process flows. | Using Google product icons as GTG assets. |
| Codrops WebGL carousel/image demos | Interaction vocabulary and implementation ideas. | Keep current cylindrical Hero but feed it GTG-owned card assets. | Shader-heavy distortion, cursor trails, decorative 3D spectacle. |

## Source-Backed Constraints

These constraints are based on current external references and should govern asset production.

| Constraint | Evidence | GTG Decision |
|---|---|---|
| Data visuals should remain readable and accessible, not just decorative. | IBM Carbon describes Carbon Charts as a way to tell accurate stories around data with accessible visualizations. | Treat topology diagrams as content-adjacent visual systems with contrast, legible labels where needed, and static equivalents. |
| Data visuals need simplicity and equivalent access. | USWDS says data visualizations communicate patterns/relationships, recommends limiting a visualization to one central theme, using color carefully, and providing textual/accessible equivalents when information is embedded in graphics. | GTG topology SVGs should keep one idea per graphic and preserve names/relationships in semantic HTML or screen-reader text outside decorative SVG. |
| Decorative assets should stay out of the accessibility tree, while informative assets need text equivalents. | W3C WAI says decorative images do not add information and can be ignored when adjacent text already provides the information; MDN says `aria-hidden` removes non-interactive/decorative or duplicated content from the accessibility tree; MDN documents SVG `<title>` as an accessible short-text description. | Customer names should remain in HTML; decorative topology/frame SVGs should be `aria-hidden`; meaningful SVG diagrams need visible/semantic labels or `<title>/<desc>` when exposed. |
| Architecture diagrams are useful because they communicate relationships between workload components. | Microsoft Azure Architecture Center describes architecture diagrams as a way to communicate design decisions and relationships between components. | GTG topology assets should show system relationships: data source, stream, platform, automation, test, support. |
| Product icon libraries are for diagrams and documentation, but vendor product icons should not represent another company's product. | Microsoft's icon guidance says not to use Microsoft product icons to represent your product or service; Google Cloud provides official icons for diagrams. | Do not use Google/Azure/HashiCorp/Confluent product icons as GTG-owned icons. Create original primitives instead. |
| Customer proof sections are common in enterprise data platforms. | Databricks presents customer stories across industries; Snowflake frames customers as leading brands; Confluent describes customer use cases in finance, retail, manufacturing, insurance, healthcare, and more. | GTG can use customer logos as proof, but should present them in a GTG-specific frame and later group by industry. |
| Customer story pages often mix logos, industries, and numeric outcomes. | Databricks, Snowflake, and Confluent all use customer proof pages that combine broad proof with story detail. | GTG should use logos and display names now, but hold industry grouping and numeric outcomes until copy approval exists. |
| Data infrastructure pages often convert product breadth into visual maps. | Fivetran lists sources/destinations and platform capabilities; Aiven presents data tools such as Kafka, PostgreSQL, ClickHouse, OpenSearch, metrics, and Grafana; Redpanda frames streaming, connect, and SQL as a data plane. | GTG should create an original "capability map" asset rather than relying only on text lists. |
| Vendor and open-source product names need careful treatment. | Aiven explicitly notes that product/service names are for identification and do not imply endorsement. | If GTG mentions Vertica, Confluent, HashiCorp, LoadRunner, or other platforms, separate "service expertise" from partner/endorsement claims unless approved. |
| DevOps quality visuals should show traceability, not only pipeline motion. | Azure DevOps documentation frames end-to-end traceability around linked work items, branches, commits, pull requests, builds, tests, and releases. | GTG DevOps & Quality assets should show a release confidence matrix connecting requirement, build, test, defect, and release states. |
| Cloud operations/support visuals should show inventory, context, policy, automation, and failure/risk localization. | CloudQuery frames cloud operations around multi-cloud visibility, cloud asset inventory, policies, insights, and automation. | GTG Technical Support assets should use diagnostic topology maps with active fault paths, inventory context, and support actions. |
| Observability references show support as topology and signal correlation, not generic helpdesk imagery. | Splunk, Dynatrace, New Relic, Grafana, Elastic, and ServiceNow all frame observability/support around telemetry, dependencies, service mapping, incident paths, workflows, or operational context. | GTG Technical Support and DevOps Quality visuals should show traces, dependency nodes, quality gates, and support interventions rather than headset/help icons. |
| DevOps quality should be visualized as delivery flow and reliability signals, not vanity charts. | DORA research centers software delivery performance around deployment frequency, lead time for changes, change failure rate, and failed deployment recovery time. | GTG DevOps & Quality assets should use abstract release-confidence and traceability diagrams, not fake KPI numbers. |
| Platform engineering visuals should show paths and capabilities that reduce operational friction. | CNCF platform engineering guidance frames internal developer platforms around paved roads/golden paths, reusable capabilities, and reduced cognitive load. | GTG Infrastructure Automation visuals can use "paved path" and platform capability maps while avoiding product claims. |
| Telemetry is a useful support visual primitive. | OpenTelemetry defines telemetry signal categories such as traces, metrics, and logs, with context propagation across services. | GTG signal-correlation assets can show trace/metric/log/context convergence into support actions. |
| Consulting/SI sites need proof and capability clarity more than decorative spectacle. | EPAM foregrounds client work, industries, and customer results; SHI frames itself around selecting, deploying, and managing solutions to reduce complexity. | GTG should pair customer proof with capability maps and engagement-flow assets. |
| Capability maps are a known consulting/architecture visual pattern. | Thoughtworks describes emergent capability mapping as a visual tool to understand how journeys, capabilities, and technology intersect; Deloitte discusses capability models for transformation roadmaps. | GTG should use a compact capability map to communicate service breadth and delivery logic without claiming management-consulting scale. |
| Large consulting/SI sites organize proof around industries, services, client cases, and partner ecosystems. | Capgemini lists industries and services, NTT DATA lists industries/services/client cases/partners, and Accenture exposes capabilities, industries, case studies, awards, and carousel controls. | GTG should build a restrained proof section with industries and customer logos, not a generic animated logo wall. |
| Korean cloud/SI references often emphasize customer cases, partner ecosystems, and service breadth. | MegazoneCloud, Bespin Global, LG CNS, and Samsung SDS use portfolio/proof structures around cloud, enterprise IT, customer cases, or industry/service taxonomies. | GTG should borrow the structure, not the claims: customer logos, service domains, and delivery/support flow are safer than unapproved partner-tier or scale claims. |
| Auto-moving content needs restraint and user accommodation. | WCAG 2.2 SC 2.2.2 describes pause/stop/hide expectations for moving or auto-updating content; MDN documents `prefers-reduced-motion`. | Keep reduced-motion static. If customer-logo motion becomes prominent or long-running, add a pause mechanism or ensure it is not the only way to access proof content. |
| Motion should guide, clarify, and stay purposeful. | IBM Carbon says motion can guide users through complex experiences, but should be purposeful, unobtrusive, and adaptive, with simplified/reduced alternatives for motion-sensitive users and weaker devices. Atlassian describes motion as a way to clarify interactions, guide attention, and express brand consistently. | GTG motion assets should be limited to handoff, signal, and diagnostic moments. Static assets remain the primary identity system. |
| Canvas-generated textures are technically viable for WebGL Hero media. | Three.js documents `CanvasTexture`; `TextureLoader` remains an alternative for direct image texture loading. | Continue using CanvasTexture for branded card composition; consider pre-rendered static assets only if runtime loading becomes fragile. |

## Logo and Vendor Reference Guardrails

Customer logos:

- Use when the customer relationship is confirmed.
- Preserve original proportions.
- Do not recolor or distort marks.
- Place logos in GTG-owned frames rather than modifying the logo itself.
- Keep semantic customer names in HTML.
- Avoid case metrics or outcome claims unless approved.

Vendor/product references:

- Treat vendor names as service/expertise references, not endorsement.
- Do not use vendor product icons as GTG service icons.
- Do not create a collage of vendor logos as the site's primary identity.
- If a partner/certification claim is needed, require approved content before visualizing it.
- Prefer abstract GTG capability diagrams over vendor-logo diagrams.

Why:

- Microsoft trademark guidance treats brand assets as proprietary and restricts usage that implies a third-party service is a Microsoft product.
- Google partner branding guidance warns against using Google logos to imply endorsement and against modifying Google logos.
- Atlassian trademark guidance is designed to prevent dilution and misuse across partner/customer/developer ecosystems.

GTG production decision:

- Customer proof assets are allowed because the user confirmed these are GTG customers.
- Vendor identity assets remain out of GTG's core visual system unless explicit approval exists.

## Proposed Asset Specifications

### A. Hero Customer Card

Purpose: primary Hero WebGL card and fallback card.

Recommended source format:

- Master: SVG frame plus original customer logo asset.
- Runtime: CanvasTexture composition.
- Optional export: WebP/PNG for static fallback if needed.

Dimensions:

- Master card: `1200x480`.
- WebGL texture canvas: `1200x540`, with 1200x480 logo card field centered vertically or framed inside the existing card.
- Safe logo field: approximately `1012x270`.

Variants:

- Dark frame / warm-white logo field.
- Compact mobile crop.
- Reduced-motion static strip.

GTG identity hook:

- Use the logo's angular/prismatic cuts as subtle frame notches.
- Use the red accent as a small active signal, not a full gradient.
- Keep the customer logo area neutral so customer marks remain intact.

### B. GTG Topology Diagram Kit

Purpose: Solution backgrounds, section dividers, proof cards, and small icons.

Recommended source format:

- SVG first.
- Export WebP/PNG for full-screen backgrounds only after approval.

Shared primitives:

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
- Angular GTG node marker derived from the logo geometry.

Color rules:

- Base: black / charcoal.
- Line: warm white at low opacity.
- Active: red accent.
- Avoid multiple competing accent colors.

GTG identity hook:

- Nodes can use cropped/abstracted versions of the GTG monogram angle.
- Edges should feel like structured handoffs, not organic squiggles.
- Active states can use red vertical/diagonal slivers echoing the logo.

### C. Motion Motif Pack

Purpose: small repeatable motion details without adding new WebGL outside Hero.

Assets:

- `signal-line.svg`
- `node-pulse.svg`
- `handoff-dot.svg`
- `quality-gate.svg`
- `diagnostic-trace.svg`

Implementation:

- Desktop: GSAP timeline or CSS keyframes.
- Mobile: mostly static.
- Reduced motion: no pulse, no scrub, no blur.

### D. Proof Section Assets

Purpose: later customer/industry proof section.

Assets:

- Logo grid with normalized logo boxes.
- Industry grouping labels.
- Optional customer-card thumbnail.

Accessibility:

- Customer names in semantic HTML.
- Logo images decorative when names are adjacent text.
- No auto-advancing-only carousel for proof content.

## Current Customer Logo Asset Audit

Source path now used by the project: `public/generated/customer-logos/`

All current PNGs are `1200x480`, which is a strong match for the Hero card ratio. They are usable as-is for the prototype, but final polish should normalize visual weight, clear space, and background treatment.

| File | Display Name | Suggested Use |
|---|---|---|
| `01_kt.png` | KT | Hero primary rotation; proof grid |
| `02_lg-electronics.png` | LG Electronics | Hero primary rotation; proof grid |
| `03_konkuk-university-hospital.png` | Konkuk University Hospital | Healthcare proof grouping |
| `04_construction-workers-mutual-aid-association.png` | Construction Workers Mutual Aid Association | Public / association grouping |
| `05_korea-university-medicine.png` | Korea University Medicine | Healthcare proof grouping |
| `06_supreme-prosecutors-office.png` | Supreme Prosecutors' Office | Public sector grouping |
| `07_misto-holdings.png` | Misto Holdings | Enterprise grouping, pending exact category |
| `08_bithumb.png` | Bithumb | Finance / digital asset grouping |
| `09_samsung-sds.png` | Samsung SDS | Enterprise technology grouping |
| `10_samsung-electronics.png` | Samsung Electronics | Enterprise grouping |
| `11_saemaul-geumgo.png` | Saemaul Geumgo | Finance grouping |
| `12_seoul-medical-center.png` | Seoul Medical Center | Healthcare proof grouping |
| `13_shinhan-bank.png` | Shinhan Bank | Finance grouping |
| `14_ulsan-university-hospital.png` | Ulsan University Hospital | Healthcare proof grouping |
| `15_ptkorea.png` | PTKOREA | Enterprise grouping, pending exact category |
| `16_komsco.png` | KOMSCO | Public / finance infrastructure grouping |
| `17_techfin-ratings.png` | Techfin Ratings | Finance / ratings grouping |
| `18_korea-credit-information-services.png` | Korea Credit Information Services | Finance infrastructure grouping |

Customer asset polish checklist:

1. Preserve each logo's original proportions.
2. Avoid applying filters that distort official logos.
3. Normalize apparent logo height inside a shared safe area.
4. Keep the customer names in semantic HTML.
5. Use the GTG frame around logos instead of recoloring customer marks.
6. Prepare a fallback proof grid that does not rely on motion.

Suggested industry grouping:

- Public / Government: Supreme Prosecutors' Office, KOMSCO, public associations.
- Finance / Data Trust: Shinhan Bank, Saemaul Geumgo, Bithumb, Techfin Ratings, Korea Credit Information Services.
- Healthcare: Konkuk University Hospital, Korea University Medicine, Seoul Medical Center, Ulsan University Hospital.
- Enterprise / Technology: KT, LG Electronics, Samsung SDS, Samsung Electronics, PTKOREA, Misto Holdings.

These group labels are for site organization, not claims about project scope or outcomes.

## Concrete Asset Candidates

| Priority | Asset Candidate | Output Files | Creation Method | Risk |
|---:|---|---|---|---|
| 1 | Final customer-card frame | `customer-card-frame.svg`, `customer-card-mask.svg` | Hand-authored SVG based on current Hero card geometry. | Low |
| 2 | Normalized customer cards | `customer-card-{id}.webp` or runtime CanvasTexture | Compose local PNG logos into the frame. | Low |
| 3 | Proof grid component assets | `customer-proof-grid.svg`, optional industry labels | SVG/CSS grid with semantic HTML names. | Low |
| 4 | Data & Analytics topology | `gtg-topology-data-analytics.svg` | SVG lines, chart topology, query path. | Medium |
| 5 | Data Streaming motif | `gtg-signal-stream.svg`, `gtg-signal-pulse.svg` | SVG paths + CSS/GSAP stroke motion. | Low-medium |
| 6 | Infrastructure mesh | `gtg-infra-mesh.svg` | Deterministic node and edge mesh. | Medium |
| 7 | DevOps quality matrix | `gtg-quality-matrix.svg` | SVG release/test matrix. | Medium |
| 8 | Consulting support diagnostic map | `gtg-diagnostic-map.svg` | SVG graph with support nodes. | Medium |
| 9 | OG image | `og-gtg-1200x630.png` | Compose customer-card + topology motif. | Low-medium |
| 10 | Data capability map | `gtg-capability-map.svg` | Original SVG map connecting data movement, analytics, infra automation, quality, support. | Medium |
| 11 | Platform golden path map | `gtg-platform-golden-path.svg` | SVG path from request/configuration to provisioning, validation, deployment, support. | Medium |
| 12 | Data governance/product map | `gtg-data-product-governance-map.svg` | SVG domain/data-product/platform/governance abstraction. | Medium |
| 13 | Generic WebGL particle pack | N/A for now | Would require new 3D assets and extra QA. | High; not recommended |

## Production Asset Backlog

### Package 1: Customer Card System

Goal: make the current Hero customer-logo ring feel like an intentional GTG asset family.

Files:

- `public/generated/customer-cards/customer-card-frame.svg`
- `public/generated/customer-cards/customer-card-mask.svg`
- `public/generated/customer-cards/customer-card-sample.png`
- Optional generated outputs: `public/generated/customer-cards/{customer-id}.webp`

Visual recipe:

- Outer frame: charcoal, 1px warm-white stroke at low opacity.
- Inner logo field: warm white, generous clear space.
- GTG notch: small red angular marker in one corner.
- Metadata line: customer name or index, never crowded over the logo.

Implementation surfaces:

- Hero WebGL CanvasTexture.
- Mobile/reduced/fallback Hero strip.
- Future proof grid section.
- OG image composition.

Definition of done:

- Logo safe area is consistent across all 18 customers.
- Text label does not collide with long names.
- Fallback cards do not crop logos.
- Semantic customer list exists outside Canvas.

### Package 2: GTG Topology SVG Kit

Goal: create a reusable technical visual identity for the five Solution areas.

Files:

- `public/generated/topology/gtg-data-analytics.svg`
- `public/generated/topology/gtg-data-streaming.svg`
- `public/generated/topology/gtg-infrastructure-automation.svg`
- `public/generated/topology/gtg-devops-quality.svg`
- `public/generated/topology/gtg-consulting-support.svg`
- `public/generated/topology/gtg-primitives.svg`

Visual recipe:

- Background plane: black/charcoal grid.
- System nodes: small warm-white outlined modules.
- Active nodes: red angular GTG marker.
- Data paths: thin warm-white lines with one active red segment.
- Optional labels: short, uppercase technical labels only where useful.

Implementation surfaces:

- Solution background visuals.
- Company overview diagram.
- Engagement model step graphics.
- Proof/case-study cards.

Definition of done:

- Every diagram uses the same primitive library.
- Each diagram is distinguishable without relying on color alone.
- Each diagram has a short textual summary or semantic companion content when it conveys meaning.
- Reduced-motion state is identical or simpler static SVG.
- No vendor icons, vendor diagrams, or copied motifs.

### Package 2B: GTG Capability Map

Goal: make GTG's service breadth visible in one concise asset without inventing unapproved claims.

Files:

- `public/generated/topology/gtg-capability-map.svg`
- Optional mobile crop: `public/generated/topology/gtg-capability-map-mobile.svg`

Suggested structure:

```txt
Sources / Systems
  -> Data Streaming
  -> Data & Analytics
  -> Infrastructure Automation
  -> DevOps & Quality
  -> Consulting & Technical Support
```

Use cases:

- Company overview.
- Engagement model.
- Contact CTA background.
- OG image.

Rules:

- Do not use vendor logos in the map unless explicitly intended as partner/product references.
- Keep labels generic enough to avoid unsupported platform claims.
- Use GTG's angular red marker for intervention points.
- Keep the map compact enough to be read in 10 seconds.
- Do not turn it into a full enterprise architecture chart.

### Package 2C: Engagement Flow Map

Goal: express GTG as a practical consulting/implementation partner.

Files:

- `public/generated/topology/gtg-engagement-flow.svg`
- Optional mobile crop: `public/generated/topology/gtg-engagement-flow-mobile.svg`

Suggested structure:

```txt
Diagnose
  -> Design
  -> Implement
  -> Validate
  -> Operate / Support
```

Use cases:

- Engagement Model section.
- Contact CTA.
- Sales deck export later.

Rules:

- Keep it operational and technical.
- Avoid broad "digital transformation" language unless approved.
- Use customer proof nearby, but do not imply specific outcomes without case approval.

### Package 2D: Industry Proof Grid

Goal: turn the existing customer logos into a credible SI/consulting proof asset.

Files:

- `public/generated/proof/gtg-industry-proof-grid.svg`
- Optional section data: `src/content/site.ts` industry groups.

Suggested structure:

```txt
Finance / Data Trust
Public / Government
Healthcare
Enterprise / Technology
```

Use cases:

- Company section.
- Dedicated proof section after Solutions.
- Sales deck export.

Rules:

- Keep logos static or gently filtered; do not animate them as the only proof channel.
- Pair every logo image with a text name in semantic HTML.
- Do not add case metrics or outcomes without approved case content.
- Do not imply a vendor-partner ecosystem beyond approved references.

### Package 3: GTG Motion Motif

Goal: use motion sparingly to make GTG feel like a systems/integration company.

Files:

- `public/generated/motion/gtg-signal-line.svg`
- `public/generated/motion/gtg-handoff-dot.svg`
- `public/generated/motion/gtg-quality-gate.svg`
- `public/generated/motion/gtg-diagnostic-trace.svg`

Implementation surfaces:

- Solution section entrance details.
- Section divider.
- CTA hover affordances.
- Future loading/skeleton states.

Definition of done:

- No new WebGL outside Hero.
- GSAP timelines are cleaned up on unmount.
- Reduced-motion removes pulsing, path drawing, and blur.
- Mobile keeps motion mostly static.

### Package 3B: DevOps Quality and Diagnostics Assets

Goal: make DevOps & Quality and Technical Support feel specific rather than generic.

Files:

- `public/generated/topology/gtg-release-confidence-matrix.svg`
- `public/generated/topology/gtg-test-traceability-map.svg`
- `public/generated/topology/gtg-diagnostic-topology.svg`
- `public/generated/topology/gtg-signal-correlation-map.svg`
- `public/generated/topology/gtg-platform-golden-path.svg`

Visual structure:

```txt
Requirement
  -> Commit / Build
  -> Test Execution
  -> Defect / Risk
  -> Release Gate
```

Support/diagnostics structure:

```txt
Service Node
  -> Dependency
  -> Signal
  -> Suspected Fault
  -> Support Action
```

Signal correlation structure:

```txt
Event
  -> Trace
  -> Metric
  -> Log / Context
  -> Risk / Action
```

Platform path structure:

```txt
Request / Change
  -> Standard Pattern
  -> Provision
  -> Validate
  -> Deploy
  -> Operate / Support
```

Why this matters:

- It maps directly to GTG's DevOps quality and technical support services.
- It avoids fake dashboard screenshots.
- It gives the Solution sections a more credible technical texture.
- It makes support look like engineering work, not a generic customer-service illustration.
- It connects infrastructure automation with DevOps quality and support.

Rules:

- Avoid showing real customer systems or sensitive-looking incident data.
- Use abstract IDs, not fake metrics.
- Keep all claims generic unless approved.
- Do not use product screenshots from observability platforms.
- Do not show fake DORA metric values.

### Package 4: Brand Release Essentials

Goal: finalize assets required for a public release.

Files:

- `public/brand/gtg-logo.svg`
- `public/brand/gtg-logo-inverse.svg`
- `public/brand/favicon.svg`
- `public/brand/apple-touch-icon.png`
- `public/generated/og/gtg-og-1200x630.png`

Implementation surfaces:

- Header.
- Footer.
- SEO/social previews.
- Browser chrome and bookmarks.

Definition of done:

- SVG logo exists and PNG fallback remains optional.
- OG image does not use unapproved claims or metrics.
- Favicon is legible at small sizes.

## GTG Identity Motif Recommendation

The best unique motif is not a new illustration style. It is a controlled system derived from three existing facts:

1. GTG's red angular logo.
2. GTG's real customer base.
3. GTG's data/infrastructure consulting domains.

Recommended motif name: `GTG System Handoff`.

Visual principles:

- Angular red marker = active GTG intervention point.
- Warm-white grid = system context.
- Charcoal frame = enterprise-grade restraint.
- Customer logo card = proof of trust.
- Topology line = consulting/implementation path.

Where to use it:

- Hero customer cards.
- Solution SVG backgrounds.
- Engagement process steps.
- Contact CTA background.
- OG image.

Where not to use it:

- Do not turn every section into a red logo pattern.
- Do not recolor customer logos.
- Do not add generic 3D particles or neon effects.

## Decision Matrix

| Package | Identity Lift | Implementation Risk | Reuse Potential | Dependency Risk | Final Priority |
|---|---:|---:|---:|---:|---:|
| Customer Card System | 5 | 1 | 5 | 1 | 1 |
| GTG Topology SVG Kit | 5 | 2 | 5 | 1 | 2 |
| GTG Motion Motif | 4 | 2 | 4 | 1 | 3 |
| GTG Capability Map | 4 | 2 | 5 | 1 | 4 |
| Engagement Flow Map | 4 | 2 | 4 | 1 | 5 |
| Industry Proof Grid | 4 | 1 | 4 | 1 | 6 |
| Brand Release Essentials | 4 | 1 | 4 | 2 | 7 |
| Service Icon Family | 3 | 1 | 4 | 1 | 8 |
| Full-screen Bitmap Backgrounds | 3 | 3 | 3 | 2 | 9 |
| Generic 3D Abstract Assets | 2 | 4 | 2 | 3 | 10 |

Interpretation:

- Lower implementation/dependency risk is better.
- Customer cards rank first because they use real GTG customer proof and already match the approved Hero interaction.
- Topology kit ranks second because it can become the site's enduring visual language.
- Generic 3D ranks last because it adds motion/QA cost without strengthening GTG's business identity.

## Updated Ranking With Production Readiness

| Rank | Asset | Why It Wins | Production Readiness | Suggested Next Step |
|---:|---|---|---|---|
| 1 | Hero customer-card frame system | It makes the approved Hero immediately GTG-specific and uses real customer proof. | Very high | Design one final card frame and normalize all 18 logos into it. |
| 2 | GTG topology diagram kit | It becomes the site's long-term visual identity across all services. | High | Create five SVG masters, one per Solution. |
| 3 | Signal / handoff motion motif | It connects data streaming, Hero rotation, and section transitions. | High | Create 3 small SVG primitives and CSS/GSAP motion rules. |
| 4 | GTG capability map | It can explain service breadth in one reusable visual. | High | Build a generic SVG map without vendor marks. |
| 5 | Engagement flow map | It makes GTG feel like a technical partner with a clear delivery method. | High | Build Diagnose -> Design -> Implement -> Validate -> Operate SVG. |
| 6 | Industry proof grid | It turns logos into a credible page section after Hero. | High | Build static industry grouping with semantic names. |
| 7 | OG/social image package | Needed for release polish and sharing. | Medium | Use customer-card + topology motif as 1200x630 composition. |
| 8 | Service icon family | Useful but less expressive than topology diagrams. | Medium | Derive icons from the topology primitives after diagrams are approved. |
| 9 | Full-screen generated bitmap backgrounds | Visually strong but heavier to maintain than SVG. | Medium | Only export from approved SVG/diagram masters. |
| 10 | Generic 3D abstract object pack | Least connected to GTG's actual business. | Low | Do not prioritize unless a specific GTG metaphor emerges. |

## Asset Roadmap

### Phase 1: Immediate

1. Customer card frame system.
2. Customer logo normalization.
3. Hero card export spec.
4. Customer semantic list and proof copy.

Why:

- Uses already approved customer relationship.
- Makes the current Hero feel immediately more GTG-specific.
- Low implementation risk.

### Phase 2: Signature System

1. Five Solution topology SVGs.
2. One reusable GTG signal motif.
3. One service icon family.

Why:

- Builds a coherent identity across the full page.
- Gives the site assets beyond logos.

### Phase 3: Release Polish

1. OG image.
2. Final favicon and inverse logo.
3. Case-study proof tiles.
4. Industry grouping visuals.

Why:

- Needed for public release polish, but less important than the core visual language.

## Current Ranking

1. GTG customer-card system for Hero and proof sections.
2. GTG technical topology visual system.
3. Data streaming signal motif.
4. Infrastructure automation mesh.
5. Analytics layered grid.
6. Minimal product UI traces.
7. Editorial case-study proof tiles.
8. Generic 3D abstract objects.

## Next Production Sprint Recommendation

### Sprint 1: Customer Card System

Why first:

- It is the clearest GTG-specific asset because it uses actual customer proof.
- It works directly inside the approved Hero without changing geometry or motion.
- It can also power mobile fallback, reduced-motion, proof grid, and OG image.

Tasks:

1. Create a final GTG angular frame based on the red logo geometry.
2. Normalize the 18 customer logos into a shared safe area.
3. Decide Hero label copy: recommended `REPRESENTATIVE CUSTOMER`.
4. Add a non-motion proof grid below or near Company section in a later feature pass.

Do not:

- Recolor customer logos.
- Add aggressive logo animation.
- Let long customer names overflow the card.

### Sprint 2: Topology SVG Kit

Why second:

- It gives the Solution sections a proprietary visual language.
- It is cheaper and more accessible than more WebGL.
- It can be animated with GSAP on desktop and stay static in reduced motion.

Tasks:

1. Build `gtg-primitives.svg` first.
2. Derive five Solution diagrams from the primitives.
3. Use the same angular red active marker across diagrams.
4. Verify contrast on charcoal/black backgrounds.

Do not:

- Use vendor product icons.
- Create fake product screenshots.
- Add purple AI gradients or neon effects.

### Sprint 3: Motion Motif Pack

Why third:

- It gives GTG a recognizable interaction signature beyond the Hero.
- It can be subtle and reusable.

Tasks:

1. Create `signal-line`, `handoff-dot`, `quality-gate`, and `diagnostic-trace`.
2. Animate only opacity, position, stroke-dashoffset, and small scale.
3. Disable pulse/path-drawing in reduced motion.

Do not:

- Add new pinned scroll sections before content is approved.
- Add WebGL outside Hero.
- Add movement that distracts from customer proof or CTA.

## Build / Hold / Reject List

### Build Now

1. `customer-card-frame.svg`
   - Highest identity lift.
   - Works with existing Hero.
   - Low risk.

2. `customer-card-{id}` runtime composition or generated WebP exports
   - Uses existing 18 customer PNGs.
   - Makes Hero proof feel intentional.

3. `gtg-primitives.svg`
   - Foundation for every later topology diagram.
   - Should define node, active node, edge, grid, GTG angular marker, and diagnostic marker.

4. `gtg-data-streaming.svg`
   - Strong service fit.
   - Easy to animate with path/opacity.

5. `gtg-capability-map.svg`
   - Helps explain GTG service breadth in one visual.
   - Reusable in About, Contact, and OG.

### Build Next

1. `gtg-data-analytics.svg`
2. `gtg-infrastructure-automation.svg`
3. `gtg-release-confidence-matrix.svg`
4. `gtg-diagnostic-topology.svg`
5. `gtg-industry-proof-grid.svg`
6. `gtg-og-1200x630.png`

### Hold

1. Customer case-study tiles
   - Good idea, but needs approved case copy and scope.

2. Service icon family
   - Useful after topology primitives are approved.

3. Full-screen bitmap background exports
   - Should come from approved SVG masters, not be designed separately first.

### Reject For Now

1. Generic 3D particle fields
   - Weak GTG identity.
   - Adds performance and QA cost.

2. Purple/blue AI gradient hero assets
   - Off-palette and generic.

3. Fake dashboard screenshots
   - Risk of looking like an invented product UI.

4. Vendor icon collage
   - Risk of implying unsupported partnerships, endorsements, or product ownership.

5. Animated logo-wall-only proof carousel
   - Lower accessibility value than a static/semantic proof grid.

## Asset Production Briefs

### Brief 1: Customer Card System

Objective:

Create a GTG-owned customer proof card system that works inside the existing Hero WebGL ring and static fallback.

Inputs:

- 18 customer PNGs in `public/generated/customer-logos/`.
- GTG logo shape in `public/brand/gtg-logo.png`.
- Existing Hero card geometry and CanvasTexture path.

Outputs:

- `customer-card-frame.svg`
- `customer-card-mask.svg`
- optional pre-rendered `customer-card-{id}.webp`

Visual direction:

- Charcoal outer frame.
- Warm-white logo field.
- Subtle grid outside the logo field.
- One small red angular GTG marker.
- Customer name or index in restrained text.

Acceptance criteria:

- All 18 logos fit without cropping.
- Long customer names do not overflow.
- Fallback cards remain readable on mobile.
- Names exist in semantic HTML.
- No extra WebGL outside Hero.

### Brief 2: GTG Topology SVG Kit

Objective:

Create an original technical visual system for the five Solution areas.

Inputs:

- Existing Solution categories.
- GTG color tokens.
- GTG logo angular motif.

Outputs:

- `gtg-primitives.svg`
- `gtg-data-analytics.svg`
- `gtg-data-streaming.svg`
- `gtg-infrastructure-automation.svg`
- `gtg-devops-quality.svg`
- `gtg-consulting-support.svg`

Visual direction:

- Black/charcoal system plane.
- Warm-white topology lines.
- Red active intervention markers.
- One idea per diagram.
- No vendor icons.

Acceptance criteria:

- Each SVG reads at desktop and mobile sizes.
- Meaning is not dependent on color alone.
- Each meaningful diagram has adjacent semantic text or a `<title>/<desc>` strategy.
- Reduced-motion version is static.

### Brief 3: GTG Capability Map

Objective:

Explain GTG's service breadth in one concise visual.

Outputs:

- `gtg-capability-map.svg`
- optional mobile crop.

Suggested labels:

- Data & Analytics
- Data Streaming
- Infrastructure Automation
- DevOps & Quality
- Consulting & Technical Support

Visual direction:

- Left-to-right or radial handoff map.
- GTG red marker appears only at intervention points.
- No vendor logos.
- Text labels remain outside or adjacent to the SVG in HTML.

Acceptance criteria:

- Readable in 10 seconds.
- Does not imply unsupported partner status.
- Fits Company or Engagement section without becoming a dense architecture chart.

### Brief 4: Engagement Flow Map

Objective:

Show GTG as a practical technical partner with a clear delivery method.

Outputs:

- `gtg-engagement-flow.svg`

Suggested steps:

- Diagnose
- Design
- Implement
- Validate
- Operate / Support

Visual direction:

- Use the same GTG angular red marker.
- Keep flow operational, not management-consulting broad.
- Pair with existing engagement text.

Acceptance criteria:

- The text steps are real HTML.
- The SVG connector is decorative or has a concise label.
- Mobile collapses to vertical flow.

### Brief 5: Industry Proof Grid

Objective:

Convert customer logos into a credible proof section without motion dependence.

Outputs:

- `gtg-industry-proof-grid.svg` or CSS/HTML component assets.

Suggested groups:

- Finance / Data Trust
- Public / Government
- Healthcare
- Enterprise / Technology

Visual direction:

- Quiet grid.
- Customer logos in normalized cards.
- Industry label as text.
- GTG frame language, not logo recoloring.

Acceptance criteria:

- Every logo has an adjacent semantic customer name.
- Grid has no horizontal overflow on 390px mobile.
- No invented metrics, results, or case summaries.

## Production Difficulty and Branching Plan

This section translates the research ranking into parallel Codex work streams.

| Rank | Asset Package | Difficulty | Main Dependencies | Best Branch | Parallel Safety | Notes |
|---:|---|---|---|---|---|---|
| 1 | Customer Card System | Low-medium | Existing 18 PNG logos, GTG logo geometry, Hero CanvasTexture | `codex/customer-card-system` | Medium | Touches Hero media code, so keep geometry unchanged and isolate to card composition. |
| 2 | GTG Topology SVG Kit | Medium | GTG primitives, Solution categories, color tokens | `codex/topology-svg-kit` | High | Can be built mostly in `public/generated/topology` and wired later. |
| 3 | GTG Motion Motif | Medium | Topology primitives, reduced-motion rules | `codex/motion-motif-pack` | Medium | Should avoid changing approved Hero motion; use only SVG/CSS/GSAP outside Hero. |
| 4 | GTG Capability Map | Low-medium | Content labels, topology primitives | `codex/capability-map` | High | Can be standalone SVG plus semantic HTML content. |
| 5 | Engagement Flow Map | Low-medium | Existing engagement steps, topology primitives | `codex/engagement-flow-map` | High | Mostly new asset and section enhancement; low conflict risk. |
| 6 | Industry Proof Grid | Low-medium | Customer logo list, industry grouping | `codex/industry-proof-grid` | Medium | Touches content and possibly company/proof section layout. |
| 7 | OG/Social Image Package | Low-medium | Customer card frame, topology motif, final copy | `codex/og-social-assets` | High | Best after card/topology assets stabilize. |
| 8 | Service Icon Family | Low | Topology primitives | `codex/service-icons` | High | Derive after topology style is approved. |
| 9 | Full-screen Bitmap Backgrounds | Medium-high | Approved SVG masters | `codex/background-exports` | High | Do only after SVG direction is approved. |
| 10 | Generic 3D Abstract Assets | High | New 3D QA, performance checks | Do not start | Low value | Reject for now. |

Recommended parallel strategy:

1. Start `customer-card-system` and `topology-svg-kit` first.
2. Start `capability-map` once primitives are drafted.
3. Start `industry-proof-grid` after customer card safe-area decisions.
4. Delay `motion-motif-pack` until topology primitives exist.
5. Delay `og-social-assets` until card/topology direction is approved.

Files likely touched by each branch:

| Branch | Likely Files |
|---|---|
| `codex/customer-card-system` | `src/components/three/hero-canvas.tsx`, `src/components/sections/hero-fallback.tsx`, `src/content/site.ts`, `public/generated/customer-cards/*` |
| `codex/topology-svg-kit` | `public/generated/topology/*`, optional documentation |
| `codex/motion-motif-pack` | `public/generated/motion/*`, `src/app/globals.css`, section components using SVG motion |
| `codex/capability-map` | `public/generated/topology/gtg-capability-map.svg`, `src/content/site.ts`, Company/Engagement section component |
| `codex/engagement-flow-map` | `public/generated/topology/gtg-engagement-flow.svg`, `src/components/sections/engagement-model.tsx` |
| `codex/industry-proof-grid` | `src/content/site.ts`, new proof section component, `public/generated/customer-logos/*` |
| `codex/og-social-assets` | `public/generated/og/*`, `src/app/layout.tsx`, docs/release assets |

Conflict warnings:

- Do not run `customer-card-system` and another Hero refactor in parallel.
- Do not let multiple branches edit `src/content/site.ts` freely; define one content owner.
- Do not change approved Hero camera, radius, panel count, pullback, or handoff mapping during asset work.
- Do not add new WebGL outside Hero.

## Cost-Benefit Ranking Check

The identity ranking above favors brand expression. This check asks a more practical question: if we start building tomorrow, which asset gives the most visible gain per unit of implementation risk?

Scoring:

```txt
Cost-Benefit Score =
  Identity Lift * 0.30
+ Reuse Potential * 0.25
+ Proof Value * 0.20
+ Low Risk * 0.15
+ Parallel Safety * 0.10
```

Notes:

- `Low Risk` is scored high when implementation risk is low.
- `Proof Value` measures how strongly the asset supports trust, credibility, or GTG's service legitimacy.
- `Parallel Safety` measures whether another Codex branch can build it without colliding with approved Hero/Solution behavior.

| Cost Rank | Asset Package | Identity Lift | Reuse | Proof Value | Low Risk | Parallel Safety | Cost-Benefit Score | Result |
|---:|---|---:|---:|---:|---:|---:|---:|---|
| 1 | Customer Card System | 5 | 5 | 5 | 4 | 3 | 4.70 | Best first build. It is visible immediately and uses confirmed customer proof. |
| 2 | GTG Topology SVG Kit | 5 | 5 | 3 | 4 | 5 | 4.45 | Best long-term identity system. |
| 3 | GTG Capability Map | 4 | 5 | 4 | 4 | 5 | 4.30 | Strong consulting/SI clarity asset. |
| 4 | Industry Proof Grid | 4 | 4 | 5 | 5 | 3 | 4.30 | High proof value, should follow customer card normalization. |
| 5 | Engagement Flow Map | 4 | 4 | 3 | 5 | 5 | 4.05 | Low risk and good consulting identity, but less differentiating than customer proof. |
| 6 | Service Icon Family | 3 | 4 | 2 | 5 | 5 | 3.60 | Easy and reusable, but less distinctive than topology diagrams. |
| 7 | OG/Social Image Package | 3 | 3 | 3 | 4 | 5 | 3.45 | Important for release, but depends on earlier assets. |
| 8 | GTG Motion Motif | 4 | 4 | 2 | 3 | 3 | 3.25 | Useful polish after static assets are approved. |
| 9 | Full-screen Bitmap Backgrounds | 3 | 3 | 2 | 2 | 4 | 2.80 | Wait until SVG masters are approved. |
| 10 | Generic 3D Abstract Assets | 2 | 2 | 1 | 1 | 1 | 1.55 | Reject for now. |

Cost-benefit interpretation:

- The top four assets are all proof/system assets, not decorative assets.
- `GTG Capability Map` and `Industry Proof Grid` tie on score but serve different roles: capability explains what GTG does; proof grid explains who trusts GTG.
- `Service Icon Family` is cheap, but it should derive from the topology primitives rather than define the visual system.
- `GTG Motion Motif` is not first because the approved site already has strong motion; more identity now comes from content/proof assets.

Adjusted build order after cost-benefit check:

1. Customer Card System.
2. GTG Topology SVG Kit.
3. GTG Capability Map.
4. Industry Proof Grid.
5. Engagement Flow Map.
6. Service Icon Family.
7. GTG Motion Motif.
8. OG/Social Image Package.
9. Full-screen Bitmap Backgrounds.
10. Reject Generic 3D Abstract Assets.

This does not replace the brand ranking. It clarifies what to build first when implementation time is limited.

## Sources to Revisit

- Confluent: https://www.confluent.io/
- HashiCorp: https://www.hashicorp.com/
- Databricks: https://www.databricks.com/
- Databricks customers: https://www.databricks.com/customers
- Snowflake: https://www.snowflake.com/
- Snowflake customers: https://www.snowflake.com/en/customers
- Fivetran: https://www.fivetran.com/
- Aiven: https://aiven.io/
- Redpanda: https://www.redpanda.com/
- Astronomer: https://www.astronomer.io/
- Thoughtworks capability mapping: https://www.thoughtworks.com/en-us/insights/blog/legacy-modernization/keeping-large-projects-on-track-with-business-capability-mapping
- Thoughtworks enterprise architecture playbook: https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/thoughtworks-enterprise-architecture-playbook.pdf
- EPAM: https://www.epam.com/
- SHI: https://www.shi.com/
- Accenture: https://www.accenture.com/us-en
- Capgemini: https://www.capgemini.com/
- NTT DATA: https://www.nttdata.com/global/en/
- Red Hat services and consulting: https://www.redhat.com/en/services/consulting
- MongoDB: https://www.mongodb.com/
- Cloudera: https://www.cloudera.com/
- MegazoneCloud: https://www.megazone.com/
- Bespin Global: https://www.bespinglobal.com/
- LG CNS: https://www.lgcns.com/
- Samsung SDS: https://www.samsungsds.com/
- Deloitte capability model: https://www.deloitte.com/dk/en/services/consulting/perspectives/configuring-the-transformation-roadmap-using-the-capability-model.html
- Grafana Labs: https://grafana.com/
- Elastic: https://www.elastic.co/
- Splunk observability: https://www.splunk.com/en_us/products/observability.html
- Dynatrace: https://www.dynatrace.com/
- New Relic: https://newrelic.com/
- ServiceNow IT operations management: https://www.servicenow.com/products/it-operations-management.html
- DORA metrics: https://dora.dev/guides/dora-metrics-four-keys/
- CNCF platform engineering: https://tag-app-delivery.cncf.io/whitepapers/platforms/
- OpenTelemetry concepts: https://opentelemetry.io/docs/concepts/
- Data mesh principles: https://martinfowler.com/articles/data-mesh-principles.html
- Palantir: https://www.palantir.com/
- Tailscale: https://tailscale.com/
- IBM Design Language: https://www.ibm.com/design/language/
- Carbon Design System: https://carbondesignsystem.com/
- Frontify visual identity guide: https://www.frontify.com/en/guide/visual-identity
- McGill visual identity guide: https://www.mcgill.ca/visual-identity/visual-identity-guide
- Digital.gov accessibility for visual design: https://digital.gov/guides/accessibility-for-teams/visual-design/
- Azure DevOps pipeline traceability/work tracking: https://learn.microsoft.com/en-us/azure/devops/pipelines/integrations/configure-pipelines-work-tracking
- CloudQuery service topology mapping: https://www.cloudquery.io/
- IBM Carbon data visualization: https://carbondesignsystem.com/data-visualization/
- USWDS data visualization guidance: https://designsystem.digital.gov/components/data-visualizations/
- IBM Carbon motion: https://carbondesignsystem.com/elements/motion/overview/
- Atlassian motion: https://atlassian.design/foundations/motion/
- Microsoft Azure architecture icons: https://learn.microsoft.com/en-us/azure/architecture/icons/
- Google Cloud architecture icons: https://cloud.google.com/icons
- WCAG 2.2 Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- W3C WAI decorative images: https://www.w3.org/WAI/tutorials/images/decorative/
- W3C WAI complex images: https://www.w3.org/WAI/tutorials/images/complex/
- W3C WAI images tutorial: https://www.w3.org/WAI/tutorials/images/
- Section508.gov alternative text: https://www.section508.gov/create/alternative-text/
- Data.europa.eu accessible SVG and ARIA: https://data.europa.eu/apps/data-visualisation-guide/accessible-svg-and-aria
- MDN aria-hidden: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden
- MDN SVG title: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- University of South Carolina logo alt text guidance: https://sc.edu/about/offices_and_divisions/digital-accessibility/toolbox/best_practices/alternative_text/logo-alt-text/
- University at Buffalo logo clear space guidance: https://www.buffalo.edu/brand/identity/usage/Clear-space.html
- Three.js CanvasTexture docs: https://threejs.org/docs/#api/en/textures/CanvasTexture
- Three.js TextureLoader docs: https://threejs.org/docs/#api/en/loaders/TextureLoader
- Next.js public folder docs: https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
- GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

## Open Questions

- Should Hero show all 18 customers or a curated rotating subset?
- Should customer cards display "GTG CUSTOMER", "REPRESENTATIVE CUSTOMER", or no label?
- Do we have SVG versions of customer logos?
- Should the customer proof section group logos by industry?
