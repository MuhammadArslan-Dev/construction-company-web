"use client"

import * as React from "react"
import { Move } from "lucide-react"

import type { MediaAsset } from "@/types"
import { cn } from "@/lib/utils"

/**
 * Drag-to-pan panoramic viewer.
 *
 * Deliberately a *panorama*, not a 360° sphere. A genuine 360 viewer needs
 * equirectangular source imagery; projecting an ordinary wide photograph onto
 * a sphere produces visible distortion and would be dishonest about what the
 * client is actually looking at. Swap in equirectangular plates and this
 * becomes a sphere viewer without changing the surrounding page.
 *
 * Pointer Events cover mouse, touch and pen in one path, and pointer capture
 * means a drag that leaves the frame still tracks correctly.
 */
export function PanoramaViewer({
  image,
  className,
}: {
  image: MediaAsset
  className?: string
}) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(50)
  const dragRef = React.useRef<{ x: number; start: number } | null>(null)

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: event.clientX, start: offset }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const frame = frameRef.current
    if (!drag || !frame) return
    const delta = ((event.clientX - drag.x) / frame.clientWidth) * 70
    setOffset(Math.min(100, Math.max(0, drag.start - delta)))
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <figure className={cn(className)}>
      <div
        ref={frameRef}
        role="img"
        aria-label={`Panoramic view — ${image.alt}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-21/9 cursor-grab overflow-hidden rounded-xs bg-ink-900 active:cursor-grabbing"
      >
        {/* A plain <img> on purpose: this element is panned by background
            position, which next/image's wrapper would fight. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          style={{ objectPosition: `${offset}% 50%` }}
        />

        <span
          aria-hidden
          className="glass-ink pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-xs px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-white/85 uppercase"
        >
          <Move className="size-3.5" />
          Drag to pan
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <label htmlFor="panorama-range" className="sr-only">
          Pan the panoramic view
        </label>
        <input
          id="panorama-range"
          type="range"
          min={0}
          max={100}
          value={offset}
          onChange={(event) => setOffset(Number(event.target.value))}
          className="accent-gold-500 focus-visible:ring-ring h-1 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-white/15 focus-visible:ring-2"
        />
        <span className="text-muted-foreground font-mono text-xs tabular">
          {Math.round(offset)}%
        </span>
      </div>
    </figure>
  )
}
