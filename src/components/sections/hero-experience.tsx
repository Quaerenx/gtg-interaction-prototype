"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  customerProofContent,
  heroContent,
  heroCustomers,
  heroRingCustomers,
  heroServices,
  siteContent,
  solutionStackItems
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

type HeroState = "initial" | "orbit" | "handoff" | "complete";

const dataCoreKeyword = "GTG Data Core";

function heroStateForProgress(value: number) {
  if (value < 0.34) {
    return "initial";
  }

  if (value < 0.78) {
    return "orbit";
  }

  if (value < 0.995) {
    return "handoff";
  }

  return "complete";
}

function stackCountForProgress(progress: number) {
  const stackActivationProgress = range(progress, 0.94, 0.99);
  return Math.min(solutionStackItems.length, Math.floor(stackActivationProgress * solutionStackItems.length + 0.35));
}

function applyHeroProgress(root: HTMLElement, stage: HTMLElement, progress: number) {
  const proofIn = range(progress, 0.36, 0.48);
  const proofOut = range(progress, 0.7, 0.82);
  const proofVisibility = proofIn * (1 - proofOut);
  const blackout = range(progress, 0.8, 0.93);
  const copyFade = 1 - range(progress, 0.22, 0.34);
  const supportFade = 1 - range(progress, 0.28, 0.4);
  const mediaFade = 1 - range(progress, 0.72, 0.84);
  const solutionPreview = range(progress, 0.86, 0.94);
  const solutionTopology = range(progress, 0.875, 0.92);
  const solutionRoute = range(progress, 0.89, 0.935);
  const solutionSignal = range(progress, 0.91, 0.95);
  const solutionText = range(progress, 0.965, 0.997);
  const solutionStackIn = range(progress, 0.935, 0.985);
  const solutionStackOut = range(progress, 0.992, 1);
  const solutionStackVisibility = solutionStackIn * (1 - solutionStackOut);

  root.dataset.heroProgress = progress.toFixed(2);
  root.dataset.heroState = heroStateForProgress(progress);
  stage.style.setProperty("--hero-progress", progress.toFixed(4));
  stage.style.setProperty("--hero-bg-top-alpha", Math.max(0.2, 0.82 - progress * 0.62).toFixed(3));
  stage.style.setProperty("--hero-bg-mid-alpha", Math.max(0.2, 0.5 - progress * 0.25).toFixed(3));
  stage.style.setProperty("--hero-bg-low-alpha", Math.min(0.74, 0.62 + progress * 0.12).toFixed(3));
  stage.style.setProperty("--hero-accent-opacity", Math.max(0.1, 0.32 - progress * 0.22).toFixed(3));
  stage.style.setProperty("--hero-grid-opacity", Math.min(0.38, 0.2 + progress * 0.18).toFixed(3));
  stage.style.setProperty("--hero-blackout-opacity", (blackout * 0.54).toFixed(3));
  stage.style.setProperty("--hero-copy-y", `${Math.round(progress * -52)}px`);
  stage.style.setProperty("--hero-copy-blur", `${(range(progress, 0.24, 0.4) * 7).toFixed(2)}px`);
  stage.style.setProperty("--hero-copy-opacity", copyFade.toFixed(3));
  stage.style.setProperty("--hero-media-opacity", mediaFade.toFixed(3));
  stage.style.setProperty("--hero-support-y", `${Math.round(progress * -18)}px`);
  stage.style.setProperty("--hero-support-opacity", supportFade.toFixed(3));
  stage.style.setProperty("--hero-proof-y", `${Math.round((1 - proofIn) * 24 - proofOut * 34)}px`);
  stage.style.setProperty("--hero-proof-blur", `${(proofOut * 8).toFixed(2)}px`);
  stage.style.setProperty("--hero-proof-opacity", proofVisibility.toFixed(3));
  stage.style.setProperty("--scroll-opacity", (1 - range(progress, 0, 0.33)).toFixed(3));
  stage.style.setProperty("--hero-solution-preview-opacity", (solutionPreview * 0.98).toFixed(3));
  stage.style.setProperty("--hero-solution-text-opacity", solutionText.toFixed(3));
  stage.style.setProperty("--hero-solution-text-y", `${Math.round((1 - solutionText) * 18)}px`);
  stage.style.setProperty("--hero-solution-topology-opacity", (solutionTopology * 0.92).toFixed(3));
  stage.style.setProperty("--hero-solution-route-scale", solutionRoute.toFixed(3));
  stage.style.setProperty("--hero-solution-signal-scale", solutionSignal.toFixed(3));
  stage.style.setProperty("--hero-solution-stack-opacity", solutionStackVisibility.toFixed(3));
  stage.style.setProperty(
    "--hero-solution-stack-y",
    `${Math.round((1 - solutionStackIn) * 24 - solutionStackOut * 18)}px`
  );
  stage.style.setProperty("--hero-solution-stack-scale", (0.965 + solutionStackIn * 0.035).toFixed(3));

  const activeStackCount = stackCountForProgress(progress);
  stage.querySelectorAll<HTMLElement>(".hero-solution-stack-card").forEach((card, index) => {
    card.classList.toggle("is-active", index < activeStackCount);
  });
}

