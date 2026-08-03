import { SpringTrigger } from "@/components/animation/springs/spring-trigger";

/**
 * Decorative multi-speed parallax layer for dark hero/banner sections — two
 * blurred colour orbs drifting at different rates as the section scrolls
 * past. Purely decorative (`aria-hidden`); never affects layout.
 */
export const ParallaxOrbs = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <SpringTrigger
      tag="div"
      innerTag="div"
      mode="scrub"
      start="top bottom"
      end="bottom top"
      from={{ y: -70, x: -10 }}
      to={{ y: 90, x: 20 }}
      config={{ duration: 1 }}
      className="absolute -left-20 -top-20 h-80 w-80 sm:h-96 sm:w-96"
      innerClassName="block h-full w-full rounded-pill bg-action-accent/25 blur-3xl"
    />
    <SpringTrigger
      tag="div"
      innerTag="div"
      mode="scrub"
      start="top bottom"
      end="bottom top"
      from={{ y: 50, x: 15 }}
      to={{ y: -110, x: -15 }}
      config={{ duration: 1 }}
      className="absolute -right-16 top-1/4 h-64 w-64 sm:h-80 sm:w-80"
      innerClassName="block h-full w-full rounded-pill bg-action-primary-light/35 blur-3xl"
    />
    <SpringTrigger
      tag="div"
      innerTag="div"
      mode="scrub"
      start="top bottom"
      end="bottom top"
      from={{ y: -30 }}
      to={{ y: 60 }}
      config={{ duration: 1 }}
      className="absolute bottom-0 left-1/3 h-56 w-56 sm:h-72 sm:w-72"
      innerClassName="block h-full w-full rounded-pill bg-action-accent-mid/20 blur-3xl"
    />
  </div>
);
