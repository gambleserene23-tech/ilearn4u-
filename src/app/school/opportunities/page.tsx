import { getOpportunities, getOrganisationName } from "@/lib/services/opportunities";
import { OpportunityCard } from "@/components/domain/OpportunityCard";

export default async function SchoolOpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Available Opportunities</h1>
      <p className="mt-1 text-ink-soft">Browse what&apos;s currently open across all organisations.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} organisationName={getOrganisationName(opp.organisationId)} />
        ))}
      </div>
    </div>
  );
}
