import * as React from "react"

import { Eyebrow } from "@/components/shared/eyebrow"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  index?: string
  title: React.ReactNode
  lead?: React.ReactNode
  /** Right-aligned action slot — "View all projects", filters, etc. */
  action?: React.ReactNode
  align?: "left" | "center"
  /** Editorial two-column split: heading left, lead right. */
  split?: boolean
  as?: "h1" | "h2" | "h3"
  className?: string
  titleClassName?: string
}

/**
 * The section header used across every page.
 *
 * `split` produces the editorial layout that defines the site's rhythm — a
 * large heading on the left, a quieter paragraph set on the right at roughly
 * a third of the measure. Everything is staggered as one group so the eyebrow,
 * title and lead arrive in reading order.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  action,
  align = "left",
  split = false,
  as: Tag = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const heading = (
    <Tag
      className={cn(
        "text-heading text-foreground text-balance",
        titleClassName
      )}
    >
      {title}
    </Tag>
  )

  if (split) {
    return (
      <RevealGroup
        step={0.1}
        className={cn(
          "grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16",
          className
        )}
      >
        <div className="lg:col-span-7">
          {eyebrow ? (
            <RevealItem className="mb-6">
              <Eyebrow index={index}>{eyebrow}</Eyebrow>
            </RevealItem>
          ) : null}
          <RevealItem>{heading}</RevealItem>
        </div>
        <div className="lg:col-span-5">
          {lead ? (
            <RevealItem>
              <p className="text-lead text-muted-foreground text-pretty">
                {lead}
              </p>
            </RevealItem>
          ) : null}
          {action ? <RevealItem className="mt-8">{action}</RevealItem> : null}
        </div>
      </RevealGroup>
    )
  }

  return (
    <RevealGroup
      step={0.1}
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <RevealItem className="mb-6">
          <Eyebrow index={index} className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </RevealItem>
      ) : null}

      <RevealItem className={cn(align === "center" && "max-w-4xl")}>
        {heading}
      </RevealItem>

      {lead ? (
        <RevealItem className={cn("mt-6", align === "center" && "max-w-2xl")}>
          <p className="text-lead text-muted-foreground max-w-2xl text-pretty">
            {lead}
          </p>
        </RevealItem>
      ) : null}

      {action ? <RevealItem className="mt-10">{action}</RevealItem> : null}
    </RevealGroup>
  )
}

/** Heading + action on one row — used above grids and carousels. */
export function SectionHeaderRow({
  eyebrow,
  index,
  title,
  action,
  className,
}: Pick<
  SectionHeadingProps,
  "eyebrow" | "index" | "title" | "action" | "className"
>) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <Eyebrow index={index} className="mb-6">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2 className="text-heading text-foreground text-balance">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  )
}
