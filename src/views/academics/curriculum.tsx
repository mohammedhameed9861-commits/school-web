import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCardGrid, type MediaItem } from "@/components/ui/media-card-grid";

export const Curriculum = async () => {
  const t = await getTranslations("academics.curriculum");
  const items = t.raw("items") as MediaItem[];

  return (
    <section
      aria-labelledby="curriculum-title"
      className="relative z-10 rounded-t-[2rem] bg-background py-20 sm:rounded-t-[3rem] sm:py-24"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id="curriculum-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <MediaCardGrid items={items} />
        </div>
      </div>
    </section>
  );
};
