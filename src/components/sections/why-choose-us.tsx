import * as React from "react"

import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { valueProps } from "@/data/values"

/**
 * Why choose us. A hairline lattice rather than eight floating cards — the
 * negative-margin trick gives every cell a single shared border, and the gold
 * wash reveals on hover from the bottom edge.
 */
export function WhyChooseUs() {
  return (
    <Section id="why-meridian" tone="light">
      <Container>
        <SectionHeading
          split
          index="04"
          eyebrow="Why Meridian"
          title="Eight reasons boards sign with us."
          lead="Every claim on this page is a number we publish annually and submit to independent audit. If we miss one, it appears in the same report."
        />

        <RevealGroup
          step={0.06}
          className="border-hairline mt-16 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4"
        >
          {valueProps.map((value) => {
            const Icon = value.icon
            return (
              <RevealItem
                key={value.title}
                className="group/value border-hairline relative isolate overflow-hidden border-r border-b p-8 lg:p-10"
              >
                {/* Gold wash rises from the base edge on hover. */}
                <span
                  aria-hidden
                  className="from-gold-50 absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-t to-transparent transition-transform duration-600 ease-[var(--ease-luxe)] group-hover/value:scale-y-100"
                />

                <Icon
                  aria-hidden
                  className="text-gold-500 size-7 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/value:-translate-y-1"
                />

                <h3 className="font-display text-foreground mt-8 text-xl font-semibold">
                  {value.title}
                </h3>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {value.description}
                </p>

                {value.metric ? (
                  <p className="text-eyebrow text-accent-text mt-6 uppercase tabular">
                    {value.metric}
                  </p>
                ) : null}
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Container>
    </Section>
  )
}
