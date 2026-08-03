import { Inview } from "@/components/animation/springs/in-view";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export interface ArticleCardProps {
  categoryLabel: string;
  title: string;
  excerpt: string;
  delayIn?: number;
}

export const ArticleCard = ({ categoryLabel, title, excerpt, delayIn = 0 }: ArticleCardProps) => {
  return (
    <Inview
      tag="article"
      mode="once"
      delayIn={delayIn}
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-card border border-border bg-surface"
    >
      <MediaPlaceholder className="aspect-[16/9] w-full" />
      <div className="p-5">
        <span className="rounded-pill bg-surface-muted px-3 py-1 text-xs font-semibold text-action-primary">
          {categoryLabel}
        </span>
        <h3 className="mt-3 text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{excerpt}</p>
      </div>
    </Inview>
  );
};
