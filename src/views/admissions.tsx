import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Requirements } from "@/views/admissions/requirements";
import { Steps } from "@/views/admissions/steps";
import { Fees } from "@/views/admissions/fees";
import { Faq } from "@/views/admissions/faq";
import { RegistrationSection } from "@/views/home/registration-section";

/** "Admissions" chapter of the single-page site (ADR-0022) — mounted at `#admissions`. */
export const AdmissionsView = async () => {
  const t = await getTranslations("admissions.hero");

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="admissions-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </div>
      <Requirements />
      <Steps />
      <Fees />
      <RegistrationSection />
      <Faq />
    </>
  );
};
