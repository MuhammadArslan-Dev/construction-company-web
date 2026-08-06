import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"
import { BreadcrumbSchema } from "@/components/seo/structured-data"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { cn } from "@/lib/utils"

export type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  index?: string
  /** Each child is one masked line of the headline. */
  children: React.ReactNode
  lead?: React.ReactNode
  crumbs?: Crumb[]
  image?: { url: string; alt: string }
  /** Metadata strip rendered along the base — project facts, category, etc. */
  meta?: { label: string; value: React.ReactNode }[]
  size?: "default" | "tall"
  className?: string
}

/**
 * Inner-page hero.
 *
 * Always ink-toned with a photographic bed, so the sticky header can run
 * transparent over it exactly as it does on the homepage. Headline lines are
 * authored by the caller — the component never guesses where to break.
 */
export function PageHero({
  eyebrow,
  index,
  children,
  lead,
  crumbs,
  image,
  meta,
  size = "default",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "dark bg-ink-950 relative isolate flex flex-col justify-end overflow-hidden",
        size === "tall"
          ? "min-h-[78svh] pt-36 pb-14"
          : "min-h-[58svh] pt-36 pb-14 lg:min-h-[64svh]",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div aria-hidden className="scrim-hero absolute inset-0 -z-10" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,var(--color-ink-800)_0%,var(--color-ink-950)_60%)]"
        />
      )}

      {/* Emitted alongside the visual breadcrumb so the structured data and
          what the reader sees are built from one source. */}
      {crumbs?.length ? <BreadcrumbSchema crumbs={crumbs} /> : null}

      <Container>
        {crumbs?.length ? (
          <Reveal preset="fade">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">
                {crumbs.map((crumb, crumbIndex) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {crumbIndex > 0 ? (
                      <ChevronRight aria-hidden className="size-3 opacity-50" />
                    ) : null}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/80" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        {eyebrow ? (
          <Reveal preset="fade">
            <Eyebrow index={index} className="text-white/70">
              {eyebrow}
            </Eyebrow>
          </Reveal>
        ) : null}

        <TextReveal
          as="h1"
          immediate
          delay={0.2}
          className="font-display mt-7 max-w-[20ch] text-[clamp(2.35rem,1.7rem+2.9vw,4.75rem)] leading-[0.99] font-extrabold tracking-[-0.035em] text-white"
        >
          {children}
        </TextReveal>

        {lead ? (
          <Reveal preset="up" delay={0.7}>
            <p className="text-lead mt-7 max-w-2xl text-pretty text-white/70">
              {lead}
            </p>
          </Reveal>
        ) : null}

        {meta?.length ? (
          <Reveal preset="up" delay={0.85}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/15 pt-8 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-eyebrow text-white/70 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2.5 text-base font-medium text-white tabular">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
