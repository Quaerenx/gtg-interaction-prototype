# GTG Solutions & Consult interaction prototype

This repository contains a local-only candidate for the GTG Solutions & Consult single-page website. It combines a semantic Next.js page with a desktop Hero WebGL treatment. Mobile, reduced-motion, WebGL failure, and `?forceFallback=1` use static HTML/CSS fallbacks.

The repository does not currently contain a backend, database, authentication, CMS, or contact-form persistence. The project owner authorized the current asset display on 2026-07-11; that decision is not independent evidence of third-party trademark permission or official master provenance.

## Start here

- Current implementation, validation, and approval boundary: [`docs/CURRENT.md`](docs/CURRENT.md)
- Documentation map: [`docs/INDEX.md`](docs/INDEX.md)
- Approved product-direction decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md)
- Repository rules: [`AGENTS.md`](AGENTS.md)

`docs/CURRENT.md` is the only current-status entrypoint. `PLAN.md` is an historical implementation plan.

## Verified local toolchain

- Node.js `24.17.0`
- pnpm `11.7.0`
- exact application and development dependency versions are pinned in `package.json` and `pnpm-lock.yaml`

Install from the lockfile:

```powershell
pnpm install --frozen-lockfile
```

## Run locally

```powershell
pnpm dev
```

The default development URL is `http://127.0.0.1:18150/hero`.

`NEXT_BASE_PATH` controls the mount path:

- unset or `/hero`: `/hero`
- empty string or `/`: root `/`

Production mode:

```powershell
pnpm build
pnpm start
```

The production server also binds to `127.0.0.1:18150` by default.

## Validation

```powershell
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm test:e2e
```

Playwright starts an isolated production server on an available local port. The suite covers semantic structure, keyboard navigation, desktop Hero behavior, mobile/reduced/forced fallback, solution flow, local assets, basePath routing, metadata, 404 behavior, and major-section screenshots.

## Source layout

| Path | Responsibility |
|---|---|
| `src/app/` | App Router entrypoints, metadata routes, and global style entry |
| `src/content/` | brand, customer, solution, company, engagement, and contact content modules |
| `src/components/sections/` | semantic page sections and scroll-state coordination |
| `src/components/three/` | Hero-only Three/R3F scene |
| `src/styles/` | tokens, base, layout, section, motion, and reduced/mobile CSS |
| `src/lib/` | basePath and WebGL helpers |
| `tests/e2e/` | Playwright specs grouped by behavior domain plus shared support modules |
| `public/` | local repository assets; no runtime hotlinks |
| `docs/` | current entrypoint, decisions, evidence, future proposals, and dated archive |

Core company, customer-proof, and Solution content must remain readable without Canvas. WebGL is limited to the Hero.

## Version and release

The package is private. `package.json.version` records the latest stable product tag baseline, while post-release working snapshots are identified by Git commit SHA. See [`docs/release-and-version-policy.md`](docs/release-and-version-policy.md) for the tag, SemVer, validation, and approval policy.

No local commit authorizes push, tag creation, PR creation, deployment, npm publication, or public asset use.
