import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin } from "lucide-react"

import { ApplicationForm } from "@/components/forms/application-form"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/shared/arrow-link"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { contactConfig, siteConfig } from "@/config/site"
import { benefits } from "@/data/culture"
import { getJob, jobs } from "@/data/jobs"
import { formatDate } from "@/lib/format"
import { unsplash } from "@/lib/images"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return jobs.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) return { title: "Role not found" }

  return {
    title: `${job.title} — ${job.location}`,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: {
      type: "article",
      title: `${job.title} — ${siteConfig.name}`,
      description: job.summary,
      url: `/careers/${job.slug}`,
    },
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) notFound()

  const similar = jobs
    .filter((item) => item.department === job.department && item.slug !== job.slug)
    .slice(0, 3)

  /* JobPosting structured data — this one Google genuinely indexes, so the
     required fields (datePosted, hiringOrganization, jobLocation) are all
     present rather than approximated. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType:
      job.type === "Full-time"
        ? "FULL_TIME"
        : job.type === "Contract"
          ? "CONTRACTOR"
          : "INTERN",
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteConfig.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: job.country,
      },
    },
    industry: "Construction",
    occupationalCategory: job.department,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`${job.department} · ${job.seniority}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title },
        ]}
        image={{
          url: unsplash("photo-1516216628859-9bccecab13ca"),
          alt: "Engineers taking a setting-out survey on a construction site",
        }}
        lead={job.summary}
        meta={[
          { label: "Location", value: job.location },
          { label: "Type", value: job.type },
          { label: "Seniority", value: job.seniority },
          { label: "Posted", value: formatDate(job.postedAt) },
        ]}
      >
        <>{job.title}</>
      </PageHero>

      {/* Role detail ------------------------------------------------------ */}
      <Section tone="light">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal preset="up">
                <h2 className="text-subheading">What you will do</h2>
              </Reveal>
              <RevealGroup step={0.07} className="border-hairline mt-8 border-t">
                {job.responsibilities.map((item, index) => (
                  <RevealItem
                    key={item}
                    className="border-hairline flex gap-6 border-b py-5"
                  >
                    <span className="text-muted-foreground font-mono text-xs tabular">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground text-base">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal preset="up" className="mt-16">
                <h2 className="text-subheading">What we are looking for</h2>
              </Reveal>
              <RevealGroup step={0.07} className="mt-8 space-y-4">
                {job.requirements.map((item) => (
                  <RevealItem key={item} className="flex items-start gap-4">
                    <Check
                      aria-hidden
                      className="text-gold-500 mt-1 size-4 shrink-0"
                    />
                    <span className="text-muted-foreground text-base">
                      {item}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal preset="up" className="mt-12">
                <Button asChild size="xl" variant="gold">
                  <Link href="#apply">
                    Apply for this role
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </Reveal>
            </div>

            {/* Aside ------------------------------------------------------- */}
            <Reveal preset="up" delay={0.1} className="lg:col-span-5">
              <div className="border-border rounded-xs border p-8">
                <h2 className="text-eyebrow text-muted-foreground uppercase">
                  At a glance
                </h2>
                <dl className="divide-hairline mt-6 divide-y">
                  {[
                    { label: "Department", value: job.department },
                    { label: "Location", value: job.location },
                    { label: "Country", value: job.country },
                    { label: "Contract", value: job.type },
                    { label: "Seniority", value: job.seniority },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <dt className="text-muted-foreground text-sm">
                        {row.label}
                      </dt>
                      <dd className="text-foreground text-sm font-medium">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
                  Questions before applying? Write to{" "}
                  <a
                    href={`mailto:${contactConfig.careersEmail}`}
                    className="text-accent-text underline underline-offset-4"
                  >
                    {contactConfig.careersEmail}
                  </a>{" "}
                  — a member of the hiring team will reply, not an autoresponder.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-eyebrow text-muted-foreground uppercase">
                  What comes with it
                </h2>
                <ul className="mt-6 space-y-4">
                  {benefits.slice(0, 4).map((benefit) => {
                    const Icon = benefit.icon
                    return (
                      <li key={benefit.title} className="flex items-start gap-3">
                        <Icon
                          aria-hidden
                          className="text-gold-500 mt-0.5 size-4 shrink-0"
                        />
                        <span className="text-muted-foreground text-sm">
                          {benefit.title}
                        </span>
                      </li>
                    )
                  })}
                </ul>
                <ArrowLink href="/careers" className="mt-8">
                  All benefits
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Application ------------------------------------------------------- */}
      <Section tone="muted" id="apply">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Apply"
                title="Send it to a person."
                lead="No timed assessment, no cover-letter template. A member of the hiring team reads every application and replies within five working days."
              />
              <Reveal preset="up" className="mt-10">
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin aria-hidden className="text-gold-500 size-4" />
                  {job.location} · {job.type}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Similar roles ------------------------------------------------------ */}
      {similar.length ? (
        <Section tone="light" spacing="compact">
          <Container>
            <SectionHeading
              split
              eyebrow="Also open"
              title={`More in ${job.department}.`}
              action={
                <Button asChild size="lg" variant="outline">
                  <Link href="/careers#open-roles">All roles</Link>
                </Button>
              }
            />
            <RevealGroup step={0.08} className="border-hairline mt-12 border-t">
              {similar.map((item) => (
                <RevealItem key={item.slug} className="border-hairline border-b">
                  <Link
                    href={`/careers/${item.slug}`}
                    className="group/role focus-visible:ring-ring grid gap-3 rounded-xs py-6 focus-visible:ring-2 lg:grid-cols-12 lg:items-center"
                  >
                    <h3 className="font-display text-foreground text-lg font-semibold lg:col-span-6">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm lg:col-span-4">
                      {item.location}
                    </p>
                    <p className="text-muted-foreground text-eyebrow uppercase lg:col-span-2 lg:text-right">
                      {item.type}
                    </p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
