"use client"

import * as React from "react"
import Image from "next/image"
import { MoveHorizontal } from "lucide-react"

import type { MediaAsset } from "@/types"
import { cn } from "@/lib/utils"

/**
 * Before/after comparison.
 *
 * Driven by an `<input type="range">` rather than pointer maths. That gets
 * keyboard support, touch, and screen-reader semantics for free — a bare
 * mousedown handler would need all three rebuilt by hand and would still leave
 * the control unreachable by keyboard.
 */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: MediaAsset
  after: MediaAsset
  className?: string
}) {
  const [position, setPosition] = React.useState(50)

  return (
    <figure className={cn("group/ba", className)}>
      <div className="relative aspect-16/10 overflow-hidden rounded-xs select-none">
        {/* After sits underneath and is fully painted. */}
        <Image
          src={after.url}
          alt={after.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />

        {/* Before is clipped to the slider position. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.url}
            alt={before.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="glass-ink absolute top-4 left-4 rounded-xs px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-white/85 uppercase">
          {before.caption ?? "Before"}
        </span>
        <span className="glass-ink absolute top-4 right-4 rounded-xs px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-white/85 uppercase">
          {after.caption ?? "After"}
        </span>

        {/* Divider + handle, purely decorative — the range input drives it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
          style={{ left: `${position}%` }}
        >
          <span className="text-ink-900 absolute top-1/2 left-1/2 inline-flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-luxe">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        <label className="sr-only" htmlFor="before-after-range">
          Reveal the completed project — drag or use the arrow keys
        </label>
        <input
          id="before-after-range"
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${Math.round(position)}% during construction`}
          className={cn(
            "absolute inset-0 size-full cursor-ew-resize appearance-none bg-transparent",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none",
            // The native thumb is hidden; the drawn handle above stands in.
            "[&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:opacity-0",
            "[&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:opacity-0"
          )}
        />
      </div>

      <figcaption className="text-muted-foreground mt-4 text-sm">
        Drag the handle — or focus it and use the arrow keys — to compare the
        site during construction with the completed asset.
      </figcaption>
    </figure>
  )
}
