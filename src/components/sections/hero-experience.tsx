"use client";

import { useEffect, useState } from "react";
import { SectionAnchor } from "@/components/navigation/section-anchor";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { heroContent, solutionSlides } from "@/content/site";
import { supportsWebGL } from "@/lib/webgl";
import { HeroFallback } from "./hero-fallback";

type ExperienceMode = "pending" | "motion" | "mobile" | "reduced" | "fallback";

export function HeroExperience({ forceFallback }: { forceFallback: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(forceFallback ? false : null);

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

  return (
    <section
      className="hero-shell is-static"
      data-testid="hero"
      data-experience-mode={experienceMode}
      data-hero-state="identity"
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
            <HeroCanvas onFailure={() => setWebglAvailable(false)} />
          ) : (
            <HeroFallback mode={fallbackMode} />
          )}
        </div>

        <div className="hero-support">
          <p>{heroContent.description}</p>
          <SectionAnchor className="hero-cta" href={heroContent.primaryCta.href} focusTargetId="contact-heading">
            {heroContent.primaryCta.label}
          </SectionAnchor>
          <ul className="hero-capability-summary" aria-label="GTG Data Core capability routes">
            {solutionSlides.map((solution) => (
              <li data-capability-id={solution.id} key={solution.id}>
                {solution.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
