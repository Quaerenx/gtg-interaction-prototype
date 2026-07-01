# Asset Copy Guardrails

Status: working copy guardrails from active reference research  
Date: 2026-06-30  
Related risk register: `docs/gtg-asset-risk-register.md`

## Purpose

Visual assets often include small labels. These labels must not turn an asset into an unsupported claim.

## Safe Labels

Customer proof:

- `Representative customers`
- `Customer proof`
- `Selected customers`
- Customer display name only

Service diagrams:

- `Data flow`
- `Stream path`
- `Provisioning path`
- `Quality gate`
- `Diagnostic signal`
- `Support action`
- `Engagement step`

Topology labels:

- `Source`
- `Processing`
- `Analytics`
- `Automation`
- `Validation`
- `Release`
- `Support`

## Use Only If Approved

- `Certified partner`
- `Official partner`
- `Global delivery`
- `Enterprise scale`
- `24/7 support`
- `Proven ROI`
- `Reduced cost by X%`
- `Improved performance by X%`
- `DORA elite performance`
- Specific named platform partnership language
- Specific customer outcome statements

## Avoid In Assets

- Marketing slogans inside technical diagrams.
- Dense paragraphs embedded in SVG.
- Numbers that look like real performance data.
- Customer logos placed next to unapproved results.
- Vendor product names used as if they are GTG-owned capabilities.

## Recommended Pattern

Keep graphics short and structural:

```txt
Signal -> validation -> support action
```

Keep claims and explanations in approved HTML copy:

```txt
GTG supports data, platform, quality, and technical support workflows.
```

If copy approval is not available, keep the asset descriptive and generic rather than persuasive.
