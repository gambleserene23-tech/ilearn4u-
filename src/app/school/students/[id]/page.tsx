import { notFound } from "next/navigation";
import { getStudentById } from "@/lib/services/students";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card, CardBody } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

export default async function SchoolStudentDetailPage({
  params,
}: PageProps<"/school/students/[id]">) {
  const { id } = await params;
  const student = await getStudentById(id);
  if (!student) notFound();

  const applications = await getApplicationsByStudent(student.id);
  const rows = await Promise.all(
    applications.map(async (app) => ({ app, opportunity: await getOpportunityById(app.opportunityId) }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">{student.fullName}</h1>
      <p className="mt-1 text-ink-soft">
        {student.educationLevel} · Age {student.age} · {student.location}
      </p>

      <Card className="mt-6">
        <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Career goals</p>
            <p className="mt-1 text-sm text-ink">{student.careerGoals}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Interests</p>
            <p className="mt-1 text-sm text-ink">{student.interests.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Skills</p>
            <p className="mt-1 text-sm text-ink">{student.skills.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Preferred type</p>
            <p className="mt-1 text-sm text-ink capitalize">{student.preferredType.replace("-", " ")}</p>
          </div>
        </CardBody>
      </Card>

      <h2 className="mt-8 text-lg font-semibold text-ink">Applications</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-black/5">
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
