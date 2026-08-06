export type NavLink = {
  label: string
  href: string
  description?: string
}

export type NavItem = NavLink & {
  children?: NavLink[]
}

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description: "Twenty-five years of engineering conviction.",
  },
  {
    label: "Services",
    href: "/services",
    description: "Fourteen disciplines, one delivery standard.",
    children: [
      {
        label: "Luxury Villas",
        href: "/services/luxury-villas",
        description: "Bespoke private residences.",
      },
      {
        label: "Residential Communities",
        href: "/services/residential",
        description: "Master-planned neighbourhoods.",
      },
      {
        label: "Commercial Buildings",
        href: "/services/commercial",
        description: "Towers, campuses and workplaces.",
      },
      {
        label: "Infrastructure",
        href: "/services/infrastructure",
        description: "Roads, bridges and transit.",
      },
      {
        label: "Industrial Construction",
        href: "/services/industrial",
        description: "Plants, logistics and energy.",
      },
      {
        label: "Design & Build",
        href: "/services/design-build",
        description: "Single-accountability delivery.",
      },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    description: "A portfolio measured in landmarks.",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Build a career that outlives you.",
  },
  {
    label: "Insights",
    href: "/blog",
    description: "Engineering, architecture and sustainability.",
  },
  {
    label: "Tools",
    href: "/tools",
    description: "Estimate a cost, or ask our assistant.",
    children: [
      {
        label: "Cost Estimator",
        href: "/tools/cost-estimator",
        description: "An indicative build cost, broken down.",
      },
      {
        label: "AI Assistant",
        href: "/tools/assistant",
        description: "Answers drawn from our own project data.",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Start a conversation with our team.",
  },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Meridian", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Awards & Certifications", href: "/about#awards" },
      { label: "Newsroom", href: "/blog" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Luxury Villas", href: "/services/luxury-villas" },
      { label: "Commercial Buildings", href: "/services/commercial" },
      { label: "Infrastructure", href: "/services/infrastructure" },
      { label: "Industrial Construction", href: "/services/industrial" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Featured Work", href: "/projects" },
      { label: "Residential", href: "/projects?sector=residential" },
      { label: "Commercial", href: "/projects?sector=commercial" },
      { label: "Infrastructure", href: "/projects?sector=infrastructure" },
      { label: "Healthcare", href: "/projects?sector=healthcare" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Request a Quote", href: "/contact?intent=quote" },
      { label: "Book a Site Visit", href: "/contact?intent=site-visit" },
      { label: "Cost Estimator", href: "/tools/cost-estimator" },
      { label: "AI Assistant", href: "/tools/assistant" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Modern Slavery Statement", href: "/legal/modern-slavery" },
  { label: "Accessibility", href: "/legal/accessibility" },
]
