"use client";

import { useRef } from "react";

import { Link } from "@/i18n/navigation";
import { Hover } from "@/components/animation/springs/hover";
import { scrollTo } from "@/utils/scroll-to";

export interface CtaButtonProps {
  /** A route (`/x`) navigates normally; a hash (`#x`) smooth-scrolls within the single-page site (ADR-0022). */
  href: string;
  className?: string;
  analyticsEvent?: string;
  children: React.ReactNode;
}

/** A primary CTA link with a physical hover bounce (scale + lift via `<Hover>`). */
export const CtaButton = ({ href, className, analyticsEvent, children }: CtaButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isAnchor = href.startsWith("#");
  const linkClassName = `inline-block rounded-control px-7 py-3.5 text-sm font-semibold transition-colors duration-[var(--duration-fast)] ease-entrance ${className ?? ""}`;

  const content = (
    <Hover
      tag="span"
      trigger={ref}
      from={{ scale: 1, y: 0 }}
      to={{ scale: 1.06, y: -2 }}
      config={{ tension: 300, friction: 15 }}
      className="block"
    >
      {children}
    </Hover>
  );

  if (isAnchor) {
    const id = href.slice(1);
    return (
      <a
        ref={ref}
        href={href}
        data-analytics-event={analyticsEvent}
        className={linkClassName}
        onClick={(event) => {
          event.preventDefault();
          scrollTo(id);
          if (typeof window !== "undefined") {
            window.history.pushState(null, "", href);
          }
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      data-analytics-event={analyticsEvent}
      className={linkClassName}
    >
      {content}
    </Link>
  );
};
