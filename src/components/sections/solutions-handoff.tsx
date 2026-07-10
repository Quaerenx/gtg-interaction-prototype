"use client";

import { useLayoutEffect, useRef } from "react";
import {
  EXPERIENCE_MOTION,
  clamp01,
  handoffStateForProgress,
  rangeProgress
} from "@/components/motion/experience-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { solutionSlides } from "@/content/site";

const routeGeometry: Record<string, { endpointX: number; path: string }> = {
  "solution-data-analytics": { endpointX: 110, path: "M 500 38 C 500 92, 168 92, 110 188" },
  "solution-data-streaming": { endpointX: 305, path: "M 500 38 C 500 104, 348 104, 305 188" },
  "solution-infrastructure-automation": { endpointX: 500, path: "M 500 38 L 500 188" },
  "solution-devops-quality": { endpointX: 695, path: "M 500 38 C 500 104, 652 104, 695 188" },
  "solution-consulting-support": { endpointX: 890, path: "M 500 38 C 500 92, 832 92, 890 188" }
};

export function SolutionsHandoff() {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(`(max-width: ${EXPERIENCE_MOTION.mobileMaxWidth}px)`);
  const motionEnabled = prefersReducedMotion === false && isMobile === false;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    let frame = 0;
    const applyProgress = (value: number) => {
      const progress = clamp01(value);
      root.dataset.handoffProgress = progress.toFixed(3);
      root.dataset.handoffState = handoffStateForProgress(progress);
      root.style.setProperty("--handoff-progress", progress.toFixed(4));
      root.style.setProperty(
        "--handoff-branch-progress",
        rangeProgress(progress, EXPERIENCE_MOTION.handoff.signalEnd, EXPERIENCE_MOTION.handoff.branchEnd).toFixed(4)
      );
      root.style.setProperty(
        "--handoff-connect-progress",
        rangeProgress(progress, EXPERIENCE_MOTION.handoff.branchEnd, 1).toFixed(4)
      );
    };

    if (!motionEnabled) {
      applyProgress(1);
      return undefined;
    }

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const startY = window.innerHeight * EXPERIENCE_MOTION.handoff.viewportStart;
      const endY = window.innerHeight * EXPERIENCE_MOTION.handoff.viewportEnd;
      const travel = rect.height + startY - endY;
      applyProgress((startY - rect.top) / travel);
    };
    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [motionEnabled]);

  return (
    <div
      ref={rootRef}
      className="solutions-handoff"
      data-testid="solutions-handoff"
      data-header-theme="dark"
      data-handoff-progress="1.000"
      data-handoff-state="connected"
      aria-hidden="true"
    >
      <svg className="topology-diagram" viewBox="0 0 1000 220" preserveAspectRatio="xMidYMid meet">
        <circle className="topology-signal" cx="500" cy="38" r="7" />
        {solutionSlides.map((solution) => (
          <g data-route-id={solution.id} key={solution.id}>
            <path className="topology-route" d={routeGeometry[solution.id].path} pathLength="1" />
            <circle
              className={`topology-endpoint ${solution.id === "solution-data-analytics" ? "is-primary" : ""}`}
              cx={routeGeometry[solution.id].endpointX}
              cy="188"
              r="5"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
