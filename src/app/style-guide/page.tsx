import type { Metadata } from "next"
import {
  Building2,
  Compass,
  HardHat,
  Landmark,
  Layers,
  ShieldCheck,
} from "lucide-react"

import { Counter } from "@/components/motion/counter"
import { ImageReveal, MediaFrame } from "@/components/motion/image-reveal"
import { Parallax } from "@/components/motion/parallax"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { TextReveal, WordReveal } from "@/components/motion/text-reveal"
import { ArrowLink } from "@/components/shared/arrow-link"
import { Container } from "@/components/shared/container"
import { Eyebrow, GoldRule } from "@/components/shared/eyebrow"
import { CardIcon, LuxeCard } from "@/components/shared/luxe-card"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { StatBlock } from "@/components/shared/stat-block"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal reference for the Meridian design language.",
  robots: { index: false, follow: false },
}

/* Class names are written out in full — Tailwind scans source statically, so
   an interpolated `bg-ink-${step}` would never make it into the stylesheet. */
const inkRamp = [
  { step: "50", hex: "#F8FAFC", bg: "bg-ink-50", fg: "text-ink-900/50" },
  { step: "100", hex: "#F1F5F9", bg: "bg-ink-100", fg: "text-ink-900/50" },
  { step: "200", hex: "#E2E8F0", bg: "bg-ink-200", fg: "text-ink-900/50" },
  { step: "300", hex: "#CBD5E1", bg: "bg-ink-300", fg: "text-ink-900/50" },
  { step: "400", hex: "#94A3B8", bg: "bg-ink-400", fg: "text-ink-900/60" },
  { step: "500", hex: "#64748B", bg: "bg-ink-500", fg: "text-white/70" },
  { step: "600", hex: "#475569", bg: "bg-ink-600", fg: "text-white/70" },
  { step: "700", hex: "#334155", bg: "bg-ink-700", fg: "text-white/70" },
  { step: "800", hex: "#1E293B", bg: "bg-ink-800", fg: "text-white/70" },
  { step: "900", hex: "#0F172A", bg: "bg-ink-900", fg: "text-white/70" },
  { step: "950", hex: "#020617", bg: "bg-ink-950", fg: "text-white/70" },
]

const goldRamp = [
  { step: "50", hex: "#FBF8F0", bg: "bg-gold-50", fg: "text-ink-900/50" },
  { step: "100", hex: "#F6EDD8", bg: "bg-gold-100", fg: "text-ink-900/50" },
  { step: "200", hex: "#ECD9AB", bg: "bg-gold-200", fg: "text-ink-900/50" },
  { step: "300", hex: "#DFC07C", bg: "bg-gold-300", fg: "text-ink-900/60" },
  { step: "400", hex: "#D4AC58", bg: "bg-gold-400", fg: "text-ink-900/60" },
  { step: "500", hex: "#C89B3C", bg: "bg-gold-500", fg: "text-white/80" },
  { step: "600", hex: "#A87F2E", bg: "bg-gold-600", fg: "text-white/80" },
  { step: "700", hex: "#856225", bg: "bg-gold-700", fg: "text-white/80" },
  { step: "800", hex: "#614721", bg: "bg-gold-800", fg: "text-white/80" },
  { step: "900", hex: "#3E2E17", bg: "bg-gold-900", fg: "text-white/80" },
]

