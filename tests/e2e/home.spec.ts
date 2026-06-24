import { expect, test, type Locator, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const artifactDir = path.join(process.cwd(), "tests", "artifacts");

function ensureArtifacts() {
  fs.mkdirSync(artifactDir, { recursive: true });

  for (const fileName of fs.readdirSync(artifactDir)) {
    if (fileName.endsWith(".png") || fileName.endsWith(".zip") || fileName.endsWith(".webm")) {
      fs.unlinkSync(path.join(artifactDir, fileName));
    }
  }
}

async function attachConsoleGuards(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}

async function capture(page: Page, name: string) {
  await page.screenshot({
    path: path.join(artifactDir, `${name}.png`),
    fullPage: false
  });
}

async function waitForFrames(page: Page, count = 2) {
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

async function scrollHeroTo(page: Page, progress: number) {
  await page.evaluate((targetProgress) => {
    const hero = document.querySelector<HTMLElement>('[data-testid="hero"]');
    if (!hero) {
      return;
    }

    const top = hero.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(hero.offsetHeight - window.innerHeight, 0);
    window.scrollTo({ top: top + scrollable * targetProgress, behavior: "instant" });
  }, progress);
}

async function waitForHeroState(page: Page, state: string, minProgress: number, maxProgress = 1) {
  await page.waitForFunction(
    ({ expectedState, min, max }) => {
      const hero = document.querySelector<HTMLElement>('[data-testid="hero"]');
      const progress = Number(hero?.dataset.heroProgress ?? "0");
      return hero?.dataset.heroState === expectedState && progress >= min && progress <= max;
    },
    { expectedState: state, min: minProgress, max: maxProgress }
  );
  await waitForFrames(page);
}

async function scrollSolutionsTo(page: Page, progress: number) {
  await page.evaluate((targetProgress) => {
    const solutions = document.querySelector<HTMLElement>('[data-testid="solutions-section"]');
    if (!solutions) {
      return;
    }

    const top = solutions.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(solutions.offsetHeight - window.innerHeight, 0);
    window.scrollTo({ top: top + scrollable * targetProgress, behavior: "instant" });
  }, progress);
}

async function waitForActiveSolution(page: Page, index: string) {
  await expect(page.getByTestId("solutions-section")).toHaveAttribute("data-active-solution", index);
  await page.waitForFunction((activeIndex) => {
    const slideNumber = Number(activeIndex);
    const slide = document.querySelector<HTMLElement>(`[data-testid="solution-slide-${slideNumber}"]`);
    if (!slide || !slide.classList.contains("is-active")) {
      return false;
    }

    const styles = window.getComputedStyle(slide);
    return Number(styles.opacity) > 0.98 && (styles.filter === "none" || styles.filter === "blur(0px)");
  }, index);
  await waitForFrames(page, 3);
}

function expectViewportSize(page: Page) {
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  return viewport!;
}

function intersectsViewport(
  box: { x: number; y: number; width: number; height: number },
  viewport: { width: number; height: number }
) {
  return box.x < viewport.width && box.x + box.width > 0 && box.y < viewport.height && box.y + box.height > 0;
}

async function expectLocatorInViewport(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(intersectsViewport(box!, expectViewportSize(page))).toBe(true);
  return box!;
}

async function expectLocatorOutsideViewport(page: Page, locator: Locator) {
  const box = await locator.boundingBox();
  if (!box) {
    return;
  }

  expect(intersectsViewport(box, expectViewportSize(page))).toBe(false);
}

async function scrollSlideToStart(page: Page, testId: string) {
  await page.evaluate((targetTestId) => {
    const element = document.querySelector<HTMLElement>(`[data-testid="${targetTestId}"]`);
    element?.scrollIntoView({
      behavior: "instant" as ScrollBehavior,
      block: "start"
    });
  }, testId);
  await waitForFrames(page, 3);
}

async function expectSlideAtViewportStart(page: Page, testId: string) {
  const box = await expectLocatorInViewport(page, page.getByTestId(testId));
  expect(box.y).toBeGreaterThanOrEqual(-20);
  expect(box.y).toBeLessThanOrEqual(120);
  expect(box.y + box.height).toBeGreaterThan(0);
}

async function expectStaticKeywordReady(page: Page) {
  const keyword = page.locator(".keyword-text");
  await expect(keyword).toHaveText("Analytical layers");
  const styles = await keyword.evaluate((element) => {
    const computed = window.getComputedStyle(element);
    return {
      animationDuration: computed.animationDuration,
      animationName: computed.animationName,
      filter: computed.filter,
      opacity: computed.opacity,
      transform: computed.transform,
      transitionDuration: computed.transitionDuration
    };
  });

  const transitionDurations = styles.transitionDuration.split(",").map((duration) => duration.trim());
  expect(styles.opacity).toBe("1");
  expect(["none", "blur(0px)"]).toContain(styles.filter);
  expect(styles.transform).toBe("none");
  expect(styles.animationName).toBe("none");
  expect(styles.animationDuration).toBe("0s");
  expect(transitionDurations.every((duration) => duration === "0s" || duration === "0ms")).toBe(true);
}

async function expectNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function expectNoTbdInUi(page: Page) {
  const text = await page.locator("body").innerText();
  expect(text).not.toContain("[TBD]");
}

test.beforeAll(() => {
  ensureArtifacts();
});

test("desktop Hero carousel, pullback, handoff, and solution sequence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);
  await page.context().tracing.start({ screenshots: true, snapshots: true, sources: true });

  await page.goto("/");
  await expect(page.getByTestId("hero")).toBeVisible();
  await waitForHeroState(page, "initial", 0, 0.03);
  await expect(page.getByRole("heading", { name: "Complex systems, made clear." })).toBeVisible();
  await expect(page.getByTestId("webgl-hero").locator("canvas")).toBeVisible();
  await capture(page, "01-desktop-hero-initial");

  const dataUrlLength = await page.getByTestId("webgl-hero").locator("canvas").evaluate((canvas) =>
    (canvas as HTMLCanvasElement).toDataURL("image/png").length
  );
  expect(dataUrlLength).toBeGreaterThan(5000);

  await expect(page.locator(".keyword-text")).not.toHaveText("Analytical layers", { timeout: 5_000 });
  await scrollHeroTo(page, 0.28);
  await waitForHeroState(page, "orbit", 0.26, 0.31);
  await capture(page, "02-desktop-hero-mid-carousel");

  await scrollHeroTo(page, 0.7);
  await waitForHeroState(page, "pullback", 0.68, 0.72);
  await capture(page, "03-desktop-full-ring");

  await scrollHeroTo(page, 0.88);
  await waitForHeroState(page, "handoff", 0.86, 0.9);
  await capture(page, "04-desktop-handoff-overlap");

  await scrollSolutionsTo(page, 0);
  await expect(page.getByTestId("solutions-section")).toBeVisible();
  await waitForActiveSolution(page, "01");
  await expect(
    page.getByTestId("solution-slide-1").getByRole("heading", { name: "Data & Analytics" })
  ).toBeVisible();
  await capture(page, "05-desktop-solution-1");

  await scrollSolutionsTo(page, 0.98);
  await waitForActiveSolution(page, "05");
  await expect(
    page.getByTestId("solution-slide-5").getByRole("heading", { name: "Consulting & Technical Support" })
  ).toBeVisible();
  await capture(page, "10-desktop-solution-5");

  await scrollHeroTo(page, 0.45);
  await waitForHeroState(page, "pullback", 0.44, 0.48);

  await page.setViewportSize({ width: 1280, height: 720 });
  await waitForFrames(page, 4);
  await expect(page.getByTestId("hero")).toBeVisible();

  const triggerCount = await page.evaluate(() => window.__GTG_SCROLLTRIGGERS__ ?? 0);
  const solutionTriggerCount = await page.evaluate(() => window.__GTG_SOLUTION_TRIGGERS__ ?? 0);
  expect(triggerCount).toBeLessThanOrEqual(2);
  expect(solutionTriggerCount).toBeLessThanOrEqual(2);
  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  expect(errors).toEqual([]);
  await page.context().tracing.stop({ path: path.join(artifactDir, "hero-to-solution-trace.zip") });
});

test("mobile Hero and first Solution use simplified flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByTestId("mobile-fallback-hero")).toBeVisible();
  await expectStaticKeywordReady(page);
  await capture(page, "06-mobile-hero");

  for (const [index, slide] of ["01", "02", "03", "04", "05"].entries()) {
    await expect(page.getByTestId(`solution-slide-${index + 1}`).locator(".solution-index")).toHaveAttribute(
      "aria-label",
      `${slide} / 05`
    );
  }

  await scrollSlideToStart(page, "solution-slide-1");
  const firstSlide = page.getByTestId("solution-slide-1");
  await expectLocatorInViewport(page, firstSlide.getByText("Solution 01"));
  await expectLocatorInViewport(page, firstSlide.getByRole("heading", { name: "Data & Analytics" }));
  await expectLocatorOutsideViewport(
    page,
    page.getByTestId("solution-slide-3").getByRole("heading", { name: "Infrastructure Automation" })
  );
  await expectSlideAtViewportStart(page, "solution-slide-1");
  await capture(page, "07-mobile-solution-1");

  await scrollSlideToStart(page, "solution-slide-5");
  const fifthSlide = page.getByTestId("solution-slide-5");
  await expectLocatorInViewport(page, fifthSlide.getByText("Solution 05"));
  await expectLocatorInViewport(page, fifthSlide.getByRole("heading", { name: "Consulting & Technical Support" }));
  await expectSlideAtViewportStart(page, "solution-slide-5");
  await capture(page, "11-mobile-solution-5");

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  expect(errors).toEqual([]);
});

test("reduced-motion Hero renders static HTML service cards", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await expect(page.getByTestId("reduced-motion-hero")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await capture(page, "08-reduced-motion-hero");

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  expect(errors).toEqual([]);
});

test("forceFallback query renders graceful HTML fallback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/?forceFallback=1");
  await expect(page.getByTestId("force-fallback-hero")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expectStaticKeywordReady(page);
  await capture(page, "09-force-fallback-hero");

  await page.getByTestId("solutions-section").scrollIntoViewIfNeeded();
  await expect(page.getByTestId("solutions-section")).toBeVisible();

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  expect(errors).toEqual([]);
});

declare global {
  interface Window {
    __GTG_SCROLLTRIGGERS__?: number;
    __GTG_SOLUTION_TRIGGERS__?: number;
  }
}
