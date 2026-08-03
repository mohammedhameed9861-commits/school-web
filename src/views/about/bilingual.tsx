import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";

export const Bilingual = async () => {
  const t = await getTranslations("about.bilingual");
  const points = t.raw("points") as NumberedItem[];

  return (
    <section aria-labelledby="bilingual-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id="bilingual-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <NumberedCardGrid items={points} columns={3} />
        </div>
      </div>
    </section>
  );
};
