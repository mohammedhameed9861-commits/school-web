"use client";

import { useEffect } from "react";
import { animated, to, useSpring } from "@react-spring/web";

/**
 * A soft gold glow that follows the cursor — viewport-relative (not
 * container-relative), so it works as a self-contained client leaf with no
 * ref coordination needed from the Server Component hero that renders it.
 * Purely decorative; never intercepts pointer events.
 */
export const CursorGlow = () => {
  const [style, api] = useSpring(() => ({
    x: 50,
    y: 35,
    config: { tension: 90, friction: 26 },
  }));

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      api.start({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [api]);

  return (
    <animated.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background: to(
          [style.x, style.y],
          (x, y) => `radial-gradient(500px circle at ${x}% ${y}%, var(--action-accent) 0%, transparent 65%)`,
        ),
        opacity: 0.18,
      }}
    />
  );
};
