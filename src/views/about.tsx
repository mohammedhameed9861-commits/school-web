import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Story } from "@/views/about/story";
import { VisionMission } from "@/views/about/vision-mission";
import { Values } from "@/views/about/values";
import { Bilingual } from "@/views/about/bilingual";

/** "About Alsharq" chapter of the single-page site (ADR-0022) — mounted at `#about`. */
export const AboutView = async () => {
  const t = await getTranslations("about.hero");

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </div>
      <Story />
      <VisionMission />
      <Values />
      <Bilingual />
    </>
  );
};
