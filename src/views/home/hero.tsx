import { getTranslations } from "next-intl/server";
import TextEngine from "spring-text-engine";

import { ScrollLink } from "@/components/ui/scroll-link";
import { Inview } from "@/components/animation/springs/in-view";
import { ParallaxOrbs } from "@/components/ui/parallax-orbs";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CtaButton } from "@/components/ui/cta-button";

export const Hero = async () => {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-action-primary via-surface-inverted to-action-primary-hover text-foreground-inverted"
    >
      <ParallaxOrbs />
      <CursorGlow />
      <div className="relative mx-auto flex min-h-[92vh] max-w-[70rem] flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:px-6 sm:py-32">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 10 }}
          to={{ opacity: 1, y: 0 }}
          className="rounded-pill border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-action-accent"
        >
          {t("eyebrow")}
        </Inview>

        <TextEngine
          tag="h1"
          id="hero-title"
          mode="once"
          className="leading-display max-w-3xl text-center justify-center text-4xl font-bold sm:text-6xl"
          wordIn={{ y: "0%", opacity: 1, scale: 1 }}
          wordOut={{ y: "60%", opacity: 0, scale: 0.85 }}
          wordStagger={80}
          wordConfig={{ tension: 170, friction: 22 }}
          overflow
        >
          {t("title")}
        </TextEngine>

        <Inview
          tag="p"
          mode="once"
          delayIn={300}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-lg text-foreground-inverted/85"
        >
          {t("subtitle")}
        </Inview>

        <Inview
          tag="div"
          mode="once"
          delayIn={450}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <CtaButton
            href="#admissions"
            analyticsEvent="hero_register_cta"
            className="bg-action-accent text-action-accent-foreground shadow-glow-gold hover:bg-action-accent-hover"
          >
            {tc("registerNow")}
          </CtaButton>
          <ScrollLink
            id="about"
            className="rounded-control border border-white/25 px-7 py-3.5 text-sm font-semibold text-foreground-inverted transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent hover:text-action-accent"
          >
            {t("ctaSecondary")}
          </ScrollLink>
        </Inview>

        <Inview
          tag="div"
          mode="once"
          delayIn={550}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          className="mt-6 w-full"
        >
          <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:gap-16">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col-reverse items-center gap-1">
                <dt className="text-xs text-foreground-inverted/70 sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-bold text-action-accent sm:text-3xl">
                  <AnimatedCounter value={stat.value} delay={index * 120} />
                </dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </section>
  );
};
