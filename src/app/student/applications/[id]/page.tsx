import { notFound } from "next/navigation";
import { getApplicationById } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { getOpportunityType } from "@/config/opportunity-types";
import { getApplicationStatus } from "@/config/application-statuses";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

export default async function StudentApplicationDetailPage({
  params,
}: PageProps<"/student/applications/[id]">) {
  const { id } = await params;
  const application = await getApplicationById(id);
  if (!application) notFound();

  const opportunity = await getOpportunityById(application.opportunityId);
  if (!opportunity) notFound();

  const status = getApplicationStatus(application.status);
  const type = getOpportunityType(opportunity.type);

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium text-ink-soft">{type?.label}</p>
      <h1 className="mt-1 text-2xl font-semibold text-brand-green">{opportunity.title}</h1>
      <p className="mt-1 text-ink-soft">{getOrganisationName(opportunity.organisationId)}</p>

      <div className="mt-4 flex items-center gap-3">
        <StatusBadge statusId={application.status} />
        <span className="text-sm text-ink-soft">Applied {formatDate(application.submittedAt)}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-ink-soft">{status.description}</p>

      <section className="mt-8 rounded-lg border border-black/5 bg-brand-tan/30 p-5">
        <h2 className="text-sm font-semibold text-ink">Your answers</h2>
        <dl className="mt-3 space-y-3 text-sm">
          {Object.entries(application.answers).map(([key, value]) => (
            <div key={key}>
              <dt className="font-medium capitalize text-ink-soft">{key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="mt-0.5 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Alert tone="info" title="Next steps" className="mt-8">
        Your school counsellor will contact you regarding the next step.
      </Alert>
    </div>
  );
}
