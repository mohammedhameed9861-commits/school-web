import createImageUrlBuilder from "@sanity/image-url";

import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

/** Minimal shape of a Sanity image reference as returned by GROQ. */
export type SanityImageRef = {
  asset?: { _ref: string; _type: "reference" };
} | null | undefined;

/** Builds a resizable CDN URL from a Sanity image reference, or `null`. */
export const urlFor = (source: SanityImageRef) => {
  if (!source?.asset) return null;
  return builder.image(source).auto("format").url();
};
