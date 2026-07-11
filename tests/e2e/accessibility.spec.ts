import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { appHomePath, appRoute } from "./support/app";
import { afterArtifactDir, captureExperience, captureIa, captureSectionFrame } from "./support/artifacts";
import { officialHeadline, requiredViewports, solutionIds, solutionIdsByKey } from "./support/fixtures";
import {
  attachConsoleGuards,
  attachDeploymentPathGuards,
  expectCoreSemanticContent,
  expectEveryImageLoaded,
  expectNoOverflow,
  expectStaticExperience,
  scrollToSelector,
  waitForFrames
} from "./support/runtime";
import {
  collectClientChunkRequests,
  readWebGLRuntime,
  requestedThreeClientChunks,
  trackCanvasMounts,
  trackWebGLRuntime
} from "./support/webgl";

test("approved information architecture has labelled landmarks and a valid heading hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await trackCanvasMounts(page);
  const errors = await attachConsoleGuards(page);
  await page.goto(appRoute());

  await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "motion");
  await expect(page.locator("#top canvas")).toHaveCount(1);
  await expect(page.locator("canvas")).toHaveCount(1);
  expect(await page.evaluate(() => window.__GTG_CANVAS_MOUNTS__ ?? 0)).toBeGreaterThan(0);
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.locator("main#main-content")).toHaveAttribute("tabindex", "-1");
  await expect(page.getByRole("contentinfo")).toHaveCount(1);

  const mainChildren = await page.locator("main#main-content").evaluate((main) =>
    Array.from(main.children).map((child) => ({
      id: child.id,
      tag: child.tagName.toLowerCase(),
      testId: child.getAttribute("data-testid")
    }))
  );
  expect(mainChildren).toEqual([
    { id: "top", tag: "section", testId: "hero" },
    { id: "proof", tag: "section", testId: "customer-proof-band" },
    { id: "", tag: "div", testId: "solutions-handoff" },
    { id: "solutions", tag: "section", testId: "solutions-section" },
    { id: "company", tag: "section", testId: "company-section" },
    { id: "engagement", tag: "section", testId: "engagement-section" },
    { id: "contact", tag: "section", testId: "contact-section" }
  ]);

  const labelledSections = {
    top: "hero-heading",
    proof: "proof-heading",
    solutions: "solutions-heading",
    company: "company-heading",
    engagement: "engagement-heading",
    contact: "contact-heading"
  } as const;
  for (const [sectionId, headingId] of Object.entries(labelledSections)) {
    await expect(page.locator(`section#${sectionId}`)).toHaveAttribute("aria-labelledby", headingId);
    await expect(page.locator(`#${headingId}`)).toHaveCount(1);
  }

  const outline = await page.locator("main h1, main h2, main h3").evaluateAll((headings) =>
    headings.map((heading) => ({ id: heading.id, level: Number(heading.tagName.slice(1)) }))
  );
  expect(outline.filter((heading) => heading.level === 1)).toEqual([{ id: "hero-heading", level: 1 }]);
  expect(outline.find((heading) => heading.id === "proof-heading")?.level).toBe(2);
  expect(outline.find((heading) => heading.id === "solutions-heading")?.level).toBe(2);
  for (const solutionId of solutionIds) {
    expect(outline.find((heading) => heading.id === `${solutionId}-title`)?.level).toBe(3);
  }
  for (let index = 1; index < outline.length; index += 1) {
    expect(outline[index].level - outline[index - 1].level).toBeLessThanOrEqual(1);
  }
  fs.writeFileSync(
    path.join(afterArtifactDir, "00-dom-structure.json"),
    `${JSON.stringify({ mainChildren, outline }, null, 2)}\n`,
    "utf8"
  );

  const handoff = page.getByTestId("solutions-handoff");
  await expect(handoff).toHaveAttribute("aria-hidden", "true");
  await expect(handoff.getByRole("heading")).toHaveCount(0);
  await expect(handoff.locator("[data-product-id]")).toHaveCount(0);
  await expect(handoff.locator("[data-route-id]")).toHaveCount(solutionIds.length);

  await expectCoreSemanticContent(page);
  await captureIa(page, "01-desktop-hero");
  await scrollToSelector(page, "#proof");
  await captureIa(page, "02-desktop-proof");
  await scrollToSelector(page, "[data-testid='solutions-handoff']");
  await captureIa(page, "03-desktop-handoff-solutions");
  await scrollToSelector(page, `#${solutionIdsByKey.dataAnalytics}-title`);
  await captureIa(page, "04-desktop-solution-1");
  await scrollToSelector(page, `#${solutionIdsByKey.consultingSupport}-title`);
  await captureIa(page, "05-desktop-solution-5");

  await expectNoOverflow(page);
  expect(errors).toEqual([]);
});

