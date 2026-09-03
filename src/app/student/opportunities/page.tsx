import { getCurrentStudent } from "@/lib/services/students";
import { getRecommendedOpportunities, getOrganisationName } from "@/lib/services/opportunities";
import { OpportunityCard } from "@/components/domain/OpportunityCard";

export default async function StudentOpportunitiesPage() {
  const student = await getCurrentStudent();
  const recommended = await getRecommendedOpportunities({
    preferredType: student.preferredType,
    interests: student.interests,
    age: student.age,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Recommended Opportunities</h1>
      <p className="mt-1 text-ink-soft">
        Matched to your profile — {student.location}, interested in {student.interests.join(", ")}.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} organisationName={getOrganisationName(opp.organisationId)} />
        ))}
      </div>
    </div>
  );
}
