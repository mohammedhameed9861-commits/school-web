import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import {
  generateMetadata as buildMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";
import { getLocaleAlternates, ogLocaleFor } from "@/utils/seo/locale-alternates";
import { getSiteSettings } from "@/sanity/queries";
import { siteConfig } from "@/lib/site";

import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { AnalyticsScripts } from "@/components/common/analytics/analytics-scripts";
import { ThemeProvider } from "@/providers/theme-provider";

import "@/app/globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const languages = getLocaleAlternates("");
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    url: languages[locale],
    languages,
    ogLocale: ogLocaleFor(locale),
  });
}

export const viewport: Viewport = generateViewport();

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const settings = await getSiteSettings();
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;

  const dir = locale === "ar" ? "rtl" : "ltr";

  // Inline script: runs before first paint to apply saved theme class,
  // preventing flash of wrong theme (FOWT).
  const noFlashScript = `(function(){try{var t=localStorage.getItem('theme')||( window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <NextIntlClientProvider>
          <ThemeProvider>
            <ScrollLayout>
              <AdaptiveGrid />
              <ReducedMotion />
              <SiteHeader />
              {children}
              <SiteFooter />
              <WhatsAppButton whatsapp={whatsapp} />
              <LazyCookie />
            </ScrollLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
