import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

/**
 * Generates `/sitemap.xml`. The site is a single scrolling page per locale
 * (ADR-0022) — every former route (`/about`, `/gallery`, …) now permanently
 * redirects to a `#chapter` anchor on the homepage, so only the homepage
 * itself is a canonical, indexable URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      return [locale, `${siteConfig.url}${prefix}/`.replace(/\/$/, "") || siteConfig.url];
    }),
  );

  return [
    {
      url: languages[routing.defaultLocale],
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
    },
  ];
}
