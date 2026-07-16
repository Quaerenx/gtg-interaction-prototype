"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supportsWebGL } from "@/lib/webgl";
import { hero3Content } from "./hero3-content";
import { useHero3Media } from "./hero3-media";
import styles from "./hero3.module.css";

const Hero3Canvas = dynamic(
  () => import("./hero3-canvas").then((module) => module.Hero3Canvas),
  { ssr: false }
);

function StaticField() {
  return (
    <div className={styles.staticField} data-testid="hero3-hero-fallback" aria-hidden="true">
      <span className={styles.staticLineA} />
      <span className={styles.staticLineB} />
      <span className={styles.staticLineC} />
      <span className={styles.staticPlateA} />
      <span className={styles.staticPlateB} />
      <span className={styles.staticPlateC} />
      <span className={styles.staticSignal} />
    </div>
  );
}

export function Hero3Hero() {
  const reduceMotion = useHero3Media("(prefers-reduced-motion: reduce)");
  const isMobile = useHero3Media("(max-width: 767px)");
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    if (reduceMotion || isMobile) {
      setWebglAvailable(false);
      return;
    }

    setWebglAvailable(supportsWebGL());
  }, [isMobile, reduceMotion]);

  return (
    <section className={styles.hero} id="top" data-testid="hero3-hero" aria-labelledby="hero3-heading">
      <div className={styles.heroCopy}>
        <h1 id="hero3-heading" aria-label={hero3Content.hero.headline}>
          {hero3Content.hero.headlineLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p>{hero3Content.hero.description}</p>
        <a className={styles.primaryAction} href={hero3Content.hero.cta.href}>
          {hero3Content.hero.cta.label}
        </a>
      </div>

      <div className={styles.heroField} data-testid="hero3-field">
        {webglAvailable ? <Hero3Canvas onFailure={() => setWebglAvailable(false)} /> : <StaticField />}
      </div>
    </section>
  );
}
