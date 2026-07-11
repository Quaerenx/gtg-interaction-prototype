# Archive plan and duplicate manifest

> Status: approved-scope archive plan, planned moves completed without deletion
>
> Date: 2026-07-11
>
> Deletion policy: this plan deletes no file. Exact copies remain preserved in their archived snapshot until a separate user-approved deletion step.

## Purpose

This manifest records the SHA-256 comparison of every `*-deliverables-flat` directory and `project-planning-documents-20260709/`. It also defines where historical snapshots and future-only backend documents will move.

The current implementation and `docs/CURRENT.md` remain the authority for present behavior. A file appearing in a deliverables bundle or future-planning snapshot does not make its content current or approved.

## Scope summary

| Scope | Files | Exact-copy result |
|---|---:|---|
| `asset-reference-research-deliverables-flat/` | 3 | 3/3 equal the named `docs/` copies |
| `asset-research-deliverables-flat/` | 19 | 19/19 equal the named `docs/` copies |
| `capability-map-deliverables-flat/` | 8 | no complete canonical copy; preserve entire snapshot |
| `capability-map-micro-correction-deliverables-flat/` | 8 | report equals `docs/capability-map-report.md`; remaining files are distinct |
| `customer-card-system-deliverables-flat/` | 15 | one public sample duplicate and one internal two-file duplicate; remaining files are distinct |
| `project-planning-documents-20260709/` | 8 | 8/8 equal the named untracked `docs/` copies |

## Exact-copy SHA-256 manifest

### Asset-reference research bundle

| Bundle file | Equal copy | SHA-256 |
|---|---|---|
| `asset-production-priority.md` | `docs/asset-production-priority.md` | `B326F8B6801FFE781A9A33A8AE49318FFF0FF6601056FE894D0FDA5837569D83` |
| `asset-reference-research.md` | `docs/asset-reference-research.md` | `8430C154026AF4983559EAC8BFCB01AF8CF45C81246A56A71476C8CBA445906E` |
| `font-recommendation.md` | `docs/font-recommendation.md` | `22A6C0C9E59EEC8F6D99865C12078DB96AC845E004A26075DA2AED9CF4560BBC` |

### Asset research bundle

| Bundle file | Equal copy | SHA-256 |
|---|---|---|
| `asset-copy-guardrails.md` | `docs/asset-copy-guardrails.md` | `312FF3555C014EE451F1059FC93787ACBFC4F6A4E8DB4251E846F23BF57BAB44` |
| `asset-production-prompts.md` | `docs/asset-production-prompts.md` | `77DE53D78E7C6A0BA71F4B2874B27CB8E70B84247E24039563F2EACA633E115A` |
| `asset-research-index.md` | `docs/asset-research-index.md` | `4B41D2EED68D37B5B0055A99D60A4062354AB9C68C6F55184F4AF048D241FDBE` |
| `brand-asset-gap-audit.md` | `docs/brand-asset-gap-audit.md` | `C0124B6D47ACE25855B22D3D225C5908EF936CEA92DBF2559711C3B268FC534C` |
| `customer-logo-asset-audit.md` | `docs/customer-logo-asset-audit.md` | `0E3803664C8B9BE66FCA16F81B4BF4C44E3C34388763099F73356354C568EFDC` |
| `final-response-source-notes.md` | `docs/final-response-source-notes.md` | `E2DB0DE1A097404C17883956CAA0837C3BD66884919974AF64A6B0D05D2E252D` |
| `generated-asset-inventory.md` | `docs/generated-asset-inventory.md` | `F8FF1115C84E0D725E6F86E1348BF5E87F79757ACAB4E7EA20AA4665CD5A953A` |
| `gtg-asset-qa-rubric.md` | `docs/gtg-asset-qa-rubric.md` | `F28FFD3DFBED6DEECCCB236D8B069354205A225C7198B58CAAC194AB2380D08F` |
| `gtg-asset-risk-register.md` | `docs/gtg-asset-risk-register.md` | `1916FE3D35F125FF586F72AD6187C4C47A668A26EDE44DD05C49EA278E04617D` |
| `gtg-asset-scorecard.md` | `docs/gtg-asset-scorecard.md` | `0AFF6C34302ACD5E820A292B8545FEB3032A02506B15AD83ADEAC5E929154189` |
| `gtg-asset-style-guide-draft.md` | `docs/gtg-asset-style-guide-draft.md` | `65F00D107DECB5F09E1E0D1DB1B3B52B64BB1AA6ACD53FEB8BD33B51E5765920` |
| `gtg-unique-asset-recommendations.md` | `docs/gtg-unique-asset-recommendations.md` | `93611B60D38C2DAD0546C753442050EFEAF9715927325DCEE60230BF3801FD7E` |
| `gtg-visual-motif-palette.md` | `docs/gtg-visual-motif-palette.md` | `170EF2A37B99C0CCDC162DE850EAC437FC20055CFC5B33752BD4D5EB06C92ECB` |
| `reference-asset-ranking.md` | `docs/reference-asset-ranking.md` | `3030490AE4A2886134DDC8F8F0DF59AB7B2FDFA2078407C42836E81051AD208D` |
| `reference-asset-research.md` | `docs/reference-asset-research.md` | `6B1318098537FDE32FC862FE1EAB4EE7ACB4E964C3415C4FCFFA988F131CD140` |
| `reference-research-completion-audit.md` | `docs/reference-research-completion-audit.md` | `814AB16B9BDFF8F774C7F8FE25D0AE4DFDEF3E7FE2EFD624943E6704FE8FF2ED` |
| `reference-research-final-report-draft.md` | `docs/reference-research-final-report-draft.md` | `A3EED4BCE532D70B055444A4C4E37BEB755AEA3F3622289DA3C2572C0D1E215A` |
| `reference-source-evidence-catalog.md` | `docs/reference-source-evidence-catalog.md` | `8E9767A2064463AC123B6F174027DF49CCC793F8A387B9D8E658584519DBD23B` |
| `reference-to-asset-matrix.md` | `docs/reference-to-asset-matrix.md` | `A0EA30332B2815EFBB67A20C5A08E0AF63286E751D4D8F9BA6AAB6CC54028520` |

