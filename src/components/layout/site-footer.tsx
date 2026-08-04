import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/about", key: "about" },
  { href: "/academics", key: "academics" },
  { href: "/admissions", key: "admissions" },
  { href: "/gallery", key: "gallery" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

const linkClass =
  "text-foreground-inverted/80 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-accent";

export const SiteFooter = async () => {
  const t = await getTranslations("footer");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-inverted text-foreground-inverted">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-1">
          <p className="text-xl font-bold">{tc("brandNameFull")}</p>
          <p className="mt-3 text-sm text-foreground-inverted/80">{t("tagline")}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-pill border border-white/20 transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent hover:text-action-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.27-1.6 1.63-1.6H17V3.5c-.3-.04-1.3-.13-2.46-.13-2.44 0-4.1 1.49-4.1 4.22v2.35H7.6v3.3h2.84V22h3.06Z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-pill border border-white/20 transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent hover:text-action-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM16.4 3H7.6A4.6 4.6 0 0 0 3 7.6v8.8A4.6 4.6 0 0 0 7.6 21h8.8a4.6 4.6 0 0 0 4.6-4.6V7.6A4.6 4.6 0 0 0 16.4 3Zm3.35 13.4a3.35 3.35 0 0 1-3.35 3.35H7.6a3.35 3.35 0 0 1-3.35-3.35V7.6A3.35 3.35 0 0 1 7.6 4.25h8.8a3.35 3.35 0 0 1 3.35 3.35v8.8ZM17.4 7.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label={t("quickLinks")} className="lg:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-inverted/60">
            {t("quickLinks")}
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {tn(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-inverted/60">
            {t("contactInfo")}
          </h2>
          <address className="mt-4 flex flex-col gap-2 text-sm not-italic text-foreground-inverted/80">
            <span>{tc("address")}</span>
            <a href={`tel:${siteConfig.phone}`} className={linkClass}>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              {siteConfig.email}
            </a>
          </address>
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-inverted/60">
            {tc("registerNow")}
          </h2>
          <p className="mt-4 text-sm text-foreground-inverted/80">{t("tagline")}</p>
          <Link
            href="/admissions"
            className="mt-4 inline-block rounded-control bg-action-accent px-4 py-2 text-sm font-semibold text-action-accent-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-accent-hover"
          >
            {tc("applyNow")}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-foreground-inverted/60 sm:flex-row sm:px-6 lg:px-10">
          <p>
            &copy; {year} {tc("brandNameFull")} — {t("rights")}
          </p>
          <Link href="/contact" className={linkClass}>
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
