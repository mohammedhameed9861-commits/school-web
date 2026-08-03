import { Inview } from "@/components/animation/springs/in-view";
import TextEngine from "spring-text-engine";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  invert?: boolean;
  id?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
  id,
}: SectionHeadingProps) => {
  const alignClass = align === "center" ? "text-center justify-center mx-auto" : "text-start justify-start";
  const eyebrowColor = invert ? "text-action-accent" : "text-action-accent";
  const subtitleColor = invert ? "text-foreground-inverted/75" : "text-foreground-muted";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 12 }}
          to={{ opacity: 1, y: 0 }}
          className={`text-sm font-semibold uppercase tracking-wide ${eyebrowColor}`}
        >
          {eyebrow}
        </Inview>
      )}
      <TextEngine
        tag="h2"
        id={id}
        mode="once"
        className={`leading-display mt-2 text-3xl font-bold sm:text-4xl ${alignClass}`}
        lineIn={{ y: "0%", opacity: 1 }}
        lineOut={{ y: "100%", opacity: 0 }}
        lineStagger={80}
        overflow
      >
        {title}
      </TextEngine>
      {subtitle && (
        <Inview
          tag="p"
          mode="once"
          delayIn={150}
          from={{ opacity: 0, y: 12 }}
          to={{ opacity: 1, y: 0 }}
          className={`mt-4 text-base ${subtitleColor}`}
        >
          {subtitle}
        </Inview>
      )}
    </div>
  );
};
