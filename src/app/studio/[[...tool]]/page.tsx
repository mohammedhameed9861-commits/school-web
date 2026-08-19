"use client";

import dynamic from "next/dynamic";

import config from "../../../../sanity.config";

// Sanity Studio uses styled-components and browser-only APIs that break
// when the server tries to render/bundle them during `next build`
// (Turbopack). Loading it purely client-side (ssr: false) sidesteps that.
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false },
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
