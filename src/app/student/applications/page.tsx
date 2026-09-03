import { getCurrentStudent } from "@/lib/services/students";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { ApplicationCard } from "@/components/domain/ApplicationCard";
import { Alert } from "@/components/ui/Alert";

export default async function StudentApplicationsPage() {
  const student = await getCurrentStudent();
  const applications = await getApplicationsByStudent(student.id);

  const withOpportunities = await Promise.all(
    applications.map(async (app) => ({ app, opportunity: await getOpportunityById(app.opportunityId) }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">My Applications</h1>
      <p className="mt-1 text-ink-soft">Track the status of every opportunity you&apos;ve applied for.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {withOpportunities.map(({ app, opportunity }) =>
          opportunity ? (
            <ApplicationCard
              key={app.id}
              application={app}
              opportunity={opportunity}
              organisationName={getOrganisationName(opportunity.organisationId)}
              detailHref={`/student/applications/${app.id}`}
            />
          ) : null
        )}
      </div>

      {applications.length === 0 && (
        <Alert tone="info" className="mt-6">
          You haven&apos;t applied to any opportunities yet.
        </Alert>
      )}
    </div>
  );
}
