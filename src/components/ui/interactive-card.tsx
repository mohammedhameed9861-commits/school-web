import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import type { Tags } from "@/types/springs";

export interface InteractiveCardProps {
  tag?: Tags;
  delayIn?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared card motion: reveal-on-scroll (once) plus a physical lift + scale on
 * hover. Used by every card grid so hover/entrance motion stays consistent
 * across the whole site.
 */
export const InteractiveCard = ({ tag = "li", delayIn = 0, className, children }: InteractiveCardProps) => {
  return (
    <Inview
      tag={tag}
      mode="once"
      delayIn={delayIn}
      from={{ opacity: 0, y: 28 }}
      to={{ opacity: 1, y: 0 }}
    >
      <Hover
        tag="div"
        from={{ y: 0, scale: 1 }}
        to={{ y: -10, scale: 1.03 }}
        config={{ tension: 320, friction: 22 }}
        className={className}
      >
        {children}
      </Hover>
    </Inview>
  );
};
