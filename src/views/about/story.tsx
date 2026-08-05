import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";

export const Story = async () => {
  const t = await getTranslations("about.story");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      aria-labelledby="story-title"
      className="bg-background py-20"
    >
      <div className="mx-auto grid max-w-[70rem] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card">
          <Image src="/assets/photos/campus-courtyard.jpg" alt={t("title")} fill className="object-cover" />
        </div>
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
