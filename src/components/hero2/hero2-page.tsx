import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { Hero2Hero } from "./hero2-hero";
import { hero2Content } from "./hero2-content";
import styles from "./hero2.module.css";

function Hero2Header() {
  return (
    <header className={styles.header} data-testid="hero2-header" aria-label="Site header">
      <a className={styles.brand} href="#top" aria-label={`${hero2Content.brand.englishName} home`}>
        {hero2Content.brand.englishName}
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

function CustomerProof() {
  return (
    <section
      className={styles.customerProof}
      data-testid="hero2-customer-proof"
      aria-labelledby="hero2-customers-heading"
    >
      <div className={styles.sectionShell}>
        <h2 id="hero2-customers-heading" className={styles.customerHeading}>
          Representative Customers
        </h2>
        <ul className={styles.logoWall} aria-label="Representative customers">
          {hero2Content.customers.map((customer) => (
            <li key={customer.id}>
              <Image
                src={withBasePath(customer.logoSrc)}
                alt={customer.displayName}
                width={220}
                height={92}
                sizes="(max-width: 767px) 38vw, 150px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section
      className={styles.solutions}
      id="solutions"
      data-testid="solutions-section"
      aria-labelledby="hero2-solutions-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.sectionIntro}>
          <h2 id="hero2-solutions-heading">Solutions</h2>
          <p>{hero2Content.hero.description}</p>
        </div>

        <div className={styles.solutionGrid}>
          {hero2Content.solutions.map((solution, index) => (
            <article
              className={`${styles.solutionPanel} ${styles[`solutionPanel${index + 1}`]}`}
              id={solution.id}
              data-testid={`solution-slide-${index + 1}`}
              key={solution.id}
            >
              <Image
                className={styles.solutionVisual}
                src={withBasePath(solution.visual)}
                alt=""
                fill
                sizes={index < 2 ? "(max-width: 767px) 100vw, 58vw" : "(max-width: 767px) 100vw, 42vw"}
              />
              <div className={styles.solutionScrim} aria-hidden="true" />
              <div className={styles.solutionCopy}>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <ul aria-label={`${solution.title} related scope`}>
                  {solution.related.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={solution.cta.href}>{solution.cta.label}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Company() {
  return (
    <section
      className={styles.company}
      id={hero2Content.company.id}
      data-testid="company-section"
      aria-labelledby="hero2-company-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.companyIntro}>
          <h2 id="hero2-company-heading">{hero2Content.company.headline}</h2>
          <p>{hero2Content.company.description}</p>
        </div>

        <div className={styles.capabilityField} data-testid="capability-map">
          <picture className={styles.capabilityVisual} aria-hidden="true">
            <source
              media="(max-width: 767px)"
              srcSet={withBasePath(hero2Content.capabilityMap.mobileVisual)}
            />
            <img
              src={withBasePath(hero2Content.capabilityMap.desktopVisual)}
              alt=""
              loading="lazy"
            />
          </picture>
          <div className={styles.capabilityCopy}>
            <h3>{hero2Content.capabilityMap.title}</h3>
            <p>{hero2Content.capabilityMap.description}</p>
            <ul>
              {hero2Content.capabilityMap.nodes.map((node) => (
                <li key={node.id}>
                  <strong>{node.label}</strong>
                  <span>{node.descriptor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Engagement() {
  return (
    <section
      className={styles.engagement}
      id={hero2Content.engagement.id}
      data-testid="engagement-section"
      aria-labelledby="hero2-engagement-heading"
    >
      <div className={styles.sectionShell}>
        <h2 id="hero2-engagement-heading">{hero2Content.engagement.headline}</h2>
        <ol className={styles.engagementFlow}>
          {hero2Content.engagement.steps.map((step) => (
            <li key={step.number}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      className={styles.contact}
      id={hero2Content.contact.id}
      data-testid="contact-section"
      aria-labelledby="hero2-contact-heading"
    >
      <div className={styles.sectionShell}>
        <div className={styles.contactLead}>
          <h2 id="hero2-contact-heading">{hero2Content.contact.headline}</h2>
          <p>{hero2Content.contact.description}</p>
          <a className={styles.primaryAction} href={hero2Content.contact.primaryCta.href}>
            문의하기
          </a>
        </div>
        <dl className={styles.contactDetails}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${hero2Content.contact.email}`}>{hero2Content.contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={hero2Content.contact.phoneHref}>{hero2Content.contact.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{hero2Content.contact.address}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Hero2Footer() {
  return (
    <footer className={styles.footer} data-testid="site-footer">
      <div className={styles.footerInner}>
        <p>{hero2Content.brand.legalName}</p>
        <a href={hero2Content.footer.links[0].href}>{hero2Content.footer.links[0].label}</a>
        <p>{hero2Content.footer.copyright}</p>
      </div>
    </footer>
  );
}

export function Hero2Page() {
  return (
    <div className={styles.page} data-testid="hero2-page">
      <a className={styles.skipLink} href="#main-content">
        본문으로 이동
      </a>
      <Hero2Header />
      <main id="main-content">
        <Hero2Hero />
        <CustomerProof />
        <Solutions />
        <Company />
        <Engagement />
        <Contact />
      </main>
      <Hero2Footer />
    </div>
  );
}
