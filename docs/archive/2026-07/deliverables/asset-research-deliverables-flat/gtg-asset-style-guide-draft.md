# GTG Asset Style Guide Draft

Status: draft from reference research  
Date: 2026-06-30  
Research base: `docs/reference-asset-research.md`  
Ranking: `docs/reference-asset-ranking.md`  
Evidence catalog: `docs/reference-source-evidence-catalog.md`

## Purpose

This guide translates the reference research into a GTG-owned asset language. It is intentionally not a moodboard. It defines how future SVG, CanvasTexture, proof, and motion assets should be designed so the site feels like GTG rather than a generic enterprise technology template.

## Identity Thesis

GTG should look like a technical implementation partner that connects:

- customer trust;
- data systems;
- streaming flow;
- infrastructure automation;
- DevOps quality;
- consulting and technical support.

The core visual language is:

```txt
charcoal technical frame
  + warm-white system field
  + restrained red angular GTG intervention marker
  + topology / handoff lines
  + semantic customer proof
```

## Color Rules

Use:

- Black / charcoal for system background.
- Warm white for content fields, grid, and technical lines.
- Neutral gray for secondary grid and disabled states.
- GTG red for active intervention, not decoration.

Current provisional red reference:

- `#E90207`, sampled from `public/brand/gtg-logo.png`.
- Treat this as a temporary observed value, not the final official brand color.

Avoid:

- Generic purple/blue AI gradients.
- Neon cyberpunk colors.
- Multi-accent palettes.
- Recoloring customer logos.
- Vendor palette imitation.

## Shape Language

Use:

- Angular cuts inspired by the GTG logo.
- Central spine / fork geometry as small notches, route turns, or active markers.
- Thin technical frames.
- Rectangular modules and topology nodes.
- Directional handoff lines.
- Red slivers, ticks, or active nodes.

Avoid:

- Rounded blob systems.
- Glassmorphism panels.
- Decorative particles.
- Abstract 3D objects with no service meaning.
- Vendor icon shapes.

## Typography in Assets

Asset labels should be short and functional.

Good:

- `REPRESENTATIVE CUSTOMER`
- `DATA STREAM`
- `QUALITY GATE`
- `TRACE`
- `SUPPORT ACTION`

Avoid:

- Marketing slogans inside graphics.
- Long paragraphs inside SVGs.
- Fake dashboard values.
- Unapproved metrics or case results.

## Customer Card Rules

Purpose:

Make customer logos feel like a GTG proof system rather than a raw logo wall.

Rules:

- Keep every logo in a warm-white safe area.
- Preserve logo proportions.
- Normalize apparent visual weight.
- Preserve clear space around the customer mark so the GTG frame and customer logo do not merge into an accidental combined mark.
- Place GTG frame outside the logo, not over it.
- Use one small red angular marker.
- Keep customer names in semantic HTML.

Hero card format:

- Source logo: current 1200x480 PNG or approved SVG.
- Runtime texture: 1200x540 CanvasTexture.
- Safe logo field: centered, generous clear space.
- Fallback: HTML `<Image>` with `object-fit: contain`.

## Topology Diagram Rules

Purpose:

Give the Solution sections a reusable technical visual identity.

Primitive set:

- Node
- Active node
- Edge
- Directional edge
- Grid
- Data plane
- Queue segment
- Database cylinder
- Quality gate
- Diagnostic marker
- GTG angular marker
- Signal trace

Rules:

- One central concept per diagram.
- Use red only for the active intervention point.
- Do not rely on color alone.
- Keep labels outside SVG when possible.
- Use adjacent semantic text when the diagram conveys meaning.

## Capability Map Rules

Purpose:

Explain GTG service breadth quickly.

Recommended flow:

```txt
Data & Analytics
  -> Data Streaming
  -> Infrastructure Automation
  -> DevOps & Quality
  -> Consulting & Technical Support
```

Rules:

