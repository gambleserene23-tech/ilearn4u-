import { getCurrentStudent } from "@/lib/services/students";
import { getRecommendedOpportunities, getOrganisationName } from "@/lib/services/opportunities";
import { DistanceFilter, type DistanceFilterItem } from "@/components/domain/DistanceFilter";
import { getLocationCoords } from "@/config/locations.config";
import { haversineDistanceKm } from "@/lib/utils";

export default async function StudentOpportunitiesPage() {
  const student = await getCurrentStudent();
  const recommended = await getRecommendedOpportunities({
    preferredType: student.preferredType,
    interests: student.interests,
    age: student.age,
  });

  const home = getLocationCoords(student.location);

  const items: DistanceFilterItem[] = recommended.map((opportunity) => {
    const oppCoords = getLocationCoords(opportunity.location);
    const distanceKm =
      home && oppCoords ? haversineDistanceKm(home.lat, home.lng, oppCoords.lat, oppCoords.lng) : null;
    return { opportunity, organisationName: getOrganisationName(opportunity.organisationId), distanceKm };
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Recommended Opportunities</h1>
      <p className="mt-1 text-ink-soft">
        Matched to your profile — {student.location}, interested in {student.interests.join(", ")}.
      </p>

      <DistanceFilter items={items} homeLocation={student.location} />
    </div>
  );
}
