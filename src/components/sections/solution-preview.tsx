"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { solutionSlides, solutionStackItems } from "@/content/site";
import { useMediaQuery, usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function SolutionPreview() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionEntered, setSectionEntered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const staticFlow = isMobile || prefersReducedMotion;

  const handleRailSelect = (index: number) => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const top = root.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(root.scrollHeight - window.innerHeight, 0);
    const progress = solutionSlides.length <= 1 ? 0 : index / (solutionSlides.length - 1);
    window.scrollTo({
      top: top + scrollable * progress,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    if (staticFlow) {
      setSectionEntered(true);
      return undefined;
    }

    const updateSectionEntered = () => {
      const bounds = root.getBoundingClientRect();
      const entered = bounds.top <= window.innerHeight * 0.08 && bounds.bottom > window.innerHeight * 0.24;
      setSectionEntered(entered);
    };

    updateSectionEntered();
    window.addEventListener("scroll", updateSectionEntered, { passive: true });
    window.addEventListener("resize", updateSectionEntered);

    return () => {
      window.removeEventListener("scroll", updateSectionEntered);
      window.removeEventListener("resize", updateSectionEntered);
    };
  }, [staticFlow]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || staticFlow) {
      setActiveIndex(0);
      setSectionEntered(true);
      return undefined;
    }

    setSectionEntered(false);

    const context = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: () => setSectionEntered(true),
        onEnterBack: () => setSectionEntered(true),
        onLeaveBack: () => setSectionEntered(false),
        onUpdate: (self) => {
          setSectionEntered(true);
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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const slides = Array.from(root.querySelectorAll<HTMLElement>(".solution-slide"));
    slides.forEach((slide, index) => {
      const inactiveDesktopSlide = !staticFlow && activeIndex !== index;
      const inertSlide = slide as HTMLElement & { inert?: boolean };
      inertSlide.inert = inactiveDesktopSlide;

      if (inactiveDesktopSlide) {
        slide.setAttribute("inert", "");
      } else {
        slide.removeAttribute("inert");
      }
    });

    return () => {
      slides.forEach((slide) => {
        const inertSlide = slide as HTMLElement & { inert?: boolean };
        inertSlide.inert = false;
        slide.removeAttribute("inert");
      });
    };
  }, [activeIndex, staticFlow]);

  return (
    <section
      ref={rootRef}
      id="solutions"
      className={`solutions-section ${staticFlow ? "is-static-flow" : "is-hybrid-pinned"} ${
        sectionEntered ? "has-entered" : ""
      }`}
      data-testid="solutions-section"
      data-active-solution={String(activeIndex + 1).padStart(2, "0")}
      data-header-theme="dark"
      aria-label="GTG solution sequence"
      style={{ "--solution-count": solutionSlides.length } as CSSProperties}
    >
      <div className="solution-stack-static" data-testid="solution-stack-static">
        <div className="solution-stack-static-copy">
          <p className="solution-kicker">Solution scope</p>
          <h2>Technology scope</h2>
        </div>
        <ul aria-label="Solution technology scope">
          {solutionStackItems.map((item) => (
            <li key={item.id}>
              <span
                className={`solution-stack-static-logo ${item.logoSrc ? "has-logo" : "is-text-mark"}`}
                data-stack-id={item.id}
              >
                {item.logoSrc ? (
                  <>
                    <Image src={item.logoSrc} alt="" width={220} height={80} />
                    {item.id === "vertica" ? <span className="solution-stack-logo-wordmark">VERTICA</span> : null}
                  </>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.descriptor}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="solutions-stage">
        <div className="solution-layers" data-testid="solution-layers">
          {solutionSlides.map((slide, index) => (
            <article
              id={slide.id}
              className={`solution-slide ${activeIndex === index ? "is-active" : ""} ${
                slide.productSpotlight ? "has-product-spotlight" : ""
              }`}
              data-solution-id={slide.id}
              data-slide-state={staticFlow ? "static" : activeIndex === index ? "active" : "inactive"}
              data-testid={`solution-slide-${index + 1}`}
              aria-hidden={staticFlow ? undefined : activeIndex !== index}
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
                  <ul className="solution-related" aria-label="Related products and services">
                    {slide.related.map((item, relatedIndex) => (
                      <li key={item} style={{ "--chip-delay": `${540 + relatedIndex * 58}ms` } as CSSProperties}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="solution-cta"
                    href={slide.cta.href}
                    tabIndex={!staticFlow && activeIndex !== index ? -1 : undefined}
                  >
                    {slide.cta.label}
                  </a>
                </div>

                <div className="solution-index" aria-label={slide.index}>
                  <span className="solution-index-active">{String(index + 1).padStart(2, "0")}</span>
                  <span className="solution-index-line" aria-hidden="true" />
                  <span className="solution-index-total">05</span>
                </div>
              </div>

              {slide.productSpotlight ? (
                <aside
                  className="solution-product-spotlight"
                  data-spotlight-id={slide.productSpotlight.id}
                  data-spotlight-variant={slide.productSpotlight.variant}
                  data-testid={`${slide.id}-product-spotlight`}
                  aria-labelledby={`${slide.id}-spotlight-title`}
                >
                  <div className="solution-spotlight-topology" aria-hidden="true">
                    <span className="solution-spotlight-plate solution-spotlight-plate-a" />
                    <span className="solution-spotlight-plate solution-spotlight-plate-b" />
                    <span className="solution-spotlight-plate solution-spotlight-plate-c" />
                    <span className="solution-spotlight-signal" />
                    <span className="solution-spotlight-node solution-spotlight-node-a" />
                    <span className="solution-spotlight-node solution-spotlight-node-b" />
                    {slide.productSpotlight.variant === "data-streaming" ? (
                      <>
                        <span className="solution-spotlight-event-line solution-spotlight-event-line-a" />
                        <span className="solution-spotlight-event-line solution-spotlight-event-line-b" />
                        <span className="solution-spotlight-pulse" />
                      </>
                    ) : null}
                    {slide.productSpotlight.variant === "infrastructure-automation" ? (
                      <>
                        <span className="solution-spotlight-module solution-spotlight-module-a" />
                        <span className="solution-spotlight-module solution-spotlight-module-b" />
                        <span className="solution-spotlight-module solution-spotlight-module-c" />
                        <span className="solution-spotlight-module solution-spotlight-module-d" />
                        <span className="solution-spotlight-module solution-spotlight-module-e" />
                        <span className="solution-spotlight-module solution-spotlight-module-f" />
                      </>
                    ) : null}
                    {slide.productSpotlight.variant === "devops-quality" ? (
                      <>
                        <span className="solution-spotlight-validation-ring" />
                        <span className="solution-spotlight-loop-line solution-spotlight-loop-line-a" />
                        <span className="solution-spotlight-loop-line solution-spotlight-loop-line-b" />
                        <span className="solution-spotlight-quality-gate solution-spotlight-quality-gate-a" />
                        <span className="solution-spotlight-quality-gate solution-spotlight-quality-gate-b" />
                        <span className="solution-spotlight-quality-gate solution-spotlight-quality-gate-c" />
                      </>
                    ) : null}
                    {slide.productSpotlight.variant === "consulting-support" ? (
                      <>
                        <span className="solution-spotlight-scope-link solution-spotlight-scope-link-a" />
                        <span className="solution-spotlight-scope-link solution-spotlight-scope-link-b" />
                        <span className="solution-spotlight-scope-node solution-spotlight-scope-node-a" />
                        <span className="solution-spotlight-scope-node solution-spotlight-scope-node-b" />
                        <span className="solution-spotlight-scope-node solution-spotlight-scope-node-c" />
                        <span className="solution-spotlight-scope-node solution-spotlight-scope-node-d" />
                      </>
                    ) : null}
                  </div>
                  <div className="solution-spotlight-panel">
                    <p>{slide.productSpotlight.eyebrow}</p>
                    <div className="solution-spotlight-logo-frame" data-spotlight-id={slide.productSpotlight.id}>
                      {slide.productSpotlight.logoSrc ? (
                        <Image
                          src={slide.productSpotlight.logoSrc}
                          alt=""
                          width={420}
                          height={140}
                          sizes="(max-width: 767px) 78vw, 420px"
                        />
                      ) : null}
                      {slide.productSpotlight.id === "vertica" ? (
                        <span className="solution-spotlight-logo-wordmark">VERTICA</span>
                      ) : null}
                      {slide.productSpotlight.id === "hashicorp" ? (
                        <span className="solution-spotlight-textmark">HashiCorp</span>
                      ) : null}
                      {slide.productSpotlight.id === "gtg-support" ? (
                        <span className="solution-spotlight-scope-title">
                          <span>GTG Support</span>
                          {" "}
                          <span>Scope</span>
                        </span>
                      ) : null}
                    </div>
                    <div className="solution-spotlight-copy">
                      <h3 id={`${slide.id}-spotlight-title`}>{slide.productSpotlight.label}</h3>
                      <span>{slide.productSpotlight.descriptor}</span>
                    </div>
                    {slide.productSpotlight.variant === "consulting-support" ? (
                      <ul className="solution-spotlight-scope-list" aria-label="GTG support scope items">
                        {slide.related.map((item, relatedIndex) => (
                          <li
                            key={item}
                            style={{ "--scope-chip-delay": `${460 + relatedIndex * 68}ms` } as CSSProperties}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </aside>
              ) : null}
            </article>
          ))}
        </div>

        <nav className="solution-rail" aria-label="Solution progress" data-testid="solution-rail">
          {solutionSlides.map((slide, index) => (
            <button
              type="button"
              className={activeIndex === index ? "is-active" : ""}
              aria-label={`Solution ${String(index + 1).padStart(2, "0")} of 05: ${slide.title}`}
              aria-current={activeIndex === index ? "step" : undefined}
              data-testid={`solution-rail-${index + 1}`}
              key={slide.id}
              onClick={() => handleRailSelect(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
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
