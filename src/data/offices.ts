import type { Office } from "@/types"

/**
 * Delivery offices. Coordinates are real so the world map can project them
 * with the same equirectangular transform used for the landmasses.
 */
export const offices: Office[] = [
  {
    city: "New York",
    country: "United States",
    region: "Americas",
    address: "One Meridian Plaza, 480 Park Avenue, NY 10022",
    phone: "+1 (212) 555-0180",
    email: "newyork@meridian-construction.com",
    coordinates: { lat: 40.7614, lng: -73.9714 },
    isHeadquarters: true,
    projectCount: 84,
  },
  {
    city: "Toronto",
    country: "Canada",
    region: "Americas",
    address: "220 Bay Street, Suite 1900, ON M5J 2W4",
    phone: "+1 (416) 555-0142",
    email: "toronto@meridian-construction.com",
    coordinates: { lat: 43.6532, lng: -79.3832 },
    projectCount: 37,
  },
  {
    city: "London",
    country: "United Kingdom",
    region: "EMEA",
    address: "18 Finsbury Circus, EC2M 7EB",
    phone: "+44 20 7946 0180",
    email: "london@meridian-construction.com",
    coordinates: { lat: 51.5155, lng: -0.0922 },
    projectCount: 61,
  },
  {
    city: "Copenhagen",
    country: "Denmark",
    region: "EMEA",
    address: "Havnegade 39, 1058 København K",
    phone: "+45 33 55 01 80",
    email: "copenhagen@meridian-construction.com",
    coordinates: { lat: 55.6761, lng: 12.5683 },
    projectCount: 29,
  },
  {
    city: "Lisbon",
    country: "Portugal",
    region: "EMEA",
    address: "Avenida da Liberdade 110, 1250-146",
    phone: "+351 21 555 0180",
    email: "lisbon@meridian-construction.com",
    coordinates: { lat: 38.7223, lng: -9.1393 },
    projectCount: 44,
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "EMEA",
    address: "Emirates Financial Towers, DIFC, PO Box 507012",
    phone: "+971 4 555 0180",
    email: "dubai@meridian-construction.com",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    projectCount: 73,
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "APAC",
    address: "8 Marina Boulevard, Level 34, 018981",
    phone: "+65 6555 0180",
    email: "singapore@meridian-construction.com",
    coordinates: { lat: 1.2897, lng: 103.8501 },
    projectCount: 58,
  },
  {
    city: "Auckland",
    country: "New Zealand",
    region: "APAC",
    address: "88 Shortland Street, Auckland CBD 1010",
    phone: "+64 9 555 0180",
    email: "auckland@meridian-construction.com",
    coordinates: { lat: -36.8485, lng: 174.7633 },
    projectCount: 22,
  },
]

export const regions = ["Americas", "EMEA", "APAC"] as const
