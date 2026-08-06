"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import type { ProjectStatus, Sector } from "@/types"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type ExplorerTile = {
  slug: string
  sector: Sector
  status: ProjectStatus
  /** Completion year, or the start year while still on site. Used for sorting. */
  year: number
  valueUsd: number
  card: React.ReactNode
}

type SectorFilter = Sector | "all"
type StatusFilter = ProjectStatus | "all"
type SortKey = "recent" | "value" | "az"

const sortLabels: Record<SortKey, string> = {
  recent: "Most recent",
  value: "Contract value",
  az: "A–Z",
}

/**
 * Portfolio filter.
 *
 * Cards arrive as server-rendered nodes (a `Project` is fine to serialise, but
 * rendering here would pull `next/image` work into the client for no benefit).
 * The sector filter is mirrored into the URL so the footer's
 * `/projects?sector=healthcare` links land pre-filtered and the state survives
 * a refresh or a shared link.
 *
 * As on the services index there is no exit animation: removal must never wait
 * on an animation frame that a backgrounded tab will not deliver.
 */
export function ProjectsExplorer({
  tiles,
  sectorLabels,
  statusLabels,
}: {
  tiles: ExplorerTile[]
  sectorLabels: Record<Sector, string>
  statusLabels: Record<ProjectStatus, string>
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramSector = searchParams.get("sector")
  const sector: SectorFilter =
    paramSector && paramSector in sectorLabels
      ? (paramSector as Sector)
      : "all"

  const [status, setStatus] = React.useState<StatusFilter>("all")
  const [sort, setSort] = React.useState<SortKey>("recent")

  const setSector = React.useCallback(
    (next: SectorFilter) => {
      const params = new URLSearchParams(searchParams.toString())
      if (next === "all") params.delete("sector")
      else params.set("sector", next)
      const query = params.toString()
      router.replace(query ? `/projects?${query}` : "/projects", {
        scroll: false,
      })
    },
    [router, searchParams]
  )

  const sectorCounts = React.useMemo(() => {
    const map = new Map<SectorFilter, number>([["all", tiles.length]])
    for (const tile of tiles) {
      map.set(tile.sector, (map.get(tile.sector) ?? 0) + 1)
    }
    return map
  }, [tiles])

  const visible = React.useMemo(() => {
    const filtered = tiles.filter(
      (tile) =>
        (sector === "all" || tile.sector === sector) &&
        (status === "all" || tile.status === status)
    )

    return [...filtered].sort((a, b) => {
      if (sort === "value") return b.valueUsd - a.valueUsd
      if (sort === "az") return a.slug.localeCompare(b.slug)
      return b.year - a.year
    })
  }, [tiles, sector, status, sort])

  const statuses = React.useMemo(
    () =>
      (Object.keys(statusLabels) as ProjectStatus[]).filter((key) =>
        tiles.some((tile) => tile.status === key)
      ),
    [statusLabels, tiles]
  )

  const filtersActive = sector !== "all" || status !== "all"

  return (
    <div>
      {/* Sector ---------------------------------------------------------- */}
      <div
        role="group"
        aria-label="Filter projects by sector"
        className="flex flex-wrap items-center gap-x-2 gap-y-3"
      >
        {(["all", ...(Object.keys(sectorLabels) as Sector[])] as SectorFilter[])
          .filter((key) => key === "all" || sectorCounts.has(key))
          .map((key) => {
            const selected = key === sector
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => setSector(key)}
                className={cn(
                  "focus-visible:ring-ring inline-flex items-center gap-2 rounded-xs px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2",
                  selected
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {key === "all" ? "All Sectors" : sectorLabels[key]}
                <span
                  className={cn(
                    "font-mono text-[10px] tabular",
                    selected ? "text-background/80" : "text-muted-foreground"
                  )}
                >
                  {sectorCounts.get(key)}
                </span>
              </button>
            )
          })}
      </div>

      {/* Status + sort ---------------------------------------------------- */}
      <div className="border-hairline mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-b py-5">
        <div
          role="group"
          aria-label="Filter projects by status"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="text-eyebrow text-muted-foreground uppercase">
            Status
          </span>
          {(["all", ...statuses] as StatusFilter[]).map((key) => {
            const selected = key === status
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => setStatus(key)}
                className={cn(
                  "focus-visible:ring-ring relative rounded-xs text-sm transition-colors focus-visible:ring-2",
                  selected
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {key === "all" ? "Any" : statusLabels[key]}
                <span
                  aria-hidden
                  className={cn(
                    "bg-gold-500 absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-400 ease-[var(--ease-luxe)]",
                    selected ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="project-sort"
            className="text-eyebrow text-muted-foreground uppercase"
          >
            Sort
          </label>
          <select
            id="project-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="border-border text-foreground focus-visible:ring-ring rounded-xs border bg-transparent px-3 py-2 text-sm focus-visible:ring-2"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count ----------------------------------------------------- */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <p aria-live="polite" className="text-muted-foreground text-sm">
          <span className="text-foreground font-medium tabular">
            {visible.length}
          </span>{" "}
          {visible.length === 1 ? "project" : "projects"}
          {sector !== "all" ? ` in ${sectorLabels[sector].toLowerCase()}` : ""}
          {status !== "all"
            ? ` · ${statusLabels[status].toLowerCase()}`
            : ""}
        </p>

        {filtersActive ? (
          <button
            type="button"
            onClick={() => {
              setSector("all")
              setStatus("all")
            }}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-xs text-xs transition-colors focus-visible:ring-2"
          >
            <X aria-hidden className="size-3" />
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Grid -------------------------------------------------------------- */}
      {visible.length ? (
        <motion.ul
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {visible.map((tile) => (
            <motion.li
              key={tile.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_LUXE }}
              className="h-[24rem]"
            >
              {tile.card}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-muted-foreground border-hairline mt-10 border-t py-20 text-center text-lg">
          No projects match that combination yet.
        </p>
      )}
    </div>
  )
}
