import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * The shadcn `radix-nova` preset ships a dense 32px button built for dashboards.
 * A billion-dollar marketing site needs the opposite: generous hit areas,
 * 16px type (per the brief) and a near-square radius that reads architectural.
 *
 * The compact `xs`/`sm`/`default` sizes are kept intact because the Radix
 * primitives (dialog, sheet, select) compose them internally. Marketing
 * surfaces use `lg`, `xl` and `2xl`.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "border border-transparent bg-clip-padding whitespace-nowrap select-none",
    "font-medium transition-all duration-300 ease-[var(--ease-luxe)] outline-none",
    "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        /** Ink — the primary call to action. */
        default:
          "bg-primary text-primary-foreground shadow-luxe-sm hover:shadow-luxe hover:-translate-y-0.5 active:translate-y-0",
        /** Gold — reserved. One per screen, at most. */
        gold: "bg-gold-500 text-ink-900 shadow-luxe-sm hover:bg-gold-400 hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0",
        /** Hairline outline that inherits the surrounding theme. */
        outline:
          "border-border text-foreground hover:border-foreground/35 hover:bg-foreground/[0.04]",
        /** For use over photography — always white-on-transparent. */
        onImage:
          "border-white/35 text-white backdrop-blur-md hover:border-white/70 hover:bg-white/12",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_srgb,var(--secondary),var(--foreground)_6%)]",
        ghost: "text-foreground hover:bg-foreground/[0.05]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/30",
        /** Editorial text link with an animated gold underline. */
        link: [
          "text-foreground h-auto rounded-none px-0 underline-offset-[6px]",
          "after:bg-gold-500 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
          "after:origin-right after:scale-x-0 after:transition-transform after:duration-500",
          "after:ease-[var(--ease-luxe)] hover:after:origin-left hover:after:scale-x-100",
        ],
      },
      size: {
        xs: "h-6 gap-1 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-sm px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-9 gap-2 rounded-sm px-4 text-sm",
        /** Marketing baseline. */
        lg: "text-action h-12 gap-2.5 rounded-sm px-7 [&_svg:not([class*='size-'])]:size-[1.05rem]",
        /** Hero. */
        xl: "text-action h-14 gap-3 rounded-sm px-9 [&_svg:not([class*='size-'])]:size-[1.15rem]",
        /** Full-bleed section CTA. */
        "2xl":
          "text-action h-16 gap-3.5 rounded-sm px-11 tracking-tight [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9 rounded-sm",
        "icon-sm": "size-8 rounded-sm",
        "icon-lg": "size-12 rounded-sm",
        "icon-xl": "size-14 rounded-full",
      },
      /** Uppercase micro-tracking — for tertiary, "VIEW ALL PROJECTS" actions. */
      caps: {
        true: "text-xs font-medium tracking-[0.18em] uppercase",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "link", size: "lg", className: "h-auto px-0" },
      { variant: "link", size: "xl", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      caps: false,
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  caps = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, caps, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
