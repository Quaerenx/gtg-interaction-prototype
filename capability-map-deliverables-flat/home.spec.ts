import { expect, test, type Locator, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const artifactDir = path.join(process.cwd(), "tests", "artifacts");
const contentArtifactDir = path.join(artifactDir, "content-integration");
const customerCardArtifactDir = path.join(artifactDir, "customer-card-system");
const topologyArtifactDir = path.join(artifactDir, "topology-svg-kit");
const capabilityArtifactDir = path.join(artifactDir, "capability-map");
const officialHeadline = "데이터 분석, 스트리밍, 인프라 자동화, DevOps 품질을 함께 설계합니다.";
const officialDescription =
  "GTG는 Bigdata Analytics, Confluent, HashiCorp, DevOps 솔루션과 DB/테스트/프로세스 컨설팅을 중심으로 기업 IT 시스템의 구축과 운영을 지원합니다.";
const customerProofKeyword = "Representative Customers";
const customerNames = [
  "KT",
  "LG Electronics",
  "Konkuk University Hospital",
  "Construction Workers Mutual Aid Association",
  "Korea University Medicine",
  "Supreme Prosecutors' Office",
  "Misto Holdings",
  "Bithumb",
  "Samsung SDS",
  "Samsung Electronics",
  "Saemaul Geumgo",
  "Seoul Medical Center",
  "Shinhan Bank",
  "Ulsan University Hospital",
  "PTKOREA",
  "KOMSCO",
  "Techfin Ratings",
  "Korea Credit Information Services"
];
const unsupportedCustomerClaims = [
  "Certified partner",
  "Official partner",
  "Proven ROI",
  "ROI",
  "DORA elite",
  "Improved performance by",
  "performance improved",
  "Reduced cost by",
  "Reduced cost",
  "customer outcome",
  "case result"
];
const topologySvgFiles = [
  "gtg-primitives.svg",
  "gtg-data-analytics.svg",
  "gtg-data-streaming.svg",
  "gtg-infrastructure-automation.svg",
  "gtg-devops-quality.svg",
  "gtg-consulting-support.svg"
];
const capabilitySvgFiles = ["gtg-capability-map.svg", "gtg-capability-map-mobile.svg"];
const capabilityNodeNames = [
  "Data & Analytics",
  "Data Streaming",
  "Infrastructure Automation",
  "DevOps & Quality",
  "Consulting & Technical Support"
];
const forbiddenTopologyTerms = [
  "Kafka",
  "Confluent",
  "AWS",
  "Azure",
  "GCP",
  "Google Cloud",
  "HashiCorp",
  "LoadRunner",
  "Vertica",
  "DORA",
  "ROI",
  "Certified partner",
  "Official partner",
  "customer logo"
];

function ensureArtifacts() {
  fs.mkdirSync(artifactDir, { recursive: true });
  fs.mkdirSync(contentArtifactDir, { recursive: true });
  fs.mkdirSync(customerCardArtifactDir, { recursive: true });
  fs.mkdirSync(topologyArtifactDir, { recursive: true });
  fs.mkdirSync(capabilityArtifactDir, { recursive: true });

  for (const fileName of fs.readdirSync(artifactDir)) {
    if (fileName.endsWith(".png") || fileName.endsWith(".zip") || fileName.endsWith(".webm")) {
      fs.unlinkSync(path.join(artifactDir, fileName));
    }
  }

  for (const fileName of fs.readdirSync(contentArtifactDir)) {
    if (fileName.endsWith(".png") || fileName.endsWith(".zip") || fileName.endsWith(".webm")) {
      fs.unlinkSync(path.join(contentArtifactDir, fileName));
    }
  }

  for (const fileName of fs.readdirSync(customerCardArtifactDir)) {
    if (fileName === "customer-card-contact-sheet.png") {
      continue;
    }

    if (fileName.endsWith(".png") || fileName.endsWith(".zip") || fileName.endsWith(".webm")) {
      fs.unlinkSync(path.join(customerCardArtifactDir, fileName));
    }
  }

  for (const fileName of fs.readdirSync(topologyArtifactDir)) {
    if (fileName.endsWith(".png") || fileName.endsWith(".zip") || fileName.endsWith(".webm")) {
      fs.unlinkSync(path.join(topologyArtifactDir, fileName));
    }
  }

  for (const fileName of fs.readdirSync(capabilityArtifactDir)) {
    if (fileName.endsWith(".png") || fileName.endsWith(".zip") || fileName.endsWith(".webm")) {
      fs.unlinkSync(path.join(capabilityArtifactDir, fileName));
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

async function captureContent(page: Page, name: string) {
  await page.screenshot({
    path: path.join(contentArtifactDir, `${name}.png`),
    fullPage: false
  });
}

async function captureCustomerCard(page: Page, name: string) {
  await page.screenshot({
    path: path.join(customerCardArtifactDir, `${name}.png`),
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

async function expectLocatorFullyInViewport(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  const viewport = expectViewportSize(page);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
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

async function scrollTestIdToStart(page: Page, testId: string) {
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
  await expect(keyword).toHaveText(customerProofKeyword);
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

async function expectCustomerProofKeyword(page: Page) {
  const keyword = page.locator(".keyword-text");
  await expect(keyword).toHaveText(customerProofKeyword);
  await expect(keyword).not.toHaveText("Vertica Analytics");
}

async function expectNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function expectNoTbdInUi(page: Page) {
  const text = await page.locator("body").innerText();
  expect(text).not.toContain("[TBD]");
}

async function waitForHeaderTheme(page: Page, theme: "dark" | "light") {
  await expect(page.locator(".site-header")).toHaveAttribute("data-theme", theme);
}

async function expectElementBelowHeader(page: Page, locator: Locator) {
  const headerBox = await page.locator(".site-header").boundingBox();
  const targetBox = await expectLocatorInViewport(page, locator);
  expect(headerBox).not.toBeNull();
  expect(targetBox.y).toBeGreaterThanOrEqual(Math.floor(headerBox!.height) - 2);
}

async function waitForTestIdBelowHeader(page: Page, testId: string) {
  await page.waitForFunction((targetTestId) => {
    const header = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect();
    const target = document.querySelector<HTMLElement>(`[data-testid="${targetTestId}"]`)?.getBoundingClientRect();
    if (!header || !target) {
      return false;
    }

    const lowerBound = Math.floor(header.height) - 2;
    const upperBound = Math.floor(header.height) + 120;
    return target.top >= lowerBound && target.top <= upperBound && target.bottom > 0;
  }, testId);
  await waitForFrames(page, 2);
}

async function collectTabStopsFromTestId(page: Page, testId: string, count: number) {
  await page.evaluate((targetTestId) => {
    const element = document.querySelector<HTMLElement>(`[data-testid="${targetTestId}"]`);
    if (!element) {
      return;
    }

    element.setAttribute("tabindex", "-1");
    element.focus({ preventScroll: true });
  }, testId);

  const stops: Array<{ href: string | null; isSolutionCta: boolean; slide: string | null; text: string }> = [];

  for (let index = 0; index < count; index += 1) {
    await page.keyboard.press("Tab");
    stops.push(
      await page.evaluate(() => {
        const active = document.activeElement as HTMLElement | null;
        const slide = active?.closest<HTMLElement>("[data-testid^='solution-slide-']");
        return {
          href: active instanceof HTMLAnchorElement ? active.getAttribute("href") : null,
          isSolutionCta: active?.classList.contains("solution-cta") ?? false,
          slide: slide?.dataset.testid ?? null,
          text: active?.textContent?.trim() ?? ""
        };
      })
    );
  }

  return stops;
}

async function expectKeywordUnclipped(page: Page) {
  const maskBox = await expectLocatorInViewport(page, page.locator(".keyword-mask"));
  const textBox = await expectLocatorInViewport(page, page.locator(".keyword-text"));
  expect(textBox.y).toBeGreaterThanOrEqual(maskBox.y - 2);
  expect(textBox.y + textBox.height).toBeLessThanOrEqual(maskBox.y + maskBox.height + 4);
}

async function expectSingleHeroServicesList(page: Page) {
  await expect(page.getByTestId("hero").locator("[aria-live]")).toHaveCount(0);
  const list = page.getByRole("list", { name: "Hero services" });
  await expect(list).toHaveCount(1);
  await expect(list.getByRole("listitem")).toHaveCount(7);
}

async function expectSingleRepresentativeCustomersList(page: Page) {
  const list = page.getByRole("list", { name: "Representative customers" });
  await expect(list).toHaveCount(1);
  const items = list.getByRole("listitem");
  await expect(items).toHaveCount(customerNames.length);
  for (const customerName of customerNames) {
    await expect(items.filter({ hasText: customerName })).toHaveCount(1);
  }
}

async function expectNoUnsupportedCustomerClaims(page: Page) {
  const text = await page.locator("body").innerText();
  for (const claim of unsupportedCustomerClaims) {
    expect(text).not.toContain(claim);
  }
}

async function expectCustomerCardReadable(page: Page, card: Locator) {
  await expectLocatorFullyInViewport(page, card);
  await expect(card.locator(".fallback-card-frame")).toBeVisible();
  await expect(card.locator(".fallback-card-logo-field")).toBeVisible();
  await expect(card.locator(".fallback-card-name")).toBeVisible();
  await expect(card.locator(".fallback-card-index")).toBeVisible();

  const cardBox = await card.boundingBox();
  const logoBox = await card.locator(".fallback-card-logo-field").boundingBox();
  const nameBox = await card.locator(".fallback-card-name").boundingBox();
  expect(cardBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(nameBox).not.toBeNull();
  expect(logoBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
  expect(logoBox!.x + logoBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1);
  expect(nameBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
  expect(nameBox!.x + nameBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1);
}

async function expectNoExternalImageRequests(page: Page, action: () => Promise<void>) {
  const externalImages: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() !== "image") {
      return;
    }

    const url = request.url();
    const parsedUrl = new URL(url);
    const isLocalImage =
      ["127.0.0.1", "localhost", "::1"].includes(parsedUrl.hostname) ||
      parsedUrl.protocol === "data:" ||
      parsedUrl.protocol === "blob:";
    if (!isLocalImage) {
      externalImages.push(url);
    }
  });

  await action();
  expect(externalImages).toEqual([]);
}

function visibleSvgText(svg: string) {
  return [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .join(" ");
}

function expectTopologySvgSafe(fileName: string) {
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

function collectRepoFilePaths() {
  const ignoredDirectories = new Set([".git", ".next", "node_modules", "test-results", "tests/artifacts"]);
  const foundFiles: string[] = [];
  const pendingDirectories = [process.cwd()];

  while (pendingDirectories.length > 0) {
    const currentDirectory = pendingDirectories.pop()!;
    const relativeDirectory = path.relative(process.cwd(), currentDirectory).replaceAll(path.sep, "/");

    if (ignoredDirectories.has(relativeDirectory) || ignoredDirectories.has(path.basename(currentDirectory))) {
      continue;
    }

    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const entryPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        pendingDirectories.push(entryPath);
      } else {
        foundFiles.push(path.relative(process.cwd(), entryPath).replaceAll(path.sep, "/"));
      }
    }
  }

  return foundFiles;
}

function expectTopologySvgAssetsOnlyInGeneratedTopology() {
  const expectedPaths = topologySvgFiles.map((fileName) => `public/generated/topology/${fileName}`).sort();
  const foundTopologySvgPaths = collectRepoFilePaths()
    .filter((filePath) => topologySvgFiles.includes(path.basename(filePath)))
    .sort();

  expect(foundTopologySvgPaths).toEqual(expectedPaths);
}

function expectCapabilitySvgSafe(fileName: string) {
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

  expect(svg.toLowerCase()).not.toContain("customer logo");
  expect(svg.toLowerCase()).not.toContain("vendor logo");
  expect(visibleSvgText(svg)).not.toMatch(/\b\d+(?:\.\d+)?\s?(?:%|ms|s|x|k|m|gb|tb)\b/i);
}

async function expectCapabilityMapContent(page: Page) {
  const map = page.getByTestId("capability-map");
  await map.scrollIntoViewIfNeeded();
  await expectLocatorInViewport(page, map);
  const list = page.getByRole("list", { name: "GTG capability map nodes" });
  await expect(list).toHaveCount(1);
  const items = list.getByRole("listitem");
  await expect(items).toHaveCount(capabilityNodeNames.length);

  for (const nodeName of capabilityNodeNames) {
    await expect(items.filter({ hasText: nodeName })).toHaveCount(1);
  }
}

test.beforeAll(({ browserName }, testInfo) => {
  if (browserName === "chromium" && testInfo.project.name === "chromium") {
    ensureArtifacts();
  }
});

test("desktop Hero carousel, pullback, handoff, and solution sequence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);
  await page.context().tracing.start({ screenshots: true, snapshots: true, sources: true });

  await page.goto("/");
  await expect(page.getByTestId("hero")).toBeVisible();
  await expectSingleHeroServicesList(page);
  await expectSingleRepresentativeCustomersList(page);
  await waitForHeroState(page, "initial", 0, 0.03);
  await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
  await expect(page.getByText(officialDescription)).toBeVisible();
  await expectCustomerProofKeyword(page);
  await expect(page.getByTestId("webgl-hero").locator("canvas")).toBeVisible();
  await capture(page, "01-desktop-hero-initial");

  const dataUrlLength = await page.getByTestId("webgl-hero").locator("canvas").evaluate((canvas) =>
    (canvas as HTMLCanvasElement).toDataURL("image/png").length
  );
  expect(dataUrlLength).toBeGreaterThan(5000);

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

  await page.getByTestId("solution-rail-3").click();
  await waitForActiveSolution(page, "03");
  await expect(
    page.getByTestId("solution-slide-3").getByRole("heading", { name: "Infrastructure Automation" })
  ).toBeVisible();

  await page.getByTestId("solution-rail-5").click();
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
  await expectNoUnsupportedCustomerClaims(page);
  expect(errors).toEqual([]);
  await page.context().tracing.stop({ path: path.join(artifactDir, "hero-to-solution-trace.zip") });
});

test("desktop inactive Solution slides are hidden from keyboard access", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await scrollSolutionsTo(page, 0);
  await waitForActiveSolution(page, "01");

  await expect(page.getByTestId("solution-slide-1")).toHaveAttribute("aria-hidden", "false");
  for (const index of [2, 3, 4, 5]) {
    const slide = page.getByTestId(`solution-slide-${index}`);
    await expect(slide).toHaveAttribute("aria-hidden", "true");
    await expect(slide).toHaveAttribute("inert", "");
  }

  const solutionOneStops = await collectTabStopsFromTestId(page, "solutions-section", 12);
  expect(solutionOneStops.filter((stop) => stop.isSolutionCta).map((stop) => stop.slide)).toEqual([
    "solution-slide-1"
  ]);

  await page.getByTestId("solution-rail-3").click();
  await waitForActiveSolution(page, "03");
  await expect(page.getByTestId("solution-slide-3")).toHaveAttribute("aria-hidden", "false");
  await expect(page.getByTestId("solution-slide-3")).not.toHaveAttribute("inert", "");

  const solutionThreeStops = await collectTabStopsFromTestId(page, "solutions-section", 12);
  expect(solutionThreeStops.filter((stop) => stop.isSolutionCta).map((stop) => stop.slide)).toEqual([
    "solution-slide-3"
  ]);

  expect(errors).toEqual([]);
});

test("mobile static Solution flow keeps every CTA keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await scrollTestIdToStart(page, "solutions-section");

  for (const index of [1, 2, 3, 4, 5]) {
    const slide = page.getByTestId(`solution-slide-${index}`);
    await expect(slide).not.toHaveAttribute("aria-hidden", "true");
    await expect(slide).not.toHaveAttribute("inert", "");
  }

  const stops = await collectTabStopsFromTestId(page, "solutions-section", 10);
  expect(stops.filter((stop) => stop.isSolutionCta).map((stop) => stop.slide)).toEqual([
    "solution-slide-1",
    "solution-slide-2",
    "solution-slide-3",
    "solution-slide-4",
    "solution-slide-5"
  ]);

  expect(errors).toEqual([]);
});

test("mobile Hero and first Solution use simplified flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByTestId("mobile-fallback-hero")).toBeVisible();
  await expectSingleHeroServicesList(page);
  await expectSingleRepresentativeCustomersList(page);
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
  await expectNoUnsupportedCustomerClaims(page);
  expect(errors).toEqual([]);
});

test("reduced-motion Hero renders static HTML service cards", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await expect(page.getByTestId("reduced-motion-hero")).toBeVisible();
  await expectSingleHeroServicesList(page);
  await expectSingleRepresentativeCustomersList(page);
  await expect(page.locator("canvas")).toHaveCount(0);
  await capture(page, "08-reduced-motion-hero");

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  await expectNoUnsupportedCustomerClaims(page);
  expect(errors).toEqual([]);
});

test("forceFallback query renders graceful HTML fallback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/?forceFallback=1");
  await expect(page.getByTestId("force-fallback-hero")).toBeVisible();
  await expectSingleHeroServicesList(page);
  await expectSingleRepresentativeCustomersList(page);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByTestId("force-fallback-hero").locator(".fallback-strip")).toHaveAttribute(
    "aria-hidden",
    "true"
  );
  await expect(page.getByTestId("force-fallback-hero").locator(".fallback-service-rail")).toHaveAttribute(
    "aria-hidden",
    "true"
  );
  await expect(page.getByTestId("force-fallback-hero").locator("a")).toHaveCount(0);
  await expect(page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" })).toHaveCount(1);
  await expectStaticKeywordReady(page);
  await capture(page, "09-force-fallback-hero");

  await page.getByTestId("solutions-section").scrollIntoViewIfNeeded();
  await expect(page.getByTestId("solutions-section")).toBeVisible();

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  await expectNoUnsupportedCustomerClaims(page);
  expect(errors).toEqual([]);
});

test("customer card system keeps local proof cards readable and claim-safe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);

  await expectNoExternalImageRequests(page, async () => {
    await page.goto("/");
    await expect(page.getByTestId("hero")).toBeVisible();
    await expectSingleHeroServicesList(page);
    await expectSingleRepresentativeCustomersList(page);
    await expectCustomerProofKeyword(page);
    await expect(page.getByTestId("webgl-hero").locator("canvas")).toBeVisible();
    await waitForFrames(page, 5);
    await captureCustomerCard(page, "hero-desktop-customer-card");

    const dataUrlLength = await page.getByTestId("webgl-hero").locator("canvas").evaluate((canvas) =>
      (canvas as HTMLCanvasElement).toDataURL("image/png").length
    );
    expect(dataUrlLength).toBeGreaterThan(5000);
    await expectNoUnsupportedCustomerClaims(page);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByTestId("mobile-fallback-hero")).toBeVisible();
    await expectSingleRepresentativeCustomersList(page);
    await expectCustomerProofKeyword(page);
    await expectCustomerCardReadable(page, page.getByTestId("customer-card-kt"));
    await expectNoOverflow(page);
    await captureCustomerCard(page, "hero-mobile-fallback-customer-card");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByTestId("reduced-motion-hero")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await expectSingleRepresentativeCustomersList(page);
    await expectCustomerProofKeyword(page);
    await expectCustomerCardReadable(page, page.getByTestId("customer-card-kt"));
    await expectNoOverflow(page);
    await captureCustomerCard(page, "reduced-motion-customer-card");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/?forceFallback=1");
    await expect(page.getByTestId("force-fallback-hero")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await expectSingleRepresentativeCustomersList(page);
    await expectCustomerProofKeyword(page);
    await expectCustomerCardReadable(page, page.getByTestId("customer-card-kt"));
    await expectNoUnsupportedCustomerClaims(page);
    await expectNoOverflow(page);
    await captureCustomerCard(page, "force-fallback-customer-card");
  });

  expect(errors).toEqual([]);
});

test("topology SVG kit assets are local, claim-safe, and renderable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1180 });
  const errors = await attachConsoleGuards(page);

  expectTopologySvgAssetsOnlyInGeneratedTopology();

  for (const fileName of topologySvgFiles) {
    expectTopologySvgSafe(fileName);
  }

  await expectNoExternalImageRequests(page, async () => {
    await page.goto("/");
    await page.setContent(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <style>
            * { box-sizing: border-box; }
            html, body {
              width: 1440px;
              min-height: 1180px;
              margin: 0;
              background: #040404;
              color: #f4efe4;
              font-family: Arial, sans-serif;
            }
            main {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 18px;
              padding: 28px;
            }
            figure {
              margin: 0;
              border: 1px solid rgba(244, 239, 228, 0.16);
              background: #10100f;
              padding: 12px;
            }
            img {
              display: block;
              width: 100%;
              aspect-ratio: 16 / 10;
              object-fit: contain;
              background: #040404;
            }
            figcaption {
              margin-top: 10px;
              color: rgba(244, 239, 228, 0.72);
              font-size: 13px;
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <main>
            ${topologySvgFiles
              .map(
                (fileName) => `
                  <figure>
                    <img src="/generated/topology/${fileName}" alt="${fileName}" />
                    <figcaption>${fileName}</figcaption>
                  </figure>
                `
              )
              .join("")}
          </main>
        </body>
      </html>
    `);

    await page.waitForFunction(() =>
      [...document.images].every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0)
    );
    await page.screenshot({
      path: path.join(topologyArtifactDir, "topology-contact-sheet.png"),
      fullPage: true
    });

    const contactSheetPath = path.join(topologyArtifactDir, "topology-contact-sheet.png");
    expect(fs.existsSync(contactSheetPath)).toBe(true);
    expect(fs.statSync(contactSheetPath).size).toBeGreaterThan(10_000);
  });

  expect(errors).toEqual([]);
});

test("capability map assets and Company integration are claim-safe and responsive", async ({ page }) => {
  const errors = await attachConsoleGuards(page);

  for (const fileName of capabilitySvgFiles) {
    expectCapabilitySvgSafe(fileName);
  }

  await expectNoExternalImageRequests(page, async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await scrollTestIdToStart(page, "company-section");
    await expectCapabilityMapContent(page);
    await expect(page.getByTestId("capability-map").locator("img")).toHaveAttribute(
      "src",
      "/generated/topology/gtg-capability-map.svg"
    );
    await expectNoOverflow(page);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await scrollTestIdToStart(page, "company-section");
    await expectCapabilityMapContent(page);
    await page.waitForFunction(() =>
      document
        .querySelector<HTMLImageElement>('[data-testid="capability-map"] img')
        ?.currentSrc.endsWith("/generated/topology/gtg-capability-map-mobile.svg")
    );
    await expectNoOverflow(page);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await scrollTestIdToStart(page, "company-section");
    await expectCapabilityMapContent(page);
    await expectNoOverflow(page);

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/?forceFallback=1");
    await scrollTestIdToStart(page, "company-section");
    await expectCapabilityMapContent(page);
    await expect(page.locator("canvas")).toHaveCount(0);
    await expectNoOverflow(page);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.setContent(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <style>
            * { box-sizing: border-box; }
            html, body {
              width: 1440px;
              min-height: 920px;
              margin: 0;
              background: #040404;
              color: #f4efe4;
              font-family: Arial, sans-serif;
            }
            main {
              display: grid;
              grid-template-columns: minmax(0, 1fr) 360px;
              gap: 20px;
              padding: 28px;
            }
            figure {
              margin: 0;
              border: 1px solid rgba(244, 239, 228, 0.16);
              background: #10100f;
              padding: 14px;
            }
            img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: contain;
              background: #040404;
            }
            figcaption {
              margin-top: 10px;
              color: rgba(244, 239, 228, 0.72);
              font-size: 13px;
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <main>
            <figure>
              <img src="/generated/topology/gtg-capability-map.svg" alt="desktop capability map" />
              <figcaption>gtg-capability-map.svg</figcaption>
            </figure>
            <figure>
              <img src="/generated/topology/gtg-capability-map-mobile.svg" alt="mobile capability map" />
              <figcaption>gtg-capability-map-mobile.svg</figcaption>
            </figure>
          </main>
        </body>
      </html>
    `);

    await page.waitForFunction(() =>
      [...document.images].every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0)
    );
    await page.screenshot({
      path: path.join(capabilityArtifactDir, "capability-map-contact-sheet.png"),
      fullPage: true
    });

    const contactSheetPath = path.join(capabilityArtifactDir, "capability-map-contact-sheet.png");
    expect(fs.existsSync(contactSheetPath)).toBe(true);
    expect(fs.statSync(contactSheetPath).size).toBeGreaterThan(10_000);
  });

  expect(errors).toEqual([]);
});

