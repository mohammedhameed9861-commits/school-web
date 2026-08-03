import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Inview } from "@/components/animation/springs/in-view";

interface Program {
  title: string;
  description: string;
}

export const Programs = async () => {
  const t = await getTranslations("home.programs");
  const tc = await getTranslations("common");
  const items = t.raw("items") as Program[];

  return (
    <section aria-labelledby="programs-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="programs-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {items.map((item, index) => (
            <Inview
              key={item.title}
              tag="li"
              mode="once"
              delayIn={index * 100}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              className="flex gap-5 rounded-card bg-surface p-6"
            >
              <MediaPlaceholder className="h-16 w-16 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
              </div>
            </Inview>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/academics"
            className="text-sm font-semibold text-action-primary underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-accent"
          >
            {tc("learnMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};
