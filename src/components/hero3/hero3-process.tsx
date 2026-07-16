"use client";

import { useEffect, useRef, useState } from "react";
import { hero3Content } from "./hero3-content";
import styles from "./hero3.module.css";

export function Hero3Process() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const steps = stepRefs.current.filter((step): step is HTMLLIElement => Boolean(step));
    if (!root || steps.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (!visible) {
          return;
        }

        const index = Number((visible.target as HTMLElement).dataset.stepIndex ?? "0");
        setActiveIndex(index);
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0.2, 0.5, 0.8] }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.engagement}
      id="engagement"
      data-testid="engagement-section"
      aria-labelledby="hero3-engagement-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.processGrid}>
          <div className={styles.processSticky}>
            <h2 id="hero3-engagement-heading">{hero3Content.engagement.headline}</h2>
            <div className={styles.processSignal} aria-hidden="true">
              {hero3Content.engagement.steps.map((step, index) => (
                <span data-active={activeIndex === index ? "true" : "false"} key={step.title} />
              ))}
            </div>
          </div>

          <ol className={styles.processSteps}>
            {hero3Content.engagement.steps.map((step, index) => (
              <li
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                data-active={activeIndex === index ? "true" : "false"}
                data-step-index={index}
                key={step.title}
              >
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

