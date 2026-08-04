import TextEngine from "spring-text-engine";

import { Inview } from "@/components/animation/springs/in-view";
import { ParallaxOrbs } from "@/components/ui/parallax-orbs";
import { CursorGlow } from "@/components/ui/cursor-glow";

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export const PageHero = ({ eyebrow, title, subtitle }: PageHeroProps) => {
  return (
    <section
      aria-labelledby="page-hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-action-primary via-surface-inverted to-action-primary-hover text-foreground-inverted"
    >
      <ParallaxOrbs />
      <CursorGlow />
      <div className="relative mx-auto flex min-h-[60vh] max-w-[70rem] flex-col items-center justify-center gap-4 px-4 py-20 text-center sm:px-6">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 10 }}
          to={{ opacity: 1, y: 0 }}
          className="rounded-pill border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-action-accent"
        >
          {eyebrow}
        </Inview>
        <TextEngine
          tag="h1"
          id="page-hero-title"
          mode="once"
          className="leading-display max-w-2xl text-center justify-center text-3xl font-bold sm:text-5xl"
          wordIn={{ y: "0%", opacity: 1, scale: 1 }}
          wordOut={{ y: "60%", opacity: 0, scale: 0.85 }}
          wordStagger={70}
          wordConfig={{ tension: 170, friction: 24 }}
          overflow
        >
          {title}
        </TextEngine>
        {subtitle && (
          <Inview
            tag="p"
            mode="once"
            delayIn={250}
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
