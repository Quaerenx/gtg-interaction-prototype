import { contactContent } from "@/content/site";

export function ContactSection() {
  return (
    <section
      id={contactContent.id}
      className="contact-section"
      data-testid="contact-section"
      data-header-theme="light"
      aria-labelledby="contact-heading"
    >
      <div className="contact-inner">
        <p className="section-eyebrow">Contact</p>
        <h2 id="contact-heading" className="contact-title" tabIndex={-1}>
          {contactContent.headline}
        </h2>
        <p className="contact-description">{contactContent.description}</p>
        <div className="contact-actions" aria-label="Contact actions">
          <a className="contact-primary" href={contactContent.primaryCta.href}>
            {contactContent.primaryCta.label}
          </a>
          <a className="contact-secondary" href={contactContent.emailCta.href}>
            {contactContent.emailCta.label}
          </a>
        </div>
        <dl className="contact-details">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={contactContent.phoneHref}>{contactContent.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{contactContent.address}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
