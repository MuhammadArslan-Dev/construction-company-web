/**
 * Photography source helper.
 *
 * Every image in `src/data` is a real, licence-free architectural photograph
 * delivered from the Unsplash CDN (whitelisted in `next.config.ts`). We request
 * a large master and let `next/image` derive the responsive set from it, so the
 * browser still only ever downloads an AVIF/WebP at the size it needs.
 *
 * Swapping to Cloudinary later means changing this one function.
 */
export function unsplash(id: string, width = 2000): string {
  const host = id.startsWith("premium_photo")
    ? "https://plus.unsplash.com"
    : "https://images.unsplash.com"
  return `${host}/${id}?auto=format&fit=crop&w=${width}&q=80`
}

/**
 * Face-centred portrait crop at the 4:5 ratio the team cards actually use.
 * Requesting a square and letting `object-cover` crop it would throw away a
 * fifth of every image and hand the browser pixels it never paints.
 */
export function portrait(id: string, width = 800): string {
  const height = Math.round((width * 5) / 4)
  return `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=3.2&w=${width}&h=${height}&q=80`
}
