import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * The wordmark. A drawn mark rather than an image file, so it inherits the
 * surrounding theme and stays crisp at any size — the gold rule beneath the
 * "M" is the only ornament the identity carries.
 */
export function Logo({
  className,
  showTagline = false,
}: {
  className?: string
  showTagline?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group/logo focus-visible:ring-ring inline-flex items-center gap-3 rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4",
        className
      )}
    >
      <span aria-hidden className="relative inline-block">
        <span className="font-display text-foreground text-2xl leading-none font-extrabold tracking-tight">
          M
        </span>
        <span className="bg-gold-500 absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/logo:scale-x-150" />
      </span>
      <span className="flex flex-col">
        <span className="font-display text-foreground text-base leading-none font-bold tracking-[0.2em] uppercase">
          {siteConfig.name}
        </span>
        {showTagline ? (
          <span className="text-muted-foreground mt-1.5 font-mono text-[10px] leading-none tracking-[0.18em] uppercase">
            Construction Group
          </span>
        ) : null}
      </span>
      {/* Appended rather than an aria-label. An aria-label *replaces* the
          accessible name, and WCAG 2.5.3 requires that name to contain the
          visible text — "MERIDIAN" was being overwritten by the legal name. */}
      <span className="sr-only"> Construction Group — home</span>
    </Link>
  )
}
