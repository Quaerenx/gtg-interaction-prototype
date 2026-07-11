import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { EXPERIENCE_MOTION } from "../../src/components/motion/experience-motion";
import { applicationBaseURL, appRoute } from "./support/app";
import { experienceAfterArtifactDir } from "./support/artifacts";
import { heroStateOrder, mouseWheelDelta, trackpadLikeDeltas } from "./support/fixtures";
import {
  expectMonotonicProgress,
  sampleHeroMotion,
  type HeroMotionSample,
  wheelSequence
} from "./support/motion";
import {
  attachConsoleGuards,
  attachDeploymentPathGuards,
  scrollToSelector,
  waitForMotionReady
} from "./support/runtime";
import { cssSourceFiles, readSourceFiles } from "./support/sources";
import {
  collectClientChunkRequests,
  readWebGLRuntime,
  requestedThreeClientChunks,
  trackCanvasMounts,
  trackWebGLRuntime
} from "./support/webgl";

test("motion configuration is centralized and legacy 650svh HUD structures stay removed", async () => {
  const cssSource = readSourceFiles(cssSourceFiles);
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
  const firstMouseSample = mouseSamples.at(0)!;
  expect(firstMouseSample.state).not.toBe("core-settle");
  expect(heroStateOrder[firstMouseSample.state]).toBeLessThanOrEqual(heroStateOrder["core-active"]);
  expect(firstMouseSample.hasVisibleContent).toBe(true);
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
          progressAfterOnePacket: firstMouseSample.progress,
          stateAfterOnePacket: firstMouseSample.state
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
