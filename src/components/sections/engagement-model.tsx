import { engagementContent } from "@/content/site";

export function EngagementModel() {
  return (
    <section
      id={engagementContent.id}
      className="engagement-model content-section"
      data-testid="engagement-section"
      data-header-theme="dark"
    >
      <div className="content-section-inner">
        <p className="section-eyebrow">{engagementContent.eyebrow}</p>
        <h2 className="section-title section-title-narrow" aria-label={engagementContent.headline}>
          {engagementContent.headlineLines.desktop.map((line) => (
            <span className="headline-line" data-testid="engagement-headline-line" aria-hidden="true" key={line}>
              {line}
            </span>
          ))}
        </h2>
        <ol className="engagement-steps" aria-label="Engagement steps">
          {engagementContent.steps.map((step) => (
            <li className="engagement-step" key={step.number}>
              <span className="engagement-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
