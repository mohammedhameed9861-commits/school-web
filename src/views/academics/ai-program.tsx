import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

interface Point {
  title: string;
  description: string;
}

export const AiProgram = async () => {
  const t = await getTranslations("academics.aiProgram");
  const points = t.raw("points") as Point[];

  return (
    <section aria-labelledby="ai-program-title" className="bg-surface-inverted py-20 text-foreground-inverted">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading
          id="ai-program-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          invert
        />
        <Inview
          tag="p"
          mode="once"
          delayIn={150}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-foreground-inverted/80"
        >
          {t("body")}
        </Inview>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <Inview
              key={point.title}
              tag="div"
              mode="once"
              delayIn={index * 90}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              className="rounded-card border border-white/10 p-6"
            >
              <h3 className="text-base font-semibold text-action-accent">{point.title}</h3>
              <p className="mt-2 text-sm text-foreground-inverted/75">{point.description}</p>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
