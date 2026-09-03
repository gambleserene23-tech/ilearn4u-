import { getCurrentParentStudents } from "@/lib/services/students";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

export default async function ParentApplicationsPage() {
  const students = await getCurrentParentStudents();
  const student = students[0];
  const applications = student ? await getApplicationsByStudent(student.id) : [];

  const rows = await Promise.all(
    applications.map(async (app) => ({ app, opportunity: await getOpportunityById(app.opportunityId) }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Applications</h1>
      <p className="mt-1 text-ink-soft">
        {student ? `${student.fullName}'s` : "Your student's"} applications and their current status.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-tan/40 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">Organisation</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ app, opportunity }) =>
              opportunity ? (
                <tr key={app.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-ink">{opportunity.title}</td>
                  <td className="px-4 py-3 text-ink-soft">{getOrganisationName(opportunity.organisationId)}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(app.submittedAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge statusId={app.status} />
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
