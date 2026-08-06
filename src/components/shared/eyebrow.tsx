import * as React from "react"

import { cn } from "@/lib/utils"

type EyebrowProps = React.ComponentProps<"p"> & {
  /** Section index rendered as a monospace numeral, e.g. "02". */
  index?: string
  /** Hides the leading gold tick. */
  bare?: boolean
}

/**
 * The small uppercase label above every section heading. Combined with the
 * gold tick it acts as the site's connective tissue — the one element that
 * appears in every band and signals "a new idea starts here".
 */
export function Eyebrow({
  index,
  bare = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-eyebrow text-muted-foreground flex items-center gap-3 uppercase",
        className
      )}
      {...props}
    >
      {!bare ? (
        <span aria-hidden className="bg-gold-500 h-px w-8 shrink-0" />
      ) : null}
      {index ? (
        <span className="text-accent-text font-mono tabular">{index}</span>
      ) : null}
      <span>{children}</span>
    </p>
  )
}

/** A standalone gold hairline used to separate editorial blocks. */
export function GoldRule({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("bg-gold-500 block h-px w-16", className)}
      {...props}
    />
  )
}
