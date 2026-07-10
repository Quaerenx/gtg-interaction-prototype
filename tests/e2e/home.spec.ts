import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import {
  EXPERIENCE_MOTION,
  type HeroState,
  type ProductRevealState
} from "../../src/components/motion/experience-motion";

function normalizeBasePath(value: string) {
  const normalized = value.trim().replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "";
}

const appBasePath = normalizeBasePath(process.env.NEXT_BASE_PATH ?? "/hero");
const appHomePath = appBasePath || "/";
const defaultApplicationBaseURL = `http://127.0.0.1:18150${appBasePath}/`;
const applicationBaseURL = process.env.PLAYWRIGHT_BASE_URL ?? defaultApplicationBaseURL;
const applicationOrigin = new URL(applicationBaseURL).origin;

function appPath(pathname: string) {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return pathname;
  }
  if (appBasePath && (pathname.startsWith("/#") || pathname.startsWith("/?"))) {
    return `${appBasePath}${pathname.slice(1)}`;
  }
  return appBasePath ? `${appBasePath}${pathname}` : pathname;
}

function appRoute(pathname = "/") {
  return pathname === "/" ? "./" : `.${pathname}`;
}

function expectAppLocation(page: Page, hash: string) {
  const currentUrl = new URL(page.url());
  expect(currentUrl.pathname).toBe(appHomePath);
  expect(currentUrl.hash).toBe(hash);
}

function isInsideAppBasePath(pathname: string) {
  return !appBasePath || pathname === appBasePath || pathname.startsWith(`${appBasePath}/`);
}

const artifactDir = path.join(process.cwd(), "tests", "artifacts");
const informationArchitectureDir = path.join(artifactDir, "information-architecture");
const afterArtifactDir = path.join(informationArchitectureDir, "after");
const topologyArtifactDir = path.join(artifactDir, "topology-svg-kit");
const capabilityArtifactDir = path.join(artifactDir, "capability-map");
const experienceAfterArtifactDir = path.join(artifactDir, "experience-redesign", "after");

const heroStateOrder: Record<HeroState, number> = {
  identity: 0,
  "core-active": 1,
  "core-pullback": 2,
  "core-settle": 3
};
const mouseWheelDelta = 120;
const trackpadLikeDeltas = [8, 16, 24, 32, 24, 16, 8] as const;
const requiredViewports = [
  { name: "desktop-1280x720", width: 1280, height: 720 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "mobile-360x640", width: 360, height: 640 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 }
] as const;

type WebGLRuntimeTelemetry = {
  canvasDomMounts: number;
  drawCalls: number;
  firstAnimationFrameCanvasCount: number | null;
  webglContextRequests: number;
};

let threeClientChunkPathsCache: Set<string> | undefined;

const officialHeadline = "데이터와 인프라를 하나의 운영 구조로";
const officialDescription =
  "데이터 분석, 스트리밍, 인프라 자동화, DevOps 품질, DB/테스트/프로세스 컨설팅을 하나의 실행 구조로 연결합니다.";
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
const heroCapabilityNames = [
  "Data & Analytics",
  "Data Streaming",
  "Infrastructure Automation",
  "DevOps & Quality",
  "Consulting & Technical Support"
];
const solutionIds = [
  "solution-data-analytics",
  "solution-data-streaming",
  "solution-infrastructure-automation",
  "solution-devops-quality",
  "solution-consulting-support"
] as const;
const productOwners = {
  vertica: "solution-data-analytics",
  confluent: "solution-data-streaming",
  hashicorp: "solution-infrastructure-automation",
  loadrunner: "solution-devops-quality"
} as const;
const solutionFiveCapabilities = [
  "DB 컨설팅",
  "성능/기능 테스트 컨설팅",
  "프로세스 컨설팅",
  "형상관리",
  "기술지원",
  "Vertica 교육 문의"
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
const capabilityNodeNames = heroCapabilityNames;
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
  fs.mkdirSync(afterArtifactDir, { recursive: true });
  fs.mkdirSync(topologyArtifactDir, { recursive: true });
  fs.mkdirSync(capabilityArtifactDir, { recursive: true });
  fs.mkdirSync(experienceAfterArtifactDir, { recursive: true });

  for (const directory of [
    afterArtifactDir,
    topologyArtifactDir,
    capabilityArtifactDir,
    experienceAfterArtifactDir
  ]) {
    for (const fileName of fs.readdirSync(directory)) {
      if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".json") ||
        fileName.endsWith(".zip") ||
        fileName.endsWith(".webm")
      ) {
        fs.unlinkSync(path.join(directory, fileName));
      }
    }
  }
}

function listFilesRecursively(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFilesRecursively(entryPath) : [entryPath];
  });
}