test("reduced motion never mounts Canvas and keeps all semantic content", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const chunkRequests = collectClientChunkRequests(page);
  await trackCanvasMounts(page);
  await trackWebGLRuntime(page);
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  await page.goto(appRoute());

  await expect(page.getByTestId("reduced-motion-hero")).toBeVisible();
  await expectStaticExperience(page);
  await page.waitForLoadState("networkidle");
  const telemetry = await readWebGLRuntime(page);
  expect(telemetry.firstAnimationFrameCanvasCount).toBe(0);
  expect(telemetry.canvasDomMounts).toBe(0);
  expect(telemetry.webglContextRequests).toBe(0);
  expect(telemetry.drawCalls).toBe(0);
  expect(requestedThreeClientChunks(chunkRequests)).toEqual([]);
  await expectCoreSemanticContent(page);
  await captureIa(page, "10-reduced-hero");
  await captureExperience(page, "reduced-1280x720-hero");
  await scrollToSelector(page, "#proof");
  await captureIa(page, "11-reduced-proof");
  await captureExperience(page, "reduced-1280x720-proof");
  await scrollToSelector(page, "#solutions");
  await captureIa(page, "12-reduced-solutions");
  await captureExperience(page, "reduced-1280x720-solutions");
  await scrollToSelector(page, "#contact");
  await captureExperience(page, "reduced-1280x720-contact");
  await expectEveryImageLoaded(page);
  await expectNoOverflow(page);
  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
});

test("forceFallback keeps services, customers, Solutions, Company, Engagement, and Contact without Canvas", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await trackCanvasMounts(page);
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  await page.goto(appRoute("/?forceFallback=1"));

  const currentUrl = new URL(page.url());
  expect(currentUrl.pathname).toBe(appHomePath);
  expect(currentUrl.searchParams.get("forceFallback")).toBe("1");
  await expect(page.getByTestId("force-fallback-hero")).toBeVisible();
  await expectStaticExperience(page);
  await expect(page.locator(".fallback-proof-strip, .fallback-service-rail")).toHaveCount(0);
  await expectCoreSemanticContent(page);
  await captureIa(page, "13-force-fallback");
  await captureExperience(page, "force-fallback-390x844-hero");
  for (const frame of [
    { name: "proof", selector: "#proof" },
    { name: "solution-01", productId: "vertica", selector: `#${solutionIdsByKey.dataAnalytics}` },
    { name: "solution-05", selector: `#${solutionIdsByKey.consultingSupport}` },
    { name: "contact", selector: "#contact" }
  ]) {
    await captureSectionFrame(page, "force-fallback-390x844", frame);
  }
  await expectEveryImageLoaded(page);
  await expectNoOverflow(page);
  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
});

test("layout has no horizontal overflow across required viewports", async ({ page }) => {
  const viewports = [
    ...requiredViewports.map(({ width, height }) => ({ width, height })),
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
    { width: 844, height: 390 }
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto(appRoute());
    await waitForFrames(page, 2);
    await expectNoOverflow(page);
  }
});

test("zoom-equivalent viewport and forced colors keep core information", async ({ page }) => {
  // A 640×360 CSS viewport represents a 1280×720 viewport at 200% browser zoom.
  await page.setViewportSize({ width: 640, height: 360 });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto(appRoute());

  expect(await page.evaluate(() => window.matchMedia("(forced-colors: active)").matches)).toBe(true);
  await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Representative Customers" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "GTG Solutions" })).toBeAttached();
  await expect(page.locator("#contact-heading")).toBeAttached();
  await expectNoOverflow(page);

  await scrollToSelector(page, "#contact");
  await expect(page.locator("#contact-heading")).toBeVisible();
});

test("cross-browser smoke keeps the semantic baseline reachable @browser-smoke", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(appRoute());
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Representative Customers" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "GTG Solutions" })).toBeAttached();
  await expect(page.locator("#solutions article")).toHaveCount(solutionIds.length);
  await expectNoOverflow(page);
});
