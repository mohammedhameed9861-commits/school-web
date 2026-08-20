import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { sanityClient } from "@/sanity/client";

// Called by Studio's Presentation tool to enter draft/preview mode on the
// live site — this is what powers "click any text/image to edit it".
export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
