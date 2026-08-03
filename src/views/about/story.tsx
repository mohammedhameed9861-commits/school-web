import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Inview } from "@/components/animation/springs/in-view";

export const Story = async () => {
  const t = await getTranslations("about.story");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      aria-labelledby="story-title"
      className="relative z-10 rounded-t-[2rem] bg-background py-20 sm:rounded-t-[3rem] sm:py-24"
    >
      <div className="mx-auto grid max-w-[70rem] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <MediaPlaceholder className="aspect-[4/3] w-full" />
        <div>
          <SectionHeading
            id="story-title"
            align="start"
            eyebrow={t("eyebrow")}
            title={t("title")}
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
