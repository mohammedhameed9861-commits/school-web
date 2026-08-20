import { setRequestLocale } from "next-intl/server";

import { HomeView } from "@/views/home";

// The whole site is one page pulling live content from Sanity (hero, about,
// academics, admissions, ...). Force dynamic rendering so a Studio
// "Publish" shows up immediately instead of waiting for the next deploy.
export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeView />;
}
