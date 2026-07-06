"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  customerProofContent,
  heroContent,
  heroCustomers,
  heroRingCustomers,
  heroServices,
  siteContent
} from "@/content/site";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { supportsWebGL } from "@/lib/webgl";
import { HeroFallback } from "./hero-fallback";

gsap.registerPlugin(ScrollTrigger);

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function range(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function heroStateForProgress(value: number) {
  if (value < 0.34) {
    return "initial";
  }

  if (value < 0.84) {
    return "orbit";
  }

  if (value < 0.98) {
    return "handoff";
  }

  return "complete";
}

export function HeroExperience({ forceFallback }: { forceFallback: boolean }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [progress, setProgress] = useState(0);
  const [webglAvailable, setWebglAvailable] = useState(!forceFallback);

  const staticMode = forceFallback || prefersReducedMotion || isMobile || !webglAvailable;
  const heroKeyword = staticMode || progress < 0.34 ? "GTG Data Core" : customerProofContent.headlineKeyword;

  useEffect(() => {
    if (forceFallback) {
      setWebglAvailable(false);
      return;
    }

    setWebglAvailable(supportsWebGL());
  }, [forceFallback]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const proofIn = range(progress, 0.36, 0.48);
    const proofOut = range(progress, 0.78, 0.9);
    const proofVisibility = proofIn * (1 - proofOut);
    const blackout = range(progress, 0.9, 1);
    const copyFade = 1 - range(progress, 0.22, 0.34);
    const supportFade = 1 - range(progress, 0.28, 0.4);
    const mediaFade = 1 - range(progress, 0.94, 1);
    const solutionPreview = range(progress, 0.86, 0.98);
    const solutionText = range(progress, 0.88, 0.98);

    stage.style.setProperty("--hero-progress", progress.toFixed(4));
    stage.style.setProperty("--hero-bg-top-alpha", Math.max(0.2, 0.82 - progress * 0.62).toFixed(3));
    stage.style.setProperty("--hero-bg-mid-alpha", Math.max(0.2, 0.5 - progress * 0.25).toFixed(3));
    stage.style.setProperty("--hero-bg-low-alpha", Math.min(0.74, 0.62 + progress * 0.12).toFixed(3));
    stage.style.setProperty("--hero-accent-opacity", Math.max(0.1, 0.32 - progress * 0.22).toFixed(3));
    stage.style.setProperty("--hero-grid-opacity", Math.min(0.38, 0.2 + progress * 0.18).toFixed(3));
    stage.style.setProperty("--hero-blackout-opacity", (blackout * 0.84).toFixed(3));
    stage.style.setProperty("--hero-copy-y", `${Math.round(progress * -52)}px`);
    stage.style.setProperty("--hero-copy-blur", `${(range(progress, 0.24, 0.4) * 7).toFixed(2)}px`);
    stage.style.setProperty("--hero-copy-opacity", copyFade.toFixed(3));
    stage.style.setProperty("--hero-media-opacity", mediaFade.toFixed(3));
    stage.style.setProperty("--hero-support-y", `${Math.round(progress * -18)}px`);
    stage.style.setProperty("--hero-support-opacity", supportFade.toFixed(3));
    stage.style.setProperty("--hero-proof-y", `${Math.round((1 - proofIn) * 24 - proofOut * 22)}px`);
    stage.style.setProperty("--hero-proof-opacity", proofVisibility.toFixed(3));
    stage.style.setProperty("--scroll-opacity", (1 - range(progress, 0, 0.33)).toFixed(3));
    stage.style.setProperty("--hero-solution-preview-opacity", (solutionPreview * 0.98).toFixed(3));
    stage.style.setProperty("--hero-solution-text-opacity", solutionText.toFixed(3));
    stage.style.setProperty("--hero-solution-text-y", `${Math.round((1 - solutionText) * 18)}px`);
  }, [progress]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;

    if (!root || !stage || staticMode || isMobile) {
      progressRef.current = 0;
      setProgress(0);
      return undefined;
    }

    const context = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setProgress(self.progress);
        }
      });

      window.__GTG_SCROLLTRIGGERS__ = ScrollTrigger.getAll().length;
      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, root);

    return () => {
      context.revert();
      window.__GTG_SCROLLTRIGGERS__ = ScrollTrigger.getAll().length;
    };
  }, [isMobile, staticMode]);

  const fallbackMode = forceFallback ? "fallback" : prefersReducedMotion ? "reduced" : isMobile ? "mobile" : "fallback";

  return (
    <section
      ref={rootRef}
      className={`hero-shell ${staticMode ? "is-static" : ""}`}
      data-testid="hero"
      data-hero-state={staticMode ? "initial" : heroStateForProgress(progress)}
      data-hero-progress={progress.toFixed(2)}
      data-header-theme="dark"
      id="top"
      aria-labelledby="hero-heading"
    >
      <div ref={stageRef} className="hero-stage" data-testid="hero-stage">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-solution-preview" aria-hidden="true">
          <div className="hero-solution-preview-copy">
            <span>Solution 01</span>
            <strong>Data & Analytics</strong>
          </div>
        </div>
        <div className="hero-blackout" data-testid="black-handoff" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow">{heroContent.eyebrow}</p>
          <h1 id="hero-heading" className="hero-title" aria-label={heroContent.headline}>
            {heroContent.headlineLines.map((line) => (
              <span className="hero-title-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <div className="keyword-mask" aria-hidden="true">
            <span key={heroKeyword} className="keyword-text">
              {heroKeyword}
            </span>
          </div>
        </div>

        <div className="hero-proof-copy" aria-hidden="true">
          <p className="eyebrow">{customerProofContent.cardLabel}</p>
          <strong>{customerProofContent.headlineKeyword}</strong>
        </div>

        <div className="hero-media">
          {staticMode ? (
            <HeroFallback customers={heroRingCustomers} mode={fallbackMode} />
          ) : (
            <HeroCanvas
              mediaItems={heroRingCustomers}
              progressRef={progressRef}
              isMobile={isMobile}
              onFailure={() => setWebglAvailable(false)}
            />
          )}
        </div>

        <div className="hero-support">
          <p>{heroContent.description}</p>
          <a className="hero-cta" href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
          </a>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <span className="scroll-line" />
        </div>

        <ul className="sr-only" aria-label="Hero services">
          {heroServices.map((service) => (
            <li key={service.id}>{service.label}</li>
          ))}
        </ul>

        <ul className="sr-only" aria-label="Representative customers">
          {heroCustomers.map((customer) => (
            <li key={customer.id}>{customer.label}</li>
          ))}
        </ul>
      </div>

      {siteContent.isApproved ? null : (
        <div className="prototype-mark" aria-hidden="true">
          {siteContent.badge}
        </div>
      )}
    </section>
  );
}

declare global {
  interface Window {
    __GTG_SCROLLTRIGGERS__?: number;
  }
}
