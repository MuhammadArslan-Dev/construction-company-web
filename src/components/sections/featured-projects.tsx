import * as React from "react"
import Link from "next/link"

import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { ProjectCard } from "@/components/shared/project-card"
import { Section } from "@/components/shared/section"
import { SectionHeaderRow } from "@/components/shared/section-heading"
import { getProject } from "@/data/projects"
import type { Project } from "@/types"
import { cn } from "@/lib/utils"

/**
 * The masonry is authored, not auto-placed.
 *
 * On a 12-column grid, letting the browser flow mixed spans leaves holes. Each
 * tile's slot is declared here so the four bands always resolve to exactly 12:
 *   band 1 — tall(4) tall(4) regular(4)
 *   band 2 — ↑      ↑      regular(4)
 *   band 3 — wide(8)       regular(4)
 *   band 4 — wide(8)       regular(4)
 *
 * Card height is fixed rather than aspect-driven so the two-row tiles line up
 * with the pair beside them: 2 × 22rem + one 1.25rem gap = 45.25rem.
 */
const layout: { slug: string; span: "tall" | "wide" | "regular" }[] = [
  { slug: "aurelia-residences", span: "tall" },
  { slug: "meridian-one", span: "tall" },
  { slug: "st-aurora-medical", span: "regular" },
  { slug: "northgate-quarter", span: "regular" },
  { slug: "the-galleria", span: "wide" },
  { slug: "helios-energy-works", span: "regular" },
  { slug: "silverstrand-crossing", span: "wide" },
  { slug: "nara-bay-hotel", span: "regular" },
]

const slotClasses = {
  tall: "lg:col-span-4 lg:row-span-2 h-[26rem] lg:h-[45.25rem]",
  wide: "lg:col-span-8 h-[22rem]",
  regular: "lg:col-span-4 h-[22rem]",
} as const

const sizesFor = {
  tall: "(max-width: 1024px) 100vw, 33vw",
  wide: "(max-width: 1024px) 100vw, 66vw",
  regular: "(max-width: 1024px) 100vw, 33vw",
} as const

export function FeaturedProjects() {
  const tiles = layout
    .map((slot) => ({ slot, project: getProject(slot.slug) }))
    .filter(
      (tile): tile is { slot: (typeof layout)[number]; project: Project } =>
        Boolean(tile.project)
    )

  return (
    <Section id="projects" tone="ink">
      <Container>
        <SectionHeaderRow
          index="03"
          eyebrow="Selected work"
          title="A portfolio measured in landmarks."
          action={
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">All Projects</Link>
            </Button>
          }
        />

        <RevealGroup step={0.07} className="mt-16 grid gap-5 lg:grid-cols-12">
          {tiles.map(({ slot, project }, index) => (
            <RevealItem key={project.slug} className={cn(slotClasses[slot.span])}>
              <ProjectCard
                project={project}
                sizes={sizesFor[slot.span]}
                priority={index < 2}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
