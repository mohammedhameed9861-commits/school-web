import { Inview } from "@/components/animation/springs/in-view";

export interface NumberedItem {
  title: string;
  description: string;
}

export interface NumberedCardGridProps {
  items: NumberedItem[];
  columns?: 2 | 3;
}

export const NumberedCardGrid = ({ items, columns = 3 }: NumberedCardGridProps) => {
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
          className="rounded-card border border-border bg-surface-muted p-6"
        >
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-control bg-action-primary text-sm font-bold text-action-primary-foreground"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
        </Inview>
      ))}
    </ul>
  );
};
