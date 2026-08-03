import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Inview } from "@/components/animation/springs/in-view";

export const Fees = async () => {
  const t = await getTranslations("admissions.fees");
  const tc = await getTranslations("common");

  return (
    <section aria-labelledby="fees-title" className="bg-background py-20">
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-card border border-border bg-surface-muted px-6 py-14 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-action-accent">{t("eyebrow")}</p>
        <h2 id="fees-title" className="text-2xl font-bold sm:text-3xl">
          {t("title")}
        </h2>
        <p className="text-sm leading-relaxed text-foreground-muted">{t("body")}</p>
        <Link
          href="/contact"
          className="mt-2 rounded-control bg-action-primary px-6 py-3 text-sm font-semibold text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-hover"
        >
          {tc("contactUs")}
        </Link>
      </Inview>
    </section>
  );
};
