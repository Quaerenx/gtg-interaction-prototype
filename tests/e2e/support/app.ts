import { expect, type Page } from "@playwright/test";

function normalizeBasePath(value: string) {
  const normalized = value.trim().replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "";
}

export const appBasePath = normalizeBasePath(process.env.NEXT_BASE_PATH ?? "/hero");
export const appHomePath = appBasePath || "/";
const defaultApplicationBaseURL = `http://127.0.0.1:18150${appBasePath}/`;
export const applicationBaseURL = process.env.PLAYWRIGHT_BASE_URL ?? defaultApplicationBaseURL;
export const applicationOrigin = new URL(applicationBaseURL).origin;

export function appPath(pathname: string) {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return pathname;
  }
  if (appBasePath && (pathname.startsWith("/#") || pathname.startsWith("/?"))) {
    return `${appBasePath}${pathname.slice(1)}`;
  }
  return appBasePath ? `${appBasePath}${pathname}` : pathname;
}

export function appRoute(pathname = "/") {
  return pathname === "/" ? "./" : `.${pathname}`;
}

export function expectAppLocation(page: Page, hash: string) {
  const currentUrl = new URL(page.url());
  expect(currentUrl.pathname).toBe(appHomePath);
  expect(currentUrl.hash).toBe(hash);
}

export function isInsideAppBasePath(pathname: string) {
  return !appBasePath || pathname === appBasePath || pathname.startsWith(`${appBasePath}/`);
}
