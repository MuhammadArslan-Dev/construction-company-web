import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Info } from "lucide-react"

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { getLegalDocument, legalDocuments } from "@/data/legal"
import { formatDate } from "@/lib/format"
import { legalNav } from "@/config/navigation"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return legalDocuments.map((document) => ({ slug: document.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const document = getLegalDocument(slug)
  if (!document) return { title: "Not found" }

  return {
    title: document.title,
    description: document.summary,
    alternates: { canonical: `/legal/${document.slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const document = getLegalDocument(slug)
  if (!document) notFound()

  return (
    <>
      <PageHero
        eyebrow="Legal"
        crumbs={[{ label: "Home", href: "/" }, { label: document.title }]}
        lead={document.summary}
        meta={[{ label: "Last updated", value: formatDate(document.updated) }]}
      >
        <>{document.title}</>
      </PageHero>

      <Section tone="light">
        <Container size="editorial">
          <Reveal preset="up">
            <p className="border-border text-muted-foreground flex gap-3 rounded-xs border p-5 text-sm leading-relaxed">
              <Info aria-hidden className="text-gold-500 mt-0.5 size-4 shrink-0" />
              <span>
                This document is a drafted starting point and has not been
                reviewed by legal counsel. It should be reviewed and adopted by
                the company&apos;s solicitors before launch.
              </span>
            </p>
          </Reveal>

          <RevealGroup step={0.06} className="mt-14 space-y-12">
            {document.sections.map((section) => (
              <RevealItem key={section.heading}>
                <h2 className="text-subheading text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-body text-muted-foreground text-pretty"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal preset="up" className="border-hairline mt-16 border-t pt-10">
            <p className="text-eyebrow text-muted-foreground uppercase">
              Other policies
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {legalNav
                .filter((link) => !link.href.endsWith(document.slug))
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-accent-text text-sm underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
