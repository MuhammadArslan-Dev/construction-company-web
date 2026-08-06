"use client"

import * as React from "react"
import { animate, useInView } from "framer-motion"

import { DURATION, EASE_OUT } from "@/lib/motion"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type CounterProps = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

/**
 * Count-up statistic.
 *
 * Writes to `textContent` through a ref instead of React state — a 60fps
 * setState loop would re-render the entire stats band on every frame. Tabular
 * figures keep the number from jittering as digits change width.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = DURATION.cinematic + 0.4,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })
  const prefersReduced = usePrefersReducedMotion()

  const format = React.useCallback(
    (input: number) =>
      `${prefix}${input.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`,
    [prefix, suffix, decimals]
  )

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    if (prefersReduced) {
      node.textContent = format(value)
      return
    }

    if (!inView) return

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = format(latest)
      },
    })

    return () => controls.stop()
  }, [inView, value, duration, format, prefersReduced])

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {format(0)}
    </span>
  )
}
