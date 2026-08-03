import { Inview } from "@/components/animation/springs/in-view";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export interface CaptionedMediaGridProps {
  items: string[];
  columns?: 2 | 3 | 4;
  video?: boolean;
  invert?: boolean;
}

const playIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const CaptionedMediaGrid = ({ items, columns = 4, video = false, invert = false }: CaptionedMediaGridProps) => {
  const colClass =
    columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  const captionClass = invert ? "text-foreground-inverted" : "text-foreground";

  return (
    <ul className={`grid gap-6 ${colClass}`}>
      {items.map((caption, index) => (
        <Inview
          key={caption}
          tag="li"
          mode="once"
          delayIn={index * 70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
        >
          <figure>
            <MediaPlaceholder
              className="aspect-[4/3] w-full"
              icon={video ? playIcon : undefined}
            />
            <figcaption className={`mt-3 text-sm font-medium ${captionClass}`}>{caption}</figcaption>
          </figure>
        </Inview>
      ))}
    </ul>
  );
};
