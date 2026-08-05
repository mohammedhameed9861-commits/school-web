"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { Spring } from "@/components/animation/springs/spring";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { CtaButton } from "@/components/ui/cta-button";
import { ScrollLink } from "@/components/ui/scroll-link";

// Single-page site (ADR-0022) — every former route is now a `#chapter`
// anchored on the homepage; the nav smooth-scrolls instead of navigating.
const NAV_ITEMS = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "academics", key: "academics" },
  { id: "student-life", key: "studentLife" },
  { id: "admissions", key: "admissions" },
  { id: "gallery", key: "gallery" },
  { id: "news", key: "news" },
  { id: "contact", key: "contact" },
] as const;

const linkClass =
  "transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-accent";

export const SiteHeader = () => {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const [start, stop] = [useScroll((s) => s.start), useScroll((s) => s.stop)];

  useEffect(() => {
    if (open) {
      stop();
    } else {
      start();
    }
    return () => start();
  }, [open, start, stop]);

  // Scroll-spy: highlight whichever chapter is currently near the top of
  // the viewport as the user scrolls through the single long page. Driven
  // directly off the native `scroll` event (which Lenis still dispatches as
  // it moves `window.scrollY`) rather than IntersectionObserver — the
  // in-page nav clicks briefly pause/resume Lenis around a programmatic
  // scroll (see `scrollTo`), and that pause/resume window was swallowing
  // IntersectionObserver's threshold callbacks.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const markerY = window.innerHeight * 0.35;
      let current = NAV_ITEMS[0].id as string;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= markerY) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <ScrollLink
          id="home"
          className="flex items-center gap-2 text-xl font-bold text-action-primary"
        >
          <Image
            src="/assets/brand/logo-128.png"
            alt={tc("brandNameFull")}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0"
            priority
          />
          <span>{tc("brandName")}</span>
        </ScrollLink>

        <nav
          aria-label={tc("brandName")}
          className="hidden items-center gap-6 text-sm font-medium lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <ScrollLink
                key={item.id}
                id={item.id}
                className={`${linkClass} ${isActive ? "text-action-accent" : "text-foreground"}`}
              >
                {t(item.key)}
              </ScrollLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch className={`${linkClass} text-sm font-semibold text-foreground`} />
          <CtaButton
            href="#admissions"
            className="bg-action-accent text-action-accent-foreground shadow-glow-gold hover:bg-action-accent-hover"
          >
            {tc("registerNow")}
          </CtaButton>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t("closeMenu") : t("toggleMenu")}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-control text-action-primary lg:hidden"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <Spring
          tag="nav"
          id="mobile-nav"
          mode="once"
          from={{ opacity: 0, y: -12 }}
          to={{ opacity: 1, y: 0 }}
          aria-label={tc("brandName")}
          className="flex flex-col gap-1 border-t border-border bg-surface px-4 py-4 lg:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <ScrollLink
                key={item.id}
                id={item.id}
                onNavigate={() => setOpen(false)}
                className={`rounded-control px-3 py-2 text-base font-medium ${isActive ? "bg-surface-muted text-action-accent" : "text-foreground"}`}
              >
                {t(item.key)}
              </ScrollLink>
            );
          })}
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
            <LanguageSwitch className="text-sm font-semibold text-foreground" />
            <ScrollLink
              id="admissions"
              onNavigate={() => setOpen(false)}
              className="rounded-control bg-action-accent px-4 py-2 text-sm font-semibold text-action-accent-foreground"
            >
              {tc("registerNow")}
            </ScrollLink>
          </div>
        </Spring>
      )}
    </header>
  );
};
