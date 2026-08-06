import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

import { Counter } from "@/components/motion/counter"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { CtaBand } from "@/components/sections/cta-band"
import { ArrowLink } from "@/components/shared/arrow-link"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { getService, services } from "@/data/services"
import { getProject, sectorLabels } from "@/data/projects"
import { formatYear } from "@/lib/format"
import { siteConfig } from "@/config/site"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) return { title: "Service not found" }

  return {
    title: service.title,
    description: service.excerpt,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — ${siteConfig.name}`,
      description: service.excerpt,
      url: `/services/${service.slug}`,
      images: [{ url: service.image.url, alt: service.image.alt }],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  const index = services.findIndex((item) => item.slug === service.slug)
  const previous = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]

  const related = service.relatedProjects
    .map((projectSlug) => getProject(projectSlug))
    .filter((project) => project !== undefined)

  return (
    <>
      <PageHero
        eyebrow={service.category}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        image={service.image}
        lead={service.excerpt}
        size="tall"
      >
        <>{service.title}</>
      </PageHero>

      {/* Overview -------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal preset="up">
                <p className="text-lead text-foreground text-pretty">
                  {service.description}
                </p>
              </Reveal>

              <RevealGroup step={0.07} className="mt-12 flex flex-wrap gap-3">
                {service.highlights.map((highlight) => (
                  <RevealItem key={highlight}>
                    <span className="border-border text-muted-foreground inline-flex items-center gap-2 rounded-xs border px-4 py-2 text-sm">
                      <Check aria-hidden className="text-gold-500 size-3.5" />
                      {highlight}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* Metrics ---------------------------------------------------- */}
            <Reveal preset="up" delay={0.1} className="lg:col-span-5">
              <dl className="border-hairline divide-hairline divide-y border-t border-b">
                {service.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-baseline justify-between gap-6 py-6"
                  >
                    <dt className="text-eyebrow text-muted-foreground uppercase">
                      {metric.label}
                    </dt>
                    <dd className="font-display text-foreground text-3xl font-bold lg:text-4xl">
                      <Counter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        decimals={metric.decimals}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Deliverables ----------------------------------------------------- */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            split
            eyebrow="What you receive"
            title="Defined in the contract, not the conversation."
            lead="Every engagement in this discipline carries the same schedule of deliverables. Nothing on this list is an optional extra."
          />

          <RevealGroup
            step={0.07}
            className="mt-16 grid gap-px border-t border-white/10 lg:grid-cols-2"
          >
            {service.deliverables.map((deliverable, deliverableIndex) => (
              <RevealItem
                key={deliverable}
                className="flex items-start gap-6 border-b border-white/10 py-7 lg:px-2"
              >
                <span className="text-accent-text font-mono text-xs tabular">
                  {String(deliverableIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground text-lg">{deliverable}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Evidence --------------------------------------------------------- */}
      {related.length ? (
        <Section tone="light">
          <Container>
            <SectionHeading
              split
              eyebrow="Evidence"
              title="Where we have done this."
              lead="Reference projects you can visit, with clients who will take your call."
            />

            <RevealGroup
              step={0.08}
              className="mt-16 grid gap-5 md:grid-cols-2"
            >
              {related.map((project) => (
                <RevealItem key={project.slug} className="h-[24rem]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/ref focus-visible:ring-ring relative isolate flex size-full flex-col justify-end overflow-hidden rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4"
                  >
                    <Image
                      src={project.hero.url}
                      alt={project.hero.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="-z-10 object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover/ref:scale-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="scrim-bottom absolute inset-0 -z-10"
                    />
                    <div className="p-7">
                      <p className="text-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60 uppercase">
                        <span>{sectorLabels[project.sector]}</span>
                        <span aria-hidden className="bg-gold-500 h-px w-5" />
                        <span>
                          {project.city}, {project.country}
                        </span>
                      </p>
                      <h3 className="font-display mt-4 text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/65">
                        {project.client}
                        {project.completedAt
                          ? ` · ${formatYear(project.completedAt)}`
                          : ""}
                      </p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal preset="up" className="mt-12">
              <ArrowLink href="/projects">All Projects</ArrowLink>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* Adjacent disciplines --------------------------------------------- */}
      <Section tone="muted" spacing="compact">
        <Container>
          <div className="border-hairline grid gap-8 border-t pt-10 sm:grid-cols-2">
            <Link
              href={`/services/${previous.slug}`}
              className="group/nav focus-visible:ring-ring rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <span className="text-eyebrow text-muted-foreground flex items-center gap-2 uppercase">
                <ArrowLeft
                  aria-hidden
                  className="text-gold-500 size-3.5 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/nav:-translate-x-1"
                />
                Previous
              </span>
              <span className="font-display text-foreground mt-3 block text-xl font-semibold">
                {previous.title}
              </span>
            </Link>

            <Link
              href={`/services/${next.slug}`}
              className="group/nav focus-visible:ring-ring rounded-xs sm:text-right focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <span className="text-eyebrow text-muted-foreground flex items-center gap-2 uppercase sm:justify-end">
                Next
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

          <Reveal preset="up" className="mt-14">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">All Services</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
