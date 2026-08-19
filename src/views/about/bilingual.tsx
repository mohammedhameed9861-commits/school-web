import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";
import { getPageSection } from "@/sanity/queries";

export const Bilingual = async () => {
  const t = await getTranslations("about.bilingual");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("about.bilingual", locale);
  const points = cms?.items || (t.raw("points") as NumberedItem[]);

  return (
    <section aria-labelledby="bilingual-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="bilingual-title"
          eyebrow={cms?.eyebrow || t("eyebrow")}
          title={cms?.title || t("title")}
          subtitle={cms?.subtitle || t("subtitle")}
        />
        <div className="mt-12">
          <NumberedCardGrid items={points} columns={3} />
        </div>
      </div>
    </section>
  );
};
