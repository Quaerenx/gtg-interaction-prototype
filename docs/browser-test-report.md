# Browser Test Report

Note: `pnpm exec playwright test --project=chromium` was previously attempted, but this Windows environment did not resolve the local `playwright` binary through `pnpm exec` (`'playwright' is not recognized...`). The official RC commands now use platform-independent `pnpm run` scripts that call the local Playwright CLI through `scripts/run-playwright.mjs`.

## Chromium

- command: `pnpm run test:e2e:chromium`
- passed / failed: passed
- test count: 11 passed
- browser version: Chromium 149.0.7827.55

## WebKit

- command: `pnpm run test:e2e:webkit`
- passed / failed / blocked: passed
- test count: 1 passed
- browser version or installation error: WebKit 26.5

## Firefox

- not enabled / passed / failed: not enabled by default
- note: Firefox smoke remains opt-in through `GTG_ENABLE_FIREFOX_SMOKE=1` because the local Windows headless Firefox binary previously timed out during graphics initialization.
