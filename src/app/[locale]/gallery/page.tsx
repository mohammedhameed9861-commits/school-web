import { permanentRedirect } from "@/i18n/navigation";

/**
 * `/gallery` no longer renders its own page — the whole site is one scroll
 * (ADR-0022). This permanently redirects old links/bookmarks to the
 * `#gallery` chapter on the homepage instead of 404ing.
 */
export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect({ href: "/#gallery", locale });
}
