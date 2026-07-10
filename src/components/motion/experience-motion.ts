export type HeroState = "identity" | "core-active" | "core-pullback" | "core-settle";
export type HandoffState = "signal" | "branching" | "connected";
export type ProductRevealState = "idle" | "active" | "seen";

export const EXPERIENCE_MOTION = {
  mobileMaxWidth: 767,
  hero: {
    canvasActiveThreshold: 0.05,
    travel: {
      minPx: 900,
      viewportFactor: 1.6,
      maxPx: 1440
    },
    boundaries: {
      identityEnd: 0.25,
      activeEnd: 0.6,
      pullbackEnd: 0.82
    }
  },
  handoff: {
    viewportStart: 0.88,
    viewportEnd: 0.28,
    signalEnd: 0.35,
    branchEnd: 0.75
  },
  solution: {
    activeRootMargin: "-34% 0px -48% 0px",
    revealViewportEnd: 0.86,
    revealThreshold: 0.35,
    revealDurationMs: 680
  }
} as const;

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function rangeProgress(value: number, start: number, end: number) {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }
  return clamp01((value - start) / (end - start));
}

export function heroStateForProgress(progress: number): HeroState {
  const { identityEnd, activeEnd, pullbackEnd } = EXPERIENCE_MOTION.hero.boundaries;
  if (progress < identityEnd) {
    return "identity";
  }
  if (progress < activeEnd) {
    return "core-active";
  }
  if (progress < pullbackEnd) {
    return "core-pullback";
  }
  return "core-settle";
}

export function handoffStateForProgress(progress: number): HandoffState {
  const { signalEnd, branchEnd } = EXPERIENCE_MOTION.handoff;
  if (progress < signalEnd) {
    return "signal";
  }
  if (progress < branchEnd) {
    return "branching";
  }
  return "connected";
}

export function getHeroTravelPx(viewportHeight: number) {
  const { minPx, viewportFactor, maxPx } = EXPERIENCE_MOTION.hero.travel;
  return Math.round(Math.min(maxPx, Math.max(minPx, viewportHeight * viewportFactor)));
}
