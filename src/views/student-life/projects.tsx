import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { NumberedCardGrid, type NumberedItem } from "@/components/ui/numbered-card-grid";

export const Projects = async () => {
  const t = await getTranslations("studentLife.projects");
  const items = t.raw("items") as NumberedItem[];

  return (
    <section aria-labelledby="projects-title" className="bg-background py-20">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading id="projects-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12">
          <NumberedCardGrid items={items} columns={3} />
        </div>
      </div>
    </section>
  );
};
