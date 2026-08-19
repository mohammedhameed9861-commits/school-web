import { sanityClient } from "./client";

export type SanitySiteSettings = {
  schoolNameAr?: string;
  schoolNameEn?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressAr?: string;
  addressEn?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  googleMapsEmbedUrl?: string;
};

/**
 * Fetches the `siteSettings` singleton from Sanity. Returns `null` on any
 * failure (network, no project access, or the document not published yet)
 * so callers can fall back to the static defaults in `@/lib/site` and the
 * site never breaks because of a missing/unpublished CMS document.
 */
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    return await sanityClient.fetch<SanitySiteSettings | null>(
      `*[_type == "siteSettings"][0]`,
    );
  } catch {
    return null;
  }
}
