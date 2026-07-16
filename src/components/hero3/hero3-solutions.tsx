"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { hero3Content } from "./hero3-content";
import styles from "./hero3.module.css";

export function Hero3Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeSolution = hero3Content.solutions[activeIndex];

  const selectAndFocus = (index: number) => {
    const nextIndex = (index + hero3Content.solutions.length) % hero3Content.solutions.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectAndFocus(index + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectAndFocus(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectAndFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectAndFocus(hero3Content.solutions.length - 1);
    }
  };

  return (
    <section
      className={styles.solutions}
      id="solutions"
      data-testid="hero3-solutions"
      aria-labelledby="hero3-solutions-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.solutionHeading}>
          <h2 id="hero3-solutions-heading">주요 솔루션 영역</h2>
          <p>서로 다른 기술 영역을 하나의 실행 구조 안에서 확인할 수 있습니다.</p>
        </div>

        <div className={styles.solutionSwitcher} data-testid="hero3-signal-switcher">
          <div className={styles.solutionTabs} role="tablist" aria-label="GTG solution areas" aria-orientation="vertical">
            {hero3Content.solutions.map((solution, index) => (
              <button
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`hero3-tab-${solution.id}`}
                aria-controls={`hero3-panel-${solution.id}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                data-active={activeIndex === index ? "true" : "false"}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                key={solution.id}
              >
                <span>{solution.shortTitle}</span>
                <strong>{solution.title}</strong>
              </button>
            ))}
          </div>

          <div
            className={styles.solutionPanel}
            role="tabpanel"
            id={`hero3-panel-${activeSolution.id}`}
            aria-labelledby={`hero3-tab-${activeSolution.id}`}
            key={activeSolution.id}
          >
            <div className={styles.signalDiagram} aria-hidden="true">
              {hero3Content.solutions.map((solution, index) => (
                <span
                  className={index === activeIndex ? styles.signalBarActive : styles.signalBar}
                  style={{ "--signal-order": index } as React.CSSProperties}
                  key={solution.id}
                />
              ))}
            </div>
            <div className={styles.solutionPanelCopy}>
              <h3>{activeSolution.title}</h3>
              <p>{activeSolution.description}</p>
              <ul aria-label={`${activeSolution.title} scope`}>
                {activeSolution.related.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={activeSolution.cta.href}>{activeSolution.cta.label}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

