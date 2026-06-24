"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { solutionSlides } from "@/content/site";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function SolutionPreview() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const staticFlow = isMobile || prefersReducedMotion;

  useEffect(() => {
    const root = rootRef.current;

    if (!root || staticFlow) {
      setActiveIndex(0);
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
          const nextIndex = Math.min(
            solutionSlides.length - 1,
            Math.floor(self.progress * solutionSlides.length)
          );
          setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
        }
      });

      window.__GTG_SOLUTION_TRIGGERS__ = ScrollTrigger.getAll().length;
      ScrollTrigger.refresh();

      return () => trigger.kill();
    }, root);

    return () => {
      context.revert();
      window.__GTG_SOLUTION_TRIGGERS__ = ScrollTrigger.getAll().length;
    };
  }, [staticFlow]);

  return (
    <section
      ref={rootRef}
      id="solutions"
      className={`solutions-section ${staticFlow ? "is-static-flow" : "is-hybrid-pinned"}`}
      data-testid="solutions-section"
      data-active-solution={String(activeIndex + 1).padStart(2, "0")}
      aria-label="GTG solution sequence"
      style={{ "--solution-count": solutionSlides.length } as CSSProperties}
    >
      <div className="solutions-stage">
        <div className="solution-layers" data-testid="solution-layers">
          {solutionSlides.map((slide, index) => (
            <article
              id={slide.id}
              className={`solution-slide ${activeIndex === index ? "is-active" : ""}`}
              data-testid={`solution-slide-${index + 1}`}
              aria-labelledby={`${slide.id}-title`}
              key={slide.id}
            >
              <div className="solution-bg" aria-hidden="true">
                <Image
                  src={slide.visual}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>

              <div className="solution-content">
                <div>
                  <p className="solution-kicker">{slide.eyebrow}</p>
                  <h2 id={`${slide.id}-title`} className="solution-title">
                    {slide.title}
                  </h2>
                  <p className="solution-description">{slide.description}</p>
                </div>

                <div className="solution-index" aria-label={slide.index}>
                  <span className="solution-index-active">{String(index + 1).padStart(2, "0")}</span>
                  <span className="solution-index-line" aria-hidden="true" />
                  <span className="solution-index-total">05</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <nav className="solution-rail" aria-label="Solution progress" data-testid="solution-rail">
          {solutionSlides.map((slide, index) => (
            <a
              className={activeIndex === index ? "is-active" : ""}
              href={`#${slide.id}`}
              aria-label={slide.index}
              key={slide.id}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

declare global {
  interface Window {
    __GTG_SOLUTION_TRIGGERS__?: number;
  }
}
