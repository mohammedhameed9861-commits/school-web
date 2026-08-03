import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

interface Stage {
  title: string;
  range: string;
  description: string;
}

export const GradeLevels = async () => {
  const t = await getTranslations("academics.gradeLevels");
  const stages = t.raw("stages") as Stage[];

  return (
    <section aria-labelledby="grade-levels-title" className="bg-background py-20">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading id="grade-levels-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {stages.map((stage, index) => (
            <Inview
              key={stage.title}
              tag="article"
              mode="once"
              delayIn={index * 100}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              className="rounded-card border border-border bg-surface-muted p-8"
            >
              <p className="text-sm font-semibold text-action-accent">{stage.range}</p>
              <h3 className="mt-1 text-xl font-bold">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{stage.description}</p>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
