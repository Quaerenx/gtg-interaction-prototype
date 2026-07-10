"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionAnchor } from "@/components/navigation/section-anchor";
import {
  EXPERIENCE_MOTION,
  clamp01,
  getHeroTravelPx,
  heroStateForProgress,
  rangeProgress
} from "@/components/motion/experience-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { heroContent, solutionSlides } from "@/content/site";
import { supportsWebGL } from "@/lib/webgl";
import { HeroFallback } from "./hero-fallback";

type ExperienceMode = "pending" | "motion" | "mobile" | "reduced" | "fallback";

export function HeroExperience({ forceFallback }: { forceFallback: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const heroProgressRef = useRef(0);
  const correctedInitialHashRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(`(max-width: ${EXPERIENCE_MOTION.mobileMaxWidth}px)`);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(forceFallback ? false : null);
  const [canvasActive, setCanvasActive] = useState(true);

  useEffect(() => {
    if (forceFallback) {
      setWebglAvailable(false);
      return;
    }

    setWebglAvailable(supportsWebGL());
  }, [forceFallback]);

  const canUseWebGL =
    !forceFallback && prefersReducedMotion === false && isMobile === false && webglAvailable === true;

  let experienceMode: ExperienceMode = "pending";
  if (forceFallback || webglAvailable === false) {
    experienceMode = "fallback";
  } else if (prefersReducedMotion === true) {
    experienceMode = "reduced";
  } else if (isMobile === true) {
    experienceMode = "mobile";
  } else if (canUseWebGL) {
    experienceMode = "motion";
  }

  const fallbackMode =
    experienceMode === "mobile" ? "mobile" : experienceMode === "reduced" ? "reduced" : "fallback";
  const isMotionExperience = experienceMode === "motion";
  const reservesMotionTravel = experienceMode === "pending" || isMotionExperience;
  const initialHeroState = isMotionExperience ? "identity" : "core-settle";
  const { minPx, viewportFactor, maxPx } = EXPERIENCE_MOTION.hero.travel;
  const initialTravel = `clamp(${minPx}px, ${viewportFactor * 100}svh, ${maxPx}px)`;
  const renderedProgress = isMotionExperience ? "0" : "1";

  useEffect(() => {
    const root = heroRef.current;
    if (!root || experienceMode === "pending") {
      return undefined;
    }
    if (!isMotionExperience) {
      setCanvasActive(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) =>
        setCanvasActive(
          Boolean(
            entry?.isIntersecting && entry.intersectionRatio >= EXPERIENCE_MOTION.hero.canvasActiveThreshold
          )
        ),
      { threshold: [0, EXPERIENCE_MOTION.hero.canvasActiveThreshold] }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [experienceMode, isMotionExperience]);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) {
      return undefined;
    }

    if (experienceMode === "pending") {
      return undefined;
    }

    let frame = 0;
    let travel = getHeroTravelPx(window.innerHeight);
    const applyProgress = (progress: number) => {
      const normalized = clamp01(progress);
      const { identityEnd, activeEnd, pullbackEnd } = EXPERIENCE_MOTION.hero.boundaries;
      heroProgressRef.current = normalized;
      root.dataset.heroProgress = normalized.toFixed(3);
      root.dataset.heroState = heroStateForProgress(normalized);
      root.style.setProperty("--hero-progress", normalized.toFixed(4));
      root.style.setProperty(
        "--hero-active-progress",
        rangeProgress(normalized, identityEnd, activeEnd).toFixed(4)
      );
      root.style.setProperty(
        "--hero-pullback-progress",
        rangeProgress(normalized, activeEnd, pullbackEnd).toFixed(4)
      );
      root.style.setProperty(
        "--hero-settle-progress",
        rangeProgress(normalized, pullbackEnd, 1).toFixed(4)
      );
    };

    if (!isMotionExperience) {
      root.style.setProperty("--hero-scroll-travel", "0px");
      root.dataset.motionReady = "true";
      applyProgress(1);
      return undefined;
    }

    const update = () => {
      frame = 0;
      applyProgress(-root.getBoundingClientRect().top / travel);
      root.dataset.motionReady = "true";
    };
    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };
    const handleResize = () => {
      travel = getHeroTravelPx(window.innerHeight);
      root.style.setProperty("--hero-scroll-travel", `${travel}px`);
      requestUpdate();
    };

    root.style.setProperty("--hero-scroll-travel", `${travel}px`);
    update();
    if (!correctedInitialHashRef.current) {
      correctedInitialHashRef.current = true;
      const fragmentId = decodeURIComponent(window.location.hash.slice(1));
      const target = fragmentId && fragmentId !== "top" ? document.getElementById(fragmentId) : null;
      if (target) {
        const documentRoot = document.documentElement;
        const previousScrollBehavior = documentRoot.style.scrollBehavior;
        const headerHeight = Number.parseFloat(
          window.getComputedStyle(documentRoot).getPropertyValue("--header-height")
        );
        documentRoot.style.scrollBehavior = "auto";
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - (headerHeight || 0));
        documentRoot.style.scrollBehavior = previousScrollBehavior;
        update();
      }
    }
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [experienceMode, isMotionExperience]);

  return (
    <section
      ref={heroRef}
      className={`hero-shell ${reservesMotionTravel ? "is-motion" : "is-static"}`}
      style={{
        "--hero-scroll-travel": initialTravel,
        "--hero-progress": renderedProgress,
        "--hero-active-progress": renderedProgress,
        "--hero-pullback-progress": renderedProgress,
        "--hero-settle-progress": renderedProgress
      } as CSSProperties}
      data-testid="hero"
      data-experience-mode={experienceMode}
      data-motion-ready="false"
      data-hero-progress={isMotionExperience ? "0.000" : "1.000"}
      data-hero-state={initialHeroState}
      data-canvas-active={canUseWebGL && canvasActive ? "true" : "false"}
      data-header-theme="dark"
      id="top"
      aria-labelledby="hero-heading"
    >
      <div className="hero-stage" data-testid="hero-stage">
        <div className="hero-atmosphere" aria-hidden="true" />

        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title" aria-label={heroContent.headline} tabIndex={-1}>
            {heroContent.headlineLines.map((line) => (
              <span className="hero-title-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="keyword-mask">
            <span className="keyword-text">{heroContent.eyebrow}</span>
          </p>
        </div>

        <div className="hero-media" aria-hidden="true">
          {canUseWebGL ? (
            <HeroCanvas
              active={canvasActive}
              progressRef={heroProgressRef}
              onFailure={() => setWebglAvailable(false)}
            />
          ) : (
            <HeroFallback mode={fallbackMode} />
          )}
        </div>

        <div className="hero-support">
          <p>{heroContent.description}</p>
          <SectionAnchor className="hero-cta" href={heroContent.primaryCta.href} focusTargetId="contact-heading">
            {heroContent.primaryCta.label}
          </SectionAnchor>
        </div>

        <ul className="hero-capability-summary" aria-label="GTG Data Core capability routes">
          {solutionSlides.map((solution) => (
            <li data-capability-id={solution.id} key={solution.id}>
              {solution.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