function discoverThreeClientChunkPaths() {
  if (threeClientChunkPathsCache) {
    return threeClientChunkPathsCache;
  }

  const staticRoot = path.join(process.cwd(), ".next", "static");
  const chunksRoot = path.join(staticRoot, "chunks");
  if (!fs.existsSync(chunksRoot)) {
    throw new Error("A production .next build is required before Playwright chunk verification");
  }

  const threeMarkers = /WebGLRenderer|ExtrudeGeometry|\bR3F\b/;
  const chunkPaths = listFilesRecursively(chunksRoot)
    .filter((filePath) => filePath.endsWith(".js"))
    .filter((filePath) => threeMarkers.test(fs.readFileSync(filePath, "utf8")))
    .map((filePath) => `/_next/static/${path.relative(staticRoot, filePath).replaceAll("\\", "/")}`);

  if (chunkPaths.length === 0) {
    throw new Error("Could not identify a production Three/R3F client chunk");
  }

  threeClientChunkPathsCache = new Set(chunkPaths);
  return threeClientChunkPathsCache;
}

function collectClientChunkRequests(page: Page) {
  const requests: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("/_next/static/chunks/") && /\.js(?:\?|$)/.test(url)) {
      requests.push(url);
    }
  });
  return requests;
}

function requestedThreeClientChunks(requests: readonly string[]) {
  const threeChunkPaths = discoverThreeClientChunkPaths();
  return requests.filter((requestUrl) => {
    const pathname = decodeURIComponent(new URL(requestUrl).pathname);
    return [...threeChunkPaths].some((chunkPath) => pathname.endsWith(chunkPath));
  });
}

