/**
 * LOCATION COORDINATES
 * =============================================================================
 * Approximate coordinates for each entry in locationOptions()
 * (src/config/application-questions.ts), used only to power the live
 * distance filter on /student/opportunities — see
 * src/components/domain/DistanceFilter.tsx.
 *
 * Add a new location? Add it to locationOptions() AND give it coordinates
 * here with the exact same name, or distance filtering will just skip it
 * (treated as "unknown distance", always shown regardless of the slider).
 * =============================================================================
 */
export interface LocationCoords {
  name: string;
  lat: number;
  lng: number;
}

export const locationCoords: LocationCoords[] = [
  { name: "Brisbane, QLD", lat: -27.4698, lng: 153.0251 },
  { name: "Gold Coast, QLD", lat: -28.0167, lng: 153.4 },
  { name: "Sunshine Coast, QLD", lat: -26.65, lng: 153.0667 },
  { name: "Toowoomba, QLD", lat: -27.5598, lng: 151.9507 },
  { name: "Cairns, QLD", lat: -16.9186, lng: 145.7781 },
  { name: "Townsville, QLD", lat: -19.259, lng: 146.8169 },
  // "Remote / Online" deliberately has no coordinates — it has no physical
  // distance, so the filter always treats it as "within range".
];

export function getLocationCoords(name: string): LocationCoords | undefined {
  return locationCoords.find((l) => l.name === name);
}
