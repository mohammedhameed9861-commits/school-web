import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";
import { getPageSection } from "@/sanity/queries";

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq = async () => {
  const t = await getTranslations("admissions.faq");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("admissions.faq", locale);
  const items: FaqItem[] =
    cms?.items?.map((i) => ({ question: i.title, answer: i.description })) ||
    (t.raw("items") as FaqItem[]);

  return (
    <section aria-labelledby="faq-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          id="faq-title"
          eyebrow={cms?.eyebrow || t("eyebrow")}
          title={cms?.title || t("title")}
          subtitle={cms?.subtitle || t("subtitle")}
        />
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, index) => (
            <Inview
              key={item.question}
              tag="details"
              mode="once"
              delayIn={index * 60}
              from={{ opacity: 0, y: 12 }}
              to={{ opacity: 1, y: 0 }}
              className="group rounded-card border border-border bg-surface p-5 open:pb-6"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.answer}</p>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
