"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Section } from "@/components/shared/section"
import { testimonials } from "@/data/testimonials"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [index, setIndex] = React.useState(0)
  const active = testimonials[index]

  const go = React.useCallback((delta: number) => {
    setIndex((current) => {
      const next = current + delta
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }, [])

  return (
    <Section id="testimonials" tone="muted">
      <Container>
        <Eyebrow index="06">Client voices</Eyebrow>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Quote
              aria-hidden
              className="text-gold-500 size-10 rotate-180 opacity-40"
            />

            <div
              className="mt-8 min-h-[16rem] sm:min-h-[14rem]"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: EASE_LUXE }}
                >
                  <p className="font-display text-foreground text-[clamp(1.35rem,1rem+1.4vw,2.15rem)] leading-[1.32] font-medium text-balance">
                    {active.quote}
                  </p>

                  <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <cite className="text-foreground text-base font-semibold not-italic">
                      {active.author}
                    </cite>
                    <span aria-hidden className="bg-gold-500 h-px w-6" />
                    <span className="text-muted-foreground text-sm">
                      {active.role}, {active.company}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls ------------------------------------------------ */}
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="border-border text-foreground hover:border-foreground/40 focus-visible:ring-ring inline-flex size-12 items-center justify-center rounded-xs border transition-colors focus-visible:ring-2"
              >
                <ArrowLeft aria-hidden className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="border-border text-foreground hover:border-foreground/40 focus-visible:ring-ring inline-flex size-12 items-center justify-center rounded-xs border transition-colors focus-visible:ring-2"
              >
                <ArrowRight aria-hidden className="size-4" />
              </button>

              <span className="text-muted-foreground ml-2 font-mono text-xs tabular">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Selector list ---------------------------------------------- */}
          <ul className="border-hairline lg:col-span-4 lg:border-l lg:pl-10">
            {testimonials.map((testimonial, itemIndex) => (
              <li key={testimonial.author}>
                <button
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-current={itemIndex === index}
                  className={cn(
                    "border-hairline focus-visible:ring-ring w-full border-b py-5 text-left transition-colors focus-visible:ring-2",
                    itemIndex === index
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        "h-px transition-all duration-500 ease-[var(--ease-luxe)]",
                        itemIndex === index
                          ? "bg-gold-500 w-8"
                          : "bg-border w-4"
                      )}
                    />
                    <span className="text-sm font-medium">
                      {testimonial.company}
                    </span>
                  </span>
                  <span className="text-muted-foreground mt-1.5 block pl-11 text-xs">
                    {testimonial.project}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
