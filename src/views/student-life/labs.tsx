import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGrid, type MediaItem } from "@/components/ui/media-card-grid";
import { getPageSection } from "@/sanity/queries";

export const Labs = async () => {
  const t = await getTranslations("studentLife.labs");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("studentLife.labs", locale);
  const items = cms?.items || (t.raw("items") as MediaItem[]);

  return (
    <section aria-labelledby="labs-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="labs-title"
          eyebrow={cms?.eyebrow || t("eyebrow")}
          title={cms?.title || t("title")}
          subtitle={cms?.subtitle || t("subtitle")}
        />
        <div className="mt-12">
          <MediaCardGrid
            items={items}
            images={["/assets/photos/physics-lab.jpg", "/assets/photos/chemistry-lab.jpg"]}
            columns={2}
          />
        </div>
      </div>
    </section>
  );
};