async function attachConsoleGuards(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

function attachDeploymentPathGuards(page: Page) {
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

async function waitForScreenshotReadiness(page: Page) {
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

async function captureIa(page: Page, name: string) {
  await waitForScreenshotReadiness(page);
  await page.screenshot({ path: path.join(afterArtifactDir, `${name}.png`), fullPage: false });
}

async function captureExperience(page: Page, name: string) {
  await waitForScreenshotReadiness(page);
  await page.screenshot({ path: path.join(experienceAfterArtifactDir, `${name}.png`), fullPage: false });
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

async function scrollToSelector(page: Page, selector: string) {
  await page.evaluate((targetSelector) => {
    document.querySelector<HTMLElement>(targetSelector)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, selector);
  await waitForFrames(page, 2);
}

async function waitForMotionReady(page: Page) {
  await expect(page.getByTestId("hero")).toHaveAttribute("data-motion-ready", "true");
  await page.evaluate(() => document.fonts.ready);
  await waitForFrames(page, 2);
}

type HeroMotionSample = {
  activeElement: string;
  hasVisibleContent: boolean;
  progress: number;
  scrollY: number;
  state: HeroState;
};

async function sampleHeroMotion(page: Page): Promise<HeroMotionSample> {
  return page.getByTestId("hero").evaluate((hero) => {
    const activeElement = document.activeElement;
    const visibleContent = [...document.querySelectorAll<HTMLElement>("h1, h2, h3, p, a, li, canvas, img, svg")].some(
      (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          rect.bottom > 24 &&
          rect.top < window.innerHeight - 24 &&
          rect.width > 1 &&
          rect.height > 1 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity || "1") > 0.05
        );
      }
    );

    return {
      activeElement:
        activeElement instanceof HTMLElement
          ? activeElement.id || activeElement.getAttribute("data-testid") || activeElement.tagName.toLowerCase()
          : "",
      hasVisibleContent: visibleContent,
      progress: Number.parseFloat(hero.getAttribute("data-hero-progress") ?? "0"),
      scrollY: window.scrollY,
      state: (hero.getAttribute("data-hero-state") ?? "identity") as HeroState
    };
  });
}

async function wheelSequence(page: Page, deltas: readonly number[]) {
  const viewport = page.viewportSize();
  if (!viewport) {
    throw new Error("A viewport is required for wheel QA");
  }
  await page.mouse.move(viewport.width / 2, viewport.height / 2);

  const samples: HeroMotionSample[] = [];
  for (const delta of deltas) {
    await page.mouse.wheel(0, delta);
    await waitForFrames(page, 2);
    samples.push(await sampleHeroMotion(page));
  }
  return samples;
}

function expectMonotonicProgress(samples: HeroMotionSample[], direction: "down" | "up") {
  for (let index = 1; index < samples.length; index += 1) {
    const previous = samples[index - 1];
    const current = samples[index];
    if (direction === "down") {
      expect(current.progress).toBeGreaterThanOrEqual(previous.progress - 0.002);
      expect(heroStateOrder[current.state]).toBeGreaterThanOrEqual(heroStateOrder[previous.state]);
    } else {
      expect(current.progress).toBeLessThanOrEqual(previous.progress + 0.002);
      expect(heroStateOrder[current.state]).toBeLessThanOrEqual(heroStateOrder[previous.state]);
    }
    expect(Math.abs(heroStateOrder[current.state] - heroStateOrder[previous.state])).toBeLessThanOrEqual(1);
    expect(current.hasVisibleContent).toBe(true);
  }
}

async function expectEveryImageLoaded(page: Page) {
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

async function expectStaticExperience(page: Page) {
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

async function scrollHeroToProgress(page: Page, progress: number, expectedState: HeroState) {
  await page.getByTestId("hero").evaluate((hero, targetProgress) => {
    const element = hero as HTMLElement;
    const travel = Math.max(1, element.offsetHeight - window.innerHeight);
    window.scrollTo({ top: element.offsetTop + travel * targetProgress, behavior: "instant" });
  }, progress);
  await expect(page.getByTestId("hero")).toHaveAttribute("data-hero-state", expectedState);
  await waitForFrames(page, 2);
}

async function captureSectionFrame(
  page: Page,
  prefix: string,
  frame: { name: string; productId?: string; selector: string }
) {
  await scrollToSelector(page, frame.selector);
  if (frame.selector === "[data-testid='solutions-handoff']") {
    await expect(page.getByTestId("solutions-handoff")).toHaveAttribute("data-handoff-state", "connected");
  }
  if (frame.productId) {
    await scrollToSelector(page, `[data-testid='product-reveal-${frame.productId}']`);
    await expect(page.getByTestId(`product-reveal-${frame.productId}`)).toHaveAttribute(
      "data-reveal-state",
      "seen"
    );
    await captureExperience(page, `${prefix}-${frame.name}-product-reveal`);
    await scrollToSelector(page, frame.selector);
  }
  await captureExperience(page, `${prefix}-${frame.name}`);
}

async function expectNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function trackCanvasMounts(page: Page) {
  await page.addInitScript(() => {
    window.__GTG_CANVAS_MOUNTS__ = 0;
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }
          if (node.matches("canvas")) {
            window.__GTG_CANVAS_MOUNTS__ = (window.__GTG_CANVAS_MOUNTS__ ?? 0) + 1;
          }
          window.__GTG_CANVAS_MOUNTS__ =
            (window.__GTG_CANVAS_MOUNTS__ ?? 0) + node.querySelectorAll("canvas").length;
        }
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  });
}

async function trackWebGLRuntime(page: Page) {
  await page.addInitScript(() => {
    const telemetry: WebGLRuntimeTelemetry = {
      canvasDomMounts: 0,
      drawCalls: 0,
      firstAnimationFrameCanvasCount: null,
      webglContextRequests: 0
    };
    window.__GTG_WEBGL_TELEMETRY__ = telemetry;

    const canvasObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }
          telemetry.canvasDomMounts += Number(node.matches("canvas"));
          telemetry.canvasDomMounts += node.querySelectorAll("canvas").length;
        }
      }
    });
    canvasObserver.observe(document, { childList: true, subtree: true });

    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value(this: HTMLCanvasElement, contextId: string, ...args: unknown[]) {
        if (contextId === "webgl" || contextId === "webgl2" || contextId === "experimental-webgl") {
          telemetry.webglContextRequests += 1;
        }
        return Reflect.apply(originalGetContext, this, [contextId, ...args]);
      },
      writable: true
    });

    const drawMethods = ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"];
    const contextConstructors = [window.WebGLRenderingContext, window.WebGL2RenderingContext].filter(Boolean);
    for (const ContextConstructor of contextConstructors) {
      const prototype = ContextConstructor.prototype as unknown as Record<
        string,
        (...args: unknown[]) => unknown
      >;
      for (const methodName of drawMethods) {
        const originalMethod = prototype[methodName];
        if (typeof originalMethod !== "function") {
          continue;
        }
        Object.defineProperty(prototype, methodName, {
          configurable: true,
          value(this: WebGLRenderingContext | WebGL2RenderingContext, ...args: unknown[]) {
            telemetry.drawCalls += 1;
            return Reflect.apply(originalMethod, this, args);
          },
          writable: true
        });
      }
    }

    window.requestAnimationFrame(() => {
      telemetry.firstAnimationFrameCanvasCount = document.querySelectorAll("canvas").length;
    });
  });
}

async function readWebGLRuntime(page: Page) {
  return page.evaluate(() => {
    const telemetry = window.__GTG_WEBGL_TELEMETRY__;
    if (!telemetry) {
      throw new Error("WebGL runtime telemetry was not installed before navigation");
    }
    return { ...telemetry };
  });
}

async function expectCustomerProof(page: Page) {
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
  for (const customerName of customerNames) {
    await expect(list.getByText(customerName, { exact: true })).toHaveCount(1);
  }

  await expect(proof.locator("img")).toHaveCount(customerNames.length);
  await expect(page.locator("#top img[src*='customer-logos']")).toHaveCount(0);
  await expect(page.locator(".fallback-proof-strip")).toHaveCount(0);
}

async function expectCoreSemanticContent(page: Page) {
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
  await expect(page.getByRole("list", { name: "GTG capability map nodes" }).getByRole("listitem")).toHaveCount(5);
  await expect(page.locator("section#engagement").getByRole("heading", { level: 3 })).toHaveCount(4);
  await expect(page.locator("section#contact").getByRole("heading", { level: 2 })).toHaveCount(1);
  await expect(page.locator("section#contact dl")).toHaveCount(1);
}

