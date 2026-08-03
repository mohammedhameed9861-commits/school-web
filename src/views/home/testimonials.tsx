import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

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
            <Inview
              key={item.name}
              tag="li"
              mode="once"
              delayIn={index * 100}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              className="rounded-card bg-surface p-6"
            >
              <figure>
                <blockquote className="text-sm leading-relaxed text-foreground">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <cite className="block text-sm font-semibold not-italic">{item.name}</cite>
                  <span className="text-xs text-foreground-muted">{item.role}</span>
                </figcaption>
              </figure>
            </Inview>
          ))}
        </ul>
      </div>
    </section>
  );
};
