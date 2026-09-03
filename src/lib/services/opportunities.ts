/**
 * OPPORTUNITIES SERVICE
 * =============================================================================
 * Pages call these functions instead of importing mock data directly. When a
 * real backend exists, replace the function bodies with `fetch`/database
 * calls — the function signatures (and therefore every page that calls them)
 * stay the same. See README.md "Future Backend Connection".
 * =============================================================================
 */
import { opportunities } from "@/data/opportunities";
import { organisations } from "@/data/organisations";
import type { Opportunity } from "@/data/types";

export interface OpportunityFilters {
  type?: string;
  location?: string;
  industry?: string;
  query?: string;
}

export async function getOpportunities(filters: OpportunityFilters = {}): Promise<Opportunity[]> {
  let results = [...opportunities];

  if (filters.type) {
    results = results.filter((o) => o.type === filters.type);
  }
  if (filters.location) {
    results = results.filter((o) => o.location === filters.location);
  }
  if (filters.industry) {
    results = results.filter((o) => o.industry === filters.industry);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (o) =>
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        getOrganisationName(o.organisationId).toLowerCase().includes(q)
    );
  }

  return results;
}

export async function getOpportunityById(id: string): Promise<Opportunity | undefined> {
  return opportunities.find((o) => o.id === id);
}

export async function getOpportunitiesByOrganisation(organisationId: string): Promise<Opportunity[]> {
  return opportunities.filter((o) => o.organisationId === organisationId);
}

// Very simple "recommended for you" matcher: prioritises the student's
// preferred type and interests, otherwise returns the most recently posted.
export async function getRecommendedOpportunities(params: {
  preferredType?: string;
  interests?: string[];
  age?: number;
}): Promise<Opportunity[]> {
  const { preferredType, interests = [], age } = params;

  const scored = opportunities
    .filter((o) => (age ? age >= o.ageMin && age <= o.ageMax : true))
    .map((o) => {
      let score = 0;
      if (preferredType && o.type === preferredType) score += 2;
      if (interests.includes(o.industry)) score += 1;
      return { o, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.map((s) => s.o);
}

export function getOrganisationName(organisationId: string): string {
  return organisations.find((org) => org.id === organisationId)?.name ?? "Unknown organisation";
}
