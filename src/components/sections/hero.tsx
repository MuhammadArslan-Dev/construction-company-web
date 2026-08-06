"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

import { Counter } from "@/components/motion/counter"
import { TextReveal } from "@/components/motion/text-reveal"
import { HeroMedia } from "@/components/sections/hero-media"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { heroStats } from "@/data/stats"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE_LUXE } from "@/lib/motion"

/**
 * Full-screen cinematic hero.
 *
 * All background/video state lives in <HeroMedia />, so nothing in this
 * component re-renders while the entrance sequence is playing.
 *
 * Vertical padding is driven by viewport *height* rather than width — a 1440px
 * laptop with a 700px-tall window needs the tighter rhythm just as much as a
 * phone does, and width-based breakpoints cannot express that.
 */
export function Hero() {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className="dark bg-ink-950 relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <HeroMedia />

      <Container className="pt-24 pb-10 [@media(min-height:860px)]:pt-40 [@media(min-height:860px)]:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_LUXE, delay: 0.15 }}
          className="text-eyebrow flex items-center gap-3 text-white/70 uppercase"
        >
          <span aria-hidden className="bg-gold-500 h-px w-8" />
          International Construction &amp; Engineering
        </motion.p>

        <TextReveal
          as="h1"
          immediate
          delay={0.3}
          className="font-display mt-7 max-w-[18ch] text-[clamp(2.6rem,1.8rem+3.4vw,5.5rem)] leading-[0.96] font-extrabold tracking-[-0.04em] text-white"
        >
          <>
            Building{" "}
            <span className="whitespace-nowrap">
              <span className="text-gold-500">Tomorrow</span>.
            </span>
          </>
          <>Building Better.</>
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_LUXE, delay: 0.85 }}
          className="text-lead mt-7 max-w-xl text-pretty text-white/75"
        >
          We design and construct extraordinary spaces that inspire generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_LUXE, delay: 1 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button asChild size="xl" variant="gold">
            <Link href="/contact?intent=quote">
              Start Your Project
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="xl" variant="onImage">
            <Link href="/projects">
              <Play aria-hidden />
              View Portfolio
            </Link>
          </Button>
        </motion.div>

        {/* Statistics ---------------------------------------------------- */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_LUXE, delay: 1.2 }}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-7 sm:grid-cols-3 lg:grid-cols-5 [@media(min-height:860px)]:mt-16 [@media(min-height:860px)]:pt-10"
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display block text-[clamp(1.75rem,1.1rem+1.9vw,2.5rem)] leading-none font-bold text-white">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </span>
                <span className="text-eyebrow mt-2.5 block text-white/70 uppercase">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>

      {/* Scroll cue ------------------------------------------------------- */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="pointer-events-none absolute right-6 bottom-8 hidden flex-col items-center gap-3 lg:right-16 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] text-white/50 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-white/20">
          <motion.span
            className="bg-gold-500 absolute inset-x-0 top-0 block h-1/2"
            animate={prefersReduced ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  )
}
