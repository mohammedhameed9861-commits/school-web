import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { getLocaleAlternates, ogLocaleFor } from "@/utils/seo/locale-alternates";
import { AboutView } from "@/views/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.seo" });
  const languages = getLocaleAlternates("/about");
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    url: languages[locale],
    languages,
    ogLocale: ogLocaleFor(locale),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutView />;
}
