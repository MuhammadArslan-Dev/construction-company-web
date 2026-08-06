import { unsplash } from "@/lib/images"
import type { MediaAsset, Project, ProjectMilestone, Sector } from "@/types"

/**
 * Case-study media.
 *
 * Finished-building imagery is strictly sector-scoped — a bridge case study
 * must never show a villa interior. Technical and progress imagery is drawn
 * from shared pools on purpose: a rebar cage, a blueprint or a tower crane
 * looks the same on a hospital as it does on a hotel, and pretending otherwise
 * would mean inventing distinctions that do not exist on site.
 *
 * Selection is deterministic (derived from the slug) so a given project always
 * shows the same gallery across builds, server and client.
 */

type Shot = { id: string; alt: string }

const sectorShots: Record<Sector, Shot[]> = {
  residential: [
    { id: "photo-1600596542815-ffad4c1539a9", alt: "White villa with a rectilinear pool at golden hour" },
    { id: "photo-1580587771525-78b9dba3b914", alt: "Modern residence with pool terrace and glazed living space" },
    { id: "photo-1512917774080-9991f1c4c750", alt: "Contemporary white villa framed by palms" },
    { id: "photo-1545324418-cc1a3fa10c00", alt: "Dark-clad apartment block against an open sky" },
    { id: "photo-1600566753086-00f18fb6b3ea", alt: "Bright residential living room with full-height glazing" },
  ],
  commercial: [
    { id: "photo-1511818966892-d7d671e672a2", alt: "Office towers rendered in high contrast from below" },
    { id: "photo-1481253127861-534498168948", alt: "Modern commercial building with layered horizontal balconies" },
    { id: "photo-1449824913935-59a10b8d2000", alt: "City avenue framed by commercial towers" },
    { id: "photo-1493397212122-2b85dda8106b", alt: "Woven lattice facade detail on a contemporary building" },
    { id: "photo-1497366811353-6870744d04b2", alt: "Glazed meeting room within a corporate workplace" },
  ],
  hospitality: [
    { id: "photo-1551882547-ff40c63fe5fa", alt: "Resort grounds and pool at dusk" },
    { id: "photo-1566073771259-6a8506099945", alt: "Resort pool lined with loungers among tropical planting" },
    { id: "photo-1416331108676-a22ccb276e35", alt: "Mediterranean villa and pool illuminated at dusk" },
    { id: "photo-1503174971373-b1f69850bded", alt: "Refined lounge interior with layered lighting" },
  ],
  healthcare: [
    { id: "photo-1586773860418-d37222d8fce3", alt: "Contemporary hospital exterior with landscaped forecourt" },
    { id: "photo-1519494026892-80bbd2d6fd0d", alt: "Bright hospital reception and waiting area" },
    { id: "photo-1439337153520-7082a56a81f4", alt: "White rotunda interior beneath a glazed oculus" },
    { id: "photo-1494891848038-7bd202a2afeb", alt: "Angular white and red institutional facade" },
  ],
  education: [
    { id: "photo-1562774053-701939374585", alt: "Historic brick university building beyond a lawn" },
    { id: "photo-1522798514-97ceb8c4f1c8", alt: "Planted campus atrium with informal seating" },
    { id: "photo-1439337153520-7082a56a81f4", alt: "Naturally lit rotunda within an academic building" },
    { id: "photo-1496564203457-11bb12075d90", alt: "Curved elevated walkway through planted grounds" },
  ],
  retail: [
    { id: "photo-1519567241046-7f570eee3ce6", alt: "Multi-level retail atrium beneath a glazed roof" },
    { id: "photo-1441986300917-64674bd600d8", alt: "Contemporary retail interior with display racks" },
    { id: "photo-1518005020951-eccb494ad742", alt: "Curved striped facade of a retail building" },
  ],
  industrial: [
    { id: "photo-1516937941344-00b4e0337589", alt: "Process plant with stacks and pipework at first light" },
    { id: "photo-1553413077-190dd305871c", alt: "High-bay automated warehouse aisle" },
    { id: "photo-1497435334941-8c899ee9e8e9", alt: "Aerial view of a solar array in open country" },
    { id: "photo-1590674899484-d5640e854abe", alt: "Structural concrete undercroft and circulation deck" },
  ],
  infrastructure: [
    { id: "photo-1515674744565-0d7112cd179a", alt: "Concrete bridge crossing open water, seen from the air" },
    { id: "photo-1477288309209-a14ce05a641e", alt: "Cable-stayed bridge with yellow pylons from above" },
    { id: "photo-1529926691761-20fb82067c71", alt: "Suspension bridge deck seen from beneath" },
    { id: "photo-1563734167687-4677d35bf3c1", alt: "Stay cables converging on a bridge pylon" },
    { id: "photo-1470224114660-3f6686c562eb", alt: "Aerial view of a multi-lane road interchange" },
  ],
}

/** Aerial/drone survey shots — genuinely sector-agnostic. */
const droneShots: Shot[] = [
  { id: "photo-1541888946425-d81bb19240f5", alt: "Aerial survey of the site during deck construction" },
  { id: "photo-1517089152318-42ec560349c0", alt: "Earthworks and bulk excavation seen from the air" },
  { id: "photo-1512187849-463fdb898f21", alt: "Aerial view across the completed structure" },
]

