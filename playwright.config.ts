import { defineConfig, devices } from "@playwright/test";

function normalizeBasePath(value: string) {
  const normalized = value.trim().replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "";
}

const basePath = normalizeBasePath(process.env.NEXT_BASE_PATH ?? "/hero");
const defaultBaseURL = `http://127.0.0.1:18150${basePath}/`;
const runFullChromium = process.env.GTG_FULL_CHROMIUM === "1";
const runFullWebKit = process.env.GTG_FULL_WEBKIT === "1";

const firefoxSmokeProject =
  process.env.GTG_ENABLE_FIREFOX_SMOKE === "1"
    ? [
        {
          name: "firefox",
          grep: /@browser-smoke/,
          use: {
            ...devices["Desktop Firefox"],
            launchOptions: {
              env: {
                ...process.env,
                MOZ_DISABLE_CONTENT_SANDBOX: "1",
                MOZ_DISABLE_GPU: "1",
                MOZ_DISABLE_RDD_SANDBOX: "1",
                MOZ_SANDBOX: "0",
                MOZ_WEBRENDER: "0"
              },
              firefoxUserPrefs: {
                "gfx.direct2d.disabled": true,
                "gfx.webrender.all": false,
                "gfx.webrender.force-disabled": true,
                "gfx.webrender.software": false,
                "layers.acceleration.disabled": true,
                "media.hardware-video-decoding.enabled": false
              }
            }
          }
        }
      ]
    : [];

export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/support/global-setup.ts",
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? defaultBaseURL,
    trace: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      ...(runFullChromium ? {} : { grepInvert: /@browser-smoke/ }),
      use: {
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "webkit",
      ...(runFullWebKit ? {} : { grep: /@browser-smoke/ }),
      use: {
        ...devices["Desktop Safari"]
      }
    },
    ...firefoxSmokeProject
  ]
});
