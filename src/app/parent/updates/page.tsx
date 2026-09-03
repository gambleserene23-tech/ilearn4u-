import { getCurrentParentStudents } from "@/lib/services/students";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card, CardBody } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

export default async function ParentUpdatesPage() {
  const students = await getCurrentParentStudents();
  const student = students[0];
  const applications = student ? await getApplicationsByStudent(student.id) : [];
  const sorted = [...applications].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  const rows = await Promise.all(
    sorted.map(async (app) => ({ app, opportunity: await getOpportunityById(app.opportunityId) }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Updates</h1>
      <p className="mt-1 text-ink-soft">The latest changes to your student&apos;s applications.</p>

      <div className="mt-6 space-y-3">
        {rows.map(({ app, opportunity }) =>
          opportunity ? (
            <Card key={app.id}>
              <CardBody className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{opportunity.title}</p>
                  <p className="text-xs text-ink-soft">
                    {getOrganisationName(opportunity.organisationId)} · updated {formatDate(app.updatedAt)}
                  </p>
                </div>
                <StatusBadge statusId={app.status} />
              </CardBody>
            </Card>
          ) : null
        )}
      </div>
    </div>
  );
}