/** Progress photography from the construction phase. */
const progressShots: Shot[] = [
  { id: "photo-1531834685032-c34bf0d84c77", alt: "Reinforcement cages being fixed by the site team" },
  { id: "photo-1673978481178-b4d72cfd2fb9", alt: "Tower crane lifting formwork above the frame" },
  { id: "photo-1614127938540-a1139bee1841", alt: "Steel erectors working at height on the frame" },
  { id: "photo-1508450859948-4e04fabaa4ea", alt: "Structure under construction wrapped in scaffolding" },
  { id: "photo-1504307651254-35680f356dfd", alt: "Services first-fix being installed on the slab" },
  { id: "photo-1516216628859-9bccecab13ca", alt: "Setting-out survey being taken on site" },
]

const blueprintShots: Shot[] = [
  { id: "photo-1721244654392-9c912a6eb236", alt: "Blueprint elevation sheet for the building envelope" },
  { id: "photo-1721244654394-36a7bc2da288", alt: "Blueprint cross-section through the main structure" },
  { id: "photo-1721244654346-9be0c0129e36", alt: "Structural framing blueprint" },
  { id: "photo-1712696779652-dfca8766c5f8", alt: "Blueprint elevation with tower detail" },
]

const floorPlanShots: Shot[] = [
  { id: "photo-1721244653652-268631ec049a", alt: "General arrangement drawing with elevations and plans" },
  { id: "photo-1721244653769-6001b9b4778f", alt: "Two-storey floor plan general arrangement" },
  { id: "photo-1721244653721-bc681b2dfd27", alt: "Radial floor plan of the central volume" },
  { id: "photo-1721244653693-1d13e68b66c1", alt: "Measured elevation drawing of the principal facade" },
]

/** Stable index from a slug — same gallery on every render, server or client. */
function seed(slug: string): number {
  let total = 0
  for (let index = 0; index < slug.length; index += 1) {
    total = (total * 31 + slug.charCodeAt(index)) % 100_000
  }
  return total
}

function pick<T>(pool: T[], slugSeed: number, offset: number): T {
  return pool[(slugSeed + offset) % pool.length]
}

function asset(shot: Shot, kind: MediaAsset["kind"], caption?: string): MediaAsset {
  return { url: unsplash(shot.id, 1800), alt: shot.alt, kind, caption }
}

export function getGallery(project: Project): MediaAsset[] {
  const s = seed(project.slug)
  const finished = sectorShots[project.sector]

  return [
    asset(pick(finished, s, 0), "photo", "Completed — principal elevation"),
    asset(pick(droneShots, s, 1), "drone", "Aerial survey during construction"),
    asset(pick(finished, s, 1), "photo", "Completed — secondary aspect"),
    asset(pick(blueprintShots, s, 0), "blueprint", "Issued-for-construction elevation"),
    asset(pick(progressShots, s, 0), "progress", "Structural frame in progress"),
    asset(pick(floorPlanShots, s, 0), "floor-plan", "General arrangement plan"),
    asset(pick(progressShots, s, 3), "progress", "Envelope installation"),
    asset(pick(finished, s, 2), "photo", "Completed — interior"),
    asset(pick(droneShots, s, 2), "drone", "Aerial view on handover"),
    asset(pick(blueprintShots, s, 2), "blueprint", "Structural framing sheet"),
  ]
}

/** Before/after pair: the site during construction against the finished asset. */
export function getBeforeAfter(project: Project): { before: MediaAsset; after: MediaAsset } {
  const s = seed(project.slug)
  return {
    before: asset(pick(progressShots, s, 1), "before", "During construction"),
    after: {
      url: project.hero.url,
      alt: project.hero.alt,
      kind: "after",
      caption: "On completion",
    },
  }
}

/** Wide crop used by the drag-to-pan viewer. */
export function getPanorama(project: Project): MediaAsset {
  const shot = pick(sectorShots[project.sector], seed(project.slug), 3)
  return {
    url: `https://images.unsplash.com/${shot.id}?auto=format&fit=crop&w=3200&h=1000&q=80`,
    alt: shot.alt,
    kind: "panorama-360",
  }
}

/**
 * Construction timeline. Derived from the project's real start and completion
 * dates so the milestones always sit inside the contract period and stay
 * consistent with the metadata shown elsewhere on the page.
 */
const milestoneStages = [
  { label: "Contract award", description: "Design and construct agreement executed." },
  { label: "Enabling works", description: "Site establishment, demolition and ground improvement." },
  { label: "Substructure complete", description: "Foundations, basement and below-ground services." },
  { label: "Topped out", description: "Primary structure complete to full height." },
  { label: "Envelope watertight", description: "Facade and roofing installed; internal fit-out begins." },
  { label: "Practical completion", description: "Commissioning signed off and keys handed over." },
]

export function getMilestones(project: Project): ProjectMilestone[] {
  const start = project.startedAt ? new Date(project.startedAt) : null
  if (!start) return []

  const end = project.completedAt
    ? new Date(project.completedAt)
    : new Date(start.getTime() + 1000 * 60 * 60 * 24 * 365 * 3)

  const span = end.getTime() - start.getTime()
  const stages = project.completedAt ? milestoneStages : milestoneStages.slice(0, 4)

  return stages.map((stage, index) => {
    const ratio = stages.length === 1 ? 0 : index / (stages.length - 1)
    return {
      label: stage.label,
      description: stage.description,
      date: new Date(start.getTime() + span * ratio).toISOString(),
      position: index,
    }
  })
}

export const imageKindLabels: Record<NonNullable<MediaAsset["kind"]>, string> = {
  photo: "Photography",
  drone: "Drone",
  blueprint: "Blueprints",
  "floor-plan": "Floor Plans",
  progress: "Construction",
  before: "Before",
  after: "After",
  "panorama-360": "Panorama",
}
