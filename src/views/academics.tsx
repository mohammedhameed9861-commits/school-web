import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { Curriculum } from "@/views/academics/curriculum";
import { Languages } from "@/views/academics/languages";
import { GradeLevels } from "@/views/academics/grade-levels";
import { TeachingApproach } from "@/views/academics/teaching-approach";
import { AiProgram } from "@/views/academics/ai-program";
import { RegisterCta } from "@/views/home/register-cta";

export const AcademicsView = async () => {
  const t = await getTranslations("academics.hero");

  return (
    <main>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Curriculum />
      <Languages />
      <GradeLevels />
      <TeachingApproach />
      <AiProgram />
      <RegisterCta />
    </main>
  );
};
