import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

export const projectId = "tumwflm5";
export const dataset = "production";
export const apiVersion = "2024-01-01";

/** Public client — published content only, no auth. Used for normal visitors. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // false = always fresh data
});

/** Server-only read token, used to fetch draft content while previewing. */
const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Returns the right client for the current request: the public client for
 * normal visitors, or a token-authenticated client reading drafts with
 * stega metadata (powers Visual Editing's click-to-edit overlay) when
 * Studio's Presentation tool has this page open in preview/draft mode.
 */
export async function getSanityClient() {
  const { isEnabled } = await draftMode();
  if (isEnabled && token) {
    return sanityClient.withConfig({
      token,
      perspective: "drafts",
      useCdn: false,
      stega: { enabled: true, studioUrl: "/studio" },
    });
  }
  return sanityClient;
}
