import { companyContent } from "@/content/site";

export function CompanyOverview() {
  return (
    <section
      id={companyContent.id}
      className="company-overview content-section"
      data-testid="company-section"
      data-header-theme="dark"
    >
      <div className="content-section-inner">
        <p className="section-eyebrow">{companyContent.eyebrow}</p>
        <div className="company-grid">
          <h2 className="section-title" aria-label={companyContent.headline}>
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
      </div>
    </section>
  );
}
