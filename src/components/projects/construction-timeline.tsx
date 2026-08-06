"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { formatDate } from "@/lib/format"
import type { ProjectMilestone } from "@/types"

/**
 * Construction timeline. A horizontal spine on desktop, vertical on mobile —
 * a six-node horizontal track is unreadable below about 900px.
 *
 * `motion.li` rather than the shared <RevealItem>, which renders a div: an
 * <ol> may only contain <li>, and wrapping each item in a div would break the
 * list semantics that make this readable to a screen reader.
 */
export function ConstructionTimeline({
  milestones,
}: {
  milestones: ProjectMilestone[]
}) {
  if (!milestones.length) return null

  return (
    <div className="relative">
      <div
        aria-hidden
        className="bg-border absolute top-2 bottom-2 left-[7px] w-px lg:top-[7px] lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
      />

      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger(0.08)}
        className="grid gap-10 lg:grid-cols-6 lg:gap-6"
      >
        {milestones.map((milestone) => (
          <motion.li
            key={milestone.label}
            variants={fadeUp}
            className="relative pl-10 lg:pt-10 lg:pl-0"
          >
            <span
              aria-hidden
              className="bg-background border-gold-500 absolute top-1 left-0 size-4 rounded-full border-2 lg:top-0"
            />
            <time
              dateTime={milestone.date}
              className="text-accent-text font-mono text-xs tracking-[0.14em] uppercase tabular"
            >
              {formatDate(milestone.date, { month: "short", year: "numeric" })}
            </time>
            <h3 className="font-display text-foreground mt-3 text-lg font-semibold">
              {milestone.label}
            </h3>
            {milestone.description ? (
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {milestone.description}
              </p>
            ) : null}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}
