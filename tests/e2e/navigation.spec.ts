import { expect, test } from "@playwright/test";
import { appRoute, expectAppLocation } from "./support/app";
import { solutionIds, solutionIdsByKey } from "./support/fixtures";
import { attachConsoleGuards } from "./support/runtime";

test("keyboard navigation follows the semantic document without inert Solution layers", async ({ browserName, page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = await attachConsoleGuards(page);
  await page.goto(appRoute());

  const skipLink = page.getByRole("link", { name: "본문으로 이동" });
  if (browserName === "webkit") {
    // Headless WebKit follows Safari's default control-only Tab preference.
    // Focus the link directly, then verify keyboard activation and the remaining focus flow.
    await skipLink.focus();
  } else {
    await page.locator("body").focus();
    await page.keyboard.press("Tab");
  }
  await expect(skipLink).toBeFocused();
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
  const streamingSolutionHeading = `#${solutionIdsByKey.dataStreaming}-title`;
  expectAppLocation(page, `#${solutionIdsByKey.dataStreaming}`);
  await expect(page.locator(streamingSolutionHeading)).toBeFocused();
  const headerHeight = await page.evaluate(() =>
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))
  );
  await expect
    .poll(() => page.locator(streamingSolutionHeading).evaluate((heading) => heading.getBoundingClientRect().top))
    .toBeLessThanOrEqual(headerHeight + 8);
  const routeTop = await page
    .locator(streamingSolutionHeading)
    .evaluate((heading) => heading.getBoundingClientRect().top);
  expect(routeTop).toBeGreaterThanOrEqual(headerHeight - 2);
  await page.evaluate(() => window.scrollBy(0, 120));
  await expect(page.locator(streamingSolutionHeading)).toBeFocused();

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
  if (browserName === "webkit") {
    for (const solutionId of solutionIds) {
      const cta = page.locator(`article#${solutionId}`).getByRole("link");
      await cta.focus();
      await expect(cta).toBeFocused();
      tabbedSolutionCtas.push(solutionId);
    }
  } else {
    const solutionTabStopCount = await page.locator("#solutions a").count();
    for (let tabIndex = 0; tabIndex < solutionTabStopCount; tabIndex += 1) {
      await page.keyboard.press("Tab");
      const solutionId = await page.evaluate(() => document.activeElement?.closest("#solutions article")?.id ?? null);
      if (solutionId && !tabbedSolutionCtas.includes(solutionId)) {
        tabbedSolutionCtas.push(solutionId);
      }
    }
  }
  expect(tabbedSolutionCtas).toEqual(solutionIds);
  const consultingSupportCta = page.locator(`#${solutionIdsByKey.consultingSupport}`).getByRole("link");
  await expect(consultingSupportCta).toBeFocused();
  await page.keyboard.press("Enter");
  expectAppLocation(page, "#contact");
  await expect(page.locator("#contact-heading")).toBeFocused();

  expect(errors).toEqual([]);
});
