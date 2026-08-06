import * as React from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type ArrowLinkProps = React.ComponentProps<typeof Link> & {
  /** `right` for in-flow navigation, `up-right` for outbound/detail. */
  direction?: "right" | "up-right"
  caps?: boolean
}

/**
 * Tertiary navigation link. The rule under the label wipes in from the left
 * and the arrow advances — two small movements sharing one easing curve, which
 * is what makes the hover feel considered rather than decorative.
 */
export function ArrowLink({
  direction = "right",
  caps = true,
  className,
  children,
  ...props
}: ArrowLinkProps) {
  const Icon = direction === "right" ? ArrowRight : ArrowUpRight

  return (
    <Link
      className={cn(
        "group/arrow text-foreground inline-flex items-center gap-3",
        "focus-visible:ring-ring rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4",
        caps
          ? "text-eyebrow font-medium uppercase"
          : "text-action font-medium",
        className
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="bg-gold-500 absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/arrow:origin-left group-hover/arrow:scale-x-100"
        />
      </span>
      <Icon
        aria-hidden
        className={cn(
          "text-gold-500 size-4 transition-transform duration-500 ease-[var(--ease-luxe)]",
          direction === "right"
            ? "group-hover/arrow:translate-x-1.5"
            : "group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1"
        )}
      />
    </Link>
  )
}
