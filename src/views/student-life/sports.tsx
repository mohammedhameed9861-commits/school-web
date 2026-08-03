import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGrid, type MediaItem } from "@/components/ui/media-card-grid";

export const Sports = async () => {
  const t = await getTranslations("studentLife.sports");
  const items = t.raw("items") as MediaItem[];

  return (
    <section aria-labelledby="sports-title" className="bg-background py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id="sports-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <MediaCardGrid items={items} />
        </div>
      </div>
    </section>
  );
};
