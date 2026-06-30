import Image from "next/image";
import { HeroService } from "@/content/site";

export function HeroFallback({
  services,
  mode
}: {
  services: HeroService[];
  mode: "fallback" | "mobile" | "reduced";
}) {
  const testId =
    mode === "reduced" ? "reduced-motion-hero" : mode === "mobile" ? "mobile-fallback-hero" : "force-fallback-hero";
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
      aria-hidden="true"
    >
      <div className="fallback-strip" aria-hidden="true">
        {featuredServices.map((service, index) => (
          <article className={`fallback-card ${index === 1 ? "is-primary" : "is-adjacent"}`} key={service.id}>
            <Image src={service.visual} alt="" width={700} height={320} priority={service.id === "data-analytics"} />
            <span>{service.label}</span>
          </article>
        ))}
      </div>
      <div className="fallback-service-rail" aria-hidden="true">
        {railServices.map(({ service, state }) => (
          <span className={`is-${state}`} key={service.id}>
            {state === "previous" ? "07" : state === "active" ? "01" : "02"} {service.label}
          </span>
        ))}
      </div>
    </div>
  );
}
