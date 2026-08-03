import { getTranslations } from "next-intl/server";
import TextEngine from "spring-text-engine";

import { Link } from "@/i18n/navigation";
import { Inview } from "@/components/animation/springs/in-view";

export const Hero = async () => {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-surface-inverted text-foreground-inverted"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--raw-color-navy-600)_0%,_transparent_60%)] opacity-60"
      />
      <div className="relative mx-auto flex max-w-[70rem] flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 sm:py-32">
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
          lineIn={{ y: "0%", opacity: 1 }}
          lineOut={{ y: "100%", opacity: 0 }}
          lineStagger={90}
          overflow
        >
          {t("title")}
        </TextEngine>

        <Inview
          tag="p"
          mode="once"
          delayIn={200}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-lg text-foreground-inverted/85"
        >
          {t("subtitle")}
        </Inview>

        <Inview
          tag="div"
          mode="once"
          delayIn={320}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/admissions"
            data-analytics-event="hero_register_cta"
            className="rounded-control bg-action-accent px-7 py-3.5 text-sm font-semibold text-action-accent-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-accent-hover"
          >
            {tc("registerNow")}
          </Link>
          <Link
            href="/about"
            className="rounded-control border border-white/25 px-7 py-3.5 text-sm font-semibold text-foreground-inverted transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent hover:text-action-accent"
          >
            {t("ctaSecondary")}
          </Link>
        </Inview>

        <Inview
          tag="div"
          mode="once"
          delayIn={420}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          className="mt-6 w-full"
        >
          <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center gap-1">
                <dt className="text-xs text-foreground-inverted/70 sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-bold text-action-accent sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </section>
  );
};
