"use client"

import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { motion } from "framer-motion"

import { clipReveal, transition, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ImageRevealProps = Omit<ImageProps, "className"> & {
  className?: string
  imageClassName?: string
  /** Aspect ratio of the frame, e.g. "4/5", "16/9". */
  ratio?: string
  /** Slow ambient zoom on hover — used on portfolio cards. */
  hoverZoom?: boolean
  /** Adds the bottom scrim for white type over the image. */
  scrim?: boolean
  priority?: boolean
}

/**
 * The site's standard image frame.
 *
 * The mask slides away rather than the image fading — architectural
 * photography deserves to arrive fully saturated, not ghosted in at 40%.
 */
export function ImageReveal({
  className,
  imageClassName,
  ratio = "4/3",
  hoverZoom = false,
  scrim = false,
  alt,
  ...imageProps
}: ImageRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={clipReveal}
      className={cn(
        "bg-muted relative isolate overflow-hidden",
        hoverZoom && "group/image",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      <Image
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
        className={cn(
          "object-cover",
          hoverZoom &&
            "transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover/image:scale-[1.06]",
          imageClassName
        )}
        {...imageProps}
      />
      {scrim ? (
        <div
          aria-hidden
          className="scrim-bottom pointer-events-none absolute inset-0"
        />
      ) : null}
    </motion.div>
  )
}

type MediaFrameProps = {
  children: React.ReactNode
  className?: string
  ratio?: string
}

/** Non-image variant of the same reveal — wraps video, maps, canvases. */
export function MediaFrame({
  children,
  className,
  ratio = "16/9",
}: MediaFrameProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={clipReveal}
      transition={transition.cinematic}
      className={cn("bg-muted relative isolate overflow-hidden", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </motion.div>
  )
}
