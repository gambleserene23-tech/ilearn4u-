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
import { createSupabasePublicClient } from "@/lib/supabase/public";

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

/**
 * REAL SUPABASE DATA — used only by the public marketing pages
 * (src/app/(site)/opportunities), which don't need a logged-in user and are
 * safe under the public-read RLS policies in 0003_rls_policies.sql.
 *
 * Portal pages (student/school/organisation/parent) still use the mock
 * functions above, because their applications/messages data hasn't been
 * migrated to Supabase yet and real auth (RLS-scoped per user) isn't wired
 * up. See docs/SUPABASE_SETUP.md for the plan to extend this.
 */
export interface OpportunityWithOrg {
  opportunity: Opportunity;
  organisationName: string;
}

type OpportunityRow = {
  id: string;
  organisation_id: string;
  title: string;
  type_id: string;
  description: string | null;
  what_youll_learn: string[] | null;
  requirements: string[] | null;
  location: string | null;
  age_min: number;
  age_max: number;
  industry: string | null;
  career_pathway: string | null;
  available_places: number;
  start_date: string | null;
  end_date: string | null;
  closing_date: string | null;
  commitment: string | null;
  status: string;
  organisations: { name: string } | { name: string }[] | null;
};

function mapOpportunityRow(row: OpportunityRow): OpportunityWithOrg {
  const org = Array.isArray(row.organisations) ? row.organisations[0] : row.organisations;
  return {
    opportunity: {
      id: row.id,
      organisationId: row.organisation_id,
      title: row.title,
      type: row.type_id as Opportunity["type"],
      description: row.description ?? "",
      whatYoullLearn: row.what_youll_learn ?? [],
      requirements: row.requirements ?? [],
      location: row.location ?? "",
      ageMin: row.age_min,
      ageMax: row.age_max,
      industry: row.industry ?? "",
      careerPathway: row.career_pathway ?? "",
      availablePlaces: row.available_places,
      startDate: row.start_date ?? "",
      endDate: row.end_date ?? "",
      closingDate: row.closing_date ?? "",
      commitment: row.commitment ?? "",
      status: row.status as Opportunity["status"],
    },
    organisationName: org?.name ?? "Unknown organisation",
  };
}

// Strips characters that have special meaning in a PostgREST `.or()` filter
// string, so a search box can't malform the query.
function sanitiseSearchTerm(term: string): string {
  return term.replace(/[,()%*]/g, " ").trim();
}

const OPPORTUNITY_SELECT =
  "id, organisation_id, title, type_id, description, what_youll_learn, requirements, location, age_min, age_max, industry, career_pathway, available_places, start_date, end_date, closing_date, commitment, status, organisations(name)";

export async function getPublicOpportunities(
  filters: OpportunityFilters = {}
): Promise<OpportunityWithOrg[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  let query = supabase.from("opportunities").select(OPPORTUNITY_SELECT).eq("status", "open");

  if (filters.type) query = query.eq("type_id", filters.type);
  if (filters.location) query = query.eq("location", filters.location);
  if (filters.industry) query = query.eq("industry", filters.industry);
  if (filters.query) {
    const term = sanitiseSearchTerm(filters.query);
    if (term) query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%`);
  }

  const { data, error } = await query.order("closing_date", { ascending: true });
  if (error || !data) return [];
  return (data as OpportunityRow[]).map(mapOpportunityRow);
}

export async function getPublicOpportunityById(id: string): Promise<OpportunityWithOrg | undefined> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return undefined;

  const { data, error } = await supabase
    .from("opportunities")
    .select(OPPORTUNITY_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapOpportunityRow(data as OpportunityRow);
}
