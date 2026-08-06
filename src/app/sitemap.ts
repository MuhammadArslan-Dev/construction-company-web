import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { jobs } from "@/data/jobs"
import { legalDocuments } from "@/data/legal"
import { posts } from "@/data/posts"
import { projects } from "@/data/projects"
import { services } from "@/data/services"

/**
 * Sitemap, generated from the same data that renders the pages — a hand-kept
 * list would drift the first time a project is added.
 *
 * `priority` is ordinal, not absolute: it only tells a crawler how these URLs
 * rank against each other on this site. `changeFrequency` is a hint, and is set
 * to what is genuinely true rather than "daily" on everything.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  /* Annotated before `.map()` — spreading through a map widens
     `changeFrequency` from its literal union to `string`. */
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${base}/about`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/careers`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/blog`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${base}/tools`, changeFrequency: "monthly", priority: 0.7 },
      {
        url: `${base}/tools/cost-estimator`,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${base}/tools/assistant`,
        changeFrequency: "monthly",
        priority: 0.6,
      },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }))

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: project.completedAt ? new Date(project.completedAt) : now,
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${base}/careers/${job.slug}`,
    lastModified: new Date(job.postedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  const legalRoutes: MetadataRoute.Sitemap = legalDocuments.map((document) => ({
    url: `${base}/legal/${document.slug}`,
    lastModified: new Date(document.updated),
    changeFrequency: "yearly",
    priority: 0.3,
  }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...jobRoutes,
    ...postRoutes,
    ...legalRoutes,
  ]
}
