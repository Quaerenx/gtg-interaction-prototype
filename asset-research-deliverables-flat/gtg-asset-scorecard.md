# GTG Asset Scorecard

Status: working scorecard from active reference research  
Date: 2026-06-30  
Rubric: `docs/gtg-asset-qa-rubric.md`  
Ranking: `docs/reference-asset-ranking.md`

## Scoring Method

This scorecard applies the QA rubric directionally to proposed asset packages. It is not final acceptance scoring for finished artwork. Finished assets still need visual QA, mobile QA, accessibility review, and claim review.

Scale:

- 3: strong fit
- 2: acceptable with revision
- 1: weak or risky
- 0: reject

## Scorecard

| Rank | Asset Package | Identity | Proof | Feasibility | Accessibility | Claim Safety | Logo Handling | Originality | Motion | Mobile | Maintainability | Performance | Total / 33 | Decision |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | Customer Proof Card System | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 2 | 3 | 3 | 31 | Build first |
| 2 | GTG Technical Topology Kit | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 31 | Build first |
| 3 | Capability Map | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 32 | Build now |
| 4 | Industry Proof Grid | 2 | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 | 3 | 29 | Build after logo normalization |
| 5 | Engagement Flow Map | 3 | 2 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 31 | Build after copy approval |
| 6 | Signal Correlation / Diagnostics Map | 3 | 2 | 3 | 3 | 2 | 3 | 3 | 2 | 2 | 3 | 3 | 29 | Build next |
| 7 | Platform Golden Path Diagram | 3 | 2 | 3 | 3 | 2 | 3 | 3 | 2 | 2 | 3 | 3 | 29 | Build next |
| 8 | Service Icon Family | 2 | 1 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 29 | Build after primitives |
| 9 | OG / Presentation Cover System | 2 | 2 | 2 | 2 | 3 | 2 | 2 | 3 | 3 | 2 | 3 | 26 | Revise until core assets exist |
| 10 | Generic 3D Abstract Assets | 1 | 0 | 1 | 1 | 3 | 3 | 1 | 1 | 1 | 1 | 0 | 13 | Reject |

## Notes

Customer Proof Card System scores high because it uses confirmed customer proof and fits the approved Hero ring. It loses one point in logo handling until every customer mark has approved source quality, clear space, and normalized scale.

GTG Technical Topology Kit scores high because it can become a proprietary visual language across all service areas without extra WebGL or external imagery.

Capability Map has the highest directional score because it is low-risk, accessible, and service-driven. It is ranked third because it is less visually distinctive than customer proof plus topology.

Industry Proof Grid depends on approved industry grouping language. Without those labels it can still ship as a restrained customer proof section, but it should avoid implying case outcomes.

OG / Presentation Cover System should wait because it should be composed from approved card/topology masters rather than invented separately.

Generic 3D Abstract Assets are below the hold threshold and should not enter production planning.

## Decision Rule

For the next asset branch, choose the highest-ranked package that:

1. Does not change approved Hero geometry or page motion.
2. Uses local assets only.
3. Preserves semantic content outside Canvas.
4. Avoids unsupported customer, partner, certification, and performance claims.
5. Can pass mobile and reduced-motion review.
