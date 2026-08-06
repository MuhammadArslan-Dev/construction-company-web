"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { postCategories } from "@/data/posts"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type PostTile = {
  slug: string
  category: string
  card: React.ReactNode
}

/**
 * Category filter over the editorial index. Cards are server-rendered nodes so
 * `next/image` work stays on the server; the client only toggles which ones
 * are mounted. No exit animation — removal must not wait on a frame.
 */
export function PostsExplorer({ tiles }: { tiles: PostTile[] }) {
  const [category, setCategory] = React.useState<string>("all")

  const visible = React.useMemo(
    () =>
      category === "all"
        ? tiles
        : tiles.filter((tile) => tile.category === category),
    [tiles, category]
  )

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="border-hairline flex flex-wrap items-center gap-x-2 gap-y-3 border-b pb-6"
      >
        {["all", ...postCategories].map((key) => {
          const selected = key === category
          const count =
            key === "all"
              ? tiles.length
              : tiles.filter((tile) => tile.category === key).length
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(key)}
              className={cn(
                "focus-visible:ring-ring inline-flex items-center gap-2 rounded-xs px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2",
                selected
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {key === "all" ? "All Insights" : key}
              <span
                className={cn(
                  "font-mono text-[10px] tabular",
                  selected ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="text-muted-foreground mt-6 text-sm">
        <span className="text-foreground font-medium tabular">
          {visible.length}
        </span>{" "}
        {visible.length === 1 ? "article" : "articles"}
      </p>

      <motion.ul layout className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((tile) => (
          <motion.li
            key={tile.slug}
            layout
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
          >
            {tile.card}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
