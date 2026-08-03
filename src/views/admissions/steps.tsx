import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";

export const Steps = async () => {
  const t = await getTranslations("admissions.steps");
  const items = t.raw("items") as NumberedItem[];

  return (
    <section aria-labelledby="steps-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading id="steps-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <NumberedCardGrid items={items} columns={2} />
        </div>
      </div>
    </section>
  );
};
