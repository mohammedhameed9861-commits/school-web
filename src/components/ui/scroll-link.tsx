"use client";

import { scrollTo } from "@/utils/scroll-to";

export interface ScrollLinkProps {
  /** Target section id (no leading `#`). */
  id: string;
  className?: string;
  children: React.ReactNode;
  /** Fires after the scroll is triggered — e.g. to close a mobile menu. */
  onNavigate?: () => void;
}

/**
 * In-page smooth-scroll link for the single-page site (ADR-0022). Renders a
 * real `<a href="#id">` — so middle-click / open-in-new-tab / no-JS still
 * work — but a plain click is intercepted to scroll via Lenis (`scrollTo`)
 * instead of an abrupt native jump, and the hash is updated without a full
 * navigation.
 */
export const ScrollLink = ({ id, className, children, onNavigate }: ScrollLinkProps) => {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        scrollTo(id);
        onNavigate?.();
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", `#${id}`);
        }
      }}
    >
      {children}
    </a>
  );
};
