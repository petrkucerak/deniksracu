export type LatLng = { latitude: number; longitude: number };

/** Haversine distance in meters. */
export function distance(a: LatLng, b: LatLng) {
  const R = 6371e3;
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLng = (b.longitude - a.longitude) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(m: number) {
  if (m < 1000) return `${Math.round(m / 10) * 10} m`;
  if (m < 10000) return `${(m / 1000).toFixed(1).replace('.', ',')} km`;
  return `${Math.round(m / 1000)} km`;
}

/** Rough walking time at 5 km/h. */
export function formatWalk(m: number) {
  const min = Math.max(1, Math.round(m / 83));
  return min < 60 ? `${min} min pěšky` : null;
}

export const PRAGUE: LatLng = { latitude: 50.08061, longitude: 14.4101822 };
