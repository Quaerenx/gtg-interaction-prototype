"use client";

import { type AnchorHTMLAttributes, type MouseEvent } from "react";

type SectionAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  focusTargetId?: string;
};

export function SectionAnchor({ href, focusTargetId, onClick, ...props }: SectionAnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    const targetUrl = new URL(href, window.location.href);
    if (
      targetUrl.origin !== window.location.origin ||
      targetUrl.pathname !== window.location.pathname ||
      !targetUrl.hash
    ) {
      return;
    }

    const fragmentId = decodeURIComponent(targetUrl.hash.slice(1));
    const scrollTarget = document.getElementById(fragmentId);
    const focusTarget = document.getElementById(focusTargetId ?? `${fragmentId}-heading`) ?? scrollTarget;
    if (!scrollTarget || !(focusTarget instanceof HTMLElement)) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
    focusTarget.focus({ preventScroll: true });
    focusTarget.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return <a {...props} href={href} onClick={handleClick} />;
}
