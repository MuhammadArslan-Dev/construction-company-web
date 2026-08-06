import type { Metadata } from "next"

import { AboutIntro } from "@/components/sections/about-intro"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { CtaBand } from "@/components/sections/cta-band"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Hero } from "@/components/sections/hero"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { ServicesGrid } from "@/components/sections/services-grid"
import { Testimonials } from "@/components/sections/testimonials"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.legalName} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesGrid />
      <FeaturedProjects />
      <WhyChooseUs />
      <ProcessTimeline />
      <Testimonials />
      <ClientsMarquee />
      <CtaBand />
    </>
  )
}
