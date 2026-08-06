"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { categoryBlurbs, serviceCategories } from "@/data/services"
import type { ServiceCategory } from "@/types"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Filter = ServiceCategory | "All"

const filters: Filter[] = ["All", ...serviceCategories]

export type ExplorerItem = {
  slug: string
  category: ServiceCategory
  /** Server-rendered <ServiceCard>. */
  card: React.ReactNode
}

/**
 * Category filter over the full capability list.
 *
 * The cards arrive as already-rendered server nodes rather than as `Service`
 * objects. A `Service` carries a `LucideIcon` — a function — which cannot
 * cross the server/client boundary, and rendering them here would also drag
 * every icon and the whole data module into the client bundle.
 *
 * Filtering is client-side because all fourteen are already on the page; a
 * round trip would be slower and pointless. `layout` makes surviving cards
 * slide to their new slot instead of being torn down and rebuilt.
 */
export function ServicesExplorer({ items }: { items: ExplorerItem[] }) {
  const [active, setActive] = React.useState<Filter>("All")

  const visible = React.useMemo(
    () =>
      active === "All"
        ? items
        : items.filter((item) => item.category === active),
    [active, items]
  )

  const counts = React.useMemo(() => {
    const map = new Map<Filter, number>([["All", items.length]])
    for (const category of serviceCategories) {
      map.set(
        category,
        items.filter((item) => item.category === category).length
      )
    }
    return map
  }, [items])

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter services by category"
        className="border-hairline flex flex-wrap items-center gap-x-2 gap-y-3 border-b pb-6"
      >
        {filters.map((filter) => {
          const selected = filter === active
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "focus-visible:ring-ring inline-flex items-center gap-2 rounded-xs px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2",
                selected
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
              <span
                className={cn(
                  "font-mono text-[10px] tabular",
                  selected ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {counts.get(filter)}
              </span>
            </button>
          )
        })}
      </div>

      <p
        aria-live="polite"
        className="text-muted-foreground mt-6 max-w-xl min-h-6 text-base"
      >
        {active === "All"
          ? `Showing all ${items.length} disciplines.`
          : categoryBlurbs[active]}
      </p>

      {/* Deliberately no <AnimatePresence>. An exit animation would gate
          removal on the animation finishing — and if it never finishes (a
          backgrounded tab throttles rAF to a frame every few seconds) the
          filtered-out cards stay on screen while the filter reads as applied.
          Filtered items unmount immediately; `layout` still slides the
          survivors into their new slots, which is the part worth animating. */}
      <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <motion.li
            key={item.slug}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            className="h-[21rem]"
          >
            {item.card}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
