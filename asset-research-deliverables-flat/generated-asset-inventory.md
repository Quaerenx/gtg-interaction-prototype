# Generated Asset Inventory

Status: working inventory from local project files  
Date: 2026-06-30  
Folder: `public/generated/`

## Current Files

Hero procedural placeholders:

- `hero-data-analytics.svg`
- `hero-data-streaming.svg`
- `hero-infrastructure-automation.svg`
- `hero-devops-quality.svg`
- `hero-database-consulting.svg`
- `hero-technical-support.svg`
- `hero-training-delivery.svg`

Solution procedural placeholders:

- `solution-data-analytics.svg`
- `solution-data-streaming.svg`
- `solution-infrastructure-automation.svg`
- `solution-devops-quality.svg`
- `solution-consulting-support.svg`

Customer logo folder:

- `public/generated/customer-logos/`

## Recommendation

Do not overwrite the current approved Hero/Solution procedural placeholders during asset exploration. Add new candidate assets in separate folders:

```txt
public/generated/customer-cards/
public/generated/topology/
public/generated/proof/
public/generated/og/
```

This keeps approved baseline visuals stable while allowing parallel asset branches to be reviewed independently.

## Implication For Next Branches

- `codex/customer-card-system` should create `public/generated/customer-cards/`.
- `codex/topology-svg-kit` should create `public/generated/topology/`.
- `codex/industry-proof-grid` can create `public/generated/proof/` only if raster exports are needed; otherwise keep it HTML/CSS.
- `codex/og-and-deck-assets` should create `public/generated/og/` after core assets are approved.
