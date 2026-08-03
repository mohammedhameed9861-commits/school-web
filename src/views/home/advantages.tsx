import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";

export const Advantages = async () => {
  const t = await getTranslations("home.advantages");
  const items = t.raw("items") as NumberedItem[];

  return (
    <section
      aria-labelledby="advantages-title"
      className="relative z-10 rounded-t-[2rem] bg-background py-20 sm:rounded-t-[3rem] sm:py-24"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="advantages-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12">
          <NumberedCardGrid items={items} />
        </div>
      </div>
    </section>
  );
};
