import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { EXPERIENCE_MOTION, type ProductRevealState } from "../../src/components/motion/experience-motion";
import { appRoute } from "./support/app";
import { captureExperience, captureIa, captureSectionFrame } from "./support/artifacts";
import {
  consultingSupportCapabilities,
  detailedDesktopViewportName,
  officialHeadline,
  productOwners,
  requiredViewports,
  solutionIds,
  solutionIdsByKey
} from "./support/fixtures";
import { scrollHeroToProgress } from "./support/motion";
import {
  attachConsoleGuards,
  attachDeploymentPathGuards,
  expectCustomerProof,
  expectEveryImageLoaded,
  expectNoExternalImageRequests,
  expectNoOverflow,
  expectStaticExperience,
  scrollToSelector,
  waitForFrames,
  waitForMotionReady
} from "./support/runtime";
import { contentSourceFiles, readSourceFiles } from "./support/sources";
import { trackCanvasMounts } from "./support/webgl";

test("customer proof is contextual and product marks belong only to stable Solution ids", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);

  await expectNoExternalImageRequests(page, async () => {
    await page.goto(appRoute());
    await expectCustomerProof(page);

    await expect(page.locator("#top [data-product-id], #proof [data-product-id]")).toHaveCount(0);
    await expect(page.locator(".hero-solution-stack, .solution-stack-static, .solution-rail")).toHaveCount(0);
    for (const [productId, solutionId] of Object.entries(productOwners)) {
      const product = page.locator(`[data-product-id='${productId}']`);
      await expect(product).toHaveCount(1);
      expect(await product.evaluate((element) => element.closest("article")?.id)).toBe(solutionId);
    }

    const consultingSupportSolution = page.locator(`#${solutionIdsByKey.consultingSupport}`);
    await expect(consultingSupportSolution.locator("[data-product-id]")).toHaveCount(0);
    await expect(consultingSupportSolution.getByText("GTG Support Scope", { exact: true })).toHaveCount(0);
    await expect(
      consultingSupportSolution.locator(".solution-spotlight-scope-list, .solution-spotlight-scope-title")
    ).toHaveCount(0);
    const capabilityList = consultingSupportSolution.getByRole("list", {
      name: "Consulting & Technical Support capabilities"
    });
    await expect(capabilityList).toHaveCount(1);
    await expect(capabilityList.getByRole("listitem")).toHaveCount(consultingSupportCapabilities.length);
    for (const capability of consultingSupportCapabilities) {
      await expect(capabilityList.getByText(capability, { exact: true })).toHaveCount(1);
    }
  });

  const structuralSources = [
    "src/components/sections/hero-experience.tsx",
    "src/components/sections/hero-fallback.tsx",
    "src/components/sections/solution-sequence.tsx",
    ...contentSourceFiles
  ];
  const structuralSource = readSourceFiles(structuralSources);
  expect(structuralSource).not.toMatch(
    /\b(?:solutionSlides|heroCustomers|heroRingCustomers|customers)\s*\[\s*\d+\s*\]/
  );
  const heroCanvasSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/three/hero-canvas.tsx"),
    "utf8"
  );
  expect(heroCanvasSource).not.toMatch(/CanvasTexture|customerProofItems|heroCustomers|customer-logos/i);
  expect(errors).toEqual([]);
});

test("customer proof carousel is manual, keyboard accessible, and keeps every customer semantic", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);
  await page.goto(appRoute());
  await expectCustomerProof(page);

  const carousel = page.getByRole("group", { name: "Representative Customers" });
  const track = page.locator("#customer-proof-track");
  const previousButton = carousel.getByRole("button", { name: "이전 고객사 보기" });
  const nextButton = carousel.getByRole("button", { name: "다음 고객사 보기" });
  const initialScrollLeft = await track.evaluate((element) => element.scrollLeft);

  await expect(previousButton).toBeDisabled();
  await expect(nextButton).toBeEnabled();
  await page.waitForTimeout(500);
  expect(await track.evaluate((element) => element.scrollLeft)).toBe(initialScrollLeft);

  await nextButton.focus();
  await expect(nextButton).toBeFocused();
  await page.keyboard.press("Enter");
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(initialScrollLeft);
  await expect(previousButton).toBeEnabled();
  await expect(carousel.getByText("현재 고객사 2 / 18", { exact: true })).toHaveCount(1);
  await expect(track.locator("[aria-hidden='true'], [inert]")).toHaveCount(0);
  await expect(track.getByRole("listitem")).toHaveCount(18);
  expect(errors).toEqual([]);
});

