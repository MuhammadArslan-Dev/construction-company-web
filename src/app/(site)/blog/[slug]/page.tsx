import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { CtaBand } from "@/components/sections/cta-band"
import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { PostCard } from "@/components/shared/post-card"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { siteConfig } from "@/config/site"
import { getPost, posts } from "@/data/posts"
import { formatDate } from "@/lib/format"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "Article not found" }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.cover.url, alt: post.cover.alt }],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const index = posts.findIndex((item) => item.slug === post.slug)
  const previous = posts[(index - 1 + posts.length) % posts.length]
  const next = posts[(index + 1) % posts.length]

  const related = posts
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover.url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={post.category}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
          { label: post.title },
        ]}
        image={post.cover}
        lead={post.excerpt}
        size="tall"
        meta={[
          { label: "Author", value: post.author },
          { label: "Role", value: post.authorRole },
          { label: "Published", value: formatDate(post.publishedAt) },
          { label: "Read", value: `${post.readMinutes} min` },
        ]}
      >
        <>{post.title}</>
      </PageHero>

      {/* Body ------------------------------------------------------------- */}
      <Section tone="light">
        <Container size="editorial">
          <RevealGroup step={0.07} className="space-y-7">
            {post.body.map((paragraph, paragraphIndex) => (
              <RevealItem key={paragraph.slice(0, 40)}>
                <p
                  className={
                    paragraphIndex === 0
                      ? "text-lead text-foreground text-pretty"
                      : "text-body text-muted-foreground text-pretty"
                  }
                >
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal preset="up" className="border-hairline mt-14 border-t pt-8">
            <p className="text-eyebrow text-muted-foreground uppercase">
              Written by
            </p>
            <p className="font-display text-foreground mt-3 text-lg font-semibold">
              {post.author}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {post.authorRole}, {siteConfig.legalName}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Related ----------------------------------------------------------- */}
      {related.length ? (
        <Section tone="muted">
          <Container>
            <SectionHeading
              split
              eyebrow="Also in this category"
              title={`More on ${post.category.toLowerCase()}.`}
            />
            <RevealGroup
              step={0.08}
              className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <RevealItem key={item.slug}>
                  <PostCard post={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      {/* Prev / next -------------------------------------------------------- */}
      <Section tone="light" spacing="compact">
        <Container>
          <div className="border-hairline grid gap-8 border-t pt-10 sm:grid-cols-2">
            <Link
              href={`/blog/${previous.slug}`}
              className="group/nav focus-visible:ring-ring rounded-xs focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <span className="text-eyebrow text-muted-foreground flex items-center gap-2 uppercase">
                <ArrowLeft
                  aria-hidden
                  className="text-gold-500 size-3.5 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/nav:-translate-x-1"
                />
                Previous
              </span>
              <span className="font-display text-foreground mt-3 block text-lg font-semibold text-balance">
                {previous.title}
              </span>
            </Link>

            <Link
              href={`/blog/${next.slug}`}
              className="group/nav focus-visible:ring-ring rounded-xs sm:text-right focus-visible:ring-2 focus-visible:ring-offset-4"
            >
              <span className="text-eyebrow text-muted-foreground flex items-center gap-2 uppercase sm:justify-end">
                Next
                <ArrowRight
                  aria-hidden
                  className="text-gold-500 size-3.5 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/nav:translate-x-1"
                />
              </span>
              <span className="font-display text-foreground mt-3 block text-lg font-semibold text-balance">
                {next.title}
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
