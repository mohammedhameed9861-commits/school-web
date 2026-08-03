import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";

export const Values = async () => {
  const t = await getTranslations("about.values");
  const items = t.raw("items") as NumberedItem[];

  return (
    <section aria-labelledby="values-title" className="bg-background py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id="values-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <NumberedCardGrid items={items} />
        </div>
      </div>
    </section>
  );
};