test("reduced motion customer carousel moves without smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(appRoute());

  const carousel = page.getByRole("group", { name: "Representative Customers" });
  const track = page.locator("#customer-proof-track");
  await carousel.getByRole("button", { name: "다음 고객사 보기" }).click();

  await expect(track).toHaveCSS("scroll-behavior", "auto");
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(carousel.getByText("현재 고객사 2 / 18", { exact: true })).toHaveCount(1);
});

test("each product reveal runs once and stays seen through boundary jitter", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  await page.goto(appRoute());
  await waitForMotionReady(page);
  await expect(page.getByTestId("solutions-section")).toHaveAttribute("data-motion-mode", "motion");
  await expect(page.locator("[data-product-id][data-reveal-state='idle']")).toHaveCount(
    Object.keys(productOwners).length
  );

  await page.evaluate(() => {
    window.__GTG_REVEAL_TRANSITIONS__ = {};
    const reveals = document.querySelectorAll<HTMLElement>("[data-product-id][data-reveal-state]");
    for (const reveal of reveals) {
      const productId = reveal.dataset.productId;
      if (!productId) {
        continue;
      }
      window.__GTG_REVEAL_TRANSITIONS__[productId] = [
        (reveal.dataset.revealState ?? "idle") as ProductRevealState
      ];
    }
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        const reveal = record.target as HTMLElement;
        const productId = reveal.dataset.productId;
        if (!productId || !window.__GTG_REVEAL_TRANSITIONS__) {
          continue;
        }
        window.__GTG_REVEAL_TRANSITIONS__[productId] ??= [];
        window.__GTG_REVEAL_TRANSITIONS__[productId].push(
          (reveal.dataset.revealState ?? "idle") as ProductRevealState
        );
      }
    });
    reveals.forEach((reveal) => observer.observe(reveal, { attributeFilter: ["data-reveal-state"] }));
  });

  for (const [productId, solutionId] of Object.entries(productOwners)) {
    const reveal = page.getByTestId(`product-reveal-${productId}`);
    await scrollToSelector(page, `[data-testid='product-reveal-${productId}']`);
    await expect(reveal).toHaveAttribute("data-reveal-state", "seen");
    expect(await reveal.evaluate((element) => element.closest("article")?.id)).toBe(solutionId);

    for (const delta of [-60, 60, -40, 40]) {
      await page.mouse.wheel(0, delta);
      await waitForFrames(page, 2);
      await expect(reveal).toHaveAttribute("data-reveal-state", "seen");
    }
  }

  const transitions = await page.evaluate(() => window.__GTG_REVEAL_TRANSITIONS__ ?? {});
  for (const productId of Object.keys(productOwners)) {
    expect(transitions[productId]?.filter((state) => state === "active")).toHaveLength(1);
    expect(transitions[productId]?.at(-1)).toBe("seen");
  }

  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
});

test("desktop redesign screenshots cover every major section at required resolutions", async ({ page }) => {
  test.slow();
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  const desktopViewports = requiredViewports.filter((viewport) => viewport.name.startsWith("desktop"));
  const { activeEnd, identityEnd, pullbackEnd } = EXPERIENCE_MOTION.hero.boundaries;
  const captureProgress = {
    coreActive: (identityEnd + activeEnd) / 2,
    corePullback: (activeEnd + pullbackEnd) / 2,
    coreSettle: (pullbackEnd + 1) / 2
  };

  for (const viewport of desktopViewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(appRoute());
    await waitForMotionReady(page);
    await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "motion");
    await expect(page.locator("#top canvas")).toHaveCount(1);
    await expect(page.locator("main#main-content > section:not(#top) canvas")).toHaveCount(0);

    await captureExperience(page, `${viewport.name}-hero-identity`);
    if (viewport.name === detailedDesktopViewportName) {
      await scrollHeroToProgress(page, captureProgress.coreActive, "core-active");
      await captureExperience(page, `${viewport.name}-hero-core-active`);
      await scrollHeroToProgress(page, captureProgress.corePullback, "core-pullback");
      await captureExperience(page, `${viewport.name}-hero-core-pullback`);
    }
    await scrollHeroToProgress(page, captureProgress.coreSettle, "core-settle");
    await captureExperience(page, `${viewport.name}-hero-core-settle`);

    const frames =
      viewport.name === detailedDesktopViewportName
        ? [
            { name: "proof", selector: "#proof" },
            { name: "handoff", selector: "[data-testid='solutions-handoff']" },
            { name: "solution-01", productId: "vertica", selector: `#${solutionIdsByKey.dataAnalytics}` },
            { name: "solution-02", productId: "confluent", selector: `#${solutionIdsByKey.dataStreaming}` },
            {
              name: "solution-03",
              productId: "hashicorp",
              selector: `#${solutionIdsByKey.infrastructureAutomation}`
            },
            { name: "solution-04", productId: "loadrunner", selector: `#${solutionIdsByKey.devopsQuality}` },
            { name: "solution-05", selector: `#${solutionIdsByKey.consultingSupport}` },
            { name: "company", selector: "#company" },
            { name: "engagement", selector: "#engagement" },
            { name: "contact", selector: "#contact" }
          ]
        : [
            { name: "proof", selector: "#proof" },
            { name: "handoff", selector: "[data-testid='solutions-handoff']" },
            { name: "solution-01", productId: "vertica", selector: `#${solutionIdsByKey.dataAnalytics}` },
            { name: "solution-05", selector: `#${solutionIdsByKey.consultingSupport}` },
            { name: "contact", selector: "#contact" }
          ];

    for (const frame of frames) {
      await captureSectionFrame(page, viewport.name, frame);
    }
    await expectEveryImageLoaded(page);
    await expectNoOverflow(page);
  }

  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
});

