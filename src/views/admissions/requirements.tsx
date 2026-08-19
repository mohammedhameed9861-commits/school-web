import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";
import { getPageSection } from "@/sanity/queries";

export const Requirements = async () => {
  const t = await getTranslations("admissions.requirements");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("admissions.requirements", locale);
  const items = cms?.items || (t.raw("items") as NumberedItem[]);

  return (
    <section
      aria-labelledby="requirements-title"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="requirements-title"
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
