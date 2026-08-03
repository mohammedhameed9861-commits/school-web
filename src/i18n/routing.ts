import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config — single source of truth for next-intl's middleware,
 * navigation helpers, and request config. Arabic-first per project brief:
 * `ar` is the default locale (served at `/`, no prefix); `en` is prefixed
 * (`/en/...`). See obsidian/architecture/tech-stack.md.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
