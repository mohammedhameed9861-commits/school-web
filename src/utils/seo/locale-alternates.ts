import { routing } from "@/i18n/routing";

/**
 * Builds the `{ locale: path }` map for a route's hreflang alternates —
 * `path` is locale-free (e.g. `/about`, or `""` for home).
 */
export function getLocaleAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      return [locale, `${prefix}${path}` || "/"];
    }),
  );
}

/** OpenGraph locale tag for a given app locale. */
export function ogLocaleFor(locale: string): string {
  return locale === "ar" ? "ar_IQ" : "en_US";
}
