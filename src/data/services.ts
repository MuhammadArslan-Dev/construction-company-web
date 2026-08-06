import {
  Building2,
  ClipboardList,
  Factory,
  Hammer,
  Home,
  Layers,
  Milestone,
  PencilRuler,
  Route,
  ShoppingBag,
  Sofa,
  TowerControl,
  TrainTrack,
  Warehouse,
} from "lucide-react"

import { unsplash } from "@/lib/images"
import type { Service, ServiceCategory } from "@/types"

export const services: Service[] = [
  {
    slug: "luxury-villas",
    title: "Luxury Villas",
    category: "Build",
    icon: Home,
    excerpt: "Private residences built to a standard usually reserved for museums.",
    description:
      "Bespoke homes delivered under a single contract, from site acquisition and planning through to landscaping and smart-home commissioning. Every villa is assigned a dedicated project director and a fixed completion date.",
    image: {
      url: unsplash("photo-1523217582562-09d0def993a6"),
      alt: "Contemporary white villa with clean geometric massing at dusk",
    },
    highlights: ["Single-contract delivery", "Bespoke joinery", "Smart-home integration"],
    deliverables: [
      "Concept design and planning consent",
      "Structural and MEP engineering",
      "In-house joinery, stone and metalwork",
      "Landscaping, pool and external works",
      "Smart-home commissioning and handover training",
    ],
    metrics: [
      { value: 74, label: "Villas Completed" },
      { value: 100, suffix: "%", label: "Snag-Free Handover" },
      { value: 18, label: "Months Typical Programme" },
    ],
    relatedProjects: ["aurelia-residences"],
    featured: true,
  },
  {
    slug: "residential",
    title: "Residential Communities",
    category: "Build",
    icon: Building2,
    excerpt: "Master-planned neighbourhoods with infrastructure built in from day one.",
    description:
      "Multi-phase residential development at district scale — roads, utilities, community facilities and thousands of homes sequenced so early residents never live on a building site.",
    image: {
      url: unsplash("photo-1460317442991-0ec209397118"),
      alt: "Modern apartment building facade with balconies",
    },
    highlights: ["Phased handover", "District utilities", "Community amenities"],
    deliverables: [
      "Masterplan and phasing strategy",
      "Roads, drainage and district energy",
      "Schools, health and community buildings",
      "Mixed-tenure residential blocks",
      "Landscape and public realm",
    ],
    metrics: [
      { value: 31, label: "Communities Delivered" },
      { value: 22400, label: "Homes Built" },
      { value: 100, suffix: "%", label: "Amenities Before Occupation" },
    ],
    relatedProjects: ["northgate-quarter", "aurelia-residences"],
    featured: true,
  },
  {
    slug: "commercial",
    title: "Commercial Buildings",
    category: "Build",
    icon: TowerControl,
    excerpt: "High-rise towers and campuses engineered for a century of service.",
    description:
      "Class-A office towers, mixed-use podiums and corporate campuses. We self-perform structure and facade on every commercial project, which is why our envelope defect rate is a fifth of the industry average.",
    image: {
      url: unsplash("photo-1486406146926-c627a92ad1ab"),
      alt: "Glass office towers photographed from street level looking upward",
    },
    highlights: ["Self-performed structure", "Facade engineering", "LEED Platinum capable"],
    deliverables: [
      "Substructure and deep foundations",
      "Self-performed frame and core",
      "Facade design, prototyping and installation",
      "Base-build MEP and vertical transport",
      "Commissioning and 12-month aftercare",
    ],
    metrics: [
      { value: 96, label: "Towers Completed" },
      { value: 4, label: "Day Floor Cycle" },
      { value: 0.2, decimals: 1, suffix: "%", label: "Envelope Defect Rate" },
    ],
    relatedProjects: ["meridian-one"],
    featured: true,
  },
  {
    slug: "shopping-malls",
    title: "Shopping Malls",
    category: "Build",
    icon: ShoppingBag,
    excerpt: "Retail destinations that open fully tenanted, on the day promised.",
    description:
      "Large-format retail and leisure destinations, delivered with tenant coordination running in parallel to base build so anchor fit-out begins before practical completion.",
    image: {
      url: unsplash("photo-1519567241046-7f570eee3ce6"),
      alt: "Bright multi-level shopping mall atrium",
    },
    highlights: ["Tenant coordination", "Parallel fit-out", "Opening-day readiness"],
    deliverables: [
      "Base build and long-span atrium structures",
      "Tenant handover packages by floor",
      "Anchor and unit fit-out coordination",
      "Car parking and servicing infrastructure",
      "Phased opening programme",
    ],
    metrics: [
      { value: 23, label: "Retail Destinations" },
      { value: 94, suffix: "%", label: "Occupancy at Opening" },
      { value: 11, label: "Months Parallel Fit-Out" },
    ],
    relatedProjects: ["the-galleria"],
  },
  {
    slug: "corporate-offices",
    title: "Corporate Offices",
    category: "Build",
    icon: Layers,
    excerpt: "Workplaces built around how a business actually operates.",
    description:
      "Headquarters and regional offices delivered as turnkey environments — base build, fit-out, AV, security and furniture under one accountable contract.",
    image: {
      url: unsplash("photo-1497366754035-f200968a6e72"),
      alt: "Glazed office corridor with natural light",
    },
    highlights: ["Turnkey delivery", "Integrated AV & security", "Occupied-site capability"],
    deliverables: [
      "Workplace strategy and test fits",
      "Category A and B fit-out",
      "AV, security and network infrastructure",
      "Furniture procurement and installation",
      "Phased migration planning",
    ],
    metrics: [
      { value: 148, label: "Workplaces Delivered" },
      { value: 0, label: "Business Days Lost" },
      { value: 6, label: "Week Typical Migration" },
    ],
    relatedProjects: ["meridian-one"],
  },
  {
    slug: "industrial",
    title: "Industrial Construction",
    category: "Build",
    icon: Factory,
    excerpt: "Process plants and energy facilities where downtime is not an option.",
    description:
      "Refineries, power generation, chemical processing and heavy manufacturing. Delivered under EPC terms with commissioning support and performance guarantees.",
    image: {
      url: unsplash("photo-1516937941344-00b4e0337589"),
      alt: "Industrial refinery with stacks and process piping at dawn",
    },
    highlights: ["EPC contracting", "Commissioning support", "Performance guarantees"],
    deliverables: [
      "Front-end engineering design",
      "Procurement and long-lead management",
      "Civil, structural and mechanical erection",
      "Electrical, instrumentation and controls",
      "Commissioning to guaranteed output",
    ],
    metrics: [
      { value: 38, label: "Plants Commissioned" },
      { value: 100, suffix: "%", label: "Guarantees Met" },
      { value: 840, suffix: "MW", label: "Largest Facility" },
    ],
    relatedProjects: ["helios-energy-works"],
    featured: true,
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    category: "Infrastructure",
    icon: TrainTrack,
    excerpt: "The public works a region is still using in eighty years.",
    description:
      "Transit systems, water treatment, ports and utilities — nation-scale civil engineering delivered in partnership with government and multilateral funders.",
    image: {
      url: unsplash("photo-1515674744565-0d7112cd179a"),
      alt: "Aerial view of a concrete highway bridge crossing open water",
    },
    highlights: ["Public-private partnership", "Multilateral funding", "100-year design life"],
    deliverables: [
      "Options appraisal and business case support",
      "Consents, environmental and stakeholder management",
      "Civil and structural construction",
      "Systems integration and testing",
      "Asset information model at handover",
    ],
    metrics: [
      { value: 64, label: "Infrastructure Schemes" },
      { value: 100, label: "Year Design Life" },
      { value: 12, label: "Government Partners" },
    ],
    relatedProjects: ["silverstrand-crossing"],
    featured: true,
  },
  {
    slug: "roads",
    title: "Road Construction",
    category: "Infrastructure",
    icon: Route,
    excerpt: "Highways and interchanges built without closing the network.",
    description:
      "Motorways, urban arterials and complex interchanges, with traffic management planned so existing routes stay open throughout construction.",
    image: {
      url: unsplash("photo-1470224114660-3f6686c562eb"),
      alt: "Aerial view of a multi-lane road and interchange",
    },
    highlights: ["Live-traffic staging", "Asphalt & concrete pavement", "Night-works capability"],
    deliverables: [
      "Earthworks and ground improvement",
      "Pavement design and construction",
      "Structures, culverts and retaining walls",
      "Traffic management and diversions",
      "Signage, lighting and ITS",
    ],
    metrics: [
      { value: 1840, suffix: "km", label: "Carriageway Built" },
      { value: 0, label: "Full Network Closures" },
      { value: 47, label: "Interchanges" },
    ],
    relatedProjects: ["silverstrand-crossing"],
  },
  {
    slug: "bridges",
    title: "Bridge Construction",
    category: "Infrastructure",
    icon: Milestone,
    excerpt: "Cable-stayed, segmental and long-span crossings.",
    description:
      "From pedestrian crossings to multi-kilometre cable-stayed spans. In-house post-tensioning and marine works capability removes the specialist subcontractor from the critical path.",
    image: {
      url: unsplash("photo-1559843788-693858bf7338"),
      alt: "Bridge deck segment under construction against a clear sky",
    },
    highlights: ["Cable-stayed & segmental", "In-house post-tensioning", "Marine works"],
    deliverables: [
      "Marine and land-based foundations",
      "Pylon slipform construction",
      "Segmental deck erection",
      "Stay cable installation and stressing",
      "Load testing and commissioning",
    ],
    metrics: [
      { value: 29, label: "Crossings Delivered" },
      { value: 620, suffix: "m", label: "Longest Main Span" },
      { value: 9, suffix: "mm", label: "Best Closure Error" },
    ],
    relatedProjects: ["silverstrand-crossing"],
    featured: true,
  },
  {
    slug: "renovation",
    title: "Renovation",
    category: "Build",
    icon: Hammer,
    excerpt: "Bringing significant buildings back into service.",
    description:
      "Structural refurbishment, facade replacement and seismic upgrade — including heritage-listed assets and buildings that stay occupied throughout.",
    image: {
      url: unsplash("photo-1508450859948-4e04fabaa4ea"),
      alt: "Building under refurbishment wrapped in scaffolding",
    },
    highlights: ["Heritage-approved", "Occupied refurbishment", "Seismic upgrade"],
    deliverables: [
      "Condition survey and structural appraisal",
      "Heritage consent and conservation method",
      "Structural strengthening and seismic upgrade",
      "Facade repair or replacement",
      "MEP renewal within occupied floors",
    ],
    metrics: [
      { value: 86, label: "Buildings Restored" },
      { value: 19, label: "Heritage-Listed Assets" },
      { value: 100, suffix: "%", label: "Stayed Occupied" },
    ],
    relatedProjects: ["st-aurora-medical"],
  },
  {
    slug: "interior-fit-out",
    title: "Interior Fit-Out",
    category: "Design",
    icon: Sofa,
    excerpt: "Interiors finished to the tolerance of the drawings.",
    description:
      "Premium commercial and residential fit-out with in-house joinery, stone and metalwork shops — so specification survives contact with the programme.",
    image: {
      url: unsplash("photo-1600607687920-4e2a09cf159d"),
      alt: "Refined modern interior with staircase and dining area",
    },
    highlights: ["In-house joinery", "Stone & metal fabrication", "Snag-free handover"],
    deliverables: [
      "Detailed design and sample approval",
      "Bespoke joinery and stonework",
      "Specialist lighting and AV",
      "Art, furniture and styling coordination",
      "Zero-defect handover certificate",
    ],
    metrics: [
      { value: 3, label: "Fabrication Workshops" },
      { value: 2, suffix: "mm", label: "Setting-Out Tolerance" },
      { value: 0, label: "Specification Substitutions" },
    ],
    relatedProjects: ["nara-bay-hotel", "aurelia-residences"],
  },
  {
    slug: "architecture",
    title: "Architecture",
    category: "Design",
    icon: PencilRuler,
    excerpt: "Design studios embedded inside the delivery business.",
    description:
      "Concept through to construction documentation, produced by architects who sit alongside the people who will build it. Buildability is resolved on the drawing board, not on site.",
    image: {
      url: unsplash("photo-1581092160562-40aa08e78837"),
      alt: "Architect working over technical drawings at a desk",
    },
    highlights: ["Concept to IFC", "Integrated buildability review", "Parametric facade design"],
    deliverables: [
      "Concept and schematic design",
      "Planning and regulatory submissions",
      "Parametric facade studies",
      "Issued-for-construction documentation",
      "Design intent supervision on site",
    ],
    metrics: [
      { value: 210, label: "Architects & Designers" },
      { value: 41, label: "Design Awards" },
      { value: 92, suffix: "%", label: "First-Time Consent Rate" },
    ],
    relatedProjects: ["meridian-one", "nara-bay-hotel"],
  },
  {
    slug: "project-management",
    title: "Project Management",
    category: "Delivery",
    icon: ClipboardList,
    excerpt: "Independent oversight for clients running their own contractors.",
    description:
      "Programme, cost and risk management for owners delivering complex capital projects — including portfolios we did not build ourselves.",
    image: {
      url: unsplash("photo-1516216628859-9bccecab13ca"),
      alt: "Surveyors using precision instruments on a construction site",
    },
    highlights: ["Owner's representative", "Cost & risk control", "Portfolio programmes"],
    deliverables: [
      "Programme baseline and critical path analysis",
      "Cost plan and change control",
      "Risk register and mitigation tracking",
      "Contractor performance reporting",
      "Monthly board-level reporting pack",
    ],
    metrics: [
      { value: 12.4, decimals: 1, prefix: "$", suffix: "B", label: "Portfolios Managed" },
      { value: 6.2, decimals: 1, suffix: "%", label: "Average Cost Saving" },
      { value: 340, label: "Certified PMs" },
    ],
    relatedProjects: ["st-aurora-medical", "northgate-quarter"],
  },
  {
    slug: "design-build",
    title: "Design & Build",
    category: "Delivery",
    icon: Warehouse,
    excerpt: "One contract. One programme. One organisation accountable.",
    description:
      "Our default model. Design, engineering, procurement and construction under a single agreement — the client has one number to call and one party carrying the risk.",
    image: {
      url: unsplash("photo-1454165804606-c3d57bc86b40"),
      alt: "Planning documents, laptop and drawings on a project desk",
    },
    highlights: ["Single point of accountability", "Guaranteed maximum price", "Compressed programme"],
    deliverables: [
      "Single design-and-construct contract",
      "Guaranteed maximum price",
      "Integrated design and construction programme",
      "Procurement and supply-chain management",
      "Handover with as-built digital twin",
    ],
    metrics: [
      { value: 71, suffix: "%", label: "Of Projects Use This Model" },
      { value: 22, suffix: "%", label: "Programme Compression" },
      { value: 1, label: "Point of Accountability" },
    ],
    relatedProjects: ["helios-energy-works", "the-galleria"],
  },
]

export const featuredServices = services.filter((service) => service.featured)

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export const serviceCategories: ServiceCategory[] = [
  "Build",
  "Infrastructure",
  "Design",
  "Delivery",
]

export const categoryBlurbs: Record<ServiceCategory, string> = {
  Build: "Vertical construction, from a single residence to a 68-storey tower.",
  Infrastructure: "Civil engineering with a hundred-year service life.",
  Design: "Architecture and interiors resolved before anyone breaks ground.",
  Delivery: "Commercial models and oversight that carry the risk for you.",
}
