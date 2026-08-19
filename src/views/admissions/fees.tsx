import { getLocale, getTranslations } from "next-intl/server";

import { ScrollLink } from "@/components/ui/scroll-link";
import { Inview } from "@/components/animation/springs/in-view";
import { getPageSection } from "@/sanity/queries";

export const Fees = async () => {
  const t = await getTranslations("admissions.fees");
  const tc = await getTranslations("common");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("admissions.fees", locale);

  return (
    <section aria-labelledby="fees-title" className="bg-background py-20">
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-card border border-border bg-surface-muted px-6 py-14 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-action-accent">{cms?.eyebrow || t("eyebrow")}</p>
        <h2 id="fees-title" className="text-2xl font-bold sm:text-3xl">
          {cms?.title || t("title")}
        </h2>
        <p className="text-sm leading-relaxed text-foreground-muted">{cms?.body || t("body")}</p>
        <ScrollLink
          id="contact"
          className="mt-2 rounded-control bg-action-primary px-6 py-3 text-sm font-semibold text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-hover"
        >
          {tc("contactUs")}
        </ScrollLink>
      </Inview>
    </section>
  );
};
