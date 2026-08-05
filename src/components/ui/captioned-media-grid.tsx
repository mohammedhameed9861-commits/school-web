import Image from "next/image";

import { InteractiveCard } from "@/components/ui/interactive-card";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export interface CaptionedMediaGridProps {
  items: string[];
  columns?: 2 | 3 | 4;
  video?: boolean;
  invert?: boolean;
  /** Real photo per item, indexed the same as `items`. Falls back to the gradient placeholder when absent. */
  images?: (string | undefined)[];
}

const playIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const CaptionedMediaGrid = ({ items, columns = 4, video = false, invert = false, images }: CaptionedMediaGridProps) => {
  const colClass =
    columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  const captionClass = invert ? "text-foreground-inverted" : "text-foreground";

  return (
    <ul className={`grid gap-6 ${colClass}`}>
      {items.map((caption, index) => {
        const image = images?.[index];
        return (
          <InteractiveCard
            key={caption}
            delayIn={index * 70}
            className="overflow-hidden rounded-card border border-transparent transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent"
          >
            <figure>
              {image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={image} alt={caption} fill className="object-cover" />
                </div>
              ) : (
                <MediaPlaceholder
                  className="aspect-[4/3] w-full"
                  icon={video ? playIcon : undefined}
                />
              )}
              <figcaption className={`mt-3 text-sm font-medium ${captionClass}`}>{caption}</figcaption>
            </figure>
          </InteractiveCard>
        );
      })}
    </ul>
  );
};