function visibleSvgText(svg: string) {
  return [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .join(" ");
}

function expectSvgSafe(fileName: string) {
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

async function expectNoExternalImageRequests(page: Page, action: () => Promise<void>) {
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

test.beforeAll(({ browserName }, testInfo) => {
  if (browserName === "chromium" && testInfo.project.name === "chromium") {
    ensureArtifacts();
  }
});

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
  await scrollToSelector(page, "#solution-data-analytics-title");
  await captureIa(page, "04-desktop-solution-1");
  await scrollToSelector(page, "#solution-consulting-support-title");
  await captureIa(page, "05-desktop-solution-5");

  await expectNoOverflow(page);
  expect(errors).toEqual([]);
});

test("keyboard navigation follows the semantic document without inert Solution layers", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);
  await page.goto(appRoute());

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "본문으로 이동" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();

  for (const solutionId of solutionIds) {
    await expect(page.locator(`article#${solutionId}`)).not.toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(`article#${solutionId}`)).not.toHaveAttribute("inert", "");
  }

  const streamingRoute = page.getByRole("navigation", { name: "Solution routes" }).getByRole("link", {
    name: "Data Streaming"
  });
  await streamingRoute.click();
  expectAppLocation(page, "#solution-data-streaming");
  await expect(page.locator("#solution-data-streaming-title")).toBeFocused();
  const headerHeight = await page.evaluate(() =>
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))
  );
  await expect
    .poll(() => page.locator("#solution-data-streaming-title").evaluate((heading) => heading.getBoundingClientRect().top))
    .toBeLessThanOrEqual(headerHeight + 8);
  const routeTop = await page
    .locator("#solution-data-streaming-title")
    .evaluate((heading) => heading.getBoundingClientRect().top);
  expect(routeTop).toBeGreaterThanOrEqual(headerHeight - 2);
  await page.evaluate(() => window.scrollBy(0, 120));
  await expect(page.locator("#solution-data-streaming-title")).toBeFocused();

  await page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" }).click();
  expectAppLocation(page, "#contact");
  await expect(page.locator("#contact-heading")).toBeFocused();

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("dialog").getByRole("link", { name: "CONTACT" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Site menu" });
  await menu.getByRole("link", { name: "SOLUTIONS", exact: true }).click();
  await expect(menu).toHaveCount(0);
  expectAppLocation(page, "#solutions");
  await expect(page.locator("#solutions-heading")).toBeFocused();

  const tabbedSolutionCtas: string[] = [];
  for (let tabIndex = 0; tabIndex < solutionIds.length * 2; tabIndex += 1) {
    await page.keyboard.press("Tab");
    const solutionId = await page.evaluate(() => document.activeElement?.closest("#solutions article")?.id ?? null);
    if (solutionId && !tabbedSolutionCtas.includes(solutionId)) {
      tabbedSolutionCtas.push(solutionId);
    }
  }
  expect(tabbedSolutionCtas).toEqual(solutionIds);
  const solutionFiveCta = page.locator("#solution-consulting-support").getByRole("link");
  await expect(solutionFiveCta).toBeFocused();
  await page.keyboard.press("Enter");
  expectAppLocation(page, "#contact");
  await expect(page.locator("#contact-heading")).toBeFocused();

  expect(errors).toEqual([]);
});

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

    const solutionFive = page.locator("#solution-consulting-support");
    await expect(solutionFive.locator("[data-product-id]")).toHaveCount(0);
    await expect(solutionFive.getByText("GTG Support Scope", { exact: true })).toHaveCount(0);
    await expect(solutionFive.locator(".solution-spotlight-scope-list, .solution-spotlight-scope-title")).toHaveCount(0);
    const capabilityList = solutionFive.getByRole("list", {
      name: "Consulting & Technical Support capabilities"
    });
    await expect(capabilityList).toHaveCount(1);
    await expect(capabilityList.getByRole("listitem")).toHaveCount(solutionFiveCapabilities.length);
    for (const capability of solutionFiveCapabilities) {
      await expect(capabilityList.getByText(capability, { exact: true })).toHaveCount(1);
    }
  });

  const structuralSources = [
    "src/components/sections/hero-experience.tsx",
    "src/components/sections/hero-fallback.tsx",
    "src/components/sections/solution-sequence.tsx",
    "src/content/site.ts"
  ].map((filePath) => fs.readFileSync(path.join(process.cwd(), filePath), "utf8")).join("\n");
  expect(structuralSources).not.toMatch(
    /\b(?:solutionSlides|heroCustomers|heroRingCustomers|customers)\s*\[\s*\d+\s*\]/
  );
  const heroCanvasSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/three/hero-canvas.tsx"),
    "utf8"
  );
  expect(heroCanvasSource).not.toMatch(/CanvasTexture|customerProofItems|heroCustomers|customer-logos/i);
  expect(errors).toEqual([]);
});

