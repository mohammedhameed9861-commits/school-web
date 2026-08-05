import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Inview } from "@/components/animation/springs/in-view";

interface Facility {
  title: string;
  description: string;
}

// Real photo per facility, indexed to match `messages/*.json` →
// home.facilities.items order: labs, classrooms, sports fields, theatre, cafeteria.
const FACILITY_IMAGES: (string | undefined)[] = [
  "/assets/photos/physics-lab.jpg",
  "/assets/photos/classroom-intermediate.jpg",
  "/assets/photos/campus-courtyard.jpg",
  undefined,
  undefined,
];

export const Facilities = async () => {
  const t = await getTranslations("home.facilities");
  const items = t.raw("items") as Facility[];

  return (
    <section aria-labelledby="facilities-title" className="bg-background py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading
          id="facilities-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const image = FACILITY_IMAGES[index];
            return (
              <Inview
                key={item.title}
                tag="li"
                mode="once"
                delayIn={index * 80}
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
              >
                <figure>
                  {image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card">
                      <Image src={image} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <MediaPlaceholder className="aspect-[4/3] w-full" />
                  )}
                  <figcaption className="mt-4">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
                  </figcaption>
                </figure>
              </Inview>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
