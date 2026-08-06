"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import { EASE_LUXE } from "@/lib/motion"

/**
 * Hero background: poster image with the drone footage fading in over it.
 *
 * Deliberately its own client component. When the video state lived in `Hero`,
 * the `allowVideo` / `videoReady` updates re-rendered the headline subtree
 * mid-entrance and froze Framer's staggered reveal part-way through. Isolating
 * the media means the copy renders exactly once.
 *
 * Performance shape:
 *  - The poster is a `priority` next/image, so LCP is an optimised AVIF and
 *    never the 6.5MB video.
 *  - `preload="none"`, and the element is only mounted after a short idle
 *    delay, so the video cannot compete with the critical render path.
 *  - Reduced-motion and Save-Data users never fetch the video at all.
 */
export function HeroMedia() {
  const prefersReduced = usePrefersReducedMotion()
  const [allowVideo, setAllowVideo] = React.useState(false)
  const [videoReady, setVideoReady] = React.useState(false)

  React.useEffect(() => {
    if (prefersReduced) return

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection
    if (connection?.saveData) return

    // A 6.4MB decorative background is not something to push down a phone
    // connection. Handsets get the optimised poster, which is the same frame.
    if (!window.matchMedia("(min-width: 768px)").matches) return

    // Nor over 2G/3G, where it would compete with content that matters.
    if (connection?.effectiveType && /2g|slow-2g|3g/.test(connection.effectiveType)) {
      return
    }

    const idle = window.setTimeout(() => setAllowVideo(true), 900)
    return () => window.clearTimeout(idle)
  }, [prefersReduced])

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/media/hero-drone-poster.jpg"
        alt="Aerial view of a modern high-rise tower among a dense city skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {allowVideo ? (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 1.2, ease: EASE_LUXE }}
          className="absolute inset-0 size-full object-cover"
          src="/media/hero-drone.mp4"
          /* No `poster` attribute: it would fetch the raw 186KB JPEG a second
             time, in parallel with the AVIF that next/image already served
             for the <Image> sitting directly behind this element. */
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
        />
      ) : null}

      <div aria-hidden className="scrim-hero absolute inset-0" />
    </div>
  )
}
