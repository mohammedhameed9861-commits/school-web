import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Curriculum } from "@/views/academics/curriculum";
import { Languages } from "@/views/academics/languages";
import { TeachingApproach } from "@/views/academics/teaching-approach";
import { AiProgram } from "@/views/academics/ai-program";

/** "Academics" chapter of the single-page site (ADR-0022) — mounted at `#academics`. */
export const AcademicsView = async () => {
  const t = await getTranslations("academics.hero");

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="academics-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </div>
      <Curriculum />
      <Languages />
      <TeachingApproach />
      <AiProgram />
    </>
  );
};
