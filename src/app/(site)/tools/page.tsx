import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calculator, MessageSquareText } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { buildTypes, regions } from "@/lib/estimator"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "Tools",
  description:
    "An indicative construction cost estimator and an AI assistant trained on Meridian's own projects, services and delivery process.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Tools — Meridian Construction Group",
    description:
      "Estimate a construction cost in seconds, or ask our assistant about any project we have delivered.",
    url: "/tools",
  },
}

const tools = [
  {
    href: "/tools/cost-estimator",
    icon: Calculator,
    title: "Cost estimator",
    lead: `An order-of-magnitude construction cost across ${buildTypes.length} build types and ${regions.length} regions, broken down element by element — with the multipliers shown rather than hidden.`,
    meta: "Instant · No sign-up",
  },
  {
    href: "/tools/assistant",
    icon: MessageSquareText,
    title: "AI construction assistant",
    lead: "Ask about a project, a capability, a programme or a cost. It answers from what this site publishes, and says so plainly when it does not know.",
    meta: "Conversational · Grounded in our data",
  },
]

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        image={{
          url: unsplash("photo-1503387762-592deb58ef4e"),
          alt: "Architectural drawings and a scale rule on a working desk",
        }}
        lead="Two things every client asks before they are ready to talk: what will it cost, and have you built anything like it. Answer both here, without filling in a form first."
        meta={[
          { label: "Build types", value: String(buildTypes.length) },
          { label: "Regions", value: String(regions.length) },
          { label: "Sign-up", value: "None" },
          { label: "Cost", value: "Free" },
        ]}
      >
        <>Answers before</>
        <>
          the{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">meeting</span>.
          </span>
        </>
      </PageHero>

      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="What's here"
            title="Two tools, both built on the same numbers we quote from."
            lead="The estimator and the assistant share one cost model. Neither will give you a figure the other contradicts."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {tools.map((tool, index) => (
              <Reveal key={tool.href} preset="up" delay={index * 0.08}>
                <Link
                  href={tool.href}
                  className="border-border hover:border-foreground/35 focus-visible:ring-ring group flex h-full flex-col rounded-xs border p-9 transition-colors duration-500 focus-visible:ring-2 lg:p-11"
                >
                  <span
                    aria-hidden
                    className="border-border text-accent-text group-hover:border-foreground/35 flex size-12 items-center justify-center rounded-full border transition-colors duration-500"
                  >
                    <tool.icon className="size-5" />
                  </span>
                  <h3 className="font-display text-foreground mt-8 text-2xl font-bold tracking-tight lg:text-3xl">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground mt-4 flex-1 text-pretty">
                    {tool.lead}
                  </p>
                  <span className="mt-8 flex items-center justify-between gap-4">
                    <span className="text-eyebrow text-muted-foreground uppercase">
                      {tool.meta}
                    </span>
                    <span className="text-foreground inline-flex items-center gap-2 text-sm font-medium">
                      Open
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