test("official content structure, navigation, metadata, and screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await expect(page).toHaveTitle("GTG Solutions & Consult | 데이터 분석·스트리밍·DevOps 기술 컨설팅");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "GTG Solutions & Consult는 Bigdata Analytics, Confluent, HashiCorp, DevOps 솔루션과 DB/테스트/프로세스 컨설팅을 다루는 기술 컨설팅 회사입니다."
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /nofollow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
  await expect(page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" })).toHaveAttribute(
    "href",
    "#contact"
  );
  await waitForHeaderTheme(page, "dark");
  await expect(page.getByTestId("webgl-hero").locator("canvas")).toBeVisible();
  await waitForFrames(page, 5);
  await captureContent(page, "01-desktop-hero");

  await page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" }).click();
  await waitForTestIdBelowHeader(page, "contact-section");
  await expectElementBelowHeader(page, page.getByTestId("contact-section"));
  await scrollTestIdToStart(page, "contact-section");
  await waitForHeaderTheme(page, "light");

  await scrollSolutionsTo(page, 0);
  await waitForActiveSolution(page, "01");
  await expect(page.getByRole("link", { name: "Vertica 기술 블로그 보기" })).toHaveAttribute(
    "href",
    "https://x2wizard.github.io/"
  );
  await captureContent(page, "02-desktop-solution-1");

  await scrollTestIdToStart(page, "company-section");
  await expectLocatorInViewport(page, page.getByRole("heading", { name: "데이터 플랫폼과 소프트웨어 품질을 위한 기술 파트너" }));
  await expect(page.getByTestId("company-headline-line")).toHaveCount(3);
  await expect(page.getByText("Bigdata Analytics / Vertica")).toBeVisible();
  await expectCapabilityMapContent(page);
  await waitForHeaderTheme(page, "dark");
  await captureContent(page, "03-desktop-company");

  await scrollTestIdToStart(page, "engagement-section");
  await expectLocatorInViewport(page, page.getByRole("heading", { name: "확인, 정의, 실행, 운영 안정화로 이어지는 수행 흐름" }));
  await expect(page.getByTestId("engagement-headline-line")).toHaveCount(3);
  await expect(page.getByText("Diagnose")).toBeVisible();
  await expect(page.getByText("Operate")).toBeVisible();
  await waitForHeaderTheme(page, "dark");
  await captureContent(page, "04-desktop-engagement");

  await scrollTestIdToStart(page, "contact-section");
  await expectLocatorInViewport(page, page.getByRole("heading", { name: "GTG에 문의하세요" }));
  await waitForHeaderTheme(page, "light");
  await expect(page.getByRole("link", { name: "공식 문의 페이지로 이동" })).toHaveAttribute(
    "href",
    "https://www.gtgsc.com/gtg/sub/company/company.php"
  );
  await expect(page.getByRole("link", { name: "이메일 문의" })).toHaveAttribute("href", "mailto:webmaster@gtgsc.com");
  await expect(page.getByTestId("contact-section").getByRole("link", { name: "02-6293-7100" })).toHaveAttribute(
    "href",
    "tel:02-6293-7100"
  );
  await captureContent(page, "05-desktop-contact");

  await scrollTestIdToStart(page, "site-footer");
  await expectLocatorInViewport(page, page.getByText("(주)지티지 / GTG Co.,Ltd."));
  await waitForHeaderTheme(page, "dark");
  await expect(page.getByRole("link", { name: "개인정보처리방침" })).toHaveAttribute(
    "href",
    "https://www.gtgsc.com/gtg/sub/customer/privacy.php"
  );
  await expect(page.getByText("© GTG Co.,Ltd. All Rights Reserved.")).toBeVisible();
  await captureContent(page, "06-desktop-footer");

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#top");
  await expect(page.getByRole("dialog").getByRole("link", { name: "SOLUTIONS" })).toHaveAttribute("href", "/#solutions");
  await expect(page.getByRole("dialog").getByRole("link", { name: "ENGAGEMENT" })).toHaveAttribute(
    "href",
    "/#engagement"
  );
  await captureContent(page, "11-menu-open");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("dialog").getByRole("link", { name: "CONTACT" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

  await page.getByRole("link", { name: "ABOUT" }).click();
  await expect(page).toHaveURL(/#company$/);
  await page.getByRole("link", { name: "CONTACT" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expectLocatorInViewport(page, page.getByTestId("contact-section"));

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  const text = await page.locator("body").innerText();
  expect(text).not.toContain("Complex systems, made clear.");
  expect(text).not.toContain("GTG corporate website interaction prototype.");
  expect(text.includes("MVP PROTOTYPE")).toBe(true);
  expect(errors).toEqual([]);
});

test("draft release routes keep indexing blocked and render a simple 404", async ({ page, request }) => {
  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  const robotsText = await robotsResponse.text();
  expect(robotsText).toContain("User-Agent: *");
  expect(robotsText).toContain("Disallow: /");

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).not.toContain("https://www.gtgsc.com/");

  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /nofollow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);

  await page.goto("/missing-release-candidate-route");
  await expect(page.getByTestId("not-found-page")).toBeVisible();
  await expect(page.getByRole("link", { name: "본문으로 이동" })).toHaveAttribute("href", "#main-content");
  await expect(page.locator("#main-content")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "GTG Solutions & Consult home" })).toHaveAttribute("href", "/#top");
  await expect(page.getByRole("link", { name: "ABOUT" })).toHaveAttribute("href", "/#company");
  await expect(page.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", "/#contact");
  await expect(page.getByRole("heading", { name: "페이지를 찾을 수 없습니다" })).toBeVisible();
  await expect(page.getByText("요청한 페이지가 존재하지 않거나 이동되었습니다.")).toBeVisible();
  await expect(page.getByTestId("not-found-page").getByRole("link", { name: "홈으로 돌아가기" })).toHaveAttribute(
    "href",
    "/"
  );

  await page.getByRole("link", { name: "GTG Solutions & Consult home" }).click();
  await expect(page).toHaveURL(/\/#top$/);
  await expect(page.getByTestId("hero")).toBeVisible();
});

test("content screenshots for mobile, reduced motion, and fallback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await attachConsoleGuards(page);

  await page.goto("/");
  await expect(page.getByTestId("mobile-fallback-hero")).toBeVisible();
  await expectStaticKeywordReady(page);
  await captureContent(page, "07-mobile-hero");

  await scrollSlideToStart(page, "solution-slide-1");
  await expectLocatorInViewport(page, page.getByTestId("solution-slide-1").getByRole("heading", { name: "Data & Analytics" }));
  await captureContent(page, "08-mobile-solution");

  await scrollTestIdToStart(page, "company-section");
  await expectLocatorInViewport(page, page.getByTestId("company-section"));
  await captureContent(page, "09-mobile-company");

  await scrollTestIdToStart(page, "contact-section");
  await expectLocatorInViewport(page, page.getByTestId("contact-section"));
  await captureContent(page, "10-mobile-contact");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("reduced-motion-hero")).toBeVisible();
  await captureContent(page, "12-reduced-motion");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/?forceFallback=1");
  await expect(page.getByTestId("force-fallback-hero")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expectStaticKeywordReady(page);
  await captureContent(page, "13-force-fallback");

  await expectNoOverflow(page);
  await expectNoTbdInUi(page);
  expect(errors).toEqual([]);
});

test("mobile Hero hierarchy remains readable across release-candidate viewports", async ({ page }) => {
  const viewports = [
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await waitForFrames(page, 3);

    const headerBox = await page.locator(".site-header").boundingBox();
    const titleBox = await expectLocatorInViewport(page, page.getByRole("heading", { name: officialHeadline }));
    expect(headerBox).not.toBeNull();
    expect(titleBox.y).toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height - 2);
    await expectKeywordUnclipped(page);

    const fallbackPrimaryCard = page.locator(".fallback-card.is-primary");
    if ((await fallbackPrimaryCard.count()) > 0) {
      await expectLocatorFullyInViewport(page, fallbackPrimaryCard);
    } else {
      await expectLocatorInViewport(page, page.locator(".hero-media"));
    }

    await expectLocatorInViewport(page, page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" }));
    await expectNoOverflow(page);
  }
});

test("layout has no horizontal overflow across required viewports", async ({ page }) => {
  const viewports = [
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1280, height: 720 },
    { width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await waitForFrames(page, 3);
    await expectNoOverflow(page);
  }
});

test("cross-browser smoke keeps the approved baseline reachable @browser-smoke", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.goto("/");
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByRole("heading", { name: officialHeadline })).toBeVisible();
  await expect(page.getByTestId("solutions-section")).toBeAttached();
  await expectNoOverflow(page);
});

declare global {
  interface Window {
    __GTG_SCROLLTRIGGERS__?: number;
    __GTG_SOLUTION_TRIGGERS__?: number;
  }
}
