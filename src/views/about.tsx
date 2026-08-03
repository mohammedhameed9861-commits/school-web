import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { Story } from "@/views/about/story";
import { VisionMission } from "@/views/about/vision-mission";
import { Values } from "@/views/about/values";
import { Bilingual } from "@/views/about/bilingual";
import { RegisterCta } from "@/views/home/register-cta";

export const AboutView = async () => {
  const t = await getTranslations("about.hero");

  return (
    <main>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Story />
      <VisionMission />
      <Values />
      <Bilingual />
      <RegisterCta />
    </main>
  );
};
