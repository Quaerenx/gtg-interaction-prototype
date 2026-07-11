import type { Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

export type WebGLRuntimeTelemetry = {
  canvasDomMounts: number;
  drawCalls: number;
  firstAnimationFrameCanvasCount: number | null;
  webglContextRequests: number;
};

let threeClientChunkPathsCache: Set<string> | undefined;

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

export function collectClientChunkRequests(page: Page) {
  const requests: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("/_next/static/chunks/") && /\.js(?:\?|$)/.test(url)) {
      requests.push(url);
    }
  });
  return requests;
}

export function requestedThreeClientChunks(requests: readonly string[]) {
  const threeChunkPaths = discoverThreeClientChunkPaths();
  return requests.filter((requestUrl) => {
    const pathname = decodeURIComponent(new URL(requestUrl).pathname);
    return [...threeChunkPaths].some((chunkPath) => pathname.endsWith(chunkPath));
  });
}

export async function trackCanvasMounts(page: Page) {
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

export async function trackWebGLRuntime(page: Page) {
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

export async function readWebGLRuntime(page: Page) {
  return page.evaluate(() => {
    const telemetry = window.__GTG_WEBGL_TELEMETRY__;
    if (!telemetry) {
      throw new Error("WebGL runtime telemetry was not installed before navigation");
    }
    return { ...telemetry };
  });
}
