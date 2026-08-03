import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export const PageHero = ({ eyebrow, title, subtitle }: PageHeroProps) => {
  return (
    <section
      aria-labelledby="page-hero-title"
      className="relative overflow-hidden bg-surface-inverted text-foreground-inverted"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--raw-color-navy-600)_0%,_transparent_60%)] opacity-60"
      />
      <div className="relative mx-auto flex max-w-[70rem] flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 10 }}
          to={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold uppercase tracking-wide text-action-accent"
        >
          {eyebrow}
        </Inview>
        <TextEngine
          tag="h1"
          id="page-hero-title"
          mode="once"
          className="leading-display max-w-2xl text-center justify-center text-3xl font-bold sm:text-5xl"
          lineIn={{ y: "0%", opacity: 1 }}
          lineOut={{ y: "100%", opacity: 0 }}
          lineStagger={80}
          overflow
        >
          {title}
        </TextEngine>
        {subtitle && (
          <Inview
            tag="p"
            mode="once"
            delayIn={150}
            from={{ opacity: 0, y: 12 }}
            to={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-base text-foreground-inverted/80"
          >
            {subtitle}
          </Inview>
        )}
      </div>
    </section>
  );
};
