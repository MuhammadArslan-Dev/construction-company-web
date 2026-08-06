import { v2 as cloudinary } from "cloudinary"

import { env } from "@/lib/env"

/**
 * Server-side Cloudinary SDK (signed uploads, asset administration).
 * Client-side rendering uses `next-cloudinary`'s <CldImage /> which only needs
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.
 */
if (env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

export { cloudinary }

export const hasCloudinary = Boolean(env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

/** Cloudinary delivery URL builder for cases where <CldImage /> is overkill. */
export function cloudinaryUrl(
  publicId: string,
  transformations = "f_auto,q_auto"
): string {
  const cloud = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloud) return publicId
  return `https://res.cloudinary.com/${cloud}/image/upload/${transformations}/${publicId}`
}
