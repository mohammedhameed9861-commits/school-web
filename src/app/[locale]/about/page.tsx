import { permanentRedirect } from "@/i18n/navigation";

/**
 * `/about` no longer renders its own page — the whole site is one scroll
 * (ADR-0022). This permanently redirects old links/bookmarks to the
 * `#about` chapter on the homepage instead of 404ing.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect({ href: "/#about", locale });
}
