"use client"

import { useEffect, useState } from "react"

/**
 * SSR-safe `prefers-reduced-motion` reader.
 * Framer Motion ships its own hook, but this one returns a plain boolean that
 * is also usable to skip non-Framer effects (video autoplay, parallax, counters).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReduced(query.matches)

    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}