const typeScale = [
  {
    token: "text-display",
    role: "Hero",
    target: "44 → 72 → 88px",
    className: "text-display font-display",
    sample: "Building Tomorrow.",
  },
  {
    token: "text-heading",
    role: "Section heading",
    target: "30 → 52 → 60px",
    className: "text-heading font-display",
    sample: "Engineering Excellence",
  },
  {
    token: "text-subheading",
    role: "Card title",
    target: "22 → 32 → 36px",
    className: "text-subheading font-display",
    sample: "Infrastructure Projects",
  },
  {
    token: "text-numeral",
    role: "Process index",
    target: "48 → 112px",
    className: "text-numeral font-display",
    sample: "01",
  },
  {
    token: "text-stat",
    role: "Statistics band",
    target: "36 → 56px",
    className: "text-stat font-display",
    sample: "2,500+",
  },
  {
    token: "text-lead",
    role: "Lead paragraph",
    target: "17 → 20 → 22px",
    className: "text-lead text-muted-foreground",
    sample:
      "We design and construct extraordinary spaces that inspire generations.",
  },
  {
    token: "text-body",
    role: "Body copy",
    target: "16 → 18px",
    className: "text-body text-muted-foreground",
    sample:
      "Twenty-five years of delivery across eighteen countries, from private residences to national infrastructure.",
  },
  {
    token: "text-action",
    role: "Buttons / UI",
    target: "16px fixed",
    className: "text-action font-medium",
    sample: "Start Your Project",
  },
  {
    token: "text-eyebrow",
    role: "Eyebrow label",
    target: "12px · 0.28em",
    className: "text-eyebrow uppercase text-muted-foreground",
    sample: "Our Capabilities",
  },
]

const stats = [
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 18, label: "Countries" },
  { value: 2500, suffix: "+", label: "Employees" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
]

function Swatch({
  name,
  hex,
  className,
  textClass,
}: {
  name: string
  hex: string
  className: string
  textClass?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex h-20 items-end rounded-xs p-2 ring-1 ring-inset ring-black/5",
          className
        )}
      >
        <span className={cn("font-mono text-[10px]", textClass)}>{name}</span>
      </div>
      <span className="text-muted-foreground font-mono text-[10px] uppercase">
        {hex}
      </span>
    </div>
  )
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-hairline border-t py-6">
      <p className="text-eyebrow text-muted-foreground mb-5 uppercase">
        {label}
      </p>
      {children}
    </div>
  )
}

