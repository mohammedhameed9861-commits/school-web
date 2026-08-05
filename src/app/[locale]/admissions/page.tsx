import { permanentRedirect } from "@/i18n/navigation";

/**
 * `/admissions` no longer renders its own page — the whole site is one
 * scroll (ADR-0022). This permanently redirects old links/bookmarks to the
 * `#admissions` chapter on the homepage instead of 404ing.
 */
export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect({ href: "/#admissions", locale });
}
