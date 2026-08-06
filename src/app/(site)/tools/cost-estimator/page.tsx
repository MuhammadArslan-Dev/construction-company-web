import type { Metadata } from "next"

import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { CostEstimator } from "@/components/tools/cost-estimator"
import { buildTypes, regions } from "@/lib/estimator"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "Construction Cost Estimator",
  description:
    "Estimate the construction cost of a villa, tower, hospital, hotel, school, warehouse or infrastructure scheme across eight regions — with a full element-by-element breakdown.",
  alternates: { canonical: "/tools/cost-estimator" },
  openGraph: {
    title: "Construction Cost Estimator — Meridian Construction Group",
    description:
      "An indicative construction cost in seconds, with the multipliers shown rather than hidden.",
    url: "/tools/cost-estimator",
  },
}

const excluded = [
  "Land acquisition and site purchase",
  "Professional fees and statutory charges",
  "Finance, insurance and developer overhead",
  "Tenant fit-out beyond shell and core",
  "Process equipment on industrial schemes",
  "Inflation beyond the current construction year",
]

export default function CostEstimatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        index="01"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Cost Estimator" },
        ]}
        image={{
          url: unsplash("photo-1487958449943-2429e8be8625"),
          alt: "Concrete and glass structure viewed from below against the sky",
        }}
        lead="Every estimate here is a range, because a single number for a building that has not been designed is a sales tactic, not an answer. What you get is the range, the rate, the programme and the arithmetic behind all three."
        meta={[
          { label: "Build types", value: String(buildTypes.length) },
          { label: "Regions", value: String(regions.length) },
          { label: "Accuracy band", value: "±18%" },
          { label: "Response", value: "Instant" },
        ]}
      >
        <>What it costs</>
        <>
          to build{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">it</span>.
          </span>
        </>
      </PageHero>

      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="Estimator"
            title="Set the parameters. The number moves as you do."
            lead="Rates are order-of-magnitude figures for construction works only. They move with specification, height, scale and region — all four are visible below."
          />
          <div className="mt-16">
            <CostEstimator />
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacing="compact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-display text-foreground text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight font-bold tracking-tight">
                What the number does not include.
              </h2>
              <p className="text-muted-foreground mt-5 text-pretty">
                Being clear about the exclusions is what separates an estimate
                from a guess. Everything below sits outside the construction
                cost and is priced separately once a scheme is defined.
              </p>
            </div>
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:col-span-7">
              {excluded.map((item, index) => (
                <li key={item} className="border-border flex gap-4 border-t pt-4">
                  <span className="text-muted-foreground font-mono text-xs tabular">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground/85 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
