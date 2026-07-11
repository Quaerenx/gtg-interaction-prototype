import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { applicationOrigin, appPath, appRoute, isInsideAppBasePath } from "./support/app";
import { topologyArtifactDir } from "./support/artifacts";
import { capabilityNodeNames, capabilitySvgFiles, topologySvgFiles } from "./support/fixtures";
import {
  attachConsoleGuards,
  attachDeploymentPathGuards,
  expectNoExternalImageRequests,
  expectNoOverflow,
  expectSvgSafe,
  scrollToSelector
} from "./support/runtime";

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
