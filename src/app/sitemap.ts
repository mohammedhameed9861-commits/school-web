import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

/** Path segment per route (empty string = home). Keep in sync with `src/app/[locale]/`. */
const ROUTES = ["", "about", "academics", "student-life", "admissions", "gallery", "news", "contact"];

/**
 * Generates `/sitemap.xml` — every public route in every locale, with
 * `alternates.languages` linking each entry to its translations.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => {
        const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
        return [locale, `${siteConfig.url}${prefix}/${route}`.replace(/\/$/, "") || siteConfig.url];
      }),
    );

    return {
      url: languages[routing.defaultLocale],
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: { languages },
    };
  });
}
