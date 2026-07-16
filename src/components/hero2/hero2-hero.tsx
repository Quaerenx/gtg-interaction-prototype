"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { heroRingCustomers } from "@/content/site";
import { withBasePath } from "@/lib/paths";
import { supportsWebGL } from "@/lib/webgl";
import { hero2Content } from "./hero2-content";
import styles from "./hero2.module.css";

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((module) => module.HeroCanvas),
  { ssr: false }
);

function useMediaPreference(query: string, serverFallback = true) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverFallback, [serverFallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function Hero2Hero() {
  const progressRef = useRef(0);
  const reduceMotion = useMediaPreference("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaPreference("(max-width: 767px)");
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    if (reduceMotion || isMobile) {
      setWebglAvailable(false);
      return;
    }

    setWebglAvailable(supportsWebGL());
  }, [isMobile, reduceMotion]);

  return (
    <section className={styles.hero} id="top" data-testid="hero" aria-labelledby="hero2-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1 id="hero2-heading" className={styles.heroTitle}>
            {hero2Content.hero.headlineLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.heroDescription}>{hero2Content.hero.description}</p>
          <a className={styles.primaryAction} href="#contact">
            {hero2Content.hero.primaryCta.label}
          </a>
        </div>

        <div className={styles.heroVisual} data-testid="hero2-visual">
          <div className={styles.heroVisualFrame}>
            {webglAvailable ? (
              <HeroCanvas
                mediaItems={heroRingCustomers}
                progressRef={progressRef}
                isMobile={false}
                onFailure={() => setWebglAvailable(false)}
              />
            ) : (
              <img
                className={styles.heroFallback}
                data-testid="hero2-hero-fallback"
                src={withBasePath("/generated/hero/gtg-data-core.svg")}
                alt=""
                width="1200"
                height="620"
                loading="eager"
              />
            )}
          </div>
          <div className={styles.heroVisualLabel} aria-hidden="true">
            <span>GTG Data Core</span>
          </div>
        </div>
      </div>
    </section>
  );
}
