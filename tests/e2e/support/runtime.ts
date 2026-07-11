import { expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { applicationOrigin, isInsideAppBasePath } from "./app";
import {
  customerNames,
  forbiddenTopologyTerms,
  heroCapabilityNames,
  officialDescription,
  officialHeadline,
  productOwners,
  solutionIds
} from "./fixtures";

export async function attachConsoleGuards(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

export function attachDeploymentPathGuards(page: Page) {
  const assetTypes = new Set(["font", "image", "script", "stylesheet"]);
  const failedRequests: string[] = [];
  const asset404s: string[] = [];
  const outOfBasePathAssets: string[] = [];

  page.on("request", (request) => {
    if (!assetTypes.has(request.resourceType())) {
      return;
    }
    const url = new URL(request.url());
    if (url.origin === applicationOrigin && !isInsideAppBasePath(url.pathname)) {
      outOfBasePathAssets.push(url.href);
    }
  });
  page.on("requestfailed", (request) => {
    const url = new URL(request.url());
    if (url.origin === applicationOrigin) {
      failedRequests.push(`${request.resourceType()}: ${url.href}`);
    }
  });
  page.on("response", (response) => {
    const request = response.request();
    const url = new URL(response.url());
    if (url.origin === applicationOrigin && assetTypes.has(request.resourceType()) && response.status() === 404) {
      asset404s.push(url.href);
    }
  });

  return { asset404s, failedRequests, outOfBasePathAssets };
}

export async function waitForScreenshotReadiness(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll((images) => {
    (images as HTMLImageElement[]).forEach((image) => {
      if (!image.complete || image.naturalWidth === 0) {
        image.loading = "eager";
      }
    });
  });
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete && image.naturalWidth > 0),
    undefined,
    { timeout: 15_000 }
  );
  await waitForFrames(page, 2);
}

