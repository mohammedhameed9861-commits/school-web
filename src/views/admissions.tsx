import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { Requirements } from "@/views/admissions/requirements";
import { Steps } from "@/views/admissions/steps";
import { Fees } from "@/views/admissions/fees";
import { Faq } from "@/views/admissions/faq";
import { RegistrationSection } from "@/views/home/registration-section";

export const AdmissionsView = async () => {
  const t = await getTranslations("admissions.hero");

  return (
    <main>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Requirements />
      <Steps />
      <Fees />
      <RegistrationSection />
      <Faq />
    </main>
  );
};
