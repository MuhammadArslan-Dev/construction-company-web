"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"

import {
  fadeIn,
  fadeRight,
  fadeUp,
  fadeUpLarge,
  scaleIn,
  stagger,
  viewportOnce,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const presets = {
  fade: fadeIn,
  up: fadeUp,
  "up-lg": fadeUpLarge,
  right: fadeRight,
  scale: scaleIn,
} satisfies Record<string, Variants>

export type RevealPreset = keyof typeof presets

type RevealProps = React.ComponentProps<typeof motion.div> & {
  preset?: RevealPreset
  delay?: number
  as?: React.ElementType
}

/**
 * Scroll-triggered entrance. Fires once, slightly before the element centres,
 * so content is already settled by the time the reader arrives at it.
 */
export function Reveal({
  preset = "up",
  delay = 0,
  className,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={presets[preset]}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type RevealGroupProps = React.ComponentProps<typeof motion.div> & {
  /** Seconds between each child's entrance. */
  step?: number
  delay?: number
}

/**
 * Parent orchestrator. Children must be `<RevealItem>` (or any element using
 * the shared `hidden`/`visible` variant names) — the stagger cascades from here.
 */
export function RevealGroup({
  step = 0.08,
  delay = 0,
  className,
  children,
  ...props
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(step, delay)}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type RevealItemProps = React.ComponentProps<typeof motion.div> & {
  preset?: RevealPreset
}

export function RevealItem({
  preset = "up",
  className,
  children,
  ...props
}: RevealItemProps) {
  return (
    <motion.div variants={presets[preset]} className={cn(className)} {...props}>
      {children}
    </motion.div>
  )
}
