import Image from "next/image";
import { SectionAnchor } from "@/components/navigation/section-anchor";
import { solutionSlides, solutionsContent, type SolutionProductSpotlight } from "@/content/site";
import { withBasePath } from "@/lib/paths";

function ProductReveal({ product }: { product: SolutionProductSpotlight }) {
  if (product.variant === "consulting-support") {
    return null;
  }

  return (
    <figure
      className="product-reveal"
      data-product-id={product.id}
      data-testid={`product-reveal-${product.id}`}
    >
      <div className={`product-reveal-mark ${product.logoSrc ? "has-logo" : "is-text-mark"}`}>
        {product.logoSrc ? (
          <Image src={withBasePath(product.logoSrc)} alt="" width={420} height={140} sizes="(max-width: 767px) 72vw, 420px" />
        ) : (
          <span aria-hidden="true">{product.label}</span>
        )}
      </div>
      <figcaption className="sr-only">{product.label}</figcaption>
    </figure>
  );
}

export function SolutionSequence() {
  return (
    <section
      id="solutions"
      className="solution-sequence content-section"
      data-testid="solutions-section"
      data-header-theme="dark"
      aria-labelledby="solutions-heading"
    >
      <div className="solution-sequence-inner content-section-inner">
        <header className="solution-sequence-header">
          <p className="section-eyebrow">{solutionsContent.eyebrow}</p>
          <h2 id="solutions-heading" className="section-title" tabIndex={-1}>
            {solutionsContent.headline}
          </h2>
          <p className="solution-description">{solutionsContent.description}</p>
        </header>

        <nav className="solution-route-nav" aria-label="Solution routes">
          <ol>
            {solutionSlides.map((solution) => (
              <li key={solution.id}>
                <SectionAnchor href={`#${solution.id}`} focusTargetId={`${solution.id}-title`}>
                  {solution.title}
                </SectionAnchor>
              </li>
            ))}
          </ol>
        </nav>

        <div className="solution-articles">
          {solutionSlides.map((solution) => (
            <article
              id={solution.id}
              className="solution-article"
              data-solution-id={solution.id}
              data-testid={solution.id}
              aria-labelledby={`${solution.id}-title`}
              key={solution.id}
            >
              <div className="solution-article-copy">
                <h3 id={`${solution.id}-title`} className="solution-title" tabIndex={-1}>
                  {solution.title}
                </h3>
                <p className="solution-description">{solution.description}</p>
                <ul className="solution-capabilities capability-list" aria-label={`${solution.title} capabilities`}>
                  {solution.related.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {solution.cta.href.startsWith("#") ? (
                  <SectionAnchor className="solution-cta" href={solution.cta.href} focusTargetId="contact-heading">
                    {solution.cta.label}
                  </SectionAnchor>
                ) : (
                  <a className="solution-cta" href={solution.cta.href}>
                    {solution.cta.label}
                  </a>
                )}
              </div>

              <div className="solution-article-evidence">
                <div className="solution-article-visual" aria-hidden="true">
                  <Image src={withBasePath(solution.visual)} alt="" fill sizes="(max-width: 767px) 100vw, 48vw" />
                </div>
                {solution.productSpotlight ? <ProductReveal product={solution.productSpotlight} /> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
