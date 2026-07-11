import Image from "next/image";
import { siteContent } from "@/content/brand";
import { customerProofContent, customerProofItems } from "@/content/customers";
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
      data-header-theme="light"
      data-release-status={siteContent.proofMode}
      aria-labelledby="proof-heading"
      aria-describedby="proof-description proof-disclaimer"
    >
      <div className="customer-proof-inner content-section-inner">
        <div className="customer-proof-heading">
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
              data-relationship-evidence={customer.relationshipEvidenceLevel}
              data-project-display-approval={customer.projectOwnerDisplayApproval}
              data-third-party-rights={customer.thirdPartyRightsStatus}
              data-approval-reference={customer.approvalReference}
              data-release-status={siteContent.proofMode}
              key={customer.id}
            >
              <figure>
                <figcaption>
                  <span>{customer.displayName}</span>
                  <small>관계 범위 검토 중</small>
                </figcaption>
                <div className="customer-proof-logo">
                  <Image src={withBasePath(customer.logoSrc)} alt="" width={260} height={96} sizes="112px" />
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
