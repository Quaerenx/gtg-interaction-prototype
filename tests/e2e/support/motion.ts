import { expect, type Page } from "@playwright/test";
import type { HeroState } from "../../../src/components/motion/experience-motion";
import { heroStateOrder } from "./fixtures";
import { waitForFrames } from "./runtime";

export type HeroMotionSample = {
  activeElement: string;
  hasVisibleContent: boolean;
  progress: number;
  scrollY: number;
  state: HeroState;
};

export async function sampleHeroMotion(page: Page): Promise<HeroMotionSample> {
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

export async function wheelSequence(page: Page, deltas: readonly number[]) {
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

export function expectMonotonicProgress(samples: HeroMotionSample[], direction: "down" | "up") {
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

export async function scrollHeroToProgress(page: Page, progress: number, expectedState: HeroState) {
  await page.getByTestId("hero").evaluate((hero, targetProgress) => {
    const element = hero as HTMLElement;
    const travel = Math.max(1, element.offsetHeight - window.innerHeight);
    window.scrollTo({ top: element.offsetTop + travel * targetProgress, behavior: "instant" });
  }, progress);
  await expect(page.getByTestId("hero")).toHaveAttribute("data-hero-state", expectedState);
  await waitForFrames(page, 2);
}
