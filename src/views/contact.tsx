import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Info } from "@/views/contact/info";
import { ContactForm } from "@/components/forms/contact-form";

export const ContactView = async () => {
  const heroT = await getTranslations("contact.hero");
  const formT = await getTranslations("contact.form");

  return (
    <main>
      <PageHero eyebrow={heroT("eyebrow")} title={heroT("title")} subtitle={heroT("subtitle")} />
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
    </main>
  );
};
