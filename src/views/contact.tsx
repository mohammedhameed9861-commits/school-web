import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Info } from "@/views/contact/info";
import { ContactForm } from "@/components/forms/contact-form";

/** "Contact" chapter of the single-page site (ADR-0022) — mounted at `#contact`. */
export const ContactView = async () => {
  const heroT = await getTranslations("contact.hero");
  const formT = await getTranslations("contact.form");

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="contact-title" eyebrow={heroT("eyebrow")} title={heroT("title")} subtitle={heroT("subtitle")} />
      </div>
      <Info />
      <section aria-labelledby="contact-form-title" className="bg-surface-muted py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <SectionHeading
            id="contact-form-title"
            eyebrow={formT("eyebrow")}
            title={formT("title")}
            subtitle={formT("subtitle")}
          />
          <ContactForm className="mt-10" />
        </div>
      </section>
    </>
  );
};
