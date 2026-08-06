import { unsplash } from "@/lib/images"
import type { Post } from "@/types"

export const posts: Post[] = [
  {
    slug: "nine-millimetres-across-two-kilometres",
    title: "Nine millimetres across two kilometres",
    excerpt:
      "How the Silverstrand deck halves met at mid-span inside a tolerance our own engineers re-surveyed twice before they believed it.",
    body: [
      "A cable-stayed bridge built from both pylons has exactly one moment that cannot be corrected: closure. Everything up to that point is adjustable. Once the two cantilevers meet, whatever error exists is locked into the structure for its service life.",
      "The contract tolerance at Silverstrand was 40mm across 2.1 kilometres. We closed at nine. The number is not a result of better instruments — everyone on that job used the same equipment anyone else can hire. It came from when we chose to survey.",
      "Steel and concrete move with temperature. A 620-metre cantilever in direct sun is not the same length as the same cantilever at four in the morning, and the difference is far larger than the tolerance we were working to. Most projects survey during the working day because that is when people are on site.",
      "We surveyed between 03:00 and 05:00, every night, for eleven weeks. That window is when thermal movement is at its lowest and most stable. It also meant paying a survey crew to work nights for three months on a job where nobody was asking us to.",
      "The result was not luck. It was the consequence of deciding that the tolerance mattered more than the convenience of the programme — which is the same decision, in miniature, that the whole company is built on.",
    ],
    cover: {
      url: unsplash("photo-1559843788-693858bf7338"),
      alt: "Bridge deck segment under construction against a clear sky",
    },
    category: "Engineering",
    author: "Anders Holm",
    authorRole: "Group Engineering Director",
    publishedAt: "2026-07-18",
    readMinutes: 6,
    featured: true,
  },
  {
    slug: "value-engineering-after-contract",
    title: "Why we do not value-engineer after contract",
    excerpt:
      "The substitution that founded this company, and the contractual machinery that now makes it impossible to repeat.",
    body: [
      "Value engineering has a respectable definition: finding a cheaper way to achieve the same performance. In practice, on most projects, it means something narrower — reducing cost after the client has already committed, in ways they will not notice until they own the building.",
      "Our founding incident was a lobby stone specification replaced with a composite three months before handover. The saving was genuine. The problem was that nobody asked, and the client discovered it on a site walk.",
      "Locking specification at contract sounds like a constraint on us. It is. It means we carry the risk of having priced the specified material correctly, and if the market moves against us, that is our exposure rather than the client's surprise.",
      "It also changes who we can work with. A subcontractor whose commercial model depends on post-contract substitution cannot bid our packages. That has narrowed our supply chain considerably, and it is the single most useful filter we have.",
    ],
    cover: {
      url: unsplash("photo-1600607687920-4e2a09cf159d"),
      alt: "Refined interior with stone and joinery detailing",
    },
    category: "Construction News",
    author: "Kwame Adjei",
    authorRole: "Group Chief Executive",
    publishedAt: "2026-07-02",
    readMinutes: 5,
    featured: true,
  },
  {
    slug: "prototyping-a-facade-for-six-months",
    title: "We prototyped a facade for six months before the first panel",
    excerpt:
      "A full-height test rig, 187 recorded failures, and why none of them happened on the building.",
    body: [
      "The double-skin facade on Meridian One was prototyped at full height, in a dedicated rig, for six months before a single panel reached the tower. The rig cost roughly what four floors of installed facade cost.",
      "Over that period we recorded 187 failures. Water ingress at a transom junction that only appeared under simultaneous wind and rain loading. A thermal break that performed correctly in isolation and failed in an assembly. A gasket that met specification but could not be installed by a person wearing gloves at height.",
      "That last one is worth dwelling on. It passed every laboratory test. It failed the only test that matters, which is whether an installer forty floors up in November can actually fit it.",
      "None of the 187 occurred on the building. The facade was installed with no site-applied sealant and no remedial access required after completion. The prototype was not a cost. It was the cheapest place to make those mistakes.",
    ],
    cover: {
      url: unsplash("photo-1493397212122-2b85dda8106b"),
      alt: "Woven lattice facade detail on a contemporary building",
    },
    category: "Architecture",
    author: "Mei-Lin Chen",
    authorRole: "Chief Architect",
    publishedAt: "2026-06-24",
    readMinutes: 7,
    featured: true,
  },
  {
    slug: "what-a-digital-twin-is-for",
    title: "A digital twin nobody opens is an expensive drawing",
    excerpt:
      "Most handover models are archived within a month. What has to be true for one to survive contact with a facilities team.",
    body: [
      "The industry has largely agreed that a digital twin should be handed over with the building. It has not agreed on what the facilities team is supposed to do with it, which is why most are opened once and never again.",
      "A model survives handover when it answers questions the operator actually has. Where is the isolation valve for this riser. Which panel feeds this circuit. When was this air handling unit last accessed and by whom.",
      "That means the model has to be maintained during construction by the people doing the work, not reconstructed at the end by a coordinator who was not there. We capture reality fortnightly and reconcile against the model within the same cycle, so divergence is measured in weeks rather than discovered at completion.",
      "It also means training the operator before handover, not shipping them a file. Two of our projects now have facilities teams who log changes back into the model themselves. That is the only version of this that is worth the money.",
    ],
    cover: {
      url: unsplash("photo-1581094794329-c8112a89af12"),
      alt: "Engineer reviewing a technical model on screen",
    },
    category: "Technology",
    author: "Rafael Duarte",
    authorRole: "Chief Technology Officer",
    publishedAt: "2026-06-11",
    readMinutes: 6,
  },
  {
    slug: "carbon-is-decided-at-concept",
    title: "Carbon is decided at concept, not at commissioning",
    excerpt:
      "By the time a building is being fitted out, roughly 80% of its embodied carbon is already committed. The decisions that matter happen much earlier.",
    body: [
      "There is a well-meaning version of sustainability that arrives late: efficient plant, good controls, a certification submission. It is useful and it is mostly too late.",
      "The largest single lever on embodied carbon is whether you build the structure at all. Retaining an existing frame typically beats any material substitution you can make in a new one. The second largest is structural grid and depth, which is fixed during concept design.",
      "This is why our sustainability function reports outside operations and can recommend that a scheme does not proceed in its current form. It has done so eleven times. On four of those, the client changed the brief rather than the contractor.",
      "Publishing the number matters too. We report operational and embodied carbon annually, including the projects where we did worse than the previous year. A target nobody audits is a marketing position.",
    ],
    cover: {
      url: unsplash("photo-1497435334941-8c899ee9e8e9"),
      alt: "Aerial view of a solar array in open country",
    },
    category: "Sustainability",
    author: "Priya Raghunathan",
    authorRole: "Director of Sustainability",
    publishedAt: "2026-05-29",
    readMinutes: 5,
    featured: true,
  },
  {
    slug: "building-a-hospital-that-never-closed",
    title: "Building a hospital that never closed",
    excerpt:
      "Six years of construction adjacent to operating theatres, fourteen concurrent infection-control zones, and zero interrupted clinical services.",
    body: [
      "St. Aurora was not a construction problem. It was a choreography problem with a construction component.",
      "The existing hospital ran throughout. Every one of the 340 construction weeks was planned around ward occupancy, ambulance routes and negative-pressure boundaries. Fourteen infection-control zones were maintained concurrently, each with its own access protocol and monitoring.",
      "The constraint that shaped everything was air. Construction generates particulates, and a particulate count in an oncology ward is a clinical event, not a housekeeping one. We ran continuous monitoring at 42 points and had authority to stop work on a reading, without escalation.",
      "Work stopped on that basis nine times in six years. Each stoppage cost programme. None of them cost a clinical service, and the hospital handed over four months early regardless.",
    ],
    cover: {
      url: unsplash("photo-1586773860418-d37222d8fce3"),
      alt: "Contemporary hospital building exterior with landscaped forecourt",
    },
    category: "Construction News",
    author: "Ingrid Lindqvist",
    authorRole: "Chief Operating Officer",
    publishedAt: "2026-05-14",
    readMinutes: 6,
  },
  {
    slug: "four-day-floor-cycles",
    title: "Four-day floor cycles start with the formwork, not the programme",
    excerpt:
      "You cannot schedule your way to a four-day cycle. It has to be designed into the formwork before the structural design is finished.",
    body: [
      "A four-day floor cycle is the difference between a three-year tower programme and a two-year one. Almost everyone wants it. Very few achieve it, and the reason is usually sequencing rather than resourcing.",
      "The cycle is not limited by concrete strength or crane availability. It is limited by how quickly the formwork system can be struck, lifted and re-set — and that is a property of the system you chose, which is a decision made long before the first pour.",
      "On Meridian One we designed the formwork system in parallel with the structural design rather than after it. Slab thickness, drop positions and column geometry were all adjusted to suit a system that could be cycled in four days, instead of designing the structure first and then asking how fast it could be built.",
      "Sixty-eight floors, sustained. Topped out eleven weeks ahead of programme. The engineering was not novel; the order of the decisions was.",
    ],
    cover: {
      url: unsplash("photo-1673978481178-b4d72cfd2fb9"),
      alt: "Tower crane lifting formwork above a concrete frame",
    },
    category: "Engineering",
    author: "Anders Holm",
    authorRole: "Group Engineering Director",
    publishedAt: "2026-04-30",
    readMinutes: 5,
  },
  {
    slug: "reuse-before-demolition",
    title: "The lowest-carbon frame is the one already standing",
    excerpt:
      "Structural reuse is harder, slower and more uncertain than demolition. It is also the single largest carbon decision on most refurbishment projects.",
    body: [
      "Retaining an existing structure is genuinely difficult. Record drawings are wrong or missing. Capacity has to be established by intrusive investigation and testing. The programme carries risk that a new-build frame simply does not.",
      "It is also, on almost every refurbishment we have modelled, the largest available carbon saving — larger than any material substitution, glazing specification or plant efficiency measure available downstream.",
      "Nineteen of the heritage-listed assets we have restored kept their original primary structure. In several cases the existing frame was found to have more capacity than the original design allowed for, because mid-century structural design was conservative in ways modern analysis can now quantify.",
      "The honest caveat: it is not always right. Twice we have recommended demolition after investigation showed the retained structure would require more new material to strengthen than replacement would consume. Publishing that is part of the point.",
    ],
    cover: {
      url: unsplash("photo-1508450859948-4e04fabaa4ea"),
      alt: "Building under refurbishment wrapped in scaffolding",
    },
    category: "Sustainability",
    author: "Priya Raghunathan",
    authorRole: "Director of Sustainability",
    publishedAt: "2026-04-16",
    readMinutes: 7,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export const postCategories = [
  "Construction News",
  "Architecture",
  "Engineering",
  "Technology",
  "Sustainability",
] as const

export const featuredPosts = posts.filter((post) => post.featured)
