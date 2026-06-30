import { brandContent, contactContent, footerContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-testid="site-footer" data-header-theme="dark">
      <div className="footer-inner">
        <div>
          <p className="footer-company">{brandContent.legalName}</p>
          <p className="footer-contact">
            <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
            <a href={contactContent.phoneHref}>{contactContent.phone}</a>
          </p>
        </div>
        <nav className="footer-links" aria-label="Legal">
          {footerContent.links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="footer-copy">{footerContent.copyright}</p>
      </div>
    </footer>
  );
}
