import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";
import { getAdvantages } from "@/sanity/queries";

export const Advantages = async () => {
  const t = await getTranslations("home.advantages");
  const locale = (await getLocale()) as "ar" | "en";
  const items = (await getAdvantages(locale)) || (t.raw("items") as NumberedItem[]);

  return (
    <section
      aria-labelledby="advantages-title"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="advantages-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="mt-12">
          <NumberedCardGrid items={items} numbered={false} />
        </div>
      </div>
    </section>
  );
};
