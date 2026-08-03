import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { getLocaleAlternates, ogLocaleFor } from "@/utils/seo/locale-alternates";
import { AdmissionsView } from "@/views/admissions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.seo" });
  const languages = getLocaleAlternates("/admissions");
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    url: languages[locale],
    languages,
    ogLocale: ogLocaleFor(locale),
  });
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdmissionsView />;
}
