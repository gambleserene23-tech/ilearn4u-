"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/domain/OpportunityCard";
import type { Opportunity } from "@/data/types";

export interface DistanceFilterItem {
  opportunity: Opportunity;
  organisationName: string;
  distanceKm: number | null; // null = unknown distance (e.g. Remote/Online) — always shown
}

const MAX_KM = 500;

export function DistanceFilter({ items, homeLocation }: { items: DistanceFilterItem[]; homeLocation: string }) {
  const [maxDistance, setMaxDistance] = useState(MAX_KM);

  const visible = useMemo(() => {
    return items
      .filter((item) => item.distanceKm === null || item.distanceKm <= maxDistance)
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [items, maxDistance]);

  const hasCoords = items.some((item) => item.distanceKm !== null);

  if (!hasCoords) {
    // Student's location isn't one we have coordinates for — skip the
    // slider entirely rather than show a control that can't do anything.
    return (
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ opportunity, organisationName }) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} organisationName={organisationName} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 rounded-lg border border-black/5 bg-brand-tan/20 p-4">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="distance" className="font-medium text-ink">
            Maximum distance from {homeLocation}
          </label>
          <span className="font-semibold text-brand-green">
            {maxDistance >= MAX_KM ? "Any distance" : `${maxDistance} km`}
          </span>
        </div>
        <input
          id="distance"
          type="range"
          min={10}
          max={MAX_KM}
          step={10}
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="mt-2 w-full accent-brand-orange"
        />
        <p className="mt-1 text-xs text-ink-soft">
          Remote / Online opportunities are always included, regardless of distance.
        </p>
      </div>

      <p className="mt-4 text-sm text-ink-soft">{visible.length} opportunities within range</p>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ opportunity, organisationName, distanceKm }) => (
          <div key={opportunity.id} className="relative">
            {distanceKm !== null && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-green px-2 py-1 text-xs font-semibold text-white">
                {Math.round(distanceKm)} km
              </span>
            )}
            <OpportunityCard opportunity={opportunity} organisationName={organisationName} />
          </div>
        ))}
      </div>
    </div>
  );
}
