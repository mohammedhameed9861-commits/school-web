import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Inview } from "@/components/animation/springs/in-view";

export const RegisterCta = async () => {
  const t = await getTranslations("home.registerCta");
  const tc = await getTranslations("common");

  return (
    <section aria-labelledby="register-cta-title" className="bg-action-primary text-foreground-inverted">
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-[70rem] flex-col items-center gap-5 px-4 py-14 text-center sm:px-6"
      >
        <h2 id="register-cta-title" className="text-2xl font-bold sm:text-3xl">
          {t("title")}
        </h2>
        <p className="max-w-xl text-foreground-inverted/80">{t("body")}</p>
        <Link
          href="/admissions"
          data-analytics-event="mid_page_register_cta"
          className="rounded-control bg-action-accent px-7 py-3 text-sm font-semibold text-action-accent-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-accent-hover"
        >
          {tc("registerNow")}
        </Link>
      </Inview>
    </section>
  );
};
