"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, MapPin, X } from "lucide-react"

import type { JobPosting } from "@/types"
import { EASE_LUXE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Open-roles list.
 *
 * `JobPosting` is plain serialisable data — no icons, no functions — so unlike
 * the services and projects explorers this one can safely receive the records
 * themselves and render the rows on the client.
 *
 * No exit animations, for the same reason as elsewhere: filtering must not
 * depend on an animation frame arriving.
 */
export function RolesExplorer({
  jobs,
  departments,
  countries,
  types,
}: {
  jobs: JobPosting[]
  departments: string[]
  countries: string[]
  types: string[]
}) {
  const [department, setDepartment] = React.useState("all")
  const [country, setCountry] = React.useState("all")
  const [type, setType] = React.useState("all")

  const visible = React.useMemo(
    () =>
      jobs.filter(
        (job) =>
          (department === "all" || job.department === department) &&
          (country === "all" || job.country === country) &&
          (type === "all" || job.type === type)
      ),
    [jobs, department, country, type]
  )

  const active = department !== "all" || country !== "all" || type !== "all"

  const clear = () => {
    setDepartment("all")
    setCountry("all")
    setType("all")
  }

  return (
    <div>
      {/* Department pills ---------------------------------------------- */}
      <div
        role="group"
        aria-label="Filter roles by department"
        className="flex flex-wrap items-center gap-x-2 gap-y-3"
      >
        {["all", ...departments].map((key) => {
          const selected = key === department
          const count =
            key === "all"
              ? jobs.length
              : jobs.filter((job) => job.department === key).length
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => setDepartment(key)}
              className={cn(
                "focus-visible:ring-ring inline-flex items-center gap-2 rounded-xs px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2",
                selected
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {key === "all" ? "All Departments" : key}
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

      {/* Selects -------------------------------------------------------- */}
      <div className="border-hairline mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-b py-5">
        <div className="flex items-center gap-3">
          <label
            htmlFor="role-country"
            className="text-eyebrow text-muted-foreground uppercase"
          >
            Location
          </label>
          <select
            id="role-country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="border-border text-foreground focus-visible:ring-ring rounded-xs border bg-transparent px-3 py-2 text-sm focus-visible:ring-2"
          >
            <option value="all">Anywhere</option>
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="role-type"
            className="text-eyebrow text-muted-foreground uppercase"
          >
            Type
          </label>
          <select
            id="role-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="border-border text-foreground focus-visible:ring-ring rounded-xs border bg-transparent px-3 py-2 text-sm focus-visible:ring-2"
          >
            <option value="all">Any</option>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p aria-live="polite" className="text-muted-foreground ml-auto text-sm">
          <span className="text-foreground font-medium tabular">
            {visible.length}
          </span>{" "}
          {visible.length === 1 ? "open role" : "open roles"}
        </p>

        {active ? (
          <button
            type="button"
            onClick={clear}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-xs text-xs transition-colors focus-visible:ring-2"
          >
            <X aria-hidden className="size-3" />
            Clear
          </button>
        ) : null}
      </div>

      {/* Rows ------------------------------------------------------------ */}
      {visible.length ? (
        <motion.ul layout className="mt-4">
          {visible.map((job) => (
            <motion.li
              key={job.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_LUXE }}
              className="border-hairline border-b"
            >
              <Link
                href={`/careers/${job.slug}`}
                className="group/role focus-visible:ring-ring grid gap-4 rounded-xs py-7 transition-colors focus-visible:ring-2 lg:grid-cols-12 lg:items-center lg:gap-8"
              >
                <div className="lg:col-span-5">
                  <h3 className="font-display text-foreground flex items-start gap-2 text-xl font-semibold lg:text-2xl">
                    {job.title}
                    <ArrowUpRight
                      aria-hidden
                      className="text-gold-500 mt-1 size-4 shrink-0 opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover/role:translate-x-1 group-hover/role:-translate-y-1 group-hover/role:opacity-100"
                    />
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed lg:hidden">
                    {job.summary}
                  </p>
                </div>

                <p className="text-muted-foreground text-eyebrow uppercase lg:col-span-3">
                  {job.department}
                </p>

                <p className="text-muted-foreground flex items-center gap-2 text-sm lg:col-span-2">
                  <MapPin aria-hidden className="text-gold-500 size-3.5" />
                  {job.location}
                </p>

                <p className="lg:col-span-2 lg:text-right">
                  <span className="border-border text-muted-foreground inline-flex rounded-xs border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                    {job.type}
                  </span>
                </p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="border-hairline mt-4 border-t py-20 text-center">
          <p className="text-muted-foreground text-lg">
            No roles match that combination right now.
          </p>
          <button
            type="button"
            onClick={clear}
            className="text-accent-text hover:text-gold-800 mt-4 text-sm underline underline-offset-4"
          >
            Clear the filters
          </button>
        </div>
      )}
    </div>
  )
}
