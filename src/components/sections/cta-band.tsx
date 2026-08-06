import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"
import { ArrowLink } from "@/components/shared/arrow-link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Eyebrow } from "@/components/shared/eyebrow"
import { contactConfig } from "@/config/site"
import { unsplash } from "@/lib/images"

export function CtaBand() {
  return (
    <section className="dark relative isolate overflow-hidden bg-ink-950">
      <Image
        src={unsplash("photo-1541888946425-d81bb19240f5")}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-35"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,var(--color-ink-950)_18%,rgb(2_6_23_/_0.72)_60%,rgb(2_6_23_/_0.55)_100%)]"
      />

      <Container className="section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Start a conversation</Eyebrow>

            <TextReveal className="font-display mt-8 text-[clamp(2rem,1.4rem+2.8vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
              <>Tell us what you</>
              <>
                intend to{" "}
                <span className="whitespace-nowrap">
                  <span className="text-gold-500">build</span>.
                </span>
              </>
            </TextReveal>

            <Reveal preset="up" delay={0.15}>
              <p className="text-lead mt-8 max-w-xl text-pretty text-white/70">
                Send us a brief, a sketch or a single paragraph. A director will
                respond within two working days with an honest view of
                feasibility, programme and cost — before any commitment.
              </p>
            </Reveal>
          </div>

          <Reveal preset="up" delay={0.2} className="lg:col-span-5">
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="xl" variant="gold" className="flex-1">
                <Link href="/contact?intent=quote">
                  Request a Quote
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="onImage" className="flex-1">
                <Link href="/contact?intent=site-visit">Book a Site Visit</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-white/12 pt-8">
              {/* Points at About until the client supplies a profile PDF —
                  a dead .pdf link is worse than an honest destination. */}
              <ArrowLink href="/about" direction="up-right">
                <span className="inline-flex items-center gap-2">
                  <Download aria-hidden className="size-3.5" />
                  Company Profile
                </span>
              </ArrowLink>

              <a
                href={contactConfig.phoneHref}
                className="text-white/70 transition-colors hover:text-white"
              >
                <span className="text-eyebrow block text-white/70 uppercase">
                  Direct line
                </span>
                <span className="mt-2 block text-lg font-medium tabular">
                  {contactConfig.phone}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
