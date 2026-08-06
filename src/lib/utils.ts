import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge has no way to know that `text-heading` is a font size rather
 * than a colour. Left unconfigured it groups our custom type scale with
 * `text-color`, so `cn("text-heading", "text-foreground")` silently drops the
 * font size and everything collapses to 16px.
 *
 * Registering the scale under `font-size` restores the intended behaviour:
 * `text-heading` conflicts with `text-body`, not with `text-muted-foreground`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "eyebrow",
            "numeral",
            "stat",
            "display",
            "heading",
            "subheading",
            "lead",
            "body",
            "action",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
