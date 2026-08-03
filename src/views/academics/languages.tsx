import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

export const Languages = async () => {
  const t = await getTranslations("academics.languages");

  return (
    <section aria-labelledby="languages-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading id="languages-title" eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Inview
            tag="article"
            mode="once"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            className="rounded-card bg-surface p-8"
          >
            <h3 className="text-lg font-semibold text-action-primary">{t("arabicTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{t("arabicBody")}</p>
          </Inview>
          <Inview
            tag="article"
            mode="once"
            delayIn={100}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            className="rounded-card bg-surface p-8"
          >
            <h3 className="text-lg font-semibold text-action-primary">{t("englishTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{t("englishBody")}</p>
          </Inview>
        </div>
      </div>
    </section>
  );
};
