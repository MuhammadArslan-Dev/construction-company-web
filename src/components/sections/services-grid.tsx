import * as React from "react"
import Link from "next/link"

import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/shared/service-card"
import { featuredServices } from "@/data/services"

export function ServicesGrid() {
  const [lead, ...rest] = featuredServices

  return (
    <Section id="services" tone="muted">
      <Container>
        <SectionHeading
          split
          index="02"
          eyebrow="Capabilities"
          title="Fourteen disciplines. One delivery standard."
          lead="From a private villa to an 840MW power station, every project runs on the same programme discipline, the same safety regime and the same refusal to value-engineer a specification after contract."
          action={
            <Button asChild size="lg" variant="outline">
              <Link href="/services">All Services</Link>
            </Button>
          }
        />

        <RevealGroup step={0.09} className="mt-16 grid gap-5 lg:grid-cols-12">
          <RevealItem className="h-[26rem] lg:col-span-6 lg:row-span-2 lg:h-[45.25rem]">
            {lead ? <ServiceCard service={lead} large /> : null}
          </RevealItem>

          {rest.slice(0, 4).map((service) => (
            <RevealItem
              key={service.slug}
              className="h-[22rem] lg:col-span-3"
            >
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
