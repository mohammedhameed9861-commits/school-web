import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { getLocaleAlternates, ogLocaleFor } from "@/utils/seo/locale-alternates";
import { GalleryView } from "@/views/gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.seo" });
  const languages = getLocaleAlternates("/gallery");
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    url: languages[locale],
    languages,
    ogLocale: ogLocaleFor(locale),
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalleryView />;
}
