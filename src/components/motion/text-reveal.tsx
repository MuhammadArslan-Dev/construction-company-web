"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { lineReveal, stagger, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

type TextRevealProps = {
  /**
   * One element per visual line, written as static JSX children:
   *
   *   <TextReveal>
   *     <>Building <span className="text-accent-gold">Tomorrow</span>.</>
   *     <>Building Better.</>
   *   </TextReveal>
   *
   * Children rather than a `lines` array on purpose — an inline array of JSX
   * would trip React's "unique key" validation at every call site.
   */
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  lineClassName?: string
  step?: number
  delay?: number
  /** Play immediately (hero) instead of waiting for the scroll viewport. */
  immediate?: boolean
}

/**
 * Masked line-by-line headline entrance.
 *
 * Each line sits inside `overflow: hidden` and starts translated fully below
 * its own box, so the type appears to rise out of the page rather than fade in.
 * This is the single most identity-defining motion on the site.
 */
export function TextReveal({
  children,
  as: Tag = "h2",
  className,
  lineClassName,
  step = 0.09,
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  /* NOT `React.Children.toArray` — that flattens Fragments, so a line written
     as `<>Building <span>Tomorrow</span>.</>` was being torn into three
     separate masks ("Building", " ", "Tomorrow."). The raw children array
     keeps each Fragment intact as exactly one line. */
  const lines: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children]

  /* `stagger()` builds a fresh object on every render; pinning the reference
     keeps Framer from re-evaluating the orchestration on a parent re-render. */
  const variants = React.useMemo(() => stagger(step, delay), [step, delay])

  const activation = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportOnce }

  return (
    <Tag className={cn(className)}>
      <motion.span
        className="block"
        initial="hidden"
        variants={variants}
        {...activation}
      >
        {lines.map((line, index) => (
          <span className="line-mask" key={index}>
            {/* `text-pretty` overrides any inherited `text-balance` (which would
                redistribute words across masks the author already broke by
                hand) and, when a line does have to wrap on a narrow screen,
                keeps a trailing period or short word off a line of its own. */}
            <motion.span
              className={cn(
                "block text-pretty will-change-transform",
                lineClassName
              )}
              variants={lineReveal}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

type WordRevealProps = {
  text: string
  className?: string
  wordClassName?: string
  step?: number
  delay?: number
}

/** Word-level variant, for shorter eyebrow-scale statements. */
export function WordReveal({
  text,
  className,
  wordClassName,
  step = 0.045,
  delay = 0,
}: WordRevealProps) {
  const words = text.split(" ")

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(step, delay)}
    >
      {words.map((word, index) => (
        <span className="line-mask mr-[0.25em]" key={`${word}-${index}`}>
          <motion.span
            className={cn("block will-change-transform", wordClassName)}
            variants={lineReveal}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
