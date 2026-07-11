# HERO documentation index

## Current-status entrypoint

**Start with [`CURRENT.md`](CURRENT.md). It is the only document that represents current implementation, validation, approval boundaries, and known document drift.**

If another document conflicts with the runtime, the current commit and reproducible tests are the implementation fact. If a proposal conflicts with an approved decision, [`DECISIONS.md`](DECISIONS.md) is the product-direction authority. Neither code presence nor a document filename proves public-use approval.

## Document status vocabulary

| Status | Meaning |
|---|---|
| Current | Maintained entrypoint for present facts |
| Approved direction | User-approved target or decision; implementation may still differ |
| Gate / ledger | Release, rights, or approval boundary |
| Evidence | Measurements or implementation verification for a completed stage |
| Draft / research | Input material, recommendation, or unapproved worksheet |
| Future | Explicitly deferred API, DB, CMS, or operational architecture |
| Archive | Dated snapshot retained for history; never a current source of truth |

## Current and approved documents

| Document | Status | Use |
|---|---|---|
| [`CURRENT.md`](CURRENT.md) | Current | single entrypoint for implementation and verification state |
| [`DECISIONS.md`](DECISIONS.md) | Approved direction | product and information-architecture decisions |
| [`experience-redesign-spec.md`](experience-redesign-spec.md) | Approved direction | semantic and visual experience specification |
| [`release-checklist.md`](release-checklist.md) | Gate | public-release checklist |
| [`release-readiness-final.md`](release-readiness-final.md) | Gate / evidence | latest Release Candidate validation and hold decision |
| [`brand-and-rights-ledger.md`](brand-and-rights-ledger.md) | Gate / ledger | brand, customer, and product-asset evidence boundary |
| [`release-and-version-policy.md`](release-and-version-policy.md) | Policy | package version and Git release rules |

## Verification and implementation evidence

- [`performance-accessibility-report.md`](performance-accessibility-report.md)
- [`browser-test-report.md`](browser-test-report.md)
- [`capability-map-report.md`](capability-map-report.md)
- [`topology-svg-kit-report.md`](topology-svg-kit-report.md)
- [`semantic-ia-unused-content-inventory.md`](semantic-ia-unused-content-inventory.md)
- [`ova-differentiation-review.md`](ova-differentiation-review.md)

Evidence documents describe a measured stage. They do not override newer code or `CURRENT.md`.

## Brand, content, and asset review

- [`approved-content.md`](approved-content.md) — draft worksheet despite the historical filename
- [`content-review.md`](content-review.md)
- [`content-sync-report.md`](content-sync-report.md)
- [`customer-logo-asset-audit.md`](customer-logo-asset-audit.md)
- [`asset-copy-guardrails.md`](asset-copy-guardrails.md)
- [`generated-asset-inventory.md`](generated-asset-inventory.md)
- [`gtg-asset-risk-register.md`](gtg-asset-risk-register.md)
- [`gtg-asset-style-guide-draft.md`](gtg-asset-style-guide-draft.md)

Research and recommendation documents remain useful inputs, but do not establish verified GTG facts or asset rights.

## Future and archive

- `future/` contains deferred API, database, CMS, and expansion architecture. It is outside the current implementation scope.
- `archive/YYYY-MM/` contains dated plans and deliverable snapshots.
- [`ARCHIVE-PLAN.md`](ARCHIVE-PLAN.md) records the pre-move SHA-256 duplicate audit and the no-deletion boundary.
- Root [`../PLAN.md`](../PLAN.md) is an historical implementation plan and is not a current-status document.

Archived duplicates are intentionally retained. Deduplication or deletion requires a separate explicit user approval.
