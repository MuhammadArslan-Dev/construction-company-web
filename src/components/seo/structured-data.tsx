import * as React from "react"

import { contactConfig, siteConfig, socialConfig } from "@/config/site"
import { offices } from "@/data/offices"
import type { Crumb } from "@/components/shared/page-hero"

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed config, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Sitewide identity graph, emitted once from the marketing layout.
 *
 * `@id` anchors let per-page nodes reference this organisation rather than
 * redeclaring it — without them, every page asserts a *separate* company and
 * search engines have to guess they are the same entity.
 */
export function OrganizationSchema() {
  const organisationId = `${siteConfig.url}/#organization`

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": organisationId,
          name: siteConfig.legalName,
          alternateName: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          foundingDate: String(siteConfig.founded),
          email: contactConfig.email,
          telephone: contactConfig.phone,
          numberOfEmployees: { "@type": "QuantitativeValue", value: 2500 },
          address: {
            "@type": "PostalAddress",
            streetAddress: contactConfig.headquarters.street,
            addressLocality: contactConfig.headquarters.city,
            addressRegion: contactConfig.headquarters.region,
            postalCode: contactConfig.headquarters.postalCode,
            addressCountry: contactConfig.headquarters.countryCode,
          },
          areaServed: offices.map((office) => office.country),
          sameAs: [
            socialConfig.linkedin,
            socialConfig.instagram,
            socialConfig.youtube,
            socialConfig.x,
          ],
          knowsAbout: [...siteConfig.keywords],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteConfig.url}/#website`,
          url: siteConfig.url,
          name: siteConfig.legalName,
          description: siteConfig.description,
          inLanguage: "en",
          publisher: { "@id": organisationId },
        }}
      />
    </>
  )
}

/**
 * BreadcrumbList built from the same `crumbs` array the visual breadcrumb
 * renders, so the two can never disagree.
 */
export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length < 2) return null

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.label,
          ...(crumb.href ? { item: `${siteConfig.url}${crumb.href}` } : {}),
        })),
      }}
    />
  )
}
