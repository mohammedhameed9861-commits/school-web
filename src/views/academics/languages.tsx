import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";
import { getPageSection } from "@/sanity/queries";

export const Languages = async () => {
  const t = await getTranslations("academics.languages");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("academics.languages", locale);
  const arabicTitle = cms?.pairLeft?.title || t("arabicTitle");
  const arabicBody = cms?.pairLeft?.body || t("arabicBody");
  const englishTitle = cms?.pairRight?.title || t("englishTitle");
  const englishBody = cms?.pairRight?.body || t("englishBody");

  return (
    <section aria-labelledby="languages-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading id="languages-title" eyebrow={cms?.eyebrow || t("eyebrow")} title={cms?.title || t("title")} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Inview
            tag="article"
            mode="once"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            className="rounded-card bg-surface p-8"
          >
            <h3 className="text-lg font-semibold text-action-primary">{arabicTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{arabicBody}</p>
          </Inview>
          <Inview
            tag="article"
            mode="once"
            delayIn={100}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            className="rounded-card bg-surface p-8"
          >
            <h3 className="text-lg font-semibold text-action-primary">{englishTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{englishBody}</p>
          </Inview>
        </div>
      </div>
    </section>
  );
};