test("mobile redesign screenshots keep the full flow static at every required viewport", async ({ page }) => {
  test.slow();
  await trackCanvasMounts(page);
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  const mobileViewports = requiredViewports.filter((viewport) => viewport.name.startsWith("mobile"));

  for (const viewport of mobileViewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(appRoute());
    await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "mobile");
    await expectStaticExperience(page);
    await expect(page.getByTestId("mobile-fallback-hero")).toBeVisible();
    const heroCtaBounds = await page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" }).evaluate(
      (cta) => {
        const rect = cta.getBoundingClientRect();
        return { bottom: rect.bottom, height: rect.height, top: rect.top, viewportHeight: window.innerHeight };
      }
    );
    expect(heroCtaBounds.height).toBeGreaterThan(0);
    expect(heroCtaBounds.top).toBeGreaterThanOrEqual(0);
    expect(heroCtaBounds.bottom).toBeLessThanOrEqual(heroCtaBounds.viewportHeight + 2);
    await captureExperience(page, `${viewport.name}-hero`);

    for (const frame of [
      { name: "proof", selector: "#proof" },
      { name: "handoff", selector: "[data-testid='solutions-handoff']" },
      { name: "solution-01", productId: "vertica", selector: `#${solutionIdsByKey.dataAnalytics}` },
      { name: "solution-05", selector: `#${solutionIdsByKey.consultingSupport}` },
      { name: "contact", selector: "#contact" }
    ]) {
      await captureSectionFrame(page, viewport.name, frame);
    }

    await expectEveryImageLoaded(page);
    await expectNoOverflow(page);
  }

  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
});

test("mobile keeps proof context and all Solutions in normal document flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await trackCanvasMounts(page);
  const errors = await attachConsoleGuards(page);
  await page.goto(appRoute());

  await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "mobile");
  await expect(page.getByTestId("mobile-fallback-hero")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(await page.evaluate(() => window.__GTG_CANVAS_MOUNTS__ ?? 0)).toBe(0);
  await expect(page.locator("#top img[src*='customer-logos']")).toHaveCount(0);
  await expectCustomerProof(page);
  await captureIa(page, "06-mobile-hero");
  await scrollToSelector(page, "#proof");
  await captureIa(page, "07-mobile-proof");

  const articlePositions = await page.locator("#solutions article").evaluateAll((articles) =>
    articles.map((article) => ({ id: article.id, top: (article as HTMLElement).offsetTop }))
  );
  expect(articlePositions.map((article) => article.id)).toEqual(solutionIds);
  for (let index = 1; index < articlePositions.length; index += 1) {
    expect(articlePositions[index].top).toBeGreaterThan(articlePositions[index - 1].top);
  }
  for (const solutionId of solutionIds) {
    const article = page.locator(`article#${solutionId}`);
    await expect(article).not.toHaveAttribute("aria-hidden", "true");
    await expect(article).not.toHaveAttribute("inert", "");
  }

  await scrollToSelector(page, `#${solutionIdsByKey.dataAnalytics}-title`);
  await captureIa(page, "08-mobile-solution-1");
  await scrollToSelector(page, `#${solutionIdsByKey.consultingSupport}-title`);
  await captureIa(page, "09-mobile-solution-5");
  await expectNoOverflow(page);

  for (const viewport of [
    { width: 360, height: 640 },
    { width: 430, height: 932 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(appRoute());
    await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "mobile");
    await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
    await expect(page.getByText("GTG Data Core", { exact: true })).toBeVisible();
    await expect(page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    expect(await page.evaluate(() => window.__GTG_CANVAS_MOUNTS__ ?? 0)).toBe(0);
    await expectNoOverflow(page);
  }
  expect(errors).toEqual([]);
});
