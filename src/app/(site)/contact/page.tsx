import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { InquiryForm } from "@/components/forms/inquiry-form"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { WorldMap } from "@/components/contact/world-map"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { contactConfig, siteConfig } from "@/config/site"
import { offices, regions } from "@/data/offices"
import { unsplash } from "@/lib/images"
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  countryPaths,
  projectPoint,
} from "@/lib/world-map"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak to Meridian Construction Group. Eight delivery offices across the Americas, EMEA and APAC. Request a quote, book a site visit or arrange a consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Meridian Construction Group",
    description:
      "Eight delivery offices across three regions. A director responds within two working days.",
    url: "/contact",
  },
}

export default function ContactPage() {
  // Projected on the server — d3-geo never reaches the client bundle.
  const markers = offices.map((office) => {
    const { x, y } = projectPoint(
      office.coordinates.lng,
      office.coordinates.lat
    )
    return {
      id: `${office.city}-${office.country}`,
      x,
      y,
      city: office.city,
      country: office.country,
      region: office.region,
      projectCount: office.projectCount,
      isHeadquarters: office.isHeadquarters,
    }
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    email: contactConfig.email,
    telephone: contactConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactConfig.headquarters.street,
      addressLocality: contactConfig.headquarters.city,
      addressRegion: contactConfig.headquarters.region,
      postalCode: contactConfig.headquarters.postalCode,
      addressCountry: contactConfig.headquarters.countryCode,
    },
    location: offices.map((office) => ({
      "@type": "Place",
      name: `${siteConfig.name} ${office.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: office.city,
        addressCountry: office.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: office.coordinates.lat,
        longitude: office.coordinates.lng,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Contact"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={{
          url: unsplash("photo-1497366754035-f200968a6e72"),
          alt: "Glazed office corridor filled with natural light",
        }}
        lead="Send a brief, a sketch or a single paragraph. A director responds within two working days with an honest view of feasibility, programme and cost."
        meta={[
          { label: "Offices", value: String(offices.length) },
          { label: "Regions", value: String(regions.length) },
          { label: "Response", value: "2 working days" },
          { label: "Direct line", value: contactConfig.phone },
        ]}
      >
        <>Tell us what you</>
        <>
          intend to{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">build</span>.
          </span>
        </>
      </PageHero>

      {/* Enquiry form ------------------------------------------------------ */}
      <Section tone="light" id="enquiry">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHeading
                index="02"
                eyebrow="Start a conversation"
                title="One form. A real person."
                lead="No lead-scoring funnel and no automated nurture sequence. Enquiries go to a director in the relevant region."
              />

              <RevealGroup step={0.08} className="mt-12 space-y-8">
                <RevealItem>
                  <a
                    href={contactConfig.phoneHref}
                    className="group/contact block"
                  >
                    <span className="text-eyebrow text-muted-foreground flex items-center gap-3 uppercase">
                      <Phone aria-hidden className="text-gold-500 size-4" />
                      Direct line
                    </span>
                    <span className="text-foreground group-hover/contact:text-accent-text mt-3 block text-xl font-medium transition-colors tabular">
                      {contactConfig.phone}
                    </span>
                  </a>
                </RevealItem>

                <RevealItem>
                  <a
                    href={contactConfig.emailHref}
                    className="group/contact block"
                  >
                    <span className="text-eyebrow text-muted-foreground flex items-center gap-3 uppercase">
                      <Mail aria-hidden className="text-gold-500 size-4" />
                      Email
                    </span>
                    <span className="text-foreground group-hover/contact:text-accent-text mt-3 block text-lg font-medium break-all transition-colors">
                      {contactConfig.email}
                    </span>
                  </a>
                </RevealItem>

                <RevealItem>
                  <span className="text-eyebrow text-muted-foreground flex items-center gap-3 uppercase">
                    <MapPin aria-hidden className="text-gold-500 size-4" />
                    {contactConfig.headquarters.label}
                  </span>
                  <address className="text-muted-foreground mt-3 text-base not-italic">
                    {contactConfig.headquarters.street}
                    <br />
                    {contactConfig.headquarters.city},{" "}
                    {contactConfig.headquarters.region}{" "}
                    {contactConfig.headquarters.postalCode}
                    <br />
                    {contactConfig.headquarters.country}
                  </address>
                </RevealItem>

                <RevealItem>
                  <span className="text-eyebrow text-muted-foreground flex items-center gap-3 uppercase">
                    <Clock aria-hidden className="text-gold-500 size-4" />
                    Hours
                  </span>
                  <p className="text-muted-foreground mt-3 text-base">
                    {contactConfig.hours}
                  </p>
                </RevealItem>
              </RevealGroup>
            </div>

            {/* No Suspense boundary: the form reads `?intent=` from
                window.location rather than useSearchParams, so it ships in the
                prerendered HTML instead of appearing only after hydration. */}
            <div className="lg:col-span-7">
              <InquiryForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* World map --------------------------------------------------------- */}
      <Section tone="ink" id="offices">
        <Container>
          <SectionHeading
            split
            index="03"
            eyebrow="Where we are"
            title="Eight offices. Three regions."
            lead="Every office is staffed by engineers who live in the country they build in. Hover or tab a marker to see what each one has delivered."
          />

          <Reveal preset="fade" className="mt-14">
            <WorldMap
              paths={countryPaths}
              markers={markers}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="rounded-xs border border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,var(--color-ink-800)_0%,var(--color-ink-950)_70%)] p-2 lg:p-4"
            />
          </Reveal>

          {/* Office list ---------------------------------------------------- */}
          <div className="mt-20 space-y-14">
            {regions.map((region) => {
              const inRegion = offices.filter(
                (office) => office.region === region
              )
              return (
                <div key={region}>
                  <h3 className="text-eyebrow text-accent-text uppercase">
                    {region}
                  </h3>
                  <RevealGroup
                    step={0.07}
                    className="mt-6 grid gap-px border-t border-white/10 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {inRegion.map((office) => (
                      <RevealItem
                        key={office.city}
                        className="border-b border-white/10 py-7 lg:px-6 lg:first:pl-0"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-display text-lg font-semibold text-white">
                            {office.city}
                          </h4>
                          {office.isHeadquarters ? (
                            <span className="text-accent-text font-mono text-[10px] tracking-[0.16em] uppercase">
                              HQ
                            </span>
                          ) : null}
                        </div>
                        <p className="text-muted-foreground mt-3 text-sm">
                          {office.address}
                        </p>
                        <div className="mt-5 space-y-2">
                          <a
                            href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                            className="text-muted-foreground block text-sm transition-colors hover:text-white"
                          >
                            {office.phone}
                          </a>
                          <a
                            href={`mailto:${office.email}`}
                            className="text-muted-foreground block text-sm break-all transition-colors hover:text-white"
                          >
                            {office.email}
                          </a>
                        </div>
                        <p className="text-muted-foreground mt-5 font-mono text-[11px] tracking-[0.14em] uppercase tabular">
                          {office.projectCount} projects
                        </p>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}
