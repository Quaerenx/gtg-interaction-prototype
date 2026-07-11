import type { ProductRevealState } from "../../../src/components/motion/experience-motion";
import type { WebGLRuntimeTelemetry } from "./webgl";

declare global {
  interface Window {
    __GTG_CANVAS_MOUNTS__?: number;
    __GTG_REVEAL_TRANSITIONS__?: Record<string, ProductRevealState[]>;
    __GTG_WEBGL_TELEMETRY__?: WebGLRuntimeTelemetry;
  }
}

export {};
