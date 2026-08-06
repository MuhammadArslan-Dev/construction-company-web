import * as React from "react"

import { ImageReveal } from "@/components/motion/image-reveal"
import { Parallax } from "@/components/motion/parallax"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/shared/arrow-link"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { Section } from "@/components/shared/section"
import { capabilityStats } from "@/data/stats"
import { Counter } from "@/components/motion/counter"
import { unsplash } from "@/lib/images"

/**
 * Editorial introduction. Two-column split with offset imagery — the section
 * that establishes the site's magazine rhythm before the denser grids below.
 */
export function AboutIntro() {
  return (
    <Section id="about" tone="light">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Imagery ---------------------------------------------------- */}
          <div className="relative lg:col-span-5">
            <ImageReveal
              ratio="3/4"
              src={unsplash("photo-1541888946425-d81bb19240f5")}
              alt="Aerial view of a large construction site with crews and formwork"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full"
            />
            <Parallax
              distance={70}
              className="absolute -right-4 -bottom-16 hidden w-1/2 sm:block"
            >
              <ImageReveal
                ratio="1/1"
                src={unsplash("photo-1431576901776-e539bd916ba2", 1200)}
                alt="Glass office towers catching low golden light"
                sizes="25vw"
                className="border-background border-8"
              />
            </Parallax>
          </div>

          {/* Copy ------------------------------------------------------- */}
          <div className="lg:col-span-7 lg:pl-8">
            <RevealGroup step={0.1}>
              <RevealItem>
                <Eyebrow index="01">Who we are</Eyebrow>
              </RevealItem>

              <RevealItem>
                <h2 className="text-heading mt-6 max-w-2xl text-balance">
                  Twenty-five years of engineering conviction.
                </h2>
              </RevealItem>

              <RevealItem>
                <p className="text-lead text-muted-foreground mt-8 max-w-2xl text-pretty">
                  Meridian was founded on a simple refusal: that a building
                  should never be compromised by the schedule that produced it.
                  We self-perform structure and facade, employ our engineers
                  directly, and carry the risk our clients are asked to carry
                  everywhere else.
                </p>
              </RevealItem>

              <RevealItem>
                <p className="text-body text-muted-foreground mt-6 max-w-2xl">
                  Today that conviction spans eighteen countries and five
                  hundred completed projects — private residences, hospitals
                  that never closed during construction, and a 2.1km crossing
                  that met at mid-span with a nine millimetre error.
                </p>
              </RevealItem>

              <RevealItem className="mt-10">
                <ArrowLink href="/about">Our story</ArrowLink>
              </RevealItem>
            </RevealGroup>

            {/* Capability metrics -------------------------------------- */}
            <Reveal preset="up" className="mt-16">
              <dl className="border-hairline grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 lg:grid-cols-4">
                {capabilityStats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-foreground text-[clamp(1.6rem,1rem+1.6vw,2.25rem)] leading-none font-bold">
                      <Counter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </dd>
                    <dt className="text-eyebrow text-muted-foreground mt-3 uppercase">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
