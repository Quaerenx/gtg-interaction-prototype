const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/hero";

export function normalizeBasePath(value: string) {
  const normalized = value.trim().replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "";
}

export const appBasePath = normalizeBasePath(configuredBasePath);

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//") || !appBasePath) {
    return path;
  }
  if (
    path === appBasePath ||
    path.startsWith(`${appBasePath}/`) ||
    path.startsWith(`${appBasePath}#`) ||
    path.startsWith(`${appBasePath}?`)
  ) {
    return path;
  }
  if (path.startsWith("/#") || path.startsWith("/?")) {
    return `${appBasePath}${path.slice(1)}`;
  }
  return `${appBasePath}${path}`;
}
