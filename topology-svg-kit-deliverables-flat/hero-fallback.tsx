import Image from "next/image";
import { HeroCustomer } from "@/content/site";

export function HeroFallback({
  customers,
  mode
}: {
  customers: HeroCustomer[];
  mode: "fallback" | "mobile" | "reduced";
}) {
  const testId =
    mode === "reduced" ? "reduced-motion-hero" : mode === "mobile" ? "mobile-fallback-hero" : "force-fallback-hero";
  const featuredCustomers = [customers[customers.length - 1], customers[0], customers[1]];
  const railCustomers = [
    { customer: customers[customers.length - 1], state: "previous" },
    { customer: customers[0], state: "active" },
    { customer: customers[1], state: "next" }
  ];
  const customerIndex = (customer: HeroCustomer) => customers.findIndex((item) => item.id === customer.id) + 1;

  return (
    <div
      className={`fallback-hero fallback-hero-${mode}`}
      data-testid={testId}
      aria-hidden="true"
    >
      <div className="fallback-strip" aria-hidden="true">
        {featuredCustomers.map((customer, index) => (
          <article
            className={`fallback-card ${index === 1 ? "is-primary" : "is-adjacent"}`}
            data-testid={`customer-card-${customer.id}`}
            key={customer.id}
          >
            <div className="fallback-card-frame">
              <span className="fallback-card-proof">{customer.proofLabel}</span>
              <span className="fallback-card-marker" />
              <div className="fallback-card-logo-field">
                <Image src={customer.visual} alt="" width={700} height={320} priority={customer.id === "kt"} />
              </div>
              <span className="fallback-card-name">{customer.label}</span>
              <span className="fallback-card-index">{String(customerIndex(customer)).padStart(2, "0")} / 18</span>
            </div>
          </article>
        ))}
      </div>
      <div className="fallback-service-rail" aria-hidden="true">
        {railCustomers.map(({ customer, state }) => (
          <span className={`is-${state}`} key={customer.id}>
            {state === "previous" ? "18" : state === "active" ? "01" : "02"} {customer.label}
          </span>
        ))}
      </div>
    </div>
  );
}
