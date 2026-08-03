import { InteractiveCard } from "@/components/ui/interactive-card";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export interface ArticleCardProps {
  categoryLabel: string;
  title: string;
  excerpt: string;
  delayIn?: number;
}

export const ArticleCard = ({ categoryLabel, title, excerpt, delayIn = 0 }: ArticleCardProps) => {
  return (
    <InteractiveCard
      tag="article"
      delayIn={delayIn}
      className="overflow-hidden rounded-card border border-border bg-surface shadow-glow-navy transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent"
    >
      <MediaPlaceholder className="aspect-[16/9] w-full" />
      <div className="p-5">
        <span className="rounded-pill bg-gradient-to-r from-action-accent-light to-action-accent-mid px-3 py-1 text-xs font-semibold text-action-accent-foreground">
          {categoryLabel}
        </span>
        <h3 className="mt-3 text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{excerpt}</p>
      </div>
    </InteractiveCard>
  );
};
