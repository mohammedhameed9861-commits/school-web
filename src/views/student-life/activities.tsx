import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";
import { getPageSection } from "@/sanity/queries";

export const Activities = async () => {
  const t = await getTranslations("studentLife.activities");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("studentLife.activities", locale);
  const items = cms?.items || (t.raw("items") as NumberedItem[]);

  return (
    <section
      aria-labelledby="activities-title"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="activities-title"
          eyebrow={cms?.eyebrow || t("eyebrow")}
          title={cms?.title || t("title")}
          subtitle={cms?.subtitle || t("subtitle")}
        />
        <div className="mt-12">
          <NumberedCardGrid items={items} />
        </div>
      </div>
    </section>
  );
};
