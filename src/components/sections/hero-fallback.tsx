import { withBasePath } from "@/lib/paths";

export function HeroFallback({ mode }: { mode: "fallback" | "mobile" | "reduced" }) {
  const testId =
    mode === "reduced" ? "reduced-motion-hero" : mode === "mobile" ? "mobile-fallback-hero" : "force-fallback-hero";

  return (
    <div className={`fallback-hero fallback-hero-${mode}`} data-testid={testId} aria-hidden="true">
      <div className="fallback-strip">
        <img
          className="fallback-data-core-asset"
          data-testid="hero-data-core-fallback"
          src={withBasePath("/generated/hero/gtg-data-core.svg")}
          alt=""
          width="1200"
          height="620"
          loading="eager"
        />
      </div>
    </div>
  );
}
