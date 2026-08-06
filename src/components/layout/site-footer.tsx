import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { NewsletterForm } from "@/components/forms/newsletter-form"
import { Container } from "@/components/shared/container"
import { GoldRule } from "@/components/shared/eyebrow"
import { footerNav, legalNav } from "@/config/navigation"
import { contactConfig, siteConfig, socialConfig } from "@/config/site"

const socials = [
  { label: "LinkedIn", href: socialConfig.linkedin },
  { label: "Instagram", href: socialConfig.instagram },
  { label: "YouTube", href: socialConfig.youtube },
  { label: "X", href: socialConfig.x },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="dark bg-background text-foreground">
      <Container className="pt-20 pb-12 lg:pt-28">
        {/* Oversized wordmark ------------------------------------------- */}
        <div className="border-hairline flex flex-col gap-10 border-b pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-[clamp(3rem,2rem+5vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.04em]">
              {siteConfig.name}
              <span className="text-gold-500">.</span>
            </p>
            <p className="text-muted-foreground mt-6 max-w-md text-lg text-pretty">
              {siteConfig.tagline} Delivering landmark projects across 18
              countries since {siteConfig.founded}.
            </p>
          </div>
          <GoldRule className="w-24 lg:mb-4" />
        </div>

        {/* Link columns -------------------------------------------------- */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-eyebrow text-accent-text uppercase">
                {column.title}
              </h2>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-xs text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-accent-text uppercase">
              Global Headquarters
            </h2>
            <address className="text-muted-foreground mt-6 space-y-4 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden className="text-gold-500 mt-0.5 size-4 shrink-0" />
                <span>
                  {contactConfig.headquarters.street}
                  <br />
                  {contactConfig.headquarters.city},{" "}
                  {contactConfig.headquarters.region}{" "}
                  {contactConfig.headquarters.postalCode}
                  <br />
                  {contactConfig.headquarters.country}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="text-gold-500 mt-0.5 size-4 shrink-0" />
                <a
                  href={contactConfig.phoneHref}
                  className="hover:text-foreground transition-colors"
                >
                  {contactConfig.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="text-gold-500 mt-0.5 size-4 shrink-0" />
                <a
                  href={contactConfig.emailHref}
                  className="hover:text-foreground transition-colors"
                >
                  {contactConfig.email}
                </a>
              </p>
            </address>

            <div className="mt-10">
              <h2 className="text-eyebrow text-accent-text uppercase">
                Quarterly Briefing
              </h2>
              <p className="text-muted-foreground mt-4 text-sm">
                Engineering notes and project releases. Four emails a year.
              </p>
              <NewsletterForm className="mt-5" />
            </div>
          </div>
        </div>

        {/* Base ----------------------------------------------------------- */}
        <div className="border-hairline flex flex-col gap-6 border-t pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-muted-foreground font-mono text-xs">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex gap-5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-foreground group/social inline-flex items-center gap-1 text-xs transition-colors"
                >
                  {social.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3 transition-transform duration-400 ease-[var(--ease-luxe)] group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
