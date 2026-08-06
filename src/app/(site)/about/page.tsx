import type { Metadata } from "next"
import Image from "next/image"

import { Counter } from "@/components/motion/counter"
import { ImageReveal } from "@/components/motion/image-reveal"
import { Parallax } from "@/components/motion/parallax"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { CompanyTimeline } from "@/components/sections/company-timeline"
import { CtaBand } from "@/components/sections/cta-band"
import { ArrowLink } from "@/components/shared/arrow-link"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { StatBlock } from "@/components/shared/stat-block"
import {
  engineeringPrinciples,
  mission,
  sustainability,
  sustainabilityStats,
  values,
  vision,
} from "@/data/company"
import { heroStats } from "@/data/stats"
import { disciplines, leadership } from "@/data/team"
import { awards, certifications } from "@/data/testimonials"
import { unsplash } from "@/lib/images"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Twenty-five years of engineering conviction. The story, leadership, values and sustainability commitments behind Meridian Construction Group.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Meridian Construction Group",
    description:
      "Twenty-five years of engineering conviction across 18 countries and 500 completed projects.",
    url: "/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={{
          url: unsplash("photo-1531834685032-c34bf0d84c77"),
          alt: "Site crews fixing reinforcement cages on a live construction project",
        }}
        lead="Four engineers left a national contractor in 2001 over a value-engineering dispute. Twenty-five years later the argument has not changed — only the scale."
        meta={[
          { label: "Founded", value: String(siteConfig.founded) },
          { label: "Employees", value: "2,500+" },
          { label: "Countries", value: "18" },
          { label: "Projects", value: "500+" },
        ]}
      >
        <>Twenty-five years of</>
        <>
          engineering{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">conviction</span>.
          </span>
        </>
      </PageHero>

      {/* Story ------------------------------------------------------------ */}
      <Section tone="light">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <RevealGroup step={0.09}>
                <RevealItem>
                  <h2 className="text-heading max-w-2xl text-balance">
                    The argument we left over.
                  </h2>
                </RevealItem>
                <RevealItem>
                  <p className="text-lead text-muted-foreground mt-8 text-pretty">
                    In 2001 a client was told, three months before handover,
                    that the stone specified for their lobby would be replaced
                    with a cheaper composite. The saving was real. So was the
                    fact that nobody had asked. Four engineers resigned that
                    week and took the client with them.
                  </p>
                </RevealItem>
                <RevealItem>
                  <p className="text-body text-muted-foreground mt-6">
                    Meridian was built to make that substitution structurally
                    impossible. Specification is locked at contract. Structure
                    and facade — the two packages that decide whether a project
                    finishes on time — are self-performed rather than brokered
                    out. Engineers are employed directly, not hired by the
                    week. And the commercial model puts the risk on us: a
                    guaranteed maximum price means an error in our pricing is
                    an error we absorb.
                  </p>
                </RevealItem>
                <RevealItem>
                  <p className="text-body text-muted-foreground mt-6">
                    None of that is generous. It is simply the arrangement we
                    would want if we were the ones commissioning the building.
                  </p>
                </RevealItem>
                <RevealItem className="mt-10">
                  <ArrowLink href="/projects">See what it produces</ArrowLink>
                </RevealItem>
              </RevealGroup>
            </div>

            <div className="relative lg:col-span-5">
              <ImageReveal
                ratio="4/5"
                src={unsplash("photo-1541888946425-d81bb19240f5")}
                alt="Aerial view of a Meridian site during deck construction"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <Parallax
                distance={70}
                className="absolute -bottom-14 -left-6 hidden w-1/2 sm:block"
              >
                <ImageReveal
                  ratio="1/1"
                  src={unsplash("photo-1516216628859-9bccecab13ca", 1200)}
                  alt="Engineers taking a setting-out survey on site"
                  sizes="25vw"
                  className="border-background border-8"
                />
              </Parallax>
            </div>
          </div>

          <Reveal preset="up" className="mt-28 lg:mt-36">
            <StatBlock stats={heroStats} />
          </Reveal>
        </Container>
      </Section>

      {/* Mission & vision -------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <RevealGroup step={0.1} className="grid gap-6 lg:grid-cols-2">
            {[mission, vision].map((item) => {
              const Icon = item.icon
              return (
                <RevealItem
                  key={item.title}
                  className="bg-background flex flex-col rounded-xs p-9 lg:p-12"
                >
                  <Icon aria-hidden className="text-gold-500 size-7" />
                  <p className="text-eyebrow text-muted-foreground mt-8 uppercase">
                    {item.title}
                  </p>
                  <p className="font-display text-foreground mt-5 text-[clamp(1.35rem,1rem+1.1vw,1.9rem)] leading-snug font-semibold text-balance">
                    {item.statement}
                  </p>
                  <p className="text-muted-foreground mt-6 text-base leading-relaxed">
                    {item.body}
                  </p>
                </RevealItem>
              )
            })}
          </RevealGroup>

          {/* Values -------------------------------------------------------- */}
          <div className="mt-20">
            <SectionHeading
              split
              index="02"
              eyebrow="Values"
              title="Four commitments, written down."
              lead="Not a poster in reception. Each of these changes a contract clause, a reporting line or a hiring decision."
            />

            <RevealGroup
              step={0.07}
              className="border-hairline mt-14 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4"
            >
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <RevealItem
                    key={value.title}
                    className="border-hairline bg-background border-r border-b p-8 lg:p-10"
                  >
                    <Icon aria-hidden className="text-gold-500 size-6" />
                    <h3 className="font-display text-foreground mt-8 text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {value.body}
                    </p>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Timeline ---------------------------------------------------------- */}
      <Section tone="ink" id="timeline">
        <Container>
          <SectionHeading
            split
            index="03"
            eyebrow="Twenty-five years"
            title="Told through the decisions."
            lead="Revenue milestones are not interesting. These are the eight choices that made the company what it is."
          />
          <div className="mt-20">
            <CompanyTimeline />
          </div>
        </Container>
      </Section>

      {/* Engineering excellence -------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="04"
            eyebrow="Engineering excellence"
            title="Three rules that are never waived."
            lead="Every project, every country, every contract value. There is no version of Meridian that operates differently on a small job."
          />

          <RevealGroup step={0.09} className="mt-16 grid gap-10 lg:grid-cols-3">
            {engineeringPrinciples.map((principle, index) => (
              <RevealItem key={principle.title}>
                <p className="text-accent-text font-mono text-sm tabular">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-foreground mt-5 text-xl font-semibold lg:text-2xl">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  {principle.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal preset="up" className="mt-20">
            <dl className="border-hairline grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-12 lg:grid-cols-4">
              {disciplines.map((discipline) => (
                <div key={discipline.label}>
                  <dd className="font-display text-foreground text-[clamp(1.75rem,1.1rem+1.8vw,2.5rem)] leading-none font-bold">
                    <Counter value={discipline.count} />
                  </dd>
                  <dt className="text-eyebrow text-muted-foreground mt-4 uppercase">
                    {discipline.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Leadership --------------------------------------------------------- */}
      <Section tone="muted" id="leadership">
        <Container>
          <SectionHeading
            split
            index="05"
            eyebrow="Leadership"
            title="The people who sign it off."
            lead="Eight executives, six nationalities, and an average of nineteen years inside the business. Every one of them has worked on a site."
          />

          <RevealGroup
            step={0.07}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {leadership.map((member) => (
              <RevealItem key={member.name} className="group/member">
                <div className="bg-background relative aspect-4/5 overflow-hidden rounded-xs">
                  <Image
                    src={member.portrait.url}
                    alt={member.portrait.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-[1200ms] ease-[var(--ease-luxe)] group-hover/member:scale-[1.04] group-hover/member:grayscale-0"
                  />
                </div>
                <h3 className="font-display text-foreground mt-6 text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-accent-text text-eyebrow mt-2 uppercase">
                  {member.role}
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {member.bio}
                </p>
                {member.location ? (
                  <p className="text-muted-foreground mt-4 font-mono text-[11px] tracking-[0.14em] uppercase">
                    {member.location}
                  </p>
                ) : null}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Sustainability ------------------------------------------------------ */}
      <Section tone="ink" id="sustainability">
        <Container>
          <SectionHeading
            split
            index="06"
            eyebrow="Sustainability"
            title="Carbon is a design decision, not a report."
            lead="Sustainability sits outside operations and has the authority to stop a scheme at concept stage. It has used it eleven times."
          />

          <RevealGroup step={0.08} className="mt-16 grid gap-10 lg:grid-cols-3">
            {sustainability.map((item) => {
              const Icon = item.icon
              return (
                <RevealItem key={item.title}>
                  <Icon aria-hidden className="text-gold-500 size-7" />
                  <h3 className="font-display mt-7 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                    {item.body}
                  </p>
                </RevealItem>
              )
            })}
          </RevealGroup>

          <Reveal preset="up" className="mt-20">
            <StatBlock stats={sustainabilityStats} />
          </Reveal>
        </Container>
      </Section>

      {/* Awards & certifications ---------------------------------------------- */}
      <Section tone="light" id="awards">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <SectionHeading
                index="07"
                eyebrow="Recognition"
                title="Awards."
              />
              <RevealGroup step={0.07} className="border-hairline mt-10 border-t">
                {awards.map((award) => (
                  <RevealItem
                    key={`${award.year}-${award.title}`}
                    className="border-hairline flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b py-6"
                  >
                    <span className="text-accent-text font-mono text-sm tabular">
                      {award.year}
                    </span>
                    <span className="text-foreground flex-1 text-base font-medium">
                      {award.title}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {award.awarding}
                      {award.project ? ` · ${award.project}` : ""}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Certifications" title="Standards." />
              <RevealGroup step={0.07} className="mt-10 space-y-4">
                {certifications.map((certification) => (
                  <RevealItem
                    key={certification.code}
                    className="border-border rounded-xs border p-6"
                  >
                    <p className="font-display text-foreground text-lg font-bold tabular">
                      {certification.code}
                    </p>
                    <p className="text-foreground mt-1 text-sm font-medium">
                      {certification.title}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {certification.description}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal preset="up" className="mt-10">
                <ArrowLink href="/careers" direction="up-right">
                  Work with us
                </ArrowLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <ClientsMarquee />
      <CtaBand />
    </>
  )
}
