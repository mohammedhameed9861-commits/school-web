import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGrid, type MediaItem } from "@/components/ui/media-card-grid";
import { getPageSection } from "@/sanity/queries";

export const Sports = async () => {
  const t = await getTranslations("studentLife.sports");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("studentLife.sports", locale);
  const items = cms?.items || (t.raw("items") as MediaItem[]);

  return (
    <section aria-labelledby="sports-title" className="bg-background py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="sports-title"
          eyebrow={cms?.eyebrow || t("eyebrow")}
          title={cms?.title || t("title")}
          subtitle={cms?.subtitle || t("subtitle")}
        />
        <div className="mt-12">
          <MediaCardGrid
            items={items}
            images={["/assets/photos/table-tennis.jpg"]}
            columns={2}
          />
        </div>
      </div>
    </section>
  );
};
