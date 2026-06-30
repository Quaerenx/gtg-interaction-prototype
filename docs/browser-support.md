# Browser Support Scope

This Release Candidate does not claim full cross-browser compatibility.

## Supported RC Verification Scope

- Chromium: full Playwright E2E coverage.
- WebKit: Playwright smoke coverage.
- Firefox: pending; not currently claimed as a supported RC browser.

## Notes

- Chromium is the primary verification browser for the Hero WebGL, handoff, Solution sequence, routing, metadata, and accessibility checks.
- WebKit is covered by a lightweight smoke test that confirms the approved baseline loads and has no horizontal overflow.
- Firefox can be explored later, but it is outside the current official RC support claim.
