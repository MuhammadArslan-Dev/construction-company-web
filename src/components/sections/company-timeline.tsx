"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { timeline } from "@/data/company"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { EASE_LUXE, viewportOnce } from "@/lib/motion"

/**
 * Twenty-five-year timeline.
 *
 * A single gold spine is drawn by scroll progress and each year fades in as
 * the line reaches it — the same device as the homepage process band, reused
 * deliberately so the two read as one system rather than two ideas.
 */
export function CompanyTimeline() {
  const ref = React.useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[7px] w-px bg-white/12 md:left-[calc(9rem+7px)]"
      >
        <motion.div
          className="bg-gold-500 absolute inset-x-0 top-0 h-full origin-top"
          style={prefersReduced ? { scaleY: 1 } : { scaleY }}
        />
      </div>

      <ol className="space-y-14 lg:space-y-20">
        {timeline.map((event) => (
          <motion.li
            key={event.year}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE_LUXE }}
            className="relative pl-10 md:grid md:grid-cols-[9rem_1fr] md:gap-12 md:pl-0"
          >
            <span
              aria-hidden
              className="bg-background border-gold-500 absolute top-1.5 left-0 z-10 size-4 rounded-full border-2 md:left-[9rem]"
            />

            <p className="font-display text-gold-500 text-2xl leading-none font-bold tabular md:text-right md:text-3xl">
              {event.year}
            </p>

            <div className="mt-4 md:mt-0 md:pl-12">
              <h3 className="font-display text-xl font-semibold text-white lg:text-2xl">
                {event.title}
              </h3>
              <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
                {event.description}
              </p>
              {event.metric ? (
                <p className="text-eyebrow mt-5 inline-block rounded-xs border border-white/12 px-3 py-1.5 text-white/60 uppercase">
                  {event.metric}
                </p>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