test("motion configuration is centralized and legacy 650svh HUD structures stay removed", async () => {
  const cssSource = fs.readFileSync(path.join(process.cwd(), "src", "app", "globals.css"), "utf8");
  const motionSource = fs.readFileSync(
    path.join(process.cwd(), "src", "components", "motion", "experience-motion.ts"),
    "utf8"
  );
  const componentSource = [
    "src/components/sections/hero-experience.tsx",
    "src/components/sections/solution-sequence.tsx",
    "src/components/sections/solutions-handoff.tsx"
  ]
    .map((filePath) => fs.readFileSync(path.join(process.cwd(), filePath), "utf8"))
    .join("\n");
  const heroCanvasSource = fs.readFileSync(
    path.join(process.cwd(), "src", "components", "three", "hero-canvas.tsx"),
    "utf8"
  );
  const heroExperienceSource = fs.readFileSync(
    path.join(process.cwd(), "src", "components", "sections", "hero-experience.tsx"),
    "utf8"
  );

  expect(cssSource).not.toMatch(/650svh/i);
  expect(`${cssSource}\n${componentSource}`).not.toMatch(
    /(?:hero-proof-copy|hero-solution-stack|solution-stack-static|solution-rail|solution-layers|--solution-count)/i
  );
  expect(`${cssSource}\n${componentSource}`).not.toMatch(
    /(?:MVP PROTOTYPE|Solution scope|Technology scope|scope reference)/i
  );
  expect(motionSource).toContain("export const EXPERIENCE_MOTION");
  expect(componentSource.match(/EXPERIENCE_MOTION/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
  expect(`${componentSource}\n${heroCanvasSource}`).not.toMatch(/ScrollTrigger/);
  expect(heroCanvasSource).toMatch(/geometries\.forEach\(\(geometry\) => geometry\.dispose\(\)\)/);
  expect(heroCanvasSource).toMatch(/materials\.forEach\(\(material\) => material\.dispose\(\)\)/);
  expect(heroExperienceSource).toMatch(/observer\.disconnect\(\)/);
  expect(heroExperienceSource).toMatch(/cancelAnimationFrame\(frame\)/);
  expect(heroExperienceSource).toMatch(/removeEventListener\("scroll", requestUpdate\)/);
  expect(heroExperienceSource).toMatch(/removeEventListener\("resize", handleResize\)/);

  const { identityEnd, activeEnd, pullbackEnd } = EXPERIENCE_MOTION.hero.boundaries;
  expect(0).toBeLessThan(identityEnd);
  expect(identityEnd).toBeLessThan(activeEnd);
  expect(activeEnd).toBeLessThan(pullbackEnd);
  expect(pullbackEnd).toBeLessThan(1);
  expect(EXPERIENCE_MOTION.hero.travel.minPx).toBeLessThanOrEqual(EXPERIENCE_MOTION.hero.travel.maxPx);
});

test("mobile never initializes WebGL or requests the production Three/R3F chunks", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const chunkRequests = collectClientChunkRequests(page);
  await trackWebGLRuntime(page);
  await page.goto(appRoute());

  await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "mobile");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.waitForLoadState("networkidle");

  const telemetry = await readWebGLRuntime(page);
  expect(telemetry.firstAnimationFrameCanvasCount).toBe(0);
  expect(telemetry.canvasDomMounts).toBe(0);
  expect(telemetry.webglContextRequests).toBe(0);
  expect(telemetry.drawCalls).toBe(0);
  expect(requestedThreeClientChunks(chunkRequests)).toEqual([]);
});

test("desktop loads the split Three/R3F chunk and pauses WebGL draws outside Hero", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const chunkRequests = collectClientChunkRequests(page);
  await trackWebGLRuntime(page);
  await page.goto(appRoute());

  const hero = page.getByTestId("hero");
  await expect(hero).toHaveAttribute("data-experience-mode", "motion");
  await expect(hero).toHaveAttribute("data-canvas-active", "true");
  await expect(page.locator("#top canvas")).toHaveCount(1);
  await expect.poll(() => readWebGLRuntime(page).then((telemetry) => telemetry.drawCalls)).toBeGreaterThan(0);

  expect(requestedThreeClientChunks(chunkRequests).length).toBeGreaterThan(0);

  const contextAttributes = await page.locator("#top canvas").evaluate((canvas) => {
    const htmlCanvas = canvas as HTMLCanvasElement;
    const context = htmlCanvas.getContext("webgl2") ?? htmlCanvas.getContext("webgl");
    return context?.getContextAttributes() ?? null;
  });
  expect(contextAttributes).not.toBeNull();
  expect(contextAttributes?.preserveDrawingBuffer).toBe(false);

  const visibleDrawBaseline = (await readWebGLRuntime(page)).drawCalls;
  await expect
    .poll(() => readWebGLRuntime(page).then((telemetry) => telemetry.drawCalls))
    .toBeGreaterThan(visibleDrawBaseline);

  await scrollToSelector(page, "#proof");
  await expect(hero).toHaveAttribute("data-canvas-active", "false");
  await page.waitForTimeout(250);
  const pausedDrawBaseline = (await readWebGLRuntime(page)).drawCalls;
  await page.waitForTimeout(600);
  expect((await readWebGLRuntime(page)).drawCalls - pausedDrawBaseline).toBeLessThanOrEqual(1);

  await scrollToSelector(page, "#top");
  await expect(hero).toHaveAttribute("data-canvas-active", "true");
  const resumeDrawBaseline = (await readWebGLRuntime(page)).drawCalls;
  await expect
    .poll(() => readWebGLRuntime(page).then((telemetry) => telemetry.drawCalls))
    .toBeGreaterThan(resumeDrawBaseline);
});

