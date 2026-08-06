import * as React from "react"

import { Counter } from "@/components/motion/counter"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import type { Stat } from "@/types"
import { cn } from "@/lib/utils"

type StatBlockProps = {
  stats: Stat[]
  className?: string
  /** Hairline dividers between columns — off for cards, on for bands. */
  divided?: boolean
}

/**
 * The animated statistics band. Numerals are set in the display face at
 * `--text-numeral` so the figure, not the label, is the hero of the block.
 */
export function StatBlock({
  stats,
  className,
  divided = true,
}: StatBlockProps) {
  return (
    <RevealGroup
      step={0.09}
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 xl:grid-cols-5",
        className
      )}
    >
      {stats.map((stat, index) => (
        <RevealItem
          key={stat.label}
          className={cn(
            divided &&
              "border-hairline xl:border-l xl:pl-8 xl:first:border-l-0 xl:first:pl-0",
            index === stats.length - 1 &&
              stats.length % 2 !== 0 &&
              "col-span-2 md:col-span-1"
          )}
        >
          <p className="text-stat font-display text-foreground">
            <Counter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          </p>
          <p className="text-eyebrow text-muted-foreground mt-5 uppercase">
            {stat.label}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

type StatInlineProps = {
  value: React.ReactNode
  label: string
  className?: string
}

/** Compact metric pair for cards and project meta rows. */
export function StatInline({ value, label, className }: StatInlineProps) {
  return (
    <div className={cn(className)}>
      <dt className="text-eyebrow text-muted-foreground uppercase">{label}</dt>
      <dd className="text-foreground mt-2 text-lg font-medium tabular">
        {value}
      </dd>
    </div>
  )
}
