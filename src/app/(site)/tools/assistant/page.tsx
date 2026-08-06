import type { Metadata } from "next"

import { AssistantChat } from "@/components/assistant/assistant-chat"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { jobs } from "@/data/jobs"
import { offices } from "@/data/offices"
import { projects } from "@/data/projects"
import { services } from "@/data/services"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "AI Construction Assistant",
  description:
    "Ask about our services, projects, offices, delivery process and construction costs. Answers are drawn from Meridian's own published data.",
  alternates: { canonical: "/tools/assistant" },
  openGraph: {
    title: "AI Construction Assistant — Meridian Construction Group",
    description:
      "Ask about any Meridian project, capability, programme or cost — answered from our own data.",
    url: "/tools/assistant",
  },
}

const boundaries = [
  {
    title: "It answers from this site",
    body: `Every service, project, office, role and cost figure it can cite is published here — ${services.length} services, ${projects.length} projects, ${offices.length} offices, ${jobs.length} open roles. When something is not on the site, it says so instead of inventing it.`,
  },
  {
    title: "It shares the estimator's maths",
    body: "Cost answers run through the same model as /tools/cost-estimator, so the two can never disagree. Anything undesigned comes back as a range with its assumptions stated.",
  },
  {
    title: "It is not a contract",
    body: "Nothing here is an offer, a programme commitment or a price. A director confirms anything contractual — usually within two working days of an enquiry.",
  },
]

export default function AssistantPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        index="01"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "AI Assistant" },
        ]}
        image={{
          url: unsplash("photo-1497366216548-37526070297c"),
          alt: "Meeting room table with drawings and laptops",
        }}
        lead="Ask what you would ask a project director in a first call — what have you built like this, how long does it take, what will it cost, who would run it. The assistant answers from what we publish, and hands you to a person when that is the honest answer."
        meta={[
          { label: "Services", value: String(services.length) },
          { label: "Projects", value: String(projects.length) },
          { label: "Offices", value: String(offices.length) },
          { label: "Open roles", value: String(jobs.length) },
        ]}
      >
        <>Ask us</>
        <>
          anything{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">first</span>.
          </span>
        </>
      </PageHero>

      <Section tone="light">
        <Container>
          <AssistantChat
            variant="page"
            autoFocus
            className="h-[min(44rem,calc(100dvh-10rem))]"
          />

          <div className="mt-20 grid gap-10 sm:grid-cols-3">
            {boundaries.map((item, index) => (
              <div key={item.title} className="border-border border-t pt-6">
                <span className="text-muted-foreground font-mono text-xs tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-foreground mt-4 text-lg font-semibold">
                  {item.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
