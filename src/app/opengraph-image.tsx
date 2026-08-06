import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = `${siteConfig.legalName} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Default social card.
 *
 * Drawn rather than photographed so it never depends on a remote image being
 * reachable at build time. Pages with their own hero photography (projects,
 * services, articles) override this through `openGraph.images` in their
 * metadata; this is the fallback for the routes that have no single image.
 *
 * No custom font is loaded on purpose — fetching one at build would make the
 * card a network dependency, and the trade is a slightly plainer face on a
 * layout that carries the brand through colour, scale and the gold rule.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #020617 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 8,
              height: 56,
              background: "#C89B3C",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 30,
              letterSpacing: 12,
              color: "#F8FAFC",
              fontWeight: 700,
              display: "flex",
            }}
          >
            {siteConfig.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              color: "#FFFFFF",
              fontWeight: 800,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            Building Tomorrow.
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              color: "#C89B3C",
              fontWeight: 800,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            Building Better.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: "rgba(248,250,252,0.65)",
              display: "flex",
              maxWidth: 700,
            }}
          >
            International construction &amp; engineering · 18 countries
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(248,250,252,0.45)",
              letterSpacing: 3,
              display: "flex",
            }}
          >
            500+ PROJECTS
          </div>
        </div>
      </div>
    ),
    size
  )
}
