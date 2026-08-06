import type { Metadata } from "next"
import Image from "next/image"

import { RolesExplorer } from "@/app/(site)/careers/roles-explorer"
import { Counter } from "@/components/motion/counter"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  benefits,
  cultureImages,
  culturePoints,
  hiringSteps,
} from "@/data/culture"
import {
  departments,
  employmentTypes,
  jobLocations,
  jobs,
} from "@/data/jobs"
import { disciplines } from "@/data/team"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Meridian Construction Group — engineering, architecture, project delivery, digital, sustainability and site operations across 18 countries.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — Meridian Construction Group",
    description:
      "Build a career that outlives you. Open roles across 18 countries.",
    url: "/careers",
  },
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        image={{
          url: unsplash("photo-1614127938540-a1139bee1841"),
          alt: "Steel erectors working at height on a structural frame",
        }}
        lead="Two and a half thousand people in eighteen countries. Every one of them has the written authority to stop an unsafe operation."
        meta={[
          { label: "Open Roles", value: String(jobs.length) },
          { label: "Countries", value: "18" },
          { label: "Employees", value: "2,500+" },
          { label: "Chartered Leads", value: "100%" },
        ]}
      >
        <>Build a career</>
        <>
          that{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">outlives</span> you.
          </span>
        </>
      </PageHero>

      {/* Culture ---------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="Culture"
            title="Three things to know before you apply."
            lead="They are not perks. Each one will shape what your week actually looks like, and each one puts some people off — which is the point of saying them out loud."
          />

          <RevealGroup step={0.09} className="mt-16 grid gap-10 lg:grid-cols-3">
            {culturePoints.map((point, index) => (
              <RevealItem key={point.title}>
                <p className="text-accent-text font-mono text-sm tabular">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-foreground mt-5 text-xl font-semibold lg:text-2xl">
                  {point.title}
                </h3>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  {point.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup
            step={0.07}
            className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {cultureImages.map((image, index) => (
              <RevealItem
                key={image.url}
                className={index % 3 === 0 ? "aspect-4/5" : "aspect-square"}
              >
                <div className="bg-muted relative size-full overflow-hidden rounded-xs">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Benefits ---------------------------------------------------------- */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            split
            index="03"
            eyebrow="Benefits"
            title="What we actually pay for."
            lead="Chartership, relocation, medical cover on the same terms for site staff as for directors, and a single profit share paid at the same percentage of salary at every grade."
          />

          <RevealGroup
            step={0.06}
            className="mt-16 grid grid-cols-1 gap-px border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <RevealItem
                  key={benefit.title}
                  className="border-b border-white/10 py-9 lg:px-8 lg:first:pl-0"
                >
                  <Icon aria-hidden className="text-gold-500 size-6" />
                  <h3 className="font-display mt-7 text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {benefit.body}
                  </p>
                </RevealItem>
              )
            })}
          </RevealGroup>

          <Reveal preset="up" className="mt-20">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-12 lg:grid-cols-4">
              {disciplines.map((discipline) => (
                <div key={discipline.label}>
                  <dd className="font-display text-[clamp(1.75rem,1.1rem+1.8vw,2.5rem)] leading-none font-bold text-white">
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

      {/* Open roles --------------------------------------------------------- */}
      <Section tone="light" id="open-roles">
        <Container>
          <SectionHeading
            split
            index="04"
            eyebrow="Open roles"
            title={`${jobs.length} positions, ${jobLocations.length} countries.`}
            lead="Every role below is live and directly employed. We do not advertise positions we have already filled internally."
          />

          <div className="mt-16">
            <RolesExplorer
              jobs={jobs}
              departments={departments}
              countries={jobLocations}
              types={employmentTypes}
            />
          </div>
        </Container>
      </Section>

      {/* Hiring process ------------------------------------------------------ */}
      <Section tone="muted" spacing="compact">
        <Container>
          <SectionHeading
            split
            index="05"
            eyebrow="How hiring works"
            title="Four steps. No timed tests."
            lead="You will speak to the person who would manage you, and you will spend half a day on one of our sites before you have to decide."
          />

          <RevealGroup
            step={0.08}
            className="border-hairline mt-14 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4"
          >
            {hiringSteps.map((step, index) => (
              <RevealItem
                key={step.title}
                className="border-hairline bg-background border-r border-b p-8 lg:p-10"
              >
                <p className="text-accent-text font-mono text-xs tabular">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-foreground mt-6 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {step.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
