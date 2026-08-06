import { contactConfig, siteConfig } from "@/config/site"

export type LegalDocument = {
  slug: string
  title: string
  summary: string
  updated: string
  sections: { heading: string; paragraphs: string[] }[]
}

/**
 * Legal content.
 *
 * Written as a genuine starting point rather than lorem ipsum, but it is not
 * legal advice and has not been reviewed by counsel — the client's solicitors
 * should review before launch. Flagged in the UI as well as here.
 */
export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary:
      "What we collect when you contact us or apply for a role, why we hold it, and how to have it removed.",
    updated: "2026-07-01",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          `We collect only what you give us. Submitting a project enquiry provides your name, email address, and optionally a phone number, company, country, project type, indicative budget and the message itself. Applying for a role provides your name, email, and optionally a phone number, a link to your CV and a covering note. Subscribing to the quarterly briefing provides an email address and nothing else.`,
          `We do not run advertising trackers, we do not sell data, and we do not enrich what you submit with third-party datasets.`,
        ],
      },
      {
        heading: "Why we hold it",
        paragraphs: [
          `Enquiries are held so that a director in the relevant region can respond and, where a project proceeds, so we have a record of what was originally discussed. Applications are held to assess your suitability for the role you applied for and, with your agreement, for comparable roles in the following twelve months.`,
          `The lawful basis is legitimate interest for enquiries and, for the quarterly briefing, your consent.`,
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          `Enquiries that do not lead to a project are deleted after twenty-four months. Unsuccessful applications are deleted after twelve months. Newsletter subscriptions are held until you unsubscribe, which every email allows in one click.`,
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `You may request a copy of what we hold, ask us to correct it, or ask us to delete it. Write to ${contactConfig.email} and we will respond within thirty days. If you are in the UK or EU you may also complain to your national supervisory authority.`,
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          `This site sets no analytics or advertising cookies. A session cookie is used only where you sign in to the editorial dashboard, which is not part of the public site.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "The terms on which this website is provided. They do not govern any construction contract.",
    updated: "2026-07-01",
    sections: [
      {
        heading: "Scope",
        paragraphs: [
          `These terms govern your use of ${siteConfig.url} only. They do not form part of, vary, or override any construction, design or professional services contract with ${siteConfig.legalName}. Where a signed contract exists, that contract governs.`,
        ],
      },
      {
        heading: "Accuracy of content",
        paragraphs: [
          `Project values, dates, areas and performance figures are published in good faith and reflect our records at the time of writing. They are illustrative of capability and are not an offer, a warranty, or a representation on which any commercial decision should be based. Request a written proposal for anything you intend to rely on.`,
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          `The Meridian name, wordmark and the written content of this site belong to ${siteConfig.legalName}. Photography is either our own or licensed. You may quote short extracts with attribution and a link.`,
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          `We exclude liability for loss arising from reliance on this website to the fullest extent permitted by law. Nothing here excludes liability for death or personal injury caused by negligence, or for fraud.`,
        ],
      },
    ],
  },
  {
    slug: "modern-slavery",
    title: "Modern Slavery Statement",
    summary:
      "Our steps to identify and prevent forced labour and human trafficking in our operations and supply chain.",
    updated: "2026-07-01",
    sections: [
      {
        heading: "Our position",
        paragraphs: [
          `Construction supply chains carry real modern slavery risk, particularly in labour supply, stone and quarried materials, and in jurisdictions operating sponsorship-based employment. We do not treat this as a compliance formality.`,
        ],
      },
      {
        heading: "What we do",
        paragraphs: [
          `We employ our site workforce directly wherever the law permits, which removes the labour-agency layer where most exploitation occurs. Where agency labour is unavoidable, we audit the agency, not just its paperwork.`,
          `We conduct on-site verification that workers hold their own passports and are paid directly into accounts in their own names. Recruitment fees charged to workers are grounds for immediate termination of a supplier.`,
          `Stone, tile and aggregate suppliers are subject to origin verification. We have terminated three supplier relationships on these grounds since 2021.`,
        ],
      },
      {
        heading: "Reporting",
        paragraphs: [
          `Any worker or member of the public may report a concern to ${contactConfig.email}. Reports may be made anonymously and are investigated by a function that does not report to operations.`,
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    summary:
      "Our commitment to WCAG 2.2 AA, what we have implemented, and how to report a barrier.",
    updated: "2026-07-01",
    sections: [
      {
        heading: "Our target",
        paragraphs: [
          `This site targets WCAG 2.2 Level AA. That is a target we work to rather than a certification we claim, and we would rather hear about a failure than assume there are none.`,
        ],
      },
      {
        heading: "What is implemented",
        paragraphs: [
          `Every interactive element is reachable and operable by keyboard, with a visible focus indicator that meets contrast requirements. Landmarks and heading order are structured for screen readers, and a skip link precedes the navigation.`,
          `All animation is suppressed under the operating system's reduced-motion setting, including scroll-linked effects and the hero video, which is not fetched at all in that case.`,
          `Images carry descriptive alternative text. Filters and dynamic regions announce their results through live regions rather than changing silently.`,
        ],
      },
      {
        heading: "Known limitations",
        paragraphs: [
          `The panoramic project viewer is a drag interaction with a slider alternative; it is operable by keyboard but the experience is not equivalent. The world map exposes every office as a focusable element with a text readout, and the same information is listed below it in full.`,
        ],
      },
      {
        heading: "Reporting a barrier",
        paragraphs: [
          `If something on this site prevents you from doing what you came to do, write to ${contactConfig.email}. We treat accessibility defects as defects, on the same triage as anything else.`,
        ],
      },
    ],
  },
]

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug)
}
