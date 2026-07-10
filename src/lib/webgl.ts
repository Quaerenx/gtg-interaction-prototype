export function supportsWebGL() {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    const supported = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    canvas.width = 1;
    canvas.height = 1;
    return supported;
  } catch {
    return false;
  }
}
