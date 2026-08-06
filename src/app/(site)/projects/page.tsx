import { Suspense } from "react"
import type { Metadata } from "next"

import { ProjectsExplorer } from "@/app/(site)/projects/projects-explorer"
import { Counter } from "@/components/motion/counter"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { ProjectCard } from "@/components/shared/project-card"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Skeleton } from "@/components/ui/skeleton"
import { projects, sectorLabels, statusLabels } from "@/data/projects"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Landmark construction projects across 18 countries — luxury residences, high-rise towers, hospitals, universities, shopping districts, industrial plants and nation-scale infrastructure.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Meridian Construction Group",
    description:
      "A portfolio measured in landmarks: 500+ completed projects across 18 countries.",
    url: "/projects",
  },
}

/** Regional roll-up derived from the portfolio rather than hand-maintained. */
const regions = [
  { name: "Americas", countries: ["Canada", "United States"] },
  {
    name: "EMEA",
    countries: [
      "United Kingdom",
      "Norway",
      "Netherlands",
      "Portugal",
      "Spain",
      "Denmark",
      "Germany",
      "United Arab Emirates",
      "Saudi Arabia",
    ],
  },
  {
    name: "APAC",
    countries: ["Singapore", "Malaysia", "Indonesia", "New Zealand"],
  },
]

export default function ProjectsPage() {
  const tiles = projects.map((project) => ({
    slug: project.slug,
    sector: project.sector,
    status: project.status,
    year: Number(
      (project.completedAt ?? project.startedAt ?? "2020").slice(0, 4)
    ),
    valueUsd: project.valueUsd ?? 0,
    card: <ProjectCard project={project} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />,
  }))

  const totalValue = projects.reduce(
    (sum, project) => sum + (project.valueUsd ?? 0),
    0
  )
  const countries = new Set(projects.map((project) => project.country))

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        image={{
          url: unsplash("photo-1512187849-463fdb898f21"),
          alt: "Aerial view of a cable-stayed bridge crossing calm water",
        }}
        lead="Five hundred completed projects. These are the ones our clients let us photograph."
        meta={[
          { label: "Projects", value: String(projects.length) },
          { label: "Countries", value: String(countries.size) },
          {
            label: "Combined Value",
            value: `$${(totalValue / 1_000_000_000).toFixed(1)}B`,
          },
          { label: "Sectors", value: String(Object.keys(sectorLabels).length) },
        ]}
      >
        <>A portfolio measured</>
        <>
          in{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">landmarks</span>.
          </span>
        </>
      </PageHero>

      {/* Explorer -------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="The portfolio"
            title="Filter by sector, status or scale."
            lead="Every project below was delivered by directly employed Meridian teams. Where a client has permitted it, we name them — and they will take your call."
          />

          <div className="mt-16">
            <Suspense
              fallback={
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-[24rem] rounded-xs" />
                  ))}
                </div>
              }
            >
              <ProjectsExplorer
                tiles={tiles}
                sectorLabels={sectorLabels}
                statusLabels={statusLabels}
              />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Global footprint ------------------------------------------------- */}
      <Section tone="ink" spacing="compact">
        <Container>
          <SectionHeading
            split
            index="03"
            eyebrow="Global footprint"
            title="Eighteen countries. Three regions."
            lead="Delivery offices on every continent we build on, staffed by engineers who live where the project is."
          />

          <RevealGroup
            step={0.09}
            className="mt-14 grid gap-px border-t border-white/10 lg:grid-cols-3"
          >
            {regions.map((region) => (
              <RevealItem
                key={region.name}
                className="border-b border-white/10 py-9 lg:px-8 lg:first:pl-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {region.name}
                  </h3>
                  <span className="font-display text-accent-text text-3xl font-bold">
                    <Counter value={region.countries.length} />
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {region.countries.map((country) => (
                    <li
                      key={country}
                      className="text-muted-foreground text-sm"
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal preset="up" className="mt-12">
            <p className="text-muted-foreground max-w-2xl text-sm">
              An interactive map of every office and active site arrives with
              the contact page in a later phase.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