### Capability and customer-card bundles

| First file | Equal copy | SHA-256 |
|---|---|---|
| `capability-map-micro-correction-deliverables-flat/capability-map-report.md` | `docs/capability-map-report.md` | `3F15C97AEA62C68973B62B4F0D7B3DBB1230553B17D28FD78056246210E59589` |
| `customer-card-system-deliverables-flat/customer-card-sample.png` | `public/generated/customer-cards/customer-card-sample.png` | `65B38708074D6A20E66EEDEBA893D5B18E147144FB7719036110B3C23106C64C` |
| `customer-card-system-deliverables-flat/force-fallback-customer-card.png` | `customer-card-system-deliverables-flat/hero-mobile-fallback-customer-card.png` | `9BC2376FF8C67C1659A62086D85FB8646EACA2D9913BE9469C26CDFEBE5B70E3` |

### 2026-07-09 planning snapshot

| Planning file | Equal copy | SHA-256 |
|---|---|---|
| `api-spec.md` | `docs/api-spec.md` | `E0AADC744DB3F910AADBC17B62E4B690B852603264E2D329D50DE96EC51348DA` |
| `data-model-db-design.md` | `docs/data-model-db-design.md` | `BFA8D63ECFFA12908FD1692821074878C722BB02DFB5326D52510E184C7D8A58` |
| `functional-spec.md` | `docs/functional-spec.md` | `F35A96742A8341620256A21FEFF9965B66CFCE54A0F27941D8492185719A1807` |
| `prd.md` | `docs/prd.md` | `356D5BFC491165BDD21CF32913D3C6913AD07583DD939AF4D5FEAC02F020F834` |
| `project-basic-info.md` | `docs/project-basic-info.md` | `3E41674E5520F7FA08CF4DBC1F72EBDD410DA9E51955B0C08A44A6AFD05242B8` |
| `project-definition.md` | `docs/project-definition.md` | `ECA4C7FA0E3C5CE53BB6EF3B72211A9F908B650F31839D4FD6137612A114E41F` |
| `system-architecture.md` | `docs/system-architecture.md` | `F251639D976C2B297CD090AFA10305CD86420A9159EBF1A15DEAB0BD56538B34` |
| `ux-flow.md` | `docs/ux-flow.md` | `8A5AF8FE636AD080A26E01BA35DDB8DC28B91CC5712E6752797CA3C023D68037` |

## Planned moves

No move in this plan is a content deletion.

| Current path | Planned path | Reason |
|---|---|---|
| every root `*-deliverables-flat/` directory | `docs/archive/2026-07/deliverables/<same-name>/` | immutable implementation snapshots; preserve unique and duplicate files together |
| `project-planning-documents-20260709/` | `docs/archive/2026-07/planning/project-planning-documents-20260709/` | preserve the complete original planning bundle |
| `docs/api-spec.md` | `docs/future/api-spec.md` | backend/API is explicitly deferred |
| `docs/data-model-db-design.md` | `docs/future/data-model-db-design.md` | database/CMS persistence is explicitly deferred |
| `docs/system-architecture.md` | `docs/future/system-architecture.md` | contains deferred backend/CMS expansion architecture |
| `docs/functional-spec.md` | `docs/archive/2026-07/planning/functional-spec.md` | 2026-07-09 draft with current-runtime drift |
| `docs/prd.md` | `docs/archive/2026-07/planning/prd.md` | 2026-07-09 draft, not the current product authority |
| `docs/project-basic-info.md` | `docs/archive/2026-07/planning/project-basic-info.md` | dated scope snapshot |
| `docs/project-definition.md` | `docs/archive/2026-07/planning/project-definition.md` | dated definition snapshot |
| `docs/ux-flow.md` | `docs/archive/2026-07/planning/ux-flow.md` | dated UX snapshot with current-runtime drift |

## 2026-07-11 execution result

- Five root `*-deliverables-flat/` directories were moved with `git mv` to `docs/archive/2026-07/deliverables/<same-name>/`.
- The original `project-planning-documents-20260709/` bundle and its planning copies are preserved in `docs/archive/2026-07/planning/`.
- API, DB, and system architecture copies are preserved under `docs/future/`; dated planning drafts are preserved under `docs/archive/2026-07/planning/`.
- No duplicate file was deleted.
- The unreferenced `public/item-logo/pngaaa.com-5227511.png` was not deleted; it was moved to `docs/archive/2026-07/blocked-assets/` because its recorded source conflicts with public commercial use. The runtime now uses a text mark and makes zero requests for that PNG.

## Approval boundary

- This structural-cleanup stage may move the listed paths and retain all copies.
- It must not remove any duplicate bundle or planning copy.
- A later deletion or deduplication requires a separate list of exact paths and explicit user approval.
