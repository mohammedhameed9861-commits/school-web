import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { RegistrationForm } from "@/components/forms/registration-form";

export const RegistrationSection = async () => {
  const t = await getTranslations("registrationForm");

  return (
    <section id="register" aria-labelledby="register-title" className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          id="register-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <RegistrationForm className="mt-10" />
      </div>
    </section>
  );
};
