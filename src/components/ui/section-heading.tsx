import { Inview } from "@/components/animation/springs/in-view";
import TextEngine from "spring-text-engine";

export interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  subtitleBold?: boolean;
  align?: "center" | "start";
  invert?: boolean;
  id?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  subtitleBold = false,
  align = "center",
  invert = false,
  id,
}: SectionHeadingProps) => {
  const alignClass = align === "center" ? "text-center justify-center mx-auto" : "text-start justify-start";
  const subtitleColor = invert ? "text-foreground-inverted/75" : "text-foreground-muted";
  const itemsClass = align === "center" ? "items-center" : "items-start";

  return (
    <div className={`flex max-w-2xl flex-col ${itemsClass} ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Inview
          tag="span"
          mode="once"
          from={{ opacity: 0, y: 12, scale: 0.9 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
          className="rounded-pill bg-gradient-to-r from-action-accent-light via-action-accent to-action-accent-mid px-4 py-1 text-xs font-bold uppercase tracking-wide text-action-accent-foreground shadow-glow-gold"
        >
          {eyebrow}
        </Inview>
      )}
      {title && (
        <TextEngine
          tag="h2"
          id={id}
          mode="once"
          className={`leading-display mt-3 text-3xl font-bold sm:text-4xl ${alignClass}`}
          wordIn={{ y: "0%", opacity: 1, scale: 1 }}
          wordOut={{ y: "50%", opacity: 0, scale: 0.9 }}
          wordStagger={45}
          wordConfig={{ tension: 190, friction: 22 }}
          overflow
        >
          {title}
        </TextEngine>
      )}
      {subtitle && (
        <Inview
          tag="p"
          mode="once"
          delayIn={200}
          from={{ opacity: 0, y: 12 }}
          to={{ opacity: 1, y: 0 }}
          className={`mt-4 text-base ${subtitleColor}${subtitleBold ? " font-bold" : ""}`}
        >
          {subtitle}
        </Inview>
      )}
    </div>
  );
};