test("Hero Canvas caps its backing-store DPR at 1.25", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: applicationBaseURL,
    deviceScaleFactor: 3,
    reducedMotion: "no-preference",
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    await page.goto(appRoute());
    await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "motion");
    const dprMetrics = await page.locator("#top canvas").evaluate((canvas) => {
      const htmlCanvas = canvas as HTMLCanvasElement;
      const bounds = htmlCanvas.getBoundingClientRect();
      return {
        backingDprX: htmlCanvas.width / bounds.width,
        backingDprY: htmlCanvas.height / bounds.height,
        devicePixelRatio: window.devicePixelRatio
      };
    });

    expect(dprMetrics.devicePixelRatio).toBe(3);
    expect(dprMetrics.backingDprX).toBeGreaterThan(0);
    expect(dprMetrics.backingDprY).toBeGreaterThan(0);
    expect(dprMetrics.backingDprX).toBeLessThanOrEqual(1.26);
    expect(dprMetrics.backingDprY).toBeLessThanOrEqual(1.26);
  } finally {
    await context.close();
  }
});

test("desktop forceFallback performs no Canvas, WebGL, or Three/R3F work", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const chunkRequests = collectClientChunkRequests(page);
  await trackCanvasMounts(page);
  await trackWebGLRuntime(page);
  await page.goto(appRoute("/?forceFallback=1"));

  const hero = page.getByTestId("hero");
  await expect(hero).toHaveAttribute("data-experience-mode", "fallback");
  await expect(page.getByTestId("force-fallback-hero")).toBeVisible();
  await waitForMotionReady(page);
  await expect(hero).toHaveAttribute("data-hero-progress", "1.000");
  await expect(hero).toHaveAttribute("data-hero-state", "core-settle");
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(await page.evaluate(() => window.__GTG_CANVAS_MOUNTS__ ?? 0)).toBe(0);
  await page.waitForLoadState("networkidle");

  const telemetry = await readWebGLRuntime(page);
  expect(telemetry.firstAnimationFrameCanvasCount).toBe(0);
  expect(telemetry.canvasDomMounts).toBe(0);
  expect(telemetry.webglContextRequests).toBe(0);
  expect(telemetry.drawCalls).toBe(0);
  expect(requestedThreeClientChunks(chunkRequests)).toEqual([]);
});

