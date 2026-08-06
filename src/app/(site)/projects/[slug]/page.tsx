import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AlertTriangle, ArrowLeft, ArrowRight, Trophy } from "lucide-react"

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { BeforeAfter } from "@/components/projects/before-after"
import { ConstructionTimeline } from "@/components/projects/construction-timeline"
import { PanoramaViewer } from "@/components/projects/panorama-viewer"
import { ProjectGallery } from "@/components/projects/project-gallery"
import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { ProjectCard } from "@/components/shared/project-card"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  getBeforeAfter,
  getGallery,
  getMilestones,
  getPanorama,
} from "@/data/galleries"
import { getProject, projects, sectorLabels, statusLabels } from "@/data/projects"
import { formatArea, formatCurrencyCompact, formatDate } from "@/lib/format"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Project not found" }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${siteConfig.name}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: project.hero.url, alt: project.hero.alt }],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  const gallery = getGallery(project)
  const { before, after } = getBeforeAfter(project)
  const panorama = getPanorama(project)
  const milestones = getMilestones(project)

  const related = projects
    .filter(
      (item) => item.sector === project.sector && item.slug !== project.slug
    )
    .slice(0, 3)

  /* Structured data. `CreativeWork` is the honest fit for a completed built
     asset — Schema.org has no construction-project type, and misusing
     `Product` would be a rich-result violation. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: project.hero.url,
    dateCreated: project.startedAt,
    datePublished: project.completedAt,
    creator: { "@type": "Organization", name: siteConfig.legalName },
    locationCreated: {
      "@type": "Place",
      name: `${project.city}, ${project.country}`,
      ...(project.coordinates
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: project.coordinates.lat,
              longitude: project.coordinates.lng,
            },
          }
        : {}),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`${sectorLabels[project.sector]} · ${statusLabels[project.status]}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
        image={project.hero}
        lead={project.summary}
        size="tall"
        meta={[
          { label: "Client", value: project.client },
          { label: "Location", value: `${project.city}, ${project.country}` },
          {
            label: "Completed",
            value: project.completedAt
              ? formatDate(project.completedAt)
              : "On site",
          },
          {
            label: "Contract Value",
            value: formatCurrencyCompact(project.valueUsd),
          },
        ]}
      >
        <>{project.title}</>
      </PageHero>

      {/* Overview -------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal preset="up">
                <p className="text-eyebrow text-muted-foreground uppercase">
                  Overview
                </p>
                <h2 className="text-heading mt-6 text-balance">
                  {project.subtitle}
                </h2>
              </Reveal>

              <RevealGroup step={0.08} className="mt-8 space-y-6">
                {project.narrative.map((paragraph) => (
                  <RevealItem key={paragraph.slice(0, 40)}>
                    <p className="text-lead text-muted-foreground text-pretty">
                      {paragraph}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* Fact sheet -------------------------------------------------- */}
            <Reveal preset="up" delay={0.1} className="lg:col-span-5">
              <dl className="border-hairline divide-hairline divide-y border-t border-b">
                {[
                  { label: "Sector", value: sectorLabels[project.sector] },
                  { label: "Status", value: statusLabels[project.status] },
                  project.architect
                    ? { label: "Architect", value: project.architect }
                    : null,
                  project.areaSqm
                    ? { label: "Built Area", value: formatArea(project.areaSqm) }
                    : null,
                  project.floors
                    ? { label: "Storeys", value: String(project.floors) }
                    : null,
                  project.startedAt
                    ? { label: "Started", value: formatDate(project.startedAt) }
                    : null,
                ]
                  .filter((row) => row !== null)
                  .map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 py-5"
                    >
                      <dt className="text-eyebrow text-muted-foreground uppercase">
                        {row.label}
                      </dt>
                      <dd className="text-foreground text-right text-base font-medium tabular">
                        {row.value}
                      </dd>
                    </div>
                  ))}
              </dl>

              {project.awards?.length ? (
                <Reveal preset="up" className="mt-10">
                  <p className="text-eyebrow text-muted-foreground uppercase">
                    Recognition
                  </p>
                  <ul className="mt-5 space-y-3">
                    {project.awards.map((award) => (
                      <li
                        key={award}
                        className="text-foreground flex items-start gap-3 text-sm"
                      >
                        <Trophy
                          aria-hidden
                          className="text-gold-500 mt-0.5 size-4 shrink-0"
                        />
                        {award}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Timeline --------------------------------------------------------- */}
      {milestones.length ? (
        <Section tone="muted" spacing="compact">
          <Container>
            <SectionHeading
              eyebrow="Construction timeline"
              title="From award to handover."
            />
            <div className="mt-14">
              <ConstructionTimeline milestones={milestones} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Gallery ---------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            split
            eyebrow="Gallery"
            title="Photography, drone survey and drawings."
            lead="Completed photography alongside the aerial survey, issued-for-construction drawings and progress records kept through delivery."
          />
          <div className="mt-14">
            <ProjectGallery images={gallery} />
          </div>
        </Container>
      </Section>

      {/* Before / after + panorama ---------------------------------------- */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            split
            eyebrow="Then and now"
            title="The same view, four years apart."
          />
          <Reveal preset="up" className="mt-14">
            <BeforeAfter before={before} after={after} />
          </Reveal>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Panoramic view"
              title="Look around the finished asset."
            />
            <Reveal preset="up" className="mt-12">
              <PanoramaViewer image={panorama} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Challenges & results ---------------------------------------------- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal preset="up">
                <p className="text-eyebrow text-muted-foreground flex items-center gap-3 uppercase">
                  <AlertTriangle aria-hidden className="text-gold-500 size-4" />
                  Challenges
                </p>
                <h2 className="text-subheading mt-6">
                  What made this difficult.
                </h2>
              </Reveal>
              <RevealGroup
                step={0.08}
                className="border-hairline mt-8 border-t"
              >
                {project.challenges.map((challenge, challengeIndex) => (
                  <RevealItem
                    key={challenge}
                    className="border-hairline flex gap-6 border-b py-6"
                  >
                    <span className="text-muted-foreground font-mono text-xs tabular">
                      {String(challengeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground text-base">
                      {challenge}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div>
              <Reveal preset="up">
                <p className="text-eyebrow text-muted-foreground flex items-center gap-3 uppercase">
                  <Trophy aria-hidden className="text-gold-500 size-4" />
                  Results
                </p>
                <h2 className="text-subheading mt-6">What we delivered.</h2>
              </Reveal>
              <RevealGroup
                step={0.08}
                className="border-hairline mt-8 border-t"
              >
                {project.results.map((result, resultIndex) => (
                  <RevealItem
                    key={result}
                    className="border-hairline flex gap-6 border-b py-6"
                  >
                    <span className="text-accent-text font-mono text-xs tabular">
                      {String(resultIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground text-base">{result}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related ------------------------------------------------------------ */}
      {related.length ? (
        <Section tone="muted">
          <Container>
            <SectionHeading
              split
              eyebrow="More in this sector"
              title={`Other ${sectorLabels[project.sector].toLowerCase()} work.`}
              action={
                <Button asChild size="lg" variant="outline">
                  <Link href={`/projects?sector=${project.sector}`}>
                    View sector
                  </Link>
                </Button>
              }
            />
            <RevealGroup
              step={0.08}
              className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <RevealItem key={item.slug} className="h-[22rem]">
                  <ProjectCard project={item} showMeta={false} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      {/* Prev / next --------------------------------------------------------- */}
      <Section tone="light" spacing="compact">
        <Container>
          <div className="border-hairline grid gap-8 border-t pt-10 sm:grid-cols-2">
            <Link
              href={`/projects/${previous.slug}`}
              className="group/nav focus-visible:ring-ring rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <span className="text-eyebrow text-muted-foreground flex items-center gap-2 uppercase">
                <ArrowLeft
                  aria-hidden
                  className="text-gold-500 size-3.5 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/nav:-translate-x-1"
                />
                Previous project
              </span>
              <span className="font-display text-foreground mt-3 block text-xl font-semibold">
                {previous.title}
              </span>
            </Link>

            <Link
              href={`/projects/${next.slug}`}
              className="group/nav focus-visible:ring-ring rounded-xs sm:text-right focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <span className="text-eyebrow text-muted-foreground flex items-center gap-2 uppercase sm:justify-end">
                Next project
                <ArrowRight
                  aria-hidden
                  className="text-gold-500 size-3.5 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/nav:translate-x-1"
                />
              </span>
              <span className="font-display text-foreground mt-3 block text-xl font-semibold">
                {next.title}
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
