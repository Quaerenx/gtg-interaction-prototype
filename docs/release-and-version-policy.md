# Package version and Git release policy

## Current facts

- The package is private and is not an npm publication artifact.
- `package.json` records `0.4.0`, matching the latest product baseline tag `v0.4.0` (`07952ecc4aad18260eddd48f5b496ebd6d97e641`).
- Commits after `v0.4.0` on `codex/hero-basepath-stabilization` are unreleased work. Their exact identity is the Git commit SHA, not a new release number.
- `gtg-capability-map-v1` and `gtg-topology-svg-kit-v1` are asset milestone tags, not product SemVer releases.

## Version authority

Product releases use Git tags named `vMAJOR.MINOR.PATCH`. On a release commit:

1. `package.json.version` must equal the tag without the `v` prefix.
2. `pnpm-lock.yaml` must contain the same exact root dependency specifiers as `package.json`.
3. `docs/CURRENT.md` must describe the released implementation and unresolved gates.
4. The release commit and tag must be created only after explicit user approval.

Between releases, the latest Git commit SHA identifies the working snapshot. A branch containing post-release commits must not be described as a new release until the version bump and tag are explicitly approved.

## SemVer meaning for this prototype

- `PATCH`: bug fix, accessibility/performance hardening, or structure-only change with no approved product-direction change.
- `MINOR`: approved visible behavior, content structure, or product-scope addition that remains backward compatible with the single-page site.
- `MAJOR`: incompatible route/deployment contract or product architecture change.

The classification selects a candidate only; it does not authorize a tag.

## Release gate

Before proposing a product tag:

- working tree scope is reviewed and unrelated user files are excluded;
- TypeScript no-emit, lint, production build, and full Playwright matrix pass;
- `/hero` versus production-root policy is explicitly decided;
- public content, brand, customer-logo, product-asset, legal, canonical, robots, and sitemap gates are approved;
- release notes include exact verification results and known risks;
- `package.json`, `pnpm-lock.yaml`, and documentation changes are committed together.

Push, tag creation, PR creation, deployment, and npm publication are separate actions. None is implied by a local validation or commit.