- Keep readable in 10 seconds.
- Avoid vendor logos.
- Avoid partner-tier or certification implications.
- Make it compact enough for Company or Engagement section.

## DevOps / Support Asset Rules

DevOps & Quality should visualize:

- release confidence;
- test traceability;
- quality gates;
- failure/recovery flow;
- support handoff.

Technical Support should visualize:

- service dependency;
- trace / metric / log / context;
- suspected fault path;
- support action.

Avoid:

- headset/helpdesk icons as primary support imagery.
- fake observability dashboards.
- fake DORA values.
- real-looking incident data.

## Motion Rules

Motion should clarify, not decorate.

Allowed:

- path reveal;
- subtle node activation;
- handoff dot movement;
- short opacity/translate transitions;
- quality gate state change.

Timing guidance for future SVG/CSS motion assets:

- Micro state changes: roughly 70-150ms.
- Small reveal or handoff transitions: roughly 150-400ms.
- Larger expressive transitions: use rarely and keep below 700ms unless separately approved.
- Prefer standard ease-out style motion.
- Avoid bounce, elastic, stretch, oscillation, and long blocking animation.

Avoid:

- new WebGL outside Hero;
- continuous decorative particles;
- elastic/bouncy motion;
- motion-only customer proof;
- blur-heavy transitions for essential text.

Reduced motion:

- static diagrams;
- no pulsing;
- no path drawing;
- no scrub-only comprehension;
- same semantic content available in HTML.

## Accessibility Rules

Use semantic HTML for:

- customer names;
- service labels;
- capability map labels;
- engagement step text.

SVG treatment:

- Decorative frames: `aria-hidden="true"`.
- Informative diagrams: nearby text equivalent or SVG `<title>/<desc>`.
- Customer logos: decorative if adjacent customer name exists.
- If an inline SVG is exposed as informative content, give it a clear accessible name and keep the same meaning available in nearby HTML where practical.

Do not:

- encode critical text only in Canvas.
- use color as the only state indicator.
- make proof content accessible only through animation.

## File Naming

Use predictable names:

```txt
public/generated/customer-cards/customer-card-frame.svg
public/generated/customer-cards/customer-card-mask.svg
public/generated/topology/gtg-primitives.svg
public/generated/topology/gtg-data-analytics.svg
public/generated/topology/gtg-data-streaming.svg
public/generated/topology/gtg-infrastructure-automation.svg
public/generated/topology/gtg-devops-quality.svg
public/generated/topology/gtg-consulting-support.svg
public/generated/topology/gtg-capability-map.svg
public/generated/topology/gtg-engagement-flow.svg
public/generated/topology/gtg-diagnostic-topology.svg
public/generated/topology/gtg-signal-correlation-map.svg
public/generated/proof/gtg-industry-proof-grid.svg
public/generated/og/gtg-og-1200x630.png
```

## QA Checklist

Before accepting a new GTG asset:

- Does it use GTG palette and angular marker rules?
- Does it use only approved brand masters, or clearly mark provisional samples?
- Does it preserve customer logo proportions and clear space?
- Does it avoid vendor icon imitation?
- Does it avoid fake metrics and unapproved claims?
- Does it avoid DORA/observability overclaims or product UI imitation?
- Does it have a semantic HTML equivalent if meaningful?
- Does it work at 390px mobile width?
- Does it work with reduced motion?
- Does it avoid new WebGL outside Hero?
- Does it fit one of the ranked asset packages?

## Source Families Behind This Guide

- IBM Design Language: complete brand system precedent.
- IBM Carbon: data visualization, motion, pictograms.
- Frontify / McGill: visual identity documentation and brand asset operations.
- USWDS: accessible data visualization.
- Atlassian: purposeful motion.
- Adobe Spectrum: data visualization and design system thinking.
- W3C WAI / Section508.gov / data.europa.eu / MDN: decorative, informative, and complex image handling.
- Three.js / Next.js: technical feasibility for CanvasTexture and public assets.
