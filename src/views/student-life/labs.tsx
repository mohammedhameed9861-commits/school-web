import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGrid, type MediaItem } from "@/components/ui/media-card-grid";

export const Labs = async () => {
  const t = await getTranslations("studentLife.labs");
  const items = t.raw("items") as MediaItem[];

  return (
    <section aria-labelledby="labs-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id="labs-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
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
