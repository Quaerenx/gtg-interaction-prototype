import { Hero3Hero } from "./hero3-hero";
import { Hero3Process } from "./hero3-process";
import { Hero3Solutions } from "./hero3-solutions";
import { hero3Content } from "./hero3-content";
import styles from "./hero3.module.css";

function Header() {
  return (
    <header className={styles.header} data-testid="hero3-header" aria-label="Site header">
      <a className={styles.brand} href="#top" aria-label={`${hero3Content.brand.englishName} home`}>
        <strong>GTG</strong>
        <span>Solutions & Consult</span>
      </a>
      <nav className={styles.desktopNav} aria-label="Primary">
        <a href="#solutions">SOLUTIONS</a>
        <a href="#company">ABOUT</a>
        <a href="#engagement">ENGAGEMENT</a>
        <a href="#contact">CONTACT</a>
      </nav>
      <details className={styles.mobileMenu}>
        <summary>MENU</summary>
        <nav aria-label="Mobile primary">
          <a href="#solutions">SOLUTIONS</a>
          <a href="#company">ABOUT</a>
          <a href="#engagement">ENGAGEMENT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </details>
    </header>
  );
}

function Company() {
  return (
    <section
      className={styles.company}
      id="company"
      data-testid="company-section"
      aria-labelledby="hero3-company-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.companyCopy}>
          <h2 id="hero3-company-heading">{hero3Content.company.headline}</h2>
          <p>{hero3Content.company.description}</p>
        </div>
        <ul className={styles.capabilityMatrix} aria-label="GTG capability areas">
          {hero3Content.company.capabilities.map((capability, index) => (
            <li tabIndex={0} style={{ "--capability-order": index } as React.CSSProperties} key={capability}>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      className={styles.contact}
      id="contact"
      data-testid="hero3-contact"
      aria-labelledby="hero3-contact-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.contactLead}>
          <h2 id="hero3-contact-heading">{hero3Content.contact.headline}</h2>
          <p>{hero3Content.contact.description}</p>
          <a className={styles.primaryAction} href={hero3Content.contact.primaryCta.href}>
            {hero3Content.contact.primaryCta.label}
          </a>
        </div>
        <dl className={styles.contactDetails}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${hero3Content.contact.email}`}>{hero3Content.contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={hero3Content.contact.phoneHref}>{hero3Content.contact.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{hero3Content.contact.address}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer} data-testid="site-footer">
      <div className={styles.footerInner}>
        <p>{hero3Content.brand.legalName}</p>
        <a href={hero3Content.footer.privacyHref}>{hero3Content.footer.privacyLabel}</a>
        <p>{hero3Content.footer.copyright}</p>
      </div>
    </footer>
  );
}

export function Hero3Page() {
  return (
    <div className={styles.page} data-testid="hero3-page">
      <a className={styles.skipLink} href="#hero3-main">
        본문으로 이동
      </a>
      <Header />
      <main id="hero3-main">
        <Hero3Hero />
        <Hero3Solutions />
        <Company />
        <Hero3Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
