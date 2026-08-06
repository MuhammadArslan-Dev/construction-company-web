/**
 * Single source of truth for brand identity, contact data and canonical URLs.
 * Rebranding the entire site is a matter of editing this file.
 */

export const siteConfig = {
  name: "Meridian",
  legalName: "Meridian Construction Group",
  shortName: "Meridian",
  tagline: "Building Tomorrow. Building Better.",
  description:
    "Meridian Construction Group designs and constructs extraordinary spaces that inspire generations — luxury residences, high-rise towers, hospitals, universities and nation-scale infrastructure across 18 countries.",
  founded: 2001,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meridian-construction.com",
  ogImage: "/og/default.jpg",
  locale: "en_US",
  keywords: [
    "international construction company",
    "luxury home builders",
    "high-rise tower construction",
    "commercial construction",
    "infrastructure engineering",
    "design and build contractor",
    "EPC contractor",
    "hospital construction",
    "bridge construction",
  ],
} as const

export const contactConfig = {
  phone: "+1 (212) 555-0180",
  phoneHref: "tel:+12125550180",
  email: "projects@meridian-construction.com",
  emailHref: "mailto:projects@meridian-construction.com",
  careersEmail: "careers@meridian-construction.com",
  pressEmail: "press@meridian-construction.com",
  headquarters: {
    label: "Global Headquarters",
    street: "One Meridian Plaza, 480 Park Avenue",
    city: "New York",
    region: "NY",
    postalCode: "10022",
    country: "United States",
    countryCode: "US",
    lat: 40.7614,
    lng: -73.9714,
  },
  hours: "Monday – Friday, 08:00 – 18:00 EST",
} as const

export const socialConfig = {
  linkedin: "https://www.linkedin.com/company/meridian-construction-group",
  instagram: "https://www.instagram.com/meridianconstruction",
  youtube: "https://www.youtube.com/@meridianconstruction",
  x: "https://x.com/meridianbuilds",
} as const

export type SiteConfig = typeof siteConfig
