import { expect, test } from "@playwright/test";
import { appBasePath, appPath, appRoute } from "./support/app";

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
