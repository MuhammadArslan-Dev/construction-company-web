import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { sectorLabels, statusLabels } from "@/data/projects"
import { formatYear } from "@/lib/format"
import type { Project } from "@/types"
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  project: Project
  /** Responsive `sizes` hint — the parent knows its slot, the card does not. */
  sizes?: string
  priority?: boolean
  /** Reveals the client/completion pair on hover. Off in dense grids. */
  showMeta?: boolean
  className?: string
}

/**
 * Portfolio tile. Fills its container, so the parent owns the dimensions —
 * that lets the homepage masonry and the projects index share one component
 * without either dictating the other's layout.
 */
export function ProjectCard({
  project,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  showMeta = true,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group/project focus-visible:ring-ring relative isolate flex size-full flex-col justify-end overflow-hidden rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4",
        className
      )}
    >
      <Image
        src={project.hero.url}
        alt={project.hero.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="-z-10 object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover/project:scale-[1.06]"
      />
      <div aria-hidden className="scrim-bottom absolute inset-0 -z-10" />

      <span className="glass-ink absolute top-5 left-5 inline-flex items-center gap-2 rounded-xs px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-white/85 uppercase">
        {project.status === "in-progress" ? (
          <span
            aria-hidden
            className="bg-gold-500 size-1.5 animate-pulse rounded-full"
          />
        ) : null}
        {statusLabels[project.status]}
      </span>

      <div className="p-6 lg:p-8">
        <p className="text-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60 uppercase">
          <span>{sectorLabels[project.sector]}</span>
          <span aria-hidden className="bg-gold-500 h-px w-5" />
          <span>
            {project.city}, {project.country}
          </span>
        </p>

        <h3 className="font-display mt-4 flex items-start gap-2 text-2xl leading-tight font-bold text-white lg:text-3xl">
          {project.title}
          <ArrowUpRight
            aria-hidden
            className="text-gold-500 mt-1 size-5 shrink-0 opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover/project:translate-x-1 group-hover/project:-translate-y-1 group-hover/project:opacity-100"
          />
        </h3>

        <p className="mt-3 max-w-md text-sm text-white/65">{project.subtitle}</p>

        {showMeta ? (
          <dl className="mt-6 grid max-w-sm grid-cols-2 gap-4 opacity-0 transition-opacity duration-600 ease-[var(--ease-luxe)] group-hover/project:opacity-100">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-white/70 uppercase">
                Client
              </dt>
              <dd className="mt-1 text-xs text-white/85">{project.client}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-white/70 uppercase">
                Completed
              </dt>
              <dd className="mt-1 text-xs text-white/85 tabular">
                {project.completedAt
                  ? formatYear(project.completedAt)
                  : "In progress"}
              </dd>
            </div>
          </dl>
        ) : null}
      </div>
    </Link>
  )
}
