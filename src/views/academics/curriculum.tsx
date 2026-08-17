import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGrid, type MediaItem } from "@/components/ui/media-card-grid";

export const Curriculum = async () => {
  const t = await getTranslations("academics.curriculum");
  const items = t.raw("items") as MediaItem[];

  return (
    <section
      aria-labelledby="curriculum-title"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id="curriculum-title" eyebrow={t("eyebrow")} subtitle={t("subtitle")} subtitleBold />
        <div className="mt-12">
          <MediaCardGrid
            items={items}
            images={["/assets/photos/science-club-telescope.jpg", "/assets/photos/humanities-class.jpg", "/assets/photos/classroom-preparatory.jpg"]}
          />
        </div>
      </div>
    </section>
  );
};
