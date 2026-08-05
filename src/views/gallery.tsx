import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { CaptionedMediaGrid } from "@/components/ui/captioned-media-grid";
import { CategorySection } from "@/views/gallery/category-section";

interface Category {
  title: string;
  subtitle: string;
  items: string[];
}

// Real photos per gallery category, indexed to match `messages/*.json` →
// gallery.categories[i].items order: Facilities, Classrooms, Activities, Events.
const CATEGORY_IMAGES: (string | undefined)[][] = [
  [undefined, "/assets/photos/campus-courtyard.jpg", undefined],
  ["/assets/photos/classroom-intermediate.jpg", "/assets/photos/classroom-preparatory.jpg", undefined, undefined],
  ["/assets/photos/science-club-telescope.jpg", undefined, "/assets/photos/arts-club.jpg", undefined],
  [undefined, undefined, "/assets/photos/graduation-2026.jpg", undefined],
];

/** "Gallery" chapter of the single-page site (ADR-0022) — mounted at `#gallery`. */
export const GalleryView = async () => {
  const t = await getTranslations("gallery");
  const heroT = await getTranslations("gallery.hero");
  const videoT = await getTranslations("gallery.videos");
  const categories = t.raw("categories") as Category[];
  const videoItems = videoT.raw("items") as string[];

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="gallery-title" eyebrow={heroT("eyebrow")} title={heroT("title")} subtitle={heroT("subtitle")} />
      </div>

      {categories.map((category, index) => (
        <CategorySection
          key={category.title}
          id={`gallery-category-${index}`}
          title={category.title}
          subtitle={category.subtitle}
          items={category.items}
          images={CATEGORY_IMAGES[index]}
          tone={index % 2 === 0 ? "default" : "muted"}
        />
      ))}

      <section aria-labelledby="gallery-videos-title" className="bg-surface-inverted py-16 text-foreground-inverted">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
          <SectionHeading
            id="gallery-videos-title"
            eyebrow={videoT("eyebrow")}
            title={videoT("title")}
            subtitle={videoT("subtitle")}
            invert
          />
          <div className="mt-10">
            <CaptionedMediaGrid items={videoItems} columns={3} video invert />
          </div>
        </div>
      </section>
    </>
  );
};
