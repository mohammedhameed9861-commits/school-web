import { Inview } from "@/components/animation/springs/in-view";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export interface MediaItem {
  title: string;
  description: string;
}

export interface MediaCardGridProps {
  items: MediaItem[];
  columns?: 2 | 3;
}

export const MediaCardGrid = ({ items, columns = 3 }: MediaCardGridProps) => {
  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid gap-6 ${colClass}`}>
      {items.map((item, index) => (
        <Inview
          key={item.title}
          tag="li"
          mode="once"
          delayIn={index * 80}
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
        >
          <figure>
            <MediaPlaceholder className="aspect-[4/3] w-full" />
            <figcaption className="mt-4">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
            </figcaption>
          </figure>
        </Inview>
      ))}
    </ul>
  );
};
