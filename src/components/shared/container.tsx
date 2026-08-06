import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      /* `--container-page` / `--container-editorial` live in the `--container-*`
         theme namespace, so Tailwind generates `max-w-page` and
         `max-w-editorial` from them directly. */
      /** Default page gutter — 1440px measure. */
      default: "max-w-page px-6 md:px-10 lg:px-16",
      /** Slightly inset, for text-forward sections. */
      narrow: "max-w-6xl px-6 md:px-10",
      /** Long-form reading measure — blog body, project narrative. */
      editorial: "max-w-editorial px-6",
      /** Edge-to-edge with gutters only on small screens. */
      wide: "max-w-none px-6 md:px-10 lg:px-16",
      /** No horizontal padding at all — full-bleed media. */
      bleed: "max-w-none px-0",
    },
  },
  defaultVariants: { size: "default" },
})

type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    as?: React.ElementType
  }

export function Container({
  className,
  size,
  as: Tag = "div",
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn(containerVariants({ size }), className)} {...props} />
  )
}
