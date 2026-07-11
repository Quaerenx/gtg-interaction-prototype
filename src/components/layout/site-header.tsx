"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { SectionAnchor } from "@/components/navigation/section-anchor";
import { brandContent, navigationItems } from "@/content/brand";
import { withBasePath } from "@/lib/paths";

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function headingIdForSectionHref(href: string) {
  const fragment = href.split("#")[1];
  if (!fragment) {
    return undefined;
  }
  return fragment === "top" ? "hero-heading" : `${fragment}-heading`;
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("dark");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const shouldRestoreMenuFocusRef = useRef(true);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    if (sections.length === 0) {
      return undefined;
    }

    const resolveTheme = () => {
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height")
      );
      const probeY = Number.isFinite(headerHeight) ? headerHeight + 1 : 75;
      const containingSections = sections.filter((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom > probeY;
        });
      const isAtDocumentEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const activeSection =
        (isAtDocumentEnd ? sections[sections.length - 1] : undefined) ??
        containingSections[containingSections.length - 1] ??
        sections.find((section) => section.getBoundingClientRect().top > probeY) ??
        sections[0];
      const nextTheme = activeSection.dataset.headerTheme === "light" ? "light" : "dark";
      setHeaderTheme(nextTheme);
    };

    const observer = new IntersectionObserver(resolveTheme, {
      root: null,
      rootMargin: "0px 0px -75% 0px",
      threshold: [0, 0.01, 0.5, 1]
    });

    sections.forEach((section) => observer.observe(section));
    resolveTheme();
    window.addEventListener("scroll", resolveTheme, { passive: true });
    window.addEventListener("resize", resolveTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resolveTheme);
      window.removeEventListener("resize", resolveTheme);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const restoreTarget = buttonRef.current;
    const previousOverflow = document.body.style.overflow;
    shouldRestoreMenuFocusRef.current = true;
    document.body.style.overflow = "hidden";

    const firstFocusable = overlayRef.current?.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (shouldRestoreMenuFocusRef.current) {
        restoreTarget?.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOverlayKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(overlayRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(
      (element) => !element.hasAttribute("disabled")
    );

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const closeMenu = () => setIsOpen(false);
  const closeMenuForNavigation = () => {
    shouldRestoreMenuFocusRef.current = false;
    setIsOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        본문으로 이동
      </a>
      <header className="site-header" data-theme={headerTheme} aria-label="Site header">
        <nav className="header-cluster header-cluster-left" aria-label="Primary">
          <SectionAnchor className="header-link" href={withBasePath("/#company")} focusTargetId="company-heading">
            ABOUT
          </SectionAnchor>
          <SectionAnchor className="header-link" href={withBasePath("/#contact")} focusTargetId="contact-heading">
            CONTACT
          </SectionAnchor>
        </nav>

        <SectionAnchor
          className="header-brand"
          href={withBasePath("/#top")}
          focusTargetId="hero-heading"
          aria-label={`${brandContent.englishName} home`}
        >
          {brandContent.englishName}
        </SectionAnchor>

        <div className="header-cluster header-cluster-right">
          <button
            ref={buttonRef}
            className="menu-button"
            type="button"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="site-menu"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Menu</span>
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {isOpen ? (
        <div
          ref={overlayRef}
          id="site-menu"
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={handleOverlayKeyDown}
        >
          <div className="menu-overlay-top">
            <span>{brandContent.englishName}</span>
            <button className="menu-close" type="button" aria-label="Close" onClick={closeMenu}>
              <span aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <nav className="menu-nav" aria-label="Menu sections">
            <SectionAnchor
              href={withBasePath("/#top")}
              focusTargetId="hero-heading"
              onClick={closeMenuForNavigation}
            >
              Home
            </SectionAnchor>
            {navigationItems.map((item) => (
              <SectionAnchor
                href={withBasePath(item.href)}
                focusTargetId={headingIdForSectionHref(item.href)}
                key={item.href}
                onClick={closeMenuForNavigation}
              >
                {item.label}
              </SectionAnchor>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
