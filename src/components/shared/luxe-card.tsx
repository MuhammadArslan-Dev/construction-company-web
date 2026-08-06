import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The marketing surface.
 *
 * shadcn's `Card` is tuned for dashboards — 14px type, a visible ring, generous
 * radius. This is the opposite: hairline border, near-square corners, and a
 * lift that only appears on hover so a grid of them reads as a calm plane
 * until the reader engages with one.
 */
const luxeCardVariants = cva(
  "group/luxe relative isolate flex flex-col transition-all duration-500 ease-[var(--ease-luxe)]",
  {
    variants: {
      variant: {
        /** Hairline surface on the page background. */
        default: "border-border bg-card border",
        /** Slightly recessed — for grids on a white page. */
        muted: "bg-muted border-transparent",
        /** No chrome; the image is the card. */
        bare: "bg-transparent",
        /** Over photography. */
        glass: "glass-ink border border-white/12 text-white",
      },
      interactive: {
        true: "hover:shadow-luxe-lg hover:border-foreground/15 hover:-translate-y-1.5",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-6",
        default: "p-8 lg:p-10",
        lg: "p-10 lg:p-14",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      padding: "default",
    },
  }
)

type LuxeCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof luxeCardVariants> & {
    as?: React.ElementType
  }

export function LuxeCard({
  className,
  variant,
  interactive,
  padding,
  as: Tag = "div",
  ...props
}: LuxeCardProps) {
  return (
    <Tag
      data-slot="luxe-card"
      className={cn(
        luxeCardVariants({ variant, interactive, padding }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Icon plate used at the top of service and value cards. Flips to gold on
 * card hover — the only colour change in the whole component.
 */
export function CardIcon({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "border-border text-foreground inline-flex size-14 shrink-0 items-center justify-center border",
        "transition-colors duration-500 ease-[var(--ease-luxe)]",
        "group-hover/luxe:border-gold-500 group-hover/luxe:bg-gold-500 group-hover/luxe:text-ink-900",
        "[&_svg]:size-6",
        className
      )}
    >
      {children}
    </span>
  )
}

export { luxeCardVariants }