export function HeroExperience({ forceFallback }: { forceFallback: boolean }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const heroStateRef = useRef<HeroState>("initial");
  const heroKeywordRef = useRef(dataCoreKeyword);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [heroState, setHeroState] = useState<HeroState>("initial");
  const [heroKeyword, setHeroKeyword] = useState(dataCoreKeyword);
  const [webglAvailable, setWebglAvailable] = useState(!forceFallback);

  const staticMode = forceFallback || prefersReducedMotion || isMobile || !webglAvailable;

  useEffect(() => {
    if (forceFallback) {
      setWebglAvailable(false);
      return;
    }

    setWebglAvailable(supportsWebGL());
  }, [forceFallback]);

  useEffect(() => {
    heroKeywordRef.current = heroKeyword;
  }, [heroKeyword]);

  useEffect(() => {
    heroStateRef.current = heroState;
  }, [heroState]);

  useEffect(() => {
    if (staticMode && heroKeywordRef.current !== dataCoreKeyword) {
      heroKeywordRef.current = dataCoreKeyword;
      setHeroKeyword(dataCoreKeyword);
    }
  }, [staticMode]);

  useEffect(() => {
    if (staticMode && heroStateRef.current !== "initial") {
      heroStateRef.current = "initial";
      setHeroState("initial");
    }
  }, [staticMode]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) {
      return;
    }

    applyHeroProgress(root, stage, 0);
  }, [staticMode]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;

    if (!root || !stage || staticMode || isMobile) {
      progressRef.current = 0;
      if (root && stage) {
        applyHeroProgress(root, stage, 0);
      }
      return undefined;
    }

    let frameId = 0;
    let pendingProgress = progressRef.current;

    const syncHeroState = (nextProgress: number) => {
      const nextHeroState = heroStateForProgress(nextProgress);
      const nextHeroKeyword =
        nextProgress < 0.34 ? dataCoreKeyword : customerProofContent.headlineKeyword;

      if (heroStateRef.current !== nextHeroState) {
        heroStateRef.current = nextHeroState;
        setHeroState(nextHeroState);
      }

      if (heroKeywordRef.current !== nextHeroKeyword) {
        heroKeywordRef.current = nextHeroKeyword;
        setHeroKeyword(nextHeroKeyword);
      }
    };

    const flushProgress = () => {
      frameId = 0;
      applyHeroProgress(root, stage, pendingProgress);
      syncHeroState(pendingProgress);
    };

    const queueProgressUpdate = (nextProgress: number) => {
      pendingProgress = nextProgress;
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(flushProgress);
      }
    };

    const context = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          queueProgressUpdate(self.progress);
        }
      });

      queueProgressUpdate(0);
      window.__GTG_SCROLLTRIGGERS__ = ScrollTrigger.getAll().length;
      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, root);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
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
      data-hero-state={staticMode ? "initial" : heroState}
      data-header-theme="dark"
      id="top"
      aria-labelledby="hero-heading"
    >
      <div ref={stageRef} className="hero-stage" data-testid="hero-stage">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-solution-preview" aria-hidden="true">
          <div className="hero-solution-topology">
            <span className="hero-solution-route hero-solution-route-a" />
            <span className="hero-solution-route hero-solution-route-b" />
            <span className="hero-solution-route hero-solution-route-c" />
            <span className="hero-solution-node hero-solution-node-a" />
            <span className="hero-solution-node hero-solution-node-b" />
            <span className="hero-solution-node hero-solution-node-c" />
            <span className="hero-solution-node hero-solution-node-d" />
            <span className="hero-solution-signal" />
          </div>
          <div className="hero-solution-stack" data-testid="hero-solution-stack">
            <div className="hero-solution-stack-header">
              <span>Solution scope</span>
              <strong>Technology scope</strong>
            </div>
            <ul>
              {solutionStackItems.map((item, index) => (
                <li
                  className="hero-solution-stack-card"
                  data-stack-index={index}
                  key={item.id}
                >
                  <span className="hero-solution-stack-node" />
                  <span
                    className={`hero-solution-logo-frame ${item.logoSrc ? "has-logo" : "is-text-mark"}`}
                    data-stack-id={item.id}
                  >
                    {item.logoSrc ? (
                      <>
                        <Image src={item.logoSrc} alt="" width={220} height={80} />
                        {item.id === "vertica" ? <span className="hero-solution-logo-wordmark">VERTICA</span> : null}
                      </>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </span>
                  <span className="hero-solution-stack-meta">
                    <strong>{item.label}</strong>
                    <span>{item.descriptor}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
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

        <ul className="sr-only" aria-label="Solution technology scope preview">
          {solutionStackItems.map((item) => (
            <li key={item.id}>
              {item.label}: {item.descriptor}
            </li>
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
