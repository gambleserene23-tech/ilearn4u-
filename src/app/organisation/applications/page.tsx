import Link from "next/link";
import { getCurrentOrganisation } from "@/lib/services/organisations";
import { getApplicationsByOrganisation } from "@/lib/services/applications";
import { getOpportunityById } from "@/lib/services/opportunities";
import { getStudentById, getSchoolName } from "@/lib/services/students";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

export default async function OrganisationApplicationsPage() {
  const organisation = await getCurrentOrganisation();
  const applications = await getApplicationsByOrganisation(organisation.id);

  const rows = await Promise.all(
    applications.map(async (app) => ({
      app,
      opportunity: await getOpportunityById(app.opportunityId),
      student: await getStudentById(app.studentId),
    }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Applications</h1>
      <p className="mt-1 text-ink-soft">Review applications submitted to your opportunity listings.</p>

      <div className="mt-6 overflow-hidden rounded-lg border border-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-tan/40 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ app, opportunity, student }) =>
              opportunity && student ? (
                <tr key={app.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-ink">{student.fullName}</td>
                  <td className="px-4 py-3 text-ink-soft">{opportunity.title}</td>
                  <td className="px-4 py-3 text-ink-soft">{getSchoolName(student.schoolId)}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(app.submittedAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge statusId={app.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/organisation/applications/${app.id}`} className="font-semibold text-brand-green">
                      Review
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
