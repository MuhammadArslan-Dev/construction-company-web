import * as React from "react"

import { Container } from "@/components/shared/container"
import { clients } from "@/data/testimonials"
import { cn } from "@/lib/utils"

/**
 * Client wordmark marquee.
 *
 * Pure CSS: the list is rendered twice and the track translates exactly -50%,
 * so the loop is seamless without JavaScript measuring anything. The duplicate
 * is hidden from assistive technology. Pauses on hover; disabled entirely under
 * `prefers-reduced-motion` by the global media query in `globals.css`.
 */
function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-16 pr-16 lg:gap-24 lg:pr-24"
    >
      {clients.map((client) => (
        <li key={`${client.name}-${ariaHidden ? "dup" : "main"}`}>
          <span className="text-muted-foreground hover:text-foreground font-display text-lg font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-500 lg:text-xl">
            {client.wordmark}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function ClientsMarquee({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="clients-heading"
      className={cn("bg-background section-y-sm overflow-hidden", className)}
    >
      <Container>
        <h2
          id="clients-heading"
          className="text-eyebrow text-muted-foreground text-center uppercase"
        >
          Trusted by governments, developers and operators in 18 countries
        </h2>
      </Container>

      <div className="group/marquee relative mt-12 flex overflow-hidden">
        {/* Edge fades keep the loop from visibly clipping. */}
        <div
          aria-hidden
          className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent lg:w-40"
        />
        <div
          aria-hidden
          className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent lg:w-40"
        />

        <div className="flex animate-marquee group-hover/marquee:[animation-play-state:paused]">
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  )
}
