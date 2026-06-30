# Release Checklist

| Item | Status | Notes |
|---|---|---|
| content approval | BLOCKED | `docs/approved-content.md` approval status is `draft`; approver and date are missing. |
| logo assets | BLOCKED | Current PNG logo is provisional; approved primary SVG logo and inverse logo are missing. |
| favicon | BLOCKED | Current favicon uses provisional PNG; final favicon/app icons are missing. |
| OG image | BLOCKED | Approved 1200x630 Open Graph image is missing. |
| legal links | BLOCKED | Privacy policy link exists; Terms URL is missing. |
| production environment | BLOCKED | Production environment variables and approval gate are not confirmed. |
| noindex removal | BLOCKED | Metadata remains noindex until production environment and approval are complete. |
| domain/DNS | BLOCKED | Domain ownership, DNS, and deployment target are not verified here. |
| analytics consent | BLOCKED | Analytics and consent requirements are not specified. |
| sitemap | PASS | `src/app/sitemap.ts` exists; it returns no URLs while draft and exposes only the homepage after approved production. Submission remains a release task. |
| robots | PASS | `src/app/robots.ts` blocks all crawling while draft and allows indexing only after approved production. |
| 404 | PASS | `src/app/not-found.tsx` provides a simple HTML/CSS 404 with Home link, Header, and Footer. |
| performance | BLOCKED | Full production performance budget and audit are not complete. |
| accessibility | BLOCKED | Automated accessibility-adjacent checks exist, but a full manual accessibility audit is still required. |
| browser testing | PASS | Chromium full E2E and WebKit smoke; Firefox is not currently claimed as a supported RC browser. |
| rollback tag | BLOCKED | Release tag and rollback procedure are not defined. |
