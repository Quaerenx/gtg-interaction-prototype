import { type CSSProperties } from "react";
import { engagementContent } from "@/content/company";

export function EngagementModel() {
  const stepNumberWidth = Math.max(2, String(engagementContent.steps.length).length);

  return (
    <section
      id={engagementContent.id}
      className="engagement-model content-section"
      data-testid="engagement-section"
      data-header-theme="dark"
      aria-labelledby="engagement-heading"
    >
      <div className="content-section-inner">
        <p className="section-eyebrow">{engagementContent.eyebrow}</p>
        <h2
          id="engagement-heading"
          className="section-title section-title-narrow"
          aria-label={engagementContent.headline}
          tabIndex={-1}
        >
          {engagementContent.headlineLines.desktop.map((line) => (
            <span className="headline-line" data-testid="engagement-headline-line" aria-hidden="true" key={line}>
              {line}
            </span>
          ))}
        </h2>
        <ol
          className="engagement-steps"
          style={{ "--engagement-step-count": engagementContent.steps.length } as CSSProperties}
          aria-label="Engagement steps"
        >
          {engagementContent.steps.map((step, stepIndex) => (
            <li className="engagement-step" data-engagement-id={step.id} key={step.id}>
              <span className="engagement-number">
                {String(stepIndex + 1).padStart(stepNumberWidth, "0")}
              </span>
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
