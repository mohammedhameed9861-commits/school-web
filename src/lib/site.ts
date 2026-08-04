/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Alsharq Bilingual Private School",
  description:
    "A stronger education. A more confident future. Alsharq Bilingual Private School for Boys prepares students academically, personally and professionally for the future.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@alsharqschool",
  author: "Alsharq Bilingual Private School",
  /** Browser theme-color (address bar / PWA) — brand navy. */
  themeColor: "#0b1829",
  /** Phone/WhatsApp number in E.164 (no spaces). Same number used for both — confirm if there's a separate office line. */
  phone: "+9647819003378",
  whatsapp: "9647819003378",
  email: "info@alsharq-school.edu",
  /**
   * Google Maps embed centred on the real campus location (Al-Mansour,
   * Baghdad — near the Al-Sa'a Restaurant branch by the railway).
   * Localized address text lives in messages/{locale}.json → common.address.
   */
  mapsEmbedUrl: "https://www.google.com/maps?q=33.318848,44.331623&output=embed",
  social: {
    facebook: "https://www.facebook.com/alsharqprivateschools/",
    instagram: "https://www.instagram.com/alsharq.private.schools/",
  },
} as const;