export default function StyleGuidePage() {
  return (
    <main id="main">
      {/* ---------------------------------------------------------------- */}
      <Section tone="ink" spacing="compact" className="pt-32">
        <Container>
          <Eyebrow index="00">Internal reference</Eyebrow>
          <TextReveal
            as="h1"
            immediate
            className="text-display font-display mt-8 max-w-4xl"
          >
            {/* The accented word and its punctuation are kept in one
                unbreakable unit, otherwise a narrow viewport drops the full
                stop onto a line of its own. */}
            <>
              The Meridian{" "}
              <span className="whitespace-nowrap">
                <span className="text-accent-gold">system</span>.
              </span>
            </>
            <>One curve. One accent.</>
          </TextReveal>
          <p className="text-lead text-muted-foreground mt-8 max-w-xl text-pretty">
            Every colour, type step, surface and movement used across the site.
            If it is not on this page, it does not ship.
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="colour">
        <Container>
          <SectionHeading
            split
            index="01"
            eyebrow="Colour"
            title="Two families, one accent."
            lead="Ink covers every neutral so nothing drifts between warm and cool gray. Gold is antique and desaturated — it appears once per view, never as a fill for large areas."
          />

          <div className="mt-16 space-y-10">
            <Spec label="Ink · neutral ramp">
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
                {inkRamp.map((swatch) => (
                  <Swatch
                    key={swatch.step}
                    name={swatch.step}
                    hex={swatch.hex}
                    className={swatch.bg}
                    textClass={swatch.fg}
                  />
                ))}
              </div>
            </Spec>

            <Spec label="Gold · accent ramp">
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-10">
                {goldRamp.map((swatch) => (
                  <Swatch
                    key={swatch.step}
                    name={swatch.step}
                    hex={swatch.hex}
                    className={swatch.bg}
                    textClass={swatch.fg}
                  />
                ))}
              </div>
            </Spec>

            <Spec label="Semantic tokens · light theme">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                <Swatch name="background" hex="#FFFFFF" className="bg-background" textClass="text-ink-900/50" />
                <Swatch name="foreground" hex="#0F172A" className="bg-foreground" textClass="text-white/70" />
                <Swatch name="muted" hex="#F8FAFC" className="bg-muted" textClass="text-ink-900/50" />
                <Swatch name="secondary" hex="#F1F5F9" className="bg-secondary" textClass="text-ink-900/50" />
                <Swatch name="accent" hex="#C89B3C" className="bg-accent" textClass="text-white/80" />
                <Swatch name="border" hex="#E2E8F0" className="bg-border" textClass="text-ink-900/50" />
                <Swatch name="success" hex="#16A34A" className="bg-signal-success" textClass="text-white/80" />
                <Swatch name="destructive" hex="#DC2626" className="bg-destructive" textClass="text-white/80" />
              </div>
            </Spec>
          </div>
        </Container>
      </Section>

      {/* Dark theme proof — the same tokens, flipped by one class. */}
      <Section tone="ink" spacing="compact">
        <Container>
          <Eyebrow>Semantic tokens · ink theme</Eyebrow>
          <p className="text-body text-muted-foreground mt-4 max-w-2xl">
            This band carries <code className="font-mono text-xs">tone=&quot;ink&quot;</code>.
            Nothing inside it specifies a colour — the token set is re-declared
            and every child follows.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            <Swatch name="background" hex="#0F172A" className="bg-background" textClass="text-white/60" />
            <Swatch name="foreground" hex="#F8FAFC" className="bg-foreground" textClass="text-ink-900/60" />
            <Swatch name="card" hex="#1E293B" className="bg-card" textClass="text-white/60" />
            <Swatch name="muted" hex="#1E293B" className="bg-muted" textClass="text-white/60" />
            <Swatch name="accent" hex="#C89B3C" className="bg-accent" textClass="text-white/80" />
            <Swatch name="border" hex="rgb(255 255 255 / .12)" className="bg-border" textClass="text-white/60" />
            <Swatch name="success" hex="#4ADE80" className="bg-success" textClass="text-ink-900/70" />
            <Swatch name="muted-fg" hex="#94A3B8" className="bg-muted-foreground" textClass="text-ink-900/70" />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="typography">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="Typography"
            title="A fluid editorial scale."
            lead="Every step interpolates between a 375px phone and a 1280px desktop, then clamps. The brief's targets — 72px hero, 52px heading, 18px body, 16px buttons — land exactly at 1280."
          />

          <div className="divide-hairline border-hairline mt-16 divide-y border-t">
            {typeScale.map((step) => (
              <Reveal key={step.token} className="grid gap-4 py-10 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-3">
                  <p className="font-mono text-xs">{step.token}</p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {step.role}
                  </p>
                  <p className="text-muted-foreground mt-1 font-mono text-[11px]">
                    {step.target}
                  </p>
                </div>
                <div className="lg:col-span-9">
                  <p className={cn("text-balance", step.className)}>
                    {step.sample}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Spec label="Font families">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl font-bold">Plus Jakarta</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Display · headings, numerals
                </p>
              </div>
              <div>
                <p className="font-sans text-3xl">Geist</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Sans · body, UI
                </p>
              </div>
              <div>
                <p className="font-mono text-3xl">Geist Mono</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Mono · indices, data, coordinates
                </p>
              </div>
            </div>
          </Spec>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="buttons" tone="muted">
        <Container>
          <SectionHeading
            split
            index="03"
            eyebrow="Actions"
            title="Buttons that match the scale."
            lead="The shadcn preset ships a 32px dashboard button. Marketing surfaces use lg, xl and 2xl at 16px type with near-square corners."
          />

          <div className="mt-16 space-y-10">
            <Spec label="Variants · size xl">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xl">Start Your Project</Button>
                <Button size="xl" variant="gold">
                  Request a Quote
                </Button>
                <Button size="xl" variant="outline">
                  View Portfolio
                </Button>
                <Button size="xl" variant="secondary">
                  Download Profile
                </Button>
                <Button size="xl" variant="ghost">
                  Learn More
                </Button>
                <Button variant="link">Read the case study</Button>
              </div>
            </Spec>

            <Spec label="Sizes · default variant">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra large</Button>
                <Button size="2xl">Section CTA</Button>
                <Button size="lg" caps>
                  All Projects
                </Button>
              </div>
            </Spec>

            <Spec label="States">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" disabled>
                  Disabled
                </Button>
                <Button size="lg" variant="gold" disabled>
                  Disabled gold
                </Button>
                <Button size="lg" variant="destructive">
                  Destructive
                </Button>
              </div>
            </Spec>

            <Spec label="Over photography · onImage">
              <div className="relative overflow-hidden rounded-xs bg-ink-900 p-12">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#334155_0%,#0F172A_55%,#020617_100%)]"
                />
                <div className="relative flex flex-wrap gap-4">
                  <Button size="xl" variant="gold">
                    Start Your Project
                  </Button>
                  <Button size="xl" variant="onImage">
                    View Portfolio
                  </Button>
                </div>
              </div>
            </Spec>

            <Spec label="Arrow links">
              <div className="flex flex-wrap items-center gap-12">
                <ArrowLink href="/style-guide">All Projects</ArrowLink>
                <ArrowLink href="/style-guide" direction="up-right">
                  Company Profile
                </ArrowLink>
                <ArrowLink href="/style-guide" caps={false}>
                  Explore our capabilities
                </ArrowLink>
              </div>
            </Spec>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="surfaces">
        <Container>
          <SectionHeading
            split
            index="04"
            eyebrow="Surfaces"
            title="Hairline, not heavy."
            lead="Cards sit flat until engaged. Elevation is wide and soft — a luxury surface floats, it does not drop a shadow."
          />

          <RevealGroup step={0.08} className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "Commercial Buildings",
                body: "Towers, campuses and workplaces delivered on fixed-price, fixed-date terms.",
              },
              {
                icon: Landmark,
                title: "Infrastructure",
                body: "Roads, bridges and transit systems engineered for a hundred-year service life.",
              },
              {
                icon: HardHat,
                title: "Industrial Plants",
                body: "Process facilities, logistics hubs and energy infrastructure at scale.",
              },
            ].map((item) => (
              <RevealItem key={item.title}>
                <LuxeCard interactive className="h-full">
                  <CardIcon>
                    <item.icon />
                  </CardIcon>
                  <h3 className="text-subheading mt-8">{item.title}</h3>
                  <p className="text-body text-muted-foreground mt-4">
                    {item.body}
                  </p>
                  <span className="text-eyebrow text-accent-text mt-8 uppercase">
                    Capability
                  </span>
                </LuxeCard>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <LuxeCard variant="muted" padding="sm">
              <p className="text-eyebrow text-muted-foreground uppercase">
                variant=&quot;muted&quot;
              </p>
              <p className="text-body mt-3">Recessed surface on white.</p>
            </LuxeCard>
            <LuxeCard variant="default" padding="sm" className="shadow-luxe">
              <p className="text-eyebrow text-muted-foreground uppercase">
                shadow-luxe
              </p>
              <p className="text-body mt-3">Wide, soft, low opacity.</p>
            </LuxeCard>
            <LuxeCard variant="default" padding="sm" className="shadow-luxe-lg">
              <p className="text-eyebrow text-muted-foreground uppercase">
                shadow-luxe-lg
              </p>
              <p className="text-body mt-3">Reserved for overlays.</p>
            </LuxeCard>
          </div>

          <Spec label="Glass · restrained, over dark media only">
            <div className="relative overflow-hidden rounded-xs p-10">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(135deg,#0F172A_0%,#334155_45%,#C89B3C_140%)]"
              />
              <div className="relative grid gap-6 sm:grid-cols-2">
                <LuxeCard variant="glass" padding="sm">
                  <p className="text-eyebrow uppercase opacity-70">
                    .glass-ink
                  </p>
                  <p className="text-body mt-3">
                    20px blur on a 55% ink scrim. Used on the sticky header and
                    hero metadata only.
                  </p>
                </LuxeCard>
                <div className="scrim-bottom flex items-end rounded-xs p-6 text-white">
                  <p className="text-body">
                    <span className="text-eyebrow block uppercase opacity-70">
                      .scrim-bottom
                    </span>
                    Keeps white type legible over architectural photography.
                  </p>
                </div>
              </div>
            </div>
          </Spec>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="statistics" tone="ink">
        <Container>
          <SectionHeading
            split
            index="05"
            eyebrow="Data"
            title="Numbers do the talking."
            lead="Counters write straight to the DOM rather than through React state — a 60fps setState loop would re-render the whole band on every frame."
          />
          <StatBlock stats={stats} className="mt-20" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="motion">
        <Container>
          <SectionHeading
            split
            index="06"
            eyebrow="Motion"
            title="One curve, four durations."
            lead="Everything uses cubic-bezier(0.22, 1, 0.36, 1) — a slow, confident settle. Nothing on this site bounces, and every effect is disabled under prefers-reduced-motion."
          />

          <div className="mt-16 space-y-10">
            <Spec label="TextReveal · masked line entrance">
              <TextReveal className="text-heading font-display max-w-3xl">
                <>
                  Building{" "}
                  <span className="whitespace-nowrap">
                    <span className="text-accent-gold">Tomorrow</span>.
                  </span>
                </>
                <>Building Better.</>
              </TextReveal>
            </Spec>

            <Spec label="WordReveal · word-level stagger">
              <WordReveal
                className="text-subheading font-display max-w-2xl"
                text="Twenty-five years of engineering conviction."
              />
            </Spec>

            <Spec label="Counter · in-view count-up">
              <div className="flex flex-wrap gap-16">
                <p className="text-stat font-display">
                  <Counter value={500} suffix="+" />
                </p>
                <p className="text-stat font-display">
                  <Counter value={98} suffix="%" />
                </p>
                <p className="text-stat font-display">
                  <Counter value={4.2} decimals={1} prefix="$" suffix="B" />
                </p>
              </div>
            </Spec>

            <Spec label="Reveal presets">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {(["fade", "up", "up-lg", "right", "scale"] as const).map(
                  (preset) => (
                    <Reveal key={preset} preset={preset}>
                      <div className="border-border bg-muted flex h-28 items-center justify-center border">
                        <span className="font-mono text-xs">{preset}</span>
                      </div>
                    </Reveal>
                  )
                )}
              </div>
            </Spec>

            <Spec label="ImageReveal · clip mask + hover zoom">
              <div className="grid gap-6 md:grid-cols-2">
                <ImageReveal
                  ratio="4/3"
                  hoverZoom
                  scrim
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern glass office tower photographed from below"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <MediaFrame ratio="4/3" className="bg-ink-900">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#0F172A_0_14px,#1E293B_14px_28px)]"
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <p className="font-mono text-xs text-white/70">
                      MediaFrame · same reveal, non-image content
                    </p>
                  </div>
                </MediaFrame>
              </div>
            </Spec>

            <Spec label="Parallax · 80px of travel, deliberately subtle">
              <div className="grid gap-6 sm:grid-cols-3">
                {[Compass, Layers, ShieldCheck].map((Icon, index) => (
                  <Parallax
                    key={index}
                    distance={40 + index * 40}
                    direction={index === 1 ? "down" : "up"}
                  >
                    <LuxeCard variant="muted" padding="sm" className="items-start">
                      <CardIcon>
                        <Icon />
                      </CardIcon>
                      <p className="font-mono text-xs mt-6">
                        distance {40 + index * 40}px
                      </p>
                    </LuxeCard>
                  </Parallax>
                ))}
              </div>
            </Spec>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="editorial" tone="muted" spacing="compact">
        <Container>
          <Eyebrow index="07">Editorial primitives</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <GoldRule />
              <p className="text-body text-muted-foreground mt-6 max-w-md">
                <code className="font-mono text-xs">GoldRule</code> — a 16px
                gold hairline that separates editorial blocks.
              </p>
            </div>
            <div className="space-y-6">
              <Eyebrow>Our Capabilities</Eyebrow>
              <Eyebrow index="03">Process</Eyebrow>
              <Eyebrow bare>No tick</Eyebrow>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
