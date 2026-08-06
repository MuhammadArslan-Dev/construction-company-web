import type { Transition, Variants } from "framer-motion"

/**
 * Motion language for Meridian.
 *
 * One easing curve, three durations. Everything on the site is composed from
 * these so the whole product moves with a single, deliberate rhythm.
 */

/** Custom cubic-bezier — a slow, confident settle. Never bouncy. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const DURATION = {
  fast: 0.35,
  base: 0.65,
  slow: 0.95,
  cinematic: 1.4,
} as const

export const transition: Record<keyof typeof DURATION, Transition> = {
  fast: { duration: DURATION.fast, ease: EASE_LUXE },
  base: { duration: DURATION.base, ease: EASE_LUXE },
  slow: { duration: DURATION.slow, ease: EASE_LUXE },
  cinematic: { duration: DURATION.cinematic, ease: EASE_LUXE },
}

/** Default viewport trigger: fire once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition.base },
}

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transition.base },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
}

/** Image reveal: the mask slides away rather than the image fading. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: transition.cinematic,
  },
}

export function stagger(childDelay = 0.08, initialDelay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: childDelay,
        delayChildren: initialDelay,
      },
    },
  }
}

/** Per-character/word entrance used by the hero headline. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE_LUXE },
  },
}
