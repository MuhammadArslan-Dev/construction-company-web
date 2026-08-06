"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type MapMarker = {
  id: string
  x: number
  y: number
  city: string
  country: string
  region: string
  projectCount: number
  isHeadquarters?: boolean
}

/**
 * Interactive office map.
 *
 * Receives pre-projected coordinates and pre-built country paths from the
 * server, so no projection library ships to the client. Markers are real SVG
 * elements rather than absolutely-positioned divs, which means they scale with
 * the viewBox and stay aligned to the landmasses at every breakpoint without a
 * single resize listener.
 *
 * Each marker is a <button> inside the SVG so the whole map is keyboard
 * navigable — hovering and focusing are treated identically.
 */
export function WorldMap({
  paths,
  markers,
  width,
  height,
  className,
}: {
  paths: string[]
  markers: MapMarker[]
  width: number
  height: number
  className?: string
}) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const active = markers.find((marker) => marker.id === activeId) ?? null

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`World map showing ${markers.length} Meridian offices`}
        className="h-auto w-full"
      >
        <g aria-hidden>
          {paths.map((d, index) => (
            <path
              key={index}
              d={d}
              className="fill-white/[0.07] stroke-white/15"
              strokeWidth={0.4}
            />
          ))}
        </g>

        {/* Connection lines from headquarters to every other office. */}
        <g aria-hidden>
          {(() => {
            const hq = markers.find((marker) => marker.isHeadquarters)
            if (!hq) return null
            return markers
              .filter((marker) => marker.id !== hq.id)
              .map((marker) => (
                <motion.line
                  key={`link-${marker.id}`}
                  x1={hq.x}
                  y1={hq.y}
                  x2={marker.x}
                  y2={marker.y}
                  className="stroke-gold-500/25"
                  strokeWidth={0.5}
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: EASE_LUXE }}
                />
              ))
          })()}
        </g>

        {markers.map((marker, index) => {
          const isActive = marker.id === activeId
          return (
            <g key={marker.id}>
              {/* Pulse ring on the headquarters only — more than one competes. */}
              {marker.isHeadquarters ? (
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={9}
                  className="fill-gold-500/20 motion-safe:animate-ping"
                />
              ) : null}

              <motion.circle
                cx={marker.x}
                cy={marker.y}
                r={isActive ? 7 : marker.isHeadquarters ? 5.5 : 4}
                className={cn(
                  "cursor-pointer transition-[r] duration-300",
                  marker.isHeadquarters
                    ? "fill-gold-500"
                    : isActive
                      ? "fill-gold-400"
                      : "fill-white/80"
                )}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.07,
                  ease: EASE_LUXE,
                }}
              />

              {/* Hit area + keyboard target. Larger than the dot so it is
                  actually clickable on a phone. */}
              <circle
                cx={marker.x}
                cy={marker.y}
                r={14}
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`${marker.city}, ${marker.country} — ${marker.projectCount} projects`}
                className="focus-visible:stroke-ring cursor-pointer outline-none focus-visible:stroke-2"
                onMouseEnter={() => setActiveId(marker.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(marker.id)}
                onBlur={() => setActiveId(null)}
                onClick={() => setActiveId(marker.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setActiveId(marker.id)
                  }
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Readout. Positioned outside the SVG so the text never scales with
          the viewBox and stays legible at every width. */}
      <div
        aria-live="polite"
        className="glass-ink pointer-events-none absolute bottom-3 left-3 min-w-[13rem] rounded-xs px-4 py-3 lg:bottom-5 lg:left-5"
      >
        {active ? (
          <>
            <p className="font-display text-base font-semibold text-white">
              {active.city}
              {active.isHeadquarters ? (
                <span className="text-gold-500 ml-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                  HQ
                </span>
              ) : null}
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-white/60 uppercase">
              {active.country} · {active.region}
            </p>
            <p className="mt-2 text-xs text-white/75 tabular">
              {active.projectCount} projects delivered
            </p>
          </>
        ) : (
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/70 uppercase">
            Hover or tab a marker
          </p>
        )}
      </div>
    </div>
  )
}
