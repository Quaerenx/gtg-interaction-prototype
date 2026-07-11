import { expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { scrollToSelector, waitForScreenshotReadiness } from "./runtime";

const artifactDir = path.join(process.cwd(), "tests", "artifacts");
const informationArchitectureDir = path.join(artifactDir, "information-architecture");
export const afterArtifactDir = path.join(informationArchitectureDir, "after");
export const topologyArtifactDir = path.join(artifactDir, "topology-svg-kit");
const capabilityArtifactDir = path.join(artifactDir, "capability-map");
export const experienceAfterArtifactDir = path.join(artifactDir, "experience-redesign", "after");

export function ensureArtifacts() {
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

export async function captureIa(page: Page, name: string) {
  await waitForScreenshotReadiness(page);
  await page.screenshot({ path: path.join(afterArtifactDir, `${name}.png`), fullPage: false });
}

export async function captureExperience(page: Page, name: string) {
  await waitForScreenshotReadiness(page);
  await page.screenshot({ path: path.join(experienceAfterArtifactDir, `${name}.png`), fullPage: false });
}

export async function captureSectionFrame(
  page: Page,
  prefix: string,
  frame: { name: string; productId?: string; selector: string }
) {
  await scrollToSelector(page, frame.selector);
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.locator(frame.selector).first()).toBeInViewport({ ratio: 0.01 });
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
