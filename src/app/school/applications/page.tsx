import Link from "next/link";
import { getCurrentSchool } from "@/lib/services/schools";
import { getApplicationsBySchool } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { getStudentById } from "@/lib/services/students";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getApplicationStatus } from "@/config/application-statuses";
import { formatDate } from "@/lib/utils";

export default async function SchoolApplicationsPage() {
  const school = await getCurrentSchool();
  const applications = await getApplicationsBySchool(school.id);

  const rows = await Promise.all(
    applications.map(async (app) => ({
      app,
      opportunity: await getOpportunityById(app.opportunityId),
      student: await getStudentById(app.studentId),
    }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Application Tracking</h1>
      <p className="mt-1 text-ink-soft">
        Every internship, apprenticeship, trainship, headstart and university application from
        {" "}
        {school.name}.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-tan/40 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">Organisation</th>
              <th className="px-4 py-3">Date Applied</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Next action</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ app, opportunity, student }) =>
              opportunity && student ? (
                <tr key={app.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-ink">{student.fullName}</td>
                  <td className="px-4 py-3 text-ink-soft">{opportunity.title}</td>
                  <td className="px-4 py-3 text-ink-soft">{getOrganisationName(opportunity.organisationId)}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(app.submittedAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge statusId={app.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{nextAction(app.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/school/applications/${app.id}`} className="font-semibold text-brand-green">
                      View
                    </Link>
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

function nextAction(statusId: string): string {
  const status = getApplicationStatus(statusId);
  switch (status.id) {
    case "submitted":
      return "Awaiting organisation review";
    case "under_review":
      return "Check in with organisation";
    case "waitlisted":
      return "Monitor for a place";
    case "accepted":
      return "Coordinate placement details";
    case "declined":
      return "Discuss next options with student";
    default:
      return "—";
  }
}
