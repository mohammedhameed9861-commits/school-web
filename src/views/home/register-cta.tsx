import { getTranslations } from "next-intl/server";

import { Inview } from "@/components/animation/springs/in-view";
import { ParallaxOrbs } from "@/components/ui/parallax-orbs";
import { CtaButton } from "@/components/ui/cta-button";

export const RegisterCta = async () => {
  const t = await getTranslations("home.registerCta");
  const tc = await getTranslations("common");

  return (
    <section
      aria-labelledby="register-cta-title"
      className="relative overflow-hidden bg-gradient-to-r from-action-primary via-action-primary-light to-action-primary-hover text-foreground-inverted"
    >
      <ParallaxOrbs />
      <Inview
        tag="div"
        mode="once"
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        className="relative mx-auto flex max-w-[70rem] flex-col items-center gap-5 px-4 py-16 text-center sm:px-6"
      >
        <h2 id="register-cta-title" className="text-2xl font-bold sm:text-3xl">
          {t("title")}
        </h2>
        <p className="max-w-xl text-foreground-inverted/80">{t("body")}</p>
        <CtaButton
          href="#admissions"
          analyticsEvent="mid_page_register_cta"
          className="bg-action-accent text-action-accent-foreground shadow-glow-gold hover:bg-action-accent-hover"
        >
          {tc("registerNow")}
        </CtaButton>
      </Inview>
    </section>
  );
};
