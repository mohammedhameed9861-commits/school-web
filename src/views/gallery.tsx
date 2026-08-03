import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaptionedMediaGrid } from "@/components/ui/captioned-media-grid";
import { CategorySection } from "@/views/gallery/category-section";
import { RegisterCta } from "@/views/home/register-cta";

interface Category {
  title: string;
  subtitle: string;
  items: string[];
}

export const GalleryView = async () => {
  const t = await getTranslations("gallery");
  const heroT = await getTranslations("gallery.hero");
  const videoT = await getTranslations("gallery.videos");
  const categories = t.raw("categories") as Category[];
  const videoItems = videoT.raw("items") as string[];

  return (
    <main>
      <PageHero eyebrow={heroT("eyebrow")} title={heroT("title")} subtitle={heroT("subtitle")} />

      {categories.map((category, index) => (
        <CategorySection
          key={category.title}
          id={`gallery-category-${index}`}
          title={category.title}
          subtitle={category.subtitle}
          items={category.items}
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

      <RegisterCta />
    </main>
  );
};
