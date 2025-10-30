// src/app/(customer)/book-delivery/utils/mapbox.ts

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

/**
 * Convert a location name to coordinates using Mapbox Geocoding API.
 */
export async function getCoordinates(place: string): Promise<[number, number] | null> {
  if (!place) return null;

  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await res.json();
    const coords = data.features?.[0]?.center;
    return coords || null;
  } catch (err) {
    console.error("❌ Error fetching coordinates:", err);
    return null;
  }
}

/**
 * Get route details (distance, duration, geometry) between two points.
 */
export async function getRoute(
  start: [number, number],
  end: [number, number]
): Promise<{
  distanceKm: number;
  durationMin: number;
  geometry: any;
} | null> {
  try {
    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(",")};${end.join(
        ","
      )}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`
    );
    const data = await res.json();
    const route = data.routes?.[0];

    if (!route) return null;

    return {
      distanceKm: route.distance / 1000,
      durationMin: route.duration / 60,
      geometry: route.geometry,
    };
  } catch (err) {
    console.error("❌ Error fetching route:", err);
    return null;
  }
}
