import { InteractiveCard } from "@/components/ui/interactive-card";

export interface NumberedItem {
  title: string;
  description: string;
}

export interface NumberedCardGridProps {
  items: NumberedItem[];
  columns?: 2 | 3;
  /** Set false to drop the 01/02/… badge and render plain cards. Defaults to true. */
  numbered?: boolean;
}

export const NumberedCardGrid = ({ items, columns = 3, numbered = true }: NumberedCardGridProps) => {
  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid gap-6 ${colClass}`}>
      {items.map((item, index) => (
        <InteractiveCard
          key={item.title}
          delayIn={index * 80}
          className="rounded-card border border-border bg-surface-muted p-6 shadow-glow-gold transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent"
        >
          {numbered && (
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-control bg-gradient-to-br from-action-accent-light via-action-accent to-action-accent-hover text-sm font-bold text-action-accent-foreground shadow-glow-gold"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <h3 className={numbered ? "mt-4 text-lg font-semibold" : "text-lg font-semibold"}>{item.title}</h3>
          <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
        </InteractiveCard>
      ))}
    </ul>
  );
};
