"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/brand";
import { customerProofContent, customerProofItems } from "@/content/customers";
import { withBasePath } from "@/lib/paths";

export function CustomerProofBand() {
  const proofItems = siteContent.proofMode === "local-only" ? customerProofItems : [];
  const trackRef = useRef<HTMLUListElement>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(proofItems.length > 1);

  const updateCarouselState = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const items = Array.from(track.querySelectorAll<HTMLElement>(".customer-proof-item"));
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const scrollLeft = Math.min(maxScrollLeft, Math.max(0, track.scrollLeft));
    const nearestItemIndex = items.reduce((nearestIndex, item, index) => {
      const nearestDistance = Math.abs(items[nearestIndex].offsetLeft - scrollLeft);
      const itemDistance = Math.abs(item.offsetLeft - scrollLeft);
      return itemDistance < nearestDistance ? index : nearestIndex;
    }, 0);

    setCurrentItemIndex(nearestItemIndex);
    setCanScrollPrevious(scrollLeft > 1);
    setCanScrollNext(scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    updateCarouselState();
    track.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);
    const resizeObserver = new ResizeObserver(updateCarouselState);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateCarouselState);
      window.removeEventListener("resize", updateCarouselState);
      resizeObserver.disconnect();
    };
  }, [updateCarouselState]);

  const moveCarousel = (direction: -1 | 1) => {
    const track = trackRef.current;
    const item = track?.querySelector<HTMLElement>(".customer-proof-item");
    if (!track || !item) {
      return;
    }

    const columnGap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      left: direction * (item.getBoundingClientRect().width + columnGap)
    });
  };

  if (proofItems.length === 0) {
    return null;
  }

  return (
    <section
      id="proof"
      className="customer-proof-band content-section"
      data-testid="customer-proof-band"
      data-header-theme="light"
      data-release-status={siteContent.proofMode}
      aria-labelledby="proof-heading"
      aria-describedby="proof-description proof-disclaimer"
    >
      <div className="customer-proof-inner content-section-inner">
        <div className="customer-proof-heading">
          <h2 id="proof-heading" className="section-title">
            {customerProofContent.headlineKeyword}
          </h2>
          <p id="proof-description" className="customer-proof-description">
            {customerProofContent.description}
          </p>
          <p className="customer-proof-status">{customerProofContent.localOnlyLabel}</p>
        </div>

        <p id="proof-disclaimer" className="customer-proof-disclaimer">
          {customerProofContent.disclaimer}
        </p>

        <div
          className="customer-proof-carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Representative Customers"
        >
          <div className="customer-proof-toolbar">
            <p className="customer-proof-position" aria-live="polite" aria-atomic="true">
              <span className="sr-only">
                현재 고객사 {currentItemIndex + 1} / {proofItems.length}
              </span>
              <span aria-hidden="true">{String(currentItemIndex + 1).padStart(2, "0")}</span>
              <span aria-hidden="true"> / {String(proofItems.length).padStart(2, "0")}</span>
            </p>
            <div className="customer-proof-controls" aria-label="고객사 캐러셀 컨트롤">
              <button
                type="button"
                className="customer-proof-control"
                aria-label="이전 고객사 보기"
                aria-controls="customer-proof-track"
                disabled={!canScrollPrevious}
                onClick={() => moveCarousel(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="customer-proof-control"
                aria-label="다음 고객사 보기"
                aria-controls="customer-proof-track"
                disabled={!canScrollNext}
                onClick={() => moveCarousel(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <ul
            id="customer-proof-track"
            ref={trackRef}
            className="customer-proof-list"
            aria-label={customerProofContent.semanticLabel}
          >
            {proofItems.map((customer, index) => (
              <li
                className="customer-proof-item"
                role="listitem"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${proofItems.length}: ${customer.displayName}`}
                data-customer-id={customer.id}
                data-relationship-evidence={customer.relationshipEvidenceLevel}
                data-project-display-approval={customer.projectOwnerDisplayApproval}
                data-third-party-rights={customer.thirdPartyRightsStatus}
                data-approval-reference={customer.approvalReference}
                data-release-status={siteContent.proofMode}
                key={customer.id}
              >
                <figure>
                  <figcaption>
                    <span>{customer.displayName}</span>
                    <small>관계 범위 검토 중</small>
                  </figcaption>
                  <div className="customer-proof-logo">
                    <Image src={withBasePath(customer.logoSrc)} alt="" width={260} height={96} sizes="112px" />
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
