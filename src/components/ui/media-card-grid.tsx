import { InteractiveCard } from "@/components/ui/interactive-card";
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
        <InteractiveCard
          key={item.title}
          delayIn={index * 80}
          className="overflow-hidden rounded-card border border-transparent transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent"
        >
          <figure>
            <MediaPlaceholder className="aspect-[4/3] w-full" />
            <figcaption className="p-4">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
            </figcaption>
          </figure>
        </InteractiveCard>
      ))}
    </ul>
  );
};
