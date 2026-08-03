import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

interface Stat {
  value: string;
  label: string;
}

export const Achievements = async () => {
  const t = await getTranslations("home.achievements");
  const stats = t.raw("stats") as Stat[];

  return (
    <section aria-labelledby="achievements-title" className="bg-surface-inverted py-20 text-foreground-inverted">
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading
          id="achievements-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          invert
        />

        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <dl className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center gap-1 text-center">
                <dt className="text-xs text-foreground-inverted/70 sm:text-sm">{stat.label}</dt>
                <dd className="text-3xl font-bold text-action-accent sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </section>
  );
};
