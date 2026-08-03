import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { InteractiveCard } from "@/components/ui/interactive-card";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const Testimonials = async () => {
  const t = await getTranslations("home.testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section aria-labelledby="testimonials-title" className="bg-surface-muted py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="testimonials-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => (
            <InteractiveCard
              key={item.name}
              delayIn={index * 100}
              className="rounded-card border-2 border-transparent bg-surface p-6 shadow-glow-gold transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent"
            >
              <figure>
                <span aria-hidden className="text-4xl font-black leading-none text-action-accent">
                  &ldquo;
                </span>
                <blockquote className="text-sm leading-relaxed text-foreground">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <cite className="block text-sm font-semibold not-italic">{item.name}</cite>
                  <span className="text-xs text-foreground-muted">{item.role}</span>
                </figcaption>
              </figure>
            </InteractiveCard>
          ))}
        </ul>
      </div>
    </section>
  );
};
