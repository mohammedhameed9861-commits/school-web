import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

interface Advantage {
  title: string;
  description: string;
}

export const Advantages = async () => {
  const t = await getTranslations("home.advantages");
  const items = t.raw("items") as Advantage[];

  return (
    <section aria-labelledby="advantages-title" className="bg-background py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="advantages-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Inview
              key={item.title}
              tag="li"
              mode="once"
              delayIn={index * 80}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              className="rounded-card border border-border bg-surface-muted p-6"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-control bg-action-primary text-sm font-bold text-action-primary-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
            </Inview>
          ))}
        </ul>
      </div>
    </section>
  );
};
