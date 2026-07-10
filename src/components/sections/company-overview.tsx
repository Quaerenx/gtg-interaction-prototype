import { capabilityMapContent, companyContent } from "@/content/site";
import { withBasePath } from "@/lib/paths";

export function CompanyOverview() {
  return (
    <section
      id={companyContent.id}
      className="company-overview content-section"
      data-testid="company-section"
      data-header-theme="dark"
      aria-labelledby="company-heading"
    >
      <div className="content-section-inner">
        <p className="section-eyebrow">{companyContent.eyebrow}</p>
        <div className="company-grid">
          <h2 id="company-heading" className="section-title" aria-label={companyContent.headline} tabIndex={-1}>
            {companyContent.headlineLines.desktop.map((line) => (
              <span className="headline-line" data-testid="company-headline-line" aria-hidden="true" key={line}>
                {line}
              </span>
            ))}
          </h2>
          <div className="section-copy">
            <p>{companyContent.description}</p>
            <ul className="capability-list" aria-label="Core capabilities">
              {companyContent.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="capability-map-block" data-testid="capability-map">
          <div className="capability-map-copy">
            <h3>{capabilityMapContent.title}</h3>
            <p>{capabilityMapContent.description}</p>
          </div>
          <picture className="capability-map-visual" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet={withBasePath(capabilityMapContent.mobileVisual)} />
            <img src={withBasePath(capabilityMapContent.desktopVisual)} alt="" loading="lazy" />
          </picture>
          <ul className="capability-map-list" aria-label="GTG capability map nodes">
            {capabilityMapContent.nodes.map((node) => (
              <li key={node.id}>
                <span>{node.label}</span>
                <small>{node.descriptor}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
