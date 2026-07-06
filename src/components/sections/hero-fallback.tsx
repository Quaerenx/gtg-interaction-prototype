import Image from "next/image";
import { HeroCustomer, heroServices } from "@/content/site";

export function HeroFallback({
  customers,
  mode
}: {
  customers: HeroCustomer[];
  mode: "fallback" | "mobile" | "reduced";
}) {
  const testId =
    mode === "reduced" ? "reduced-motion-hero" : mode === "mobile" ? "mobile-fallback-hero" : "force-fallback-hero";
  const proofCustomers = [0, 1, 5, 6, 7, 9]
    .map((index) => customers[index])
    .filter((customer): customer is HeroCustomer => Boolean(customer));

  return (
    <div
      className={`fallback-hero fallback-hero-${mode}`}
      data-testid={testId}
      aria-hidden="true"
    >
      <div className="fallback-strip" aria-hidden="true">
        <img
          className="fallback-data-core-asset"
          data-testid="hero-data-core-fallback"
          src="/generated/hero/gtg-data-core.svg"
          alt=""
          width="1200"
          height="620"
          loading="eager"
        />
      </div>
      <div className="fallback-proof-strip" aria-hidden="true">
        {proofCustomers.map((customer) => (
          <span className="fallback-proof-tile" key={customer.id}>
            <Image src={customer.visual} alt="" width={220} height={92} />
          </span>
        ))}
      </div>
      <div className="fallback-service-rail" aria-hidden="true">
        {heroServices.slice(0, 5).map((service, index) => (
          <span className={index === 0 ? "is-active" : ""} key={service.id}>
            {String(index + 1).padStart(2, "0")} {service.label}
          </span>
        ))}
      </div>
    </div>
  );
}
