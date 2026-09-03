import { notFound } from "next/navigation";
import { getOpportunityById } from "@/lib/services/opportunities";
import { getApplicationsByOpportunity } from "@/lib/services/applications";
import { getStudentById } from "@/lib/services/students";
import { getOpportunityType } from "@/config/opportunity-types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function OrganisationOpportunityDetailPage({
  params,
}: PageProps<"/organisation/opportunities/[id]">) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  const applications = await getApplicationsByOpportunity(opportunity.id);
  const type = getOpportunityType(opportunity.type);

  const rows = await Promise.all(
    applications.map(async (app) => ({ app, student: await getStudentById(app.studentId) }))
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <Badge>{type?.label}</Badge>
        <span className="text-xs text-ink-soft capitalize">{opportunity.status}</span>
      </div>
      <h1 className="mt-2 text-2xl font-semibold text-brand-green">{opportunity.title}</h1>
      <p className="mt-1 text-ink-soft">
        {opportunity.location} · {opportunity.availablePlaces} places · closes{" "}
        {formatDate(opportunity.closingDate)}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-ink">Applications ({rows.length})</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-tan/40 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ app, student }) =>
              student ? (
                <tr key={app.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-ink">{student.fullName}</td>
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
