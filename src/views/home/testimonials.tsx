import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { getTestimonials } from "@/sanity/queries";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string | null;
}

export const Testimonials = async () => {
  const t = await getTranslations("home.testimonials");
  const locale = (await getLocale()) as "ar" | "en";
  const items = (await getTestimonials(locale)) || (t.raw("items") as Testimonial[]);

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
                <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  {item.avatarUrl && (
                    <Image
                      src={item.avatarUrl}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-pill object-cover"
                    />
                  )}
                  <div>
                    <cite className="block text-sm font-semibold not-italic">{item.name}</cite>
                    <span className="text-xs text-foreground-muted">{item.role}</span>
                  </div>
                </figcaption>
              </figure>
            </InteractiveCard>
          ))}
        </ul>
      </div>
    </section>
  );
};
