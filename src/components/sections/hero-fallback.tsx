import Image from "next/image";
import { HeroService, prototypeContent } from "@/content/site";

export function HeroFallback({
  services,
  mode
}: {
  services: HeroService[];
  mode: "fallback" | "mobile" | "reduced";
}) {
  const testId =
    mode === "reduced" ? "reduced-motion-hero" : mode === "mobile" ? "mobile-fallback-hero" : "force-fallback-hero";
  const label =
    mode === "reduced" ? "Reduced motion service carousel" : mode === "mobile" ? "Mobile service carousel" : "Fallback service carousel";
  const featuredServices = [services[services.length - 1], services[0], services[1]];
  const railServices = [
    { service: services[services.length - 1], state: "previous" },
    { service: services[0], state: "active" },
    { service: services[1], state: "next" }
  ];

  return (
    <div
      className={`fallback-hero fallback-hero-${mode}`}
      data-testid={testId}
      aria-label={label}
    >
      <div className="fallback-strip">
        {featuredServices.map((service, index) => (
          <article className={`fallback-card ${index === 1 ? "is-primary" : "is-adjacent"}`} key={service.id}>
            <Image src={service.visual} alt="" width={700} height={320} priority={service.id === "data-analytics"} />
            <span>{service.label}</span>
          </article>
        ))}
      </div>
      <div className="fallback-service-rail" aria-label="Visible service position">
        {railServices.map(({ service, state }) => (
          <span className={`is-${state}`} key={service.id}>
            {state === "previous" ? "07" : state === "active" ? "01" : "02"} {service.label}
          </span>
        ))}
      </div>
      <ul className="sr-only" aria-label="Available services">
        {services.map((service) => (
          <li key={service.id}>{service.label}</li>
        ))}
      </ul>
      <a className="sr-only" href="#solution-data-analytics">
        {prototypeContent.primaryCta}
      </a>
    </div>
  );
}
