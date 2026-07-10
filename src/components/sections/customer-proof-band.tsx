import Image from "next/image";
import { customerProofContent, customerProofItems, siteContent } from "@/content/site";
import { withBasePath } from "@/lib/paths";

export function CustomerProofBand() {
  const proofItems = siteContent.proofMode === "local-only" ? customerProofItems : [];
  if (proofItems.length === 0) {
    return null;
  }

  return (
    <section
      id="proof"
      className="customer-proof-band content-section"
      data-testid="customer-proof-band"
      data-header-theme="dark"
      data-release-status={siteContent.proofMode}
      aria-labelledby="proof-heading"
      aria-describedby="proof-description proof-disclaimer"
    >
      <div className="customer-proof-inner content-section-inner">
        <div className="customer-proof-heading">
          <p className="section-eyebrow">Customer proof</p>
          <h2 id="proof-heading" className="section-title">
            {customerProofContent.headlineKeyword}
          </h2>
          <p id="proof-description" className="customer-proof-description">
            {customerProofContent.description}
          </p>
          <p className="customer-proof-status">{customerProofContent.localOnlyLabel}</p>
        </div>

        <p id="proof-disclaimer" className="customer-proof-disclaimer">
          {customerProofContent.disclaimer}
        </p>

        <ul className="customer-proof-list" aria-label={customerProofContent.semanticLabel}>
          {proofItems.map((customer) => (
            <li
              className="customer-proof-item"
              data-customer-id={customer.id}
              data-evidence-level={customer.publicDisplayApproved}
              data-release-status={siteContent.proofMode}
              key={customer.id}
            >
              <figure>
                <div className="customer-proof-logo">
                  <Image src={withBasePath(customer.logoSrc)} alt="" width={260} height={96} sizes="260px" />
                </div>
                <figcaption>
                  <span>{customer.displayName}</span>
                  <small>관계 범위 검토 중</small>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
