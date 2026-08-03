"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { Spring } from "@/components/animation/springs/spring";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { CtaButton } from "@/components/ui/cta-button";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/academics", key: "academics" },
  { href: "/student-life", key: "studentLife" },
  { href: "/admissions", key: "admissions" },
  { href: "/gallery", key: "gallery" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

const linkClass =
  "transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-accent";

export const SiteHeader = () => {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [start, stop] = [useScroll((s) => s.start), useScroll((s) => s.stop)];

  useEffect(() => {
    if (open) {
      stop();
    } else {
      start();
    }
    return () => start();
  }, [open, start, stop]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-action-primary"
        >
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-control bg-gradient-to-br from-action-accent-light via-action-accent to-action-accent-hover text-lg text-action-accent-foreground shadow-glow-gold"
          >
            ش
          </span>
          <span>{tc("brandName")}</span>
        </Link>

        <nav
          aria-label={tc("brandName")}
          className="hidden items-center gap-6 text-sm font-medium lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${linkClass} ${isActive ? "text-action-accent" : "text-foreground"}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch className={`${linkClass} text-sm font-semibold text-foreground`} />
          <CtaButton
            href="/admissions"
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
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-control px-3 py-2 text-base font-medium ${isActive ? "bg-surface-muted text-action-accent" : "text-foreground"}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
            <LanguageSwitch className="text-sm font-semibold text-foreground" />
            <Link
              href="/admissions"
              className="rounded-control bg-action-accent px-4 py-2 text-sm font-semibold text-action-accent-foreground"
            >
              {tc("registerNow")}
            </Link>
          </div>
        </Spring>
      )}
    </header>
  );
};
