import * as React from "react"

import { cn } from "@/lib/utils"

type SectionTone = "light" | "muted" | "ink" | "transparent"

const toneClasses: Record<SectionTone, string> = {
  light: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  /* `dark` flips the entire semantic token set for everything inside, so
     child components keep using bg-card / text-muted-foreground unchanged. */
  ink: "dark bg-background text-foreground",
  transparent: "",
}

type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone
  /** Vertical rhythm. `none` when the section manages its own spacing. */
  spacing?: "default" | "compact" | "none"
}

export function Section({
  tone = "light",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        toneClasses[tone],
        spacing === "default" && "section-y",
        spacing === "compact" && "section-y-sm",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
