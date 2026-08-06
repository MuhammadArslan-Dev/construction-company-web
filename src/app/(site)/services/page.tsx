import type { Metadata } from "next"

import { ServicesExplorer } from "@/app/(site)/services/services-explorer"
import { CtaBand } from "@/components/sections/cta-band"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/shared/service-card"
import { categoryBlurbs, serviceCategories, services } from "@/data/services"
import { processSteps } from "@/data/process"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fourteen construction and engineering disciplines under one delivery standard — luxury villas, high-rise towers, shopping malls, industrial plants, bridges, roads and nation-scale infrastructure.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Meridian Construction Group",
    description:
      "Fourteen construction and engineering disciplines under one delivery standard.",
    url: "/services",
  },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={{
          url: unsplash("photo-1541888946425-d81bb19240f5"),
          alt: "Aerial view of a large construction site with crews and formwork",
        }}
        lead="One organisation, fourteen disciplines, and a single delivery standard that does not bend for the size of the contract."
        meta={[
          { label: "Disciplines", value: "14" },
          { label: "Countries", value: "18" },
          { label: "Projects", value: "500+" },
          { label: "On-Time", value: "96%" },
        ]}
      >
        <>Everything we</>
        <>
          know how to{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">build</span>.
          </span>
        </>
      </PageHero>

      {/* Explorer -------------------------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="The full list"
            title="Fourteen disciplines."
            lead="Filter by the kind of work you need. Every discipline below is self-performed or led by directly employed Meridian engineers — none of it is brokered out."
          />
          <div className="mt-16">
            {/* Cards are rendered here, on the server, and handed to the
                client filter as nodes — a `Service` carries a LucideIcon
                function that cannot cross the RSC boundary. */}
            <ServicesExplorer
              items={services.map((service) => ({
                slug: service.slug,
                category: service.category,
                card: <ServiceCard service={service} />,
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* Category explainer ---------------------------------------------- */}
      <Section tone="muted" spacing="compact">
        <Container>
          <RevealGroup step={0.08} className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category) => {
              const count = services.filter((s) => s.category === category).length
              return (
                <RevealItem
                  key={category}
                  className="bg-background flex flex-col p-8 lg:p-10"
                >
                  <span className="text-accent-text font-mono text-xs tabular">
                    {String(count).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-foreground mt-5 text-xl font-semibold">
                    {category}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {categoryBlurbs[category]}
                  </p>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* How every engagement runs --------------------------------------- */}
      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="03"
            eyebrow="Common to all fourteen"
            title="The same six stages, every time."
            lead="Whichever discipline you engage, the sequence and the reporting are identical. It is the reason a villa and a power station feel like the same company."
          />

          <RevealGroup
            step={0.06}
            className="border-hairline mt-16 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3"
          >
            {processSteps.map((step) => {
              const Icon = step.icon
              return (
                <RevealItem
                  key={step.index}
                  className="border-hairline border-r border-b p-8 lg:p-10"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground font-mono text-sm tabular">
                      {step.index}
                    </span>
                    <Icon aria-hidden className="text-gold-500 size-5" />
                  </div>
                  <h3 className="font-display text-foreground mt-6 text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
