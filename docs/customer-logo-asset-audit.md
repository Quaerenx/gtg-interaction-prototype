# Customer Logo Asset Audit

Status: working audit from local assets  
Date: 2026-06-30  
Asset folder: `public/generated/customer-logos/`  
Related recommendation: `docs/gtg-unique-asset-recommendations.md`

## Summary

The 18 local customer logo PNG files are all normalized to `1200x480` with a `2.5:1` aspect ratio. This is a strong starting point for the recommended Customer Proof Card System because the Hero card generator can use one predictable logo field.

`src/content/site.ts` currently references 18 `heroCustomers`, matching the 18 PNG files in `public/generated/customer-logos/`.

Sampled alpha check: all 18 PNG files include non-opaque alpha samples, so they can sit on a shared warm-white safe field without forcing a baked background.

## Files

| File | Size | Ratio |
|---|---:|---:|
| `01_kt.png` | 1200x480 | 2.5 |
| `02_lg-electronics.png` | 1200x480 | 2.5 |
| `03_konkuk-university-hospital.png` | 1200x480 | 2.5 |
| `04_construction-workers-mutual-aid-association.png` | 1200x480 | 2.5 |
| `05_korea-university-medicine.png` | 1200x480 | 2.5 |
| `06_supreme-prosecutors-office.png` | 1200x480 | 2.5 |
| `07_misto-holdings.png` | 1200x480 | 2.5 |
| `08_bithumb.png` | 1200x480 | 2.5 |
| `09_samsung-sds.png` | 1200x480 | 2.5 |
| `10_samsung-electronics.png` | 1200x480 | 2.5 |
| `11_saemaul-geumgo.png` | 1200x480 | 2.5 |
| `12_seoul-medical-center.png` | 1200x480 | 2.5 |
| `13_shinhan-bank.png` | 1200x480 | 2.5 |
| `14_ulsan-university-hospital.png` | 1200x480 | 2.5 |
| `15_ptkorea.png` | 1200x480 | 2.5 |
| `16_komsco.png` | 1200x480 | 2.5 |
| `17_techfin-ratings.png` | 1200x480 | 2.5 |
| `18_korea-credit-information-services.png` | 1200x480 | 2.5 |

## Asset Implications

Use these logos for:

- Hero customer card CanvasTexture.
- Hero fallback cards.
- Static customer proof grid.
- OG/social composition after the card frame is approved.
- Proposal and presentation proof strips.

Do not use these logos for:

- Recolored icon-like marks.
- Blended marks inside the GTG logo.
- Motion-only proof.
- Customer case claims without approved case copy.

## Remaining Checks

Before final production, verify:

1. Each customer name is approved for public display.
2. The logo files are the latest approved versions.
3. Industry grouping labels are approved, if used.
4. Customer proof wording does not imply results or endorsement beyond customer relationship.
5. Every visual usage preserves clear space and original logo proportions.
6. Full-pixel alpha and edge quality are visually checked before final card export.