test("mouse wheel and trackpad-like input preserve Hero state order and reverse cleanly", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await trackCanvasMounts(page);
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  await page.goto(appRoute());

  const hero = page.getByTestId("hero");
  await expect(hero).toHaveAttribute("data-experience-mode", "motion");
  await waitForMotionReady(page);
  await expect(hero).toHaveAttribute("data-hero-state", "identity");
  await expect(page.locator("#top canvas")).toHaveCount(1);

  const heroCta = page.getByTestId("hero-stage").getByRole("link", { name: "문의하기" });
  await heroCta.focus();
  await expect(heroCta).toBeFocused();

  const mouseSamples = await wheelSequence(page, [mouseWheelDelta]);
  expect(mouseSamples).toHaveLength(1);
  expect(mouseSamples[0].state).not.toBe("core-settle");
  expect(heroStateOrder[mouseSamples[0].state]).toBeLessThanOrEqual(1);
  expect(mouseSamples[0].hasVisibleContent).toBe(true);
  await expect(heroCta).toBeFocused();

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => sampleHeroMotion(page).then((sample) => sample.progress)).toBeLessThanOrEqual(0.002);

  const downwardSamples: HeroMotionSample[] = [await sampleHeroMotion(page)];
  let downwardPackets = 0;
  while (downwardSamples.at(-1)!.progress < 0.9 && downwardPackets < 24) {
    downwardSamples.push(...(await wheelSequence(page, trackpadLikeDeltas)));
    downwardPackets += 1;
  }
  expect(downwardPackets).toBeLessThan(24);
  expect(downwardSamples.at(-1)!.state).toBe("core-settle");
  expectMonotonicProgress(downwardSamples, "down");
  await expect(heroCta).toBeFocused();

  const reverseDeltas = [...trackpadLikeDeltas].reverse().map((delta) => -delta);
  const upwardSamples: HeroMotionSample[] = [await sampleHeroMotion(page)];
  let upwardPackets = 0;
  while (upwardSamples.at(-1)!.progress > 0.01 && upwardPackets < 24) {
    upwardSamples.push(...(await wheelSequence(page, reverseDeltas)));
    upwardPackets += 1;
  }
  expect(upwardPackets).toBeLessThan(24);
  expect(upwardSamples.at(-1)!.state).toBe("identity");
  expectMonotonicProgress(upwardSamples, "up");
  await expect(heroCta).toBeFocused();

  const layoutMetrics = await page.evaluate(() => {
    const heroElement = document.querySelector<HTMLElement>("#top");
    const contact = document.querySelector<HTMLElement>("#contact");
    if (!heroElement || !contact) {
      throw new Error("Hero and Contact are required for motion metrics");
    }
    return {
      contactOffsetPx: contact.offsetTop,
      contactOffsetVh: contact.offsetTop / window.innerHeight,
      documentHeightPx: document.documentElement.scrollHeight,
      heroTravelPx: Math.max(0, heroElement.offsetHeight - window.innerHeight),
      heroTravelVh: Math.max(0, heroElement.offsetHeight - window.innerHeight) / window.innerHeight,
      viewport: { height: window.innerHeight, width: window.innerWidth }
    };
  });
  fs.writeFileSync(
    path.join(experienceAfterArtifactDir, "motion-metrics.json"),
    `${JSON.stringify(
      {
        ...layoutMetrics,
        mouseWheel: {
          deltaPx: mouseWheelDelta,
          progressAfterOnePacket: mouseSamples[0].progress,
          stateAfterOnePacket: mouseSamples[0].state
        },
        trackpadLike: {
          deltasPx: trackpadLikeDeltas,
          downwardPackets,
          reversePackets: upwardPackets,
          syntheticDownDurationMs: downwardPackets * trackpadLikeDeltas.length * 16,
          syntheticReverseDurationMs: upwardPackets * trackpadLikeDeltas.length * 16
        }
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
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

  for (const viewport of desktopViewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(appRoute());
    await waitForMotionReady(page);
    await expect(page.getByTestId("hero")).toHaveAttribute("data-experience-mode", "motion");
    await expect(page.locator("#top canvas")).toHaveCount(1);
    await expect(page.locator("main#main-content > section:not(#top) canvas")).toHaveCount(0);

    await captureExperience(page, `${viewport.name}-hero-identity`);
    if (viewport.width === 1280) {
      await scrollHeroToProgress(page, 0.4, "core-active");
      await captureExperience(page, `${viewport.name}-hero-core-active`);
      await scrollHeroToProgress(page, 0.7, "core-pullback");
      await captureExperience(page, `${viewport.name}-hero-core-pullback`);
    }
    await scrollHeroToProgress(page, 0.9, "core-settle");
    await captureExperience(page, `${viewport.name}-hero-core-settle`);

    const frames =
      viewport.width === 1280
        ? [
            { name: "proof", selector: "#proof" },
            { name: "handoff", selector: "[data-testid='solutions-handoff']" },
            { name: "solution-01", productId: "vertica", selector: "#solution-data-analytics" },
            { name: "solution-02", productId: "confluent", selector: "#solution-data-streaming" },
            {
              name: "solution-03",
              productId: "hashicorp",
              selector: "#solution-infrastructure-automation"
            },
            { name: "solution-04", productId: "loadrunner", selector: "#solution-devops-quality" },
            { name: "solution-05", selector: "#solution-consulting-support" },
            { name: "company", selector: "#company" },
            { name: "engagement", selector: "#engagement" },
            { name: "contact", selector: "#contact" }
          ]
        : [
            { name: "proof", selector: "#proof" },
            { name: "handoff", selector: "[data-testid='solutions-handoff']" },
            { name: "solution-01", productId: "vertica", selector: "#solution-data-analytics" },
            { name: "solution-05", selector: "#solution-consulting-support" },
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
      { name: "solution-01", productId: "vertica", selector: "#solution-data-analytics" },
      { name: "solution-05", selector: "#solution-consulting-support" },
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

  await scrollToSelector(page, "#solution-data-analytics-title");
  await captureIa(page, "08-mobile-solution-1");
  await scrollToSelector(page, "#solution-consulting-support-title");
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
    { name: "solution-01", productId: "vertica", selector: "#solution-data-analytics" },
    { name: "solution-05", selector: "#solution-consulting-support" },
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

test("basePath keeps navigation and every local asset inside the application", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);
  const pathGuards = attachDeploymentPathGuards(page);
  await page.goto(appRoute());

  await expect(page.getByRole("link", { name: "GTG Solutions & Consult home" })).toHaveAttribute(
    "href",
    appPath("/#top")
  );
  await expect(page.getByRole("link", { name: "ABOUT" })).toHaveAttribute("href", appPath("/#company"));
  await expect(page.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", appPath("/#contact"));

  await page.evaluate(async () => {
    const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
    for (let scrollY = 0; scrollY <= maximumScroll; scrollY += Math.max(360, window.innerHeight * 0.8)) {
      window.scrollTo(0, scrollY);
      await new Promise((resolve) => window.setTimeout(resolve, 20));
    }
    for (const image of document.images) {
      image.loading = "eager";
    }
  });
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete && image.naturalWidth > 0),
    undefined,
    { timeout: 15_000 }
  );

  const imageUrls = await page.locator("img").evaluateAll((images) =>
    images.map((image) => ({
      height: (image as HTMLImageElement).naturalHeight,
      src: (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src,
      width: (image as HTMLImageElement).naturalWidth
    }))
  );
  expect(imageUrls.length).toBeGreaterThan(0);
  for (const image of imageUrls) {
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
    const url = new URL(image.src);
    if (url.origin === applicationOrigin) {
      expect(isInsideAppBasePath(url.pathname)).toBe(true);
      if (url.pathname === appPath("/_next/image")) {
        const sourcePath = url.searchParams.get("url");
        expect(sourcePath).not.toBeNull();
        expect(isInsideAppBasePath(new URL(sourcePath!, applicationOrigin).pathname)).toBe(true);
      }
    }
  }

  expect(pathGuards.outOfBasePathAssets).toEqual([]);
  expect(pathGuards.failedRequests).toEqual([]);
  expect(pathGuards.asset404s).toEqual([]);
  expect(errors).toEqual([]);
});

test("topology SVG assets remain local and claim-safe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1180 });
  const errors = await attachConsoleGuards(page);
  for (const fileName of topologySvgFiles) {
    expectSvgSafe(fileName);
  }

  await expectNoExternalImageRequests(page, async () => {
    await page.goto(appRoute());
    await page.setContent(`<!doctype html><html><body style="margin:0;background:#040404"><main style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:28px">${topologySvgFiles
      .map(
        (fileName) =>
          `<figure style="margin:0"><img style="display:block;width:100%;aspect-ratio:16/10;object-fit:contain" src="${appPath(`/generated/topology/${fileName}`)}" alt="${fileName}"><figcaption style="color:white">${fileName}</figcaption></figure>`
      )
      .join("")}</main></body></html>`);
    await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
    await page.screenshot({ path: path.join(topologyArtifactDir, "topology-contact-sheet.png"), fullPage: true });
  });
  expect(fs.statSync(path.join(topologyArtifactDir, "topology-contact-sheet.png")).size).toBeGreaterThan(10_000);
  expect(errors).toEqual([]);
});

test("Company capability map remains semantic and responsive", async ({ page }) => {
  const errors = await attachConsoleGuards(page);
  for (const fileName of capabilitySvgFiles) {
    expectSvgSafe(fileName);
  }

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(appRoute());
    await scrollToSelector(page, "#company");
    const map = page.getByTestId("capability-map");
    await expect(map).toBeVisible();
    const list = page.getByRole("list", { name: "GTG capability map nodes" });
    await expect(list.getByRole("listitem")).toHaveCount(capabilityNodeNames.length);
    for (const nodeName of capabilityNodeNames) {
      await expect(list.getByText(nodeName, { exact: true })).toHaveCount(1);
    }
    await expectNoOverflow(page);
  }
  expect(errors).toEqual([]);
});

test("draft metadata, robots, sitemap, and 404 remain basePath-aware", async ({ page, request }) => {
  const robotsResponse = await request.get(appRoute("/robots.txt"));
  expect(robotsResponse.ok()).toBe(true);
  expect(new URL(robotsResponse.url()).pathname).toBe(appPath("/robots.txt"));
  expect(await robotsResponse.text()).toContain("Disallow: /");

  const sitemapResponse = await request.get(appRoute("/sitemap.xml"));
  expect(sitemapResponse.ok()).toBe(true);
  expect(new URL(sitemapResponse.url()).pathname).toBe(appPath("/sitemap.xml"));
  expect(await sitemapResponse.text()).not.toContain("https://www.gtgsc.com/");

  await page.goto(appRoute());
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /nofollow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);

  await page.goto(appRoute("/missing-release-candidate-route"));
  await expect(page.getByTestId("not-found-page")).toBeVisible();
  await expect(page.getByTestId("not-found-page")).toHaveAttribute("aria-labelledby", "not-found-heading");
  await expect(page.getByTestId("not-found-page")).toHaveAttribute("tabindex", "-1");
  await expect(page.getByRole("heading", { name: "페이지를 찾을 수 없습니다" })).toBeVisible();
  await expect(page.getByTestId("not-found-page").getByRole("link", { name: "홈으로 돌아가기" })).toHaveAttribute(
    "href",
    appBasePath || "/"
  );
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

declare global {
  interface Window {
    __GTG_CANVAS_MOUNTS__?: number;
    __GTG_REVEAL_TRANSITIONS__?: Record<string, ProductRevealState[]>;
    __GTG_WEBGL_TELEMETRY__?: WebGLRuntimeTelemetry;
  }
}
