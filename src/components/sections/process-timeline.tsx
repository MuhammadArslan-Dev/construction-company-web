"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Container } from "@/components/shared/container"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { processSteps } from "@/data/process"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { EASE_LUXE, viewportOnce } from "@/lib/motion"

/**
 * Animated delivery timeline.
 *
 * A single gold spine is drawn by scroll progress through the section, and each
 * step fades in as the line reaches it. `scaleY` on a transform-only element
 * keeps the whole effect off the main thread.
 */
export function ProcessTimeline() {
  const ref = React.useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="process" tone="ink">
      <Container>
        <SectionHeading
          split
          index="05"
          eyebrow="How we work"
          title="Six stages. No handoffs."
          lead="The same organisation carries a project from feasibility to the twelve-month aftercare visit. Nothing is transferred to a third party at the point where accountability usually disappears."
        />

        <div ref={ref} className="relative mt-20 lg:mt-28">
          {/* Spine ---------------------------------------------------- */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.4375rem] w-px bg-white/12 lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              className="bg-gold-500 absolute inset-x-0 top-0 h-full origin-top"
              style={prefersReduced ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="space-y-14 lg:space-y-24">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const flip = index % 2 === 1

              return (
                <li key={step.index} className="relative">
                  <div
                    className={
                      flip
                        ? "grid gap-8 lg:grid-cols-2 lg:gap-20"
                        : "grid gap-8 lg:grid-cols-2 lg:gap-20"
                    }
                  >
                    {/* Node marker */}
                    <span
                      aria-hidden
                      className="bg-background border-gold-500 absolute top-1.5 left-4 z-10 size-4 rounded-full border-2 lg:left-1/2 lg:-translate-x-1/2"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.7, ease: EASE_LUXE }}
                      className={
                        flip
                          ? "pl-14 lg:order-2 lg:pl-20"
                          : "pl-14 lg:pr-20 lg:pl-0 lg:text-right"
                      }
                    >
                      <div
                        className={
                          flip
                            ? "flex items-center gap-4"
                            : "flex items-center gap-4 lg:flex-row-reverse"
                        }
                      >
                        <span className="font-mono text-sm text-white/35 tabular">
                          {step.index}
                        </span>
                        <span
                          aria-hidden
                          className="border-gold-500/40 text-gold-500 inline-flex size-11 items-center justify-center border"
                        >
                          <Icon className="size-5" />
                        </span>
                      </div>

                      <h3 className="font-display mt-6 text-2xl font-bold text-white lg:text-3xl">
                        {step.title}
                      </h3>

                      <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed lg:ml-auto">
                        {step.description}
                      </p>

                      <ul
                        className={
                          flip
                            ? "mt-6 flex flex-wrap gap-2"
                            : "mt-6 flex flex-wrap gap-2 lg:justify-end"
                        }
                      >
                        {step.deliverables.map((deliverable) => (
                          <li
                            key={deliverable}
                            className="rounded-xs border border-white/12 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white/60 uppercase"
                          >
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Empty counterweight column keeps the spine centred. */}
                    <div aria-hidden className={flip ? "lg:order-1" : ""} />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
