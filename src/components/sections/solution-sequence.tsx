"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionAnchor } from "@/components/navigation/section-anchor";
import {
  EXPERIENCE_MOTION,
  type ProductRevealState
} from "@/components/motion/experience-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import {
  solutionSlides,
  solutionsContent,
  type SolutionId
} from "@/content/solutions";
import type { SolutionProductSpotlight } from "@/content/types";
import { withBasePath } from "@/lib/paths";

type VisualMotionMode = "pending" | "motion" | "static";

function isSolutionId(value: string | undefined): value is SolutionId {
  return solutionSlides.some((solution) => solution.id === value);
}

function ProductReveal({ mode, product }: { mode: VisualMotionMode; product: SolutionProductSpotlight }) {
  const rootRef = useRef<HTMLElement>(null);
  const seenRef = useRef(false);
  const [revealState, setRevealState] = useState<ProductRevealState>("seen");

  useLayoutEffect(() => {
    if (mode === "pending") {
      return undefined;
    }
    if (mode === "static" || seenRef.current) {
      seenRef.current = true;
      setRevealState("seen");
      return undefined;
    }

    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    let frame = 0;
    let seenTimer: number | undefined;
    setRevealState("idle");
    const reveal = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const viewportEnd = window.innerHeight * EXPERIENCE_MOTION.solution.revealViewportEnd;
      const visibleHeight = Math.max(0, Math.min(bounds.bottom, viewportEnd) - Math.max(bounds.top, 0));
      const visibleRatio = bounds.height > 0 ? visibleHeight / bounds.height : 0;
      if (visibleRatio < EXPERIENCE_MOTION.solution.revealThreshold) {
        return;
      }

      seenRef.current = true;
      setRevealState("active");
      window.removeEventListener("scroll", requestReveal);
      window.removeEventListener("resize", requestReveal);
      seenTimer = window.setTimeout(
        () => setRevealState("seen"),
        EXPERIENCE_MOTION.solution.revealDurationMs
      );
    };
    const requestReveal = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(reveal);
      }
    };

    requestReveal();
    window.addEventListener("scroll", requestReveal, { passive: true });
    window.addEventListener("resize", requestReveal);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestReveal);
      window.removeEventListener("resize", requestReveal);
      if (seenTimer) {
        window.clearTimeout(seenTimer);
      }
    };
  }, [mode]);

  return (
    <figure
      ref={rootRef}
      className="product-reveal"
      data-product-id={product.id}
      data-reveal-state={revealState}
      data-testid={`product-reveal-${product.id}`}
      style={{ "--product-reveal-duration": `${EXPERIENCE_MOTION.solution.revealDurationMs}ms` } as CSSProperties}
    >
      <div className={`product-reveal-mark ${product.logoSrc ? "has-logo" : "is-text-mark"}`}>
        {product.logoSrc ? (
          <Image src={withBasePath(product.logoSrc)} alt="" width={420} height={140} sizes="280px" />
        ) : (
          <span aria-hidden="true">{product.label}</span>
        )}
      </div>
      <figcaption className="sr-only">{product.label}</figcaption>
    </figure>
  );
}

export function SolutionSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const ratiosRef = useRef(new Map<Element, number>());
  const [activeSolutionId, setActiveSolutionId] = useState<SolutionId | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(`(max-width: ${EXPERIENCE_MOTION.mobileMaxWidth}px)`);
  const mediaResolved = prefersReducedMotion !== null && isMobile !== null;
  const motionEnabled = prefersReducedMotion === false && isMobile === false;
  const visualMotionMode: VisualMotionMode = !mediaResolved ? "pending" : motionEnabled ? "motion" : "static";
  const solutionNumberWidth = Math.max(2, String(solutionSlides.length).length);
  const solutionTotal = String(solutionSlides.length).padStart(solutionNumberWidth, "0");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motionEnabled) {
      ratiosRef.current.clear();
      setActiveSolutionId(null);
      return undefined;
    }

    const articles = Array.from(root.querySelectorAll<HTMLElement>("[data-solution-id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const active = [...ratiosRef.current.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((left, right) => right[1] - left[1])[0]?.[0] as HTMLElement | undefined;
        const nextSolutionId = active?.dataset.solutionId;
        setActiveSolutionId(isSolutionId(nextSolutionId) ? nextSolutionId : null);
      },
      {
        rootMargin: EXPERIENCE_MOTION.solution.activeRootMargin,
        threshold: [0, 0.2, 0.35, 0.6]
      }
    );

    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, [motionEnabled]);

  return (
    <section
      ref={rootRef}
      id="solutions"
      className="solution-sequence content-section"
      data-testid="solutions-section"
      data-header-theme="dark"
      data-motion-mode={visualMotionMode}
      aria-labelledby="solutions-heading"
    >
      <div className="solution-sequence-inner content-section-inner">
        <header className="solution-sequence-header">
          <h2 id="solutions-heading" className="section-title" tabIndex={-1}>
            {solutionsContent.headline}
          </h2>
          <p className="solution-description">{solutionsContent.description}</p>
        </header>

        <nav className="solution-route-nav" aria-label="Solution routes">
          <ol style={{ "--solution-route-count": solutionSlides.length } as CSSProperties}>
            {solutionSlides.map((solution, solutionIndex) => (
              <li key={solution.id}>
                <span className="solution-route-number" aria-hidden="true">
                  {String(solutionIndex + 1).padStart(solutionNumberWidth, "0")} / {solutionTotal}
                </span>
                <SectionAnchor
                  href={`#${solution.id}`}
                  focusTargetId={`${solution.id}-title`}
                  aria-current={activeSolutionId === solution.id ? "location" : undefined}
                >
                  {solution.title}
                </SectionAnchor>
              </li>
            ))}
          </ol>
        </nav>

        <div className="solution-articles">
          {solutionSlides.map((solution) => {
            const solutionState =
              visualMotionMode !== "motion" || activeSolutionId === null
                ? "static"
                : solution.id === activeSolutionId
                  ? "current"
                  : "inactive";

            return (
              <article
                id={solution.id}
                className="solution-article"
                data-solution-id={solution.id}
                data-solution-state={solutionState}
                data-testid={solution.id}
                aria-labelledby={`${solution.id}-title`}
                key={solution.id}
              >
                <div className="solution-article-copy">
                  <h3 id={`${solution.id}-title`} className="solution-title" tabIndex={-1}>
                    {solution.title}
                  </h3>
                  <p className="solution-description">{solution.description}</p>
                  <ul className="solution-capabilities capability-list" aria-label={`${solution.title} capabilities`}>
                    {solution.related.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {solution.cta.href.startsWith("#") ? (
                    <SectionAnchor className="solution-cta" href={solution.cta.href} focusTargetId="contact-heading">
                      {solution.cta.label}
                    </SectionAnchor>
                  ) : (
                    <a className="solution-cta" href={solution.cta.href}>
                      {solution.cta.label}
                    </a>
                  )}
                </div>

                <div className="solution-article-evidence">
                  <div className="solution-article-visual" aria-hidden="true">
                    <Image src={withBasePath(solution.visual)} alt="" fill sizes="(max-width: 767px) 100vw, 48vw" />
                  </div>
                  {solution.productSpotlight ? (
                    <ProductReveal mode={visualMotionMode} product={solution.productSpotlight} />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
