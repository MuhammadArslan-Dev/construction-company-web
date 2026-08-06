import type { ClientLogo, Testimonial } from "@/types"

export const testimonials: Testimonial[] = [
  {
    quote:
      "We interviewed six international contractors. Meridian was the only one that told us which parts of our brief were undeliverable before we signed. That honesty is why the tower topped out eleven weeks early.",
    author: "Dr. Halima Osei",
    role: "Group Chief Executive",
    company: "Meridian Capital Partners",
    project: "Meridian One",
  },
  {
    quote:
      "Building a 620-bed hospital around a hospital that never closes is not a construction problem, it is a choreography problem. Not one clinical service was interrupted in six years.",
    author: "Marc Delacroix",
    role: "Director of Capital Projects",
    company: "Ontario Health Infrastructure",
    project: "St. Aurora Medical Centre",
  },
  {
    quote:
      "A 9mm closure error across a 2.1 kilometre crossing. Our own engineers did not believe the survey and re-ran it twice. That is the standard they hold themselves to.",
    author: "Ingrid Solberg",
    role: "Programme Director",
    company: "Norwegian Public Roads Administration",
    project: "Silverstrand Crossing",
  },
  {
    quote:
      "They carried a performance guarantee on electrolysis capacity nobody had proven at this scale, and met it on the first run. No other EPC contractor would even quote it.",
    author: "Pieter van Rijn",
    role: "Chief Operating Officer",
    company: "Helios Energy N.V.",
    project: "Helios Energy Works",
  },
]

export const clients: ClientLogo[] = [
  { name: "Ontario Health", category: "Government", wordmark: "ONTARIO HEALTH" },
  { name: "Aldara Development", category: "Real Estate", wordmark: "ALDARA" },
  { name: "Nara Hospitality", category: "Hospitality", wordmark: "NARA" },
  { name: "Helios Energy", category: "Corporate", wordmark: "HELIOS" },
  { name: "Norwegian Public Roads", category: "Government", wordmark: "STATENS VEGVESEN" },
  { name: "Meridian Capital", category: "Banking", wordmark: "MERIDIAN CAPITAL" },
  { name: "Aurelia Holdings", category: "Real Estate", wordmark: "AURELIA" },
  { name: "Northgate LLP", category: "Real Estate", wordmark: "NORTHGATE" },
  { name: "Sable Bank", category: "Banking", wordmark: "SABLE BANK" },
  { name: "Verano Health", category: "Healthcare", wordmark: "VERANO HEALTH" },
  { name: "Kestrel Group", category: "Corporate", wordmark: "KESTREL" },
  { name: "Lumen Universities", category: "Government", wordmark: "LUMEN" },
]

export const awards = [
  { year: "2024", title: "Best Tall Building, Asia", awarding: "CTBUH", project: "Meridian One" },
  { year: "2024", title: "Outstanding Structure Award", awarding: "IABSE", project: "Silverstrand Crossing" },
  { year: "2024", title: "Healthcare Facility of the Year", awarding: "CHES", project: "St. Aurora Medical Centre" },
  { year: "2023", title: "Retail Development of the Year", awarding: "MENA Property", project: "The Galleria" },
]

export const certifications = [
  { code: "ISO 9001", title: "Quality Management", description: "Certified across all 18 operating countries." },
  { code: "ISO 14001", title: "Environmental Management", description: "Independently audited annually since 2009." },
  { code: "ISO 45001", title: "Occupational Health & Safety", description: "Underpins our 0.08 lost-time injury rate." },
  { code: "ISO 19650", title: "BIM Information Management", description: "Digital twin delivered with every handover." },
]
