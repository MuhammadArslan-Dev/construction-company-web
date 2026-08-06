import { geoEquirectangular, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import type { FeatureCollection, Geometry } from "geojson"
import type { Topology } from "topojson-specification"

import topology from "@/data/world-110m.json"

/**
 * World map geometry.
 *
 * Everything here runs on the server at build time. The client receives only
 * an array of SVG path strings and pre-projected marker coordinates — d3-geo
 * and topojson-client never reach the browser bundle, which is the whole
 * reason the projection is exposed as a plain function rather than a hook.
 *
 * Equirectangular is chosen deliberately: it distorts area at the poles, but
 * this map exists to show where offices are relative to one another, and its
 * linear lon/lat mapping keeps marker placement trivially verifiable.
 */
export const MAP_WIDTH = 1000
export const MAP_HEIGHT = 500

const world = topology as unknown as Topology

const projection = geoEquirectangular()
  .scale(MAP_WIDTH / (2 * Math.PI))
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])

const pathBuilder = geoPath(projection)

const land = feature(
  world,
  world.objects.countries
) as unknown as FeatureCollection<Geometry>

/** One SVG path per country, ready to drop into a <path d="…" />. */
export const countryPaths: string[] = land.features
  .map((country) => pathBuilder(country))
  .filter((d): d is string => Boolean(d))

/** Longitude/latitude → SVG user units in the same coordinate space. */
export function projectPoint(lng: number, lat: number): { x: number; y: number } {
  const point = projection([lng, lat])
  if (!point) return { x: 0, y: 0 }
  return { x: point[0], y: point[1] }
}