export async function waitForFrames(page: Page, count = 2) {
  await page.evaluate(
    (frameCount) =>
      new Promise<void>((resolve) => {
        let remaining = frameCount;
        const tick = () => {
          remaining -= 1;
          if (remaining <= 0) {
            resolve();
            return;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    count
  );
}

export async function scrollToSelector(page: Page, selector: string) {
  const target = page.locator(selector).first();
  await expect(target).toBeAttached();
  await page.evaluate((targetSelector) => {
    document.querySelector<HTMLElement>(targetSelector)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, selector);
  await expect(target).toBeVisible();
  await expect(target).toBeInViewport({ ratio: 0.01 });

  const reachedStablePosition = await page.evaluate(
    (targetSelector) =>
      new Promise<boolean>((resolve) => {
        let previousSample = "";
        let stableFrames = 0;
        let attempts = 0;
        const sample = () => {
          const element = document.querySelector<HTMLElement>(targetSelector);
          if (!element) {
            resolve(false);
            return;
          }
          const currentSample = [
            Math.round(window.scrollX * 100) / 100,
            Math.round(window.scrollY * 100) / 100,
            element.offsetTop,
            element.offsetLeft,
            element.offsetWidth,
            element.offsetHeight
          ].join(":");
          stableFrames = currentSample === previousSample ? stableFrames + 1 : 0;
          previousSample = currentSample;
          attempts += 1;
          if (stableFrames >= 2) {
            resolve(true);
            return;
          }
          if (attempts >= 30) {
            resolve(false);
            return;
          }
          window.requestAnimationFrame(sample);
        };
        window.requestAnimationFrame(sample);
      }),
    selector
  );
  expect(reachedStablePosition).toBe(true);
  await waitForFrames(page, 2);
}

export async function waitForMotionReady(page: Page) {
  await expect(page.getByTestId("hero")).toHaveAttribute("data-motion-ready", "true");
  await page.evaluate(() => document.fonts.ready);
  await waitForFrames(page, 2);
}

export async function expectEveryImageLoaded(page: Page) {
  await page.locator("img").evaluateAll((images) => {
    (images as HTMLImageElement[]).forEach((image) => {
      image.loading = "eager";
    });
  });
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete && image.naturalWidth > 0),
    undefined,
    { timeout: 15_000 }
  );

  const imageDimensions = await page.locator("img").evaluateAll((images) =>
    images.map((image) => ({
      height: (image as HTMLImageElement).naturalHeight,
      src: (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src,
      width: (image as HTMLImageElement).naturalWidth
    }))
  );
  expect(imageDimensions.length).toBeGreaterThan(0);
  for (const image of imageDimensions) {
    expect(image.width, image.src).toBeGreaterThan(0);
    expect(image.height, image.src).toBeGreaterThan(0);
  }
}

export async function expectStaticExperience(page: Page) {
  await waitForMotionReady(page);
  await expect(page.getByTestId("hero")).toHaveAttribute("data-hero-progress", "1.000");
  await expect(page.getByTestId("hero")).toHaveAttribute("data-hero-state", "core-settle");
  await expect(page.getByTestId("solutions-handoff")).toHaveAttribute("data-handoff-progress", "1.000");
  await expect(page.getByTestId("solutions-handoff")).toHaveAttribute("data-handoff-state", "connected");
  await expect(page.getByTestId("solutions-section")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator("[data-product-id][data-reveal-state='seen']")).toHaveCount(
    Object.keys(productOwners).length
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(await page.evaluate(() => window.__GTG_CANVAS_MOUNTS__ ?? 0)).toBe(0);

  const pinnedContent = await page.locator("#top .hero-stage, #solutions .solution-article").evaluateAll((elements) =>
    elements.filter((element) => ["fixed", "sticky"].includes(getComputedStyle(element).position)).length
  );
  expect(pinnedContent).toBe(0);
}

export async function expectNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

export async function expectCustomerProof(page: Page) {
  const proof = page.locator("section#proof");
  await expect(proof).toHaveAttribute("aria-labelledby", "proof-heading");
  await expect(proof).toHaveAttribute("data-release-status", "local-only");
  await expect(proof.getByRole("heading", { name: "Representative Customers" })).toBeVisible();
  await expect(proof.getByText("관계 범위 검토 중 · 로컬 프로토타입")).toBeVisible();
  await expect(proof.getByText("특정 제품의 도입", { exact: false })).toBeVisible();
  await expect(proof.getByText("파트너 등급", { exact: false })).toBeVisible();

  const list = proof.getByRole("list", { name: "Representative customers" });
  await expect(list).toHaveCount(1);
  await expect(list.getByRole("listitem")).toHaveCount(customerNames.length);
  await expect(list.locator('[data-relationship-evidence="user-confirmed"]')).toHaveCount(customerNames.length);
  await expect(list.locator('[data-project-display-approval="approved"]')).toHaveCount(customerNames.length);
  await expect(list.locator('[data-third-party-rights="unverified"]')).toHaveCount(customerNames.length);
  await expect(list.locator('[data-approval-reference="Codex task 2026-07-11"]')).toHaveCount(customerNames.length);
  for (const customerName of customerNames) {
    await expect(list.getByText(customerName, { exact: true })).toHaveCount(1);
  }

  await expect(proof.locator("img")).toHaveCount(customerNames.length);
  await expect(page.locator("#top img[src*='customer-logos']")).toHaveCount(0);
  await expect(page.locator(".fallback-proof-strip")).toHaveCount(0);
}

export async function expectCoreSemanticContent(page: Page) {
  await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
  await expect(page.getByText(officialDescription)).toBeVisible();
  await expect(page.getByText("GTG Data Core", { exact: true })).toHaveCount(1);

  const heroCapabilities = page.getByRole("list", { name: "GTG Data Core capability routes" });
  await expect(heroCapabilities.getByRole("listitem")).toHaveCount(heroCapabilityNames.length);
  for (const capabilityName of heroCapabilityNames) {
    await expect(heroCapabilities.getByText(capabilityName, { exact: true })).toHaveCount(1);
  }

  await expectCustomerProof(page);
  for (const solutionId of solutionIds) {
    const article = page.locator(`article#${solutionId}`);
    await expect(article).toHaveCount(1);
    await expect(article.getByRole("heading", { level: 3 })).toHaveCount(1);
    await expect(article.getByRole("list")).toHaveCount(1);
    await expect(article.getByRole("link")).toHaveCount(1);
  }

  await expect(page.locator("section#company").getByRole("heading", { level: 2 })).toHaveCount(1);
  await expect(page.getByRole("list", { name: "GTG capability map nodes" }).getByRole("listitem")).toHaveCount(
    heroCapabilityNames.length
  );
  await expect(page.locator("section#engagement").getByRole("heading", { level: 3 })).toHaveCount(4);
  await expect(page.locator("section#contact").getByRole("heading", { level: 2 })).toHaveCount(1);
  await expect(page.locator("section#contact dl")).toHaveCount(1);
}

function visibleSvgText(svg: string) {
  return [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .join(" ");
}

export function expectSvgSafe(fileName: string) {
  const filePath = path.join(process.cwd(), "public", "generated", "topology", fileName);
  expect(fs.existsSync(filePath)).toBe(true);
  const svg = fs.readFileSync(filePath, "utf8");
  expect(svg).toContain("<title");
  expect(svg).toContain("<desc");
  expect(svg).not.toContain("<image");
  expect(svg).not.toMatch(/\b(?:href|src)=["']https?:\/\//i);
  for (const term of forbiddenTopologyTerms) {
    expect(svg.toLowerCase()).not.toContain(term.toLowerCase());
  }
  expect(visibleSvgText(svg)).not.toMatch(/\b\d+(?:\.\d+)?\s?(?:%|ms|s|x|k|m|gb|tb)\b/i);
}

export async function expectNoExternalImageRequests(page: Page, action: () => Promise<void>) {
  const externalImages: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() !== "image") {
      return;
    }
    const parsedUrl = new URL(request.url());
    const isLocal =
      ["127.0.0.1", "localhost", "::1"].includes(parsedUrl.hostname) ||
      parsedUrl.protocol === "data:" ||
      parsedUrl.protocol === "blob:";
    if (!isLocal) {
      externalImages.push(request.url());
    }
  });
  await action();
  expect(externalImages).toEqual([]);
}
