import { notFound } from "next/navigation";
import { getApplicationById } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { getStudentById } from "@/lib/services/students";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

export default async function SchoolApplicationDetailPage({
  params,
}: PageProps<"/school/applications/[id]">) {
  const { id } = await params;
  const application = await getApplicationById(id);
  if (!application) notFound();

  const [opportunity, student] = await Promise.all([
    getOpportunityById(application.opportunityId),
    getStudentById(application.studentId),
  ]);
  if (!opportunity || !student) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-green">{opportunity.title}</h1>
      <p className="mt-1 text-ink-soft">
        {student.fullName} · {getOrganisationName(opportunity.organisationId)}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <StatusBadge statusId={application.status} />
        <span className="text-sm text-ink-soft">Applied {formatDate(application.submittedAt)}</span>
      </div>

      <section className="mt-8 rounded-lg border border-black/5 bg-brand-tan/30 p-5">
        <h2 className="text-sm font-semibold text-ink">Student answers</h2>
        <dl className="mt-3 space-y-3 text-sm">
          {Object.entries(application.answers).map(([key, value]) => (
            <div key={key}>
              <dt className="font-medium capitalize text-ink-soft">{key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="mt-0.5 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {application.status === "accepted" && (
        <Alert tone="success" title="Coordinate next steps" className="mt-6">
          This application has been accepted. Message the organisation to arrange interview or
          start details.
        </Alert>
      )}

      <div className="mt-6">
        <LinkButton href="/school/messages" variant="secondary">
          Message the organisation
        </LinkButton>
      </div>
    </div>
  );
}
