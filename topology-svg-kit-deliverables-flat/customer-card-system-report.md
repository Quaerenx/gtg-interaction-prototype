# Customer Card System Report

Date: 2026-07-01  
Mode: RC1 interaction baseline extension  
Status: Accept candidate, pending final public-use approvals

## 1. Generated Files

- `public/generated/customer-cards/customer-card-frame.svg`
- `public/generated/customer-cards/customer-card-mask.svg`
- `public/generated/customer-cards/customer-card-sample.png`
- `tests/artifacts/customer-card-system/customer-card-contact-sheet.png`

The production Hero uses runtime CanvasTexture composition instead of pre-rendered per-customer WebP exports. This keeps the approved WebGL ring flow intact while applying one shared GTG customer card frame to the visible Hero ring slots. The current Hero preserves the approved panel count and maps the first customer proof items into those slots; all 18 local logos are normalized in content and the contact sheet for fallback and future proof-section reuse.

The Hero keyword line is intentionally decoupled from solution and vendor keywords while customer proof cards are visible. It displays `Representative Customers` instead of product-specific labels such as `Vertica Analytics`, `Confluent Platform`, `HashiCorp Automation`, or `LoadRunner Quality`.

## 2. Customer Logos Used

All logos are local PNG files from `public/generated/customer-logos/`:

1. `01_kt.png`
2. `02_lg-electronics.png`
3. `03_konkuk-university-hospital.png`
4. `04_construction-workers-mutual-aid-association.png`
5. `05_korea-university-medicine.png`
6. `06_supreme-prosecutors-office.png`
7. `07_misto-holdings.png`
8. `08_bithumb.png`
9. `09_samsung-sds.png`
10. `10_samsung-electronics.png`
11. `11_saemaul-geumgo.png`
12. `12_seoul-medical-center.png`
13. `13_shinhan-bank.png`
14. `14_ulsan-university-hospital.png`
15. `15_ptkorea.png`
16. `16_komsco.png`
17. `17_techfin-ratings.png`
18. `18_korea-credit-information-services.png`

## 3. Card Frame Design Rationale

The card uses a charcoal technical outer frame, a warm-white customer logo safe field, a subtle neutral grid, and one small angular red GTG marker. The red marker is placed in the frame corner outside the logo safe field so the customer logo and GTG motif do not read as a combined co-branded mark.

The UI label uses `Representative customer`, the most conservative candidate among:

- `Representative customer`
- `Customer proof`
- `Selected customer`

No metric, case result, certification, partner tier, endorsement, or performance claim is paired with a customer logo.

Customer logos in this system indicate representative customer proof only. They do not state that a named customer uses a specific GTG solution, vendor product, platform module, or service package.

## 4. Logo Safe Area Rules

- Preserve original logo color.
- Preserve original logo ratio.
- Use object-fit contain logic inside the warm-white field.
- Keep a 28px internal clear space in the runtime texture composition.
- Clip only to the card safe field, never crop the logo itself.
- Keep GTG marker outside the safe field.

## 5. Long Customer Name Handling

Runtime CanvasTexture text fitting reduces the customer name font size until it fits within the available card metadata width. HTML fallback cards use one-line ellipsis for long customer names and keep the index on the opposite edge.

The longest current display names are:

- Construction Workers Mutual Aid Association
- Korea Credit Information Services
- Konkuk University Hospital

These remain metadata text and are also available in semantic HTML.

## 6. Accessibility

- Canvas is not the only source of proof information.
- `HeroExperience` exposes one semantic `Representative customers` list with 18 list items.
- Fallback visual cards are inside an `aria-hidden` visual block.
- Fallback logo images use empty alt text because the adjacent card name and semantic customer list provide the accessible name.
- Reduced-motion mode uses the same HTML fallback card treatment.

## 7. Claim Safety

The card system intentionally avoids:

- customer outcomes;
- project scope claims;
- ROI or cost claims;
- performance metrics;
- partner tiers;
- certifications;
- endorsement wording.

`src/content/site.ts` stores `publicDisplayApproved` as `user-confirmed`, not as a final legal or brand approval claim.

The Hero keyword is fixed to `Representative Customers` in customer proof mode. This prevents the visible customer card from being read as a product-specific customer claim, especially near customer logos such as KT. The customer proof remains draft/preview until final public-use written approval is available.

## 8. Mobile And Fallback

Mobile, reduced-motion, and force-fallback states use the same customer card visual language through HTML/CSS. The mobile layout shows the primary customer card strongly and adjacent cards partially, while the full 18-name proof list remains available semantically.

The fallback card keeps the customer logo in a warm-white safe field, with label, customer name, index, and the red marker positioned outside the logo field.

## 9. Hero Geometry Confirmation

The Customer Card System changes the card texture composition only. The current Hero still derives its visible ring slots from the approved service count rather than expanding the WebGL plane count to all 18 customers. It does not intentionally change:

- Hero WebGL geometry;
- camera position;
- camera FOV;
- ring radius;
- plane placement formula;
- orbit behavior;
- camera pullback;
- black handoff;
- Solution pinned sequence;
- WebGL scope outside Hero.

## 10. QA Rubric Self-Score

Score: 31 / 33  
Decision: Accept candidate

| Category | Score | Notes |
|---|---:|---|
| GTG identity | 3 | Uses charcoal frame, warm-white field, and provisional angular red marker. |
| Proof value | 3 | Makes the Hero read as customer proof rather than abstract cards. |
| Asset feasibility | 3 | Uses SVG, local PNG, HTML/CSS, and CanvasTexture only. |
| Accessibility | 3 | Customer names exist outside Canvas and fallback is semantic-safe. |
| Claim safety | 3 | No outcome, metric, partner, certification, or product-specific customer-use claims. |
| Logo handling | 2 | Ratio, color, and clear space are preserved; final public-use approval remains pending. |
| Reference originality | 3 | GTG-owned card primitive, not an OVA copy. |
| Motion restraint | 3 | Reuses approved Hero motion and keeps static alternatives. |
| Mobile resilience | 3 | Mobile fallback uses constrained card strip and no horizontal overflow target. |
| Maintainability | 3 | Content-driven customer data and one shared card composition. |
| Performance | 2 | Eighteen runtime CanvasTextures are bounded to Hero, but future profiling should confirm budgets. |

## 11. Remaining Approval Items

- Written confirmation that all 18 customer logos can be displayed publicly on the GTG homepage.
- Final approved no-claim label, currently `Representative customer`.
- Official GTG vector logo or brand guide if the angular red marker should become a formal brand primitive.
- Final confirmation of GTG red value before documenting it as an official color.
- Optional SVG customer logos for sharper future exports.
