import { SectionHeading } from "@/components/ui/section-heading";
import { CaptionedMediaGrid } from "@/components/ui/captioned-media-grid";

export interface CategorySectionProps {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  tone?: "default" | "muted";
  /** Real photo per item, indexed the same as `items`. Falls back to the gradient placeholder when absent. */
  images?: (string | undefined)[];
}

export const CategorySection = ({ id, title, subtitle, items, tone = "default", images }: CategorySectionProps) => {
  const bg = tone === "muted" ? "bg-surface-muted" : "bg-background";

  return (
    <section aria-labelledby={id} className={`${bg} py-16`}>
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <SectionHeading id={id} align="start" title={title} subtitle={subtitle} />
        <div className="mt-10">
          <CaptionedMediaGrid items={items} images={images} />
        </div>
      </div>
    </section>
  );
};
