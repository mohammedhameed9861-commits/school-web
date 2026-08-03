"use client";

import { useEffect, useMemo, useState } from "react";
import { easings, useSpring } from "@react-spring/web";

import { useDynamicInView } from "@/hooks/animation/use-dynamic-in-view";

export interface AnimatedCounterProps {
  /** e.g. `"500+"`, `"98%"`, `"15+"` — prefix/number/suffix are parsed apart. */
  value: string;
  className?: string;
  delay?: number;
}

const parseValue = (raw: string) => {
  const match = raw.match(/^(\D*)([\d,]+)(\D*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  const [, prefix, numStr, suffix] = match;
  return { prefix, number: Number(numStr.replace(/,/g, "")), suffix };
};

/** Counts up from 0 to `value`'s number once the element scrolls into view. */
export const AnimatedCounter = ({ value, className, delay = 0 }: AnimatedCounterProps) => {
  const { prefix, number, suffix } = useMemo(() => parseValue(value), [value]);
  const [setNode, inView] = useDynamicInView();
  const [played, setPlayed] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) setPlayed(true);
  }, [inView]);

  useSpring({
    from: { n: 0 },
    to: { n: played ? number : 0 },
    delay,
    config: { duration: 1400, easing: easings.easeOutCubic },
    onChange: (result) => setDisplay(Math.floor(result.value.n as number)),
  });

  return (
    <span ref={setNode} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};
