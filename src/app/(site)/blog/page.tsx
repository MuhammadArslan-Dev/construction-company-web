import type { Metadata } from "next"

import { PostsExplorer } from "@/app/(site)/blog/posts-explorer"
import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { PostCard } from "@/components/shared/post-card"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { posts } from "@/data/posts"
import { unsplash } from "@/lib/images"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Engineering notes, architecture, construction news, technology and sustainability from the people delivering Meridian's projects.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Insights — Meridian Construction Group",
    description:
      "Engineering notes and project releases from the people doing the work.",
    url: "/blog",
  },
}

export default function BlogPage() {
  const tiles = posts.map((post, index) => ({
    slug: post.slug,
    category: post.category,
    /* Only the first card is priority. Three competing high-priority images
       fight for the same bandwidth and push LCP out rather than pulling it in. */
    card: <PostCard post={post} priority={index === 0} />,
  }))

  return (
    <>
      <PageHero
        eyebrow="Insights"
        index="01"
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        image={{
          url: unsplash("photo-1454165804606-c3d57bc86b40"),
          alt: "Planning documents and drawings on a project desk",
        }}
        lead="Written by the engineers, architects and directors doing the work — not by a content team. Four emails a year, no newsletter cadence for its own sake."
        meta={[
          { label: "Articles", value: String(posts.length) },
          { label: "Categories", value: "5" },
          { label: "Authors", value: "5" },
          { label: "Cadence", value: "Quarterly" },
        ]}
      >
        <>Notes from</>
        <>
          the{" "}
          <span className="whitespace-nowrap">
            <span className="text-gold-500">work</span>.
          </span>
        </>
      </PageHero>

      <Section tone="light">
        <Container>
          <SectionHeading
            split
            index="02"
            eyebrow="Editorial"
            title="Engineering, architecture and the arguments behind them."
            lead="Every article here is written by someone named on the project it describes. Where a number appears, it is one we publish annually."
          />
          <div className="mt-16">
            <PostsExplorer tiles={tiles} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
