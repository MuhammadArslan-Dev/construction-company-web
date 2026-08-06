"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type ParallaxProps = {
  children: React.ReactNode
  /** Total travel in pixels across the element's full scroll pass. */
  distance?: number
  direction?: "up" | "down"
  className?: string
}

/**
 * Scroll-linked translation.
 *
 * Deliberately subtle — 60–120px of travel. The moment parallax becomes
 * noticeable it reads as a template; at this amplitude it just adds depth.
 */
export function Parallax({
  children,
  distance = 80,
  direction = "up",
  className,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const travel = direction === "up" ? -distance : distance
  const y = useTransform(scrollYProgress, [0, 1], [-travel / 2, travel / 2])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}

type ParallaxMediaProps = {
  children: React.ReactNode
  className?: string
  /** How far past the frame the media over-scales, as a ratio. */
  overscan?: number
  distance?: number
}

/**
 * Parallax for full-bleed imagery. The child is scaled beyond its frame so the
 * translation never exposes an edge, and the frame clips the overflow.
 */
export function ParallaxMedia({
  children,
  className,
  overscan = 1.18,
  distance = 120,
}: ParallaxMediaProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={
          prefersReduced ? undefined : { y, scale: overscan, height: "100%" }
        }
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
