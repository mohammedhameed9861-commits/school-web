import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";
import { getPageSection } from "@/sanity/queries";

export const Story = async () => {
  const t = await getTranslations("about.story");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("about.story", locale);
  const eyebrow = cms?.eyebrow || t("eyebrow");
  const title = cms?.title || t("title");
  const paragraphs = cms?.paragraphs || (t.raw("paragraphs") as string[]);

  return (
    <section
      aria-labelledby="story-title"
      className="bg-background py-20"
    >
      <div className="mx-auto grid max-w-[70rem] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card">
          <Image src="/assets/photos/graduation-2026.jpg" alt={title} fill className="object-cover" />
        </div>
        <div>
          <SectionHeading
            id="story-title"
            align="start"
            eyebrow={eyebrow}
            title={title}
          />
          <Inview
            tag="div"
            mode="once"
            delayIn={150}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-foreground-muted"
          >
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Inview>
        </div>
      </div>
    </section>
  );
};
