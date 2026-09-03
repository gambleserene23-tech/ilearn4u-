import { notFound } from "next/navigation";
import { getApplicationById } from "@/lib/services/applications";
import { getOpportunityById } from "@/lib/services/opportunities";
import { getStudentById, getSchoolName } from "@/lib/services/students";
import { ApplicationDecisionPanel } from "@/components/domain/ApplicationDecisionPanel";
import { formatDate } from "@/lib/utils";

export default async function OrganisationApplicationReviewPage({
  params,
}: PageProps<"/organisation/applications/[id]">) {
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
        {student.fullName} · {getSchoolName(student.schoolId)} · Age {student.age}
      </p>
      <p className="mt-1 text-sm text-ink-soft">Applied {formatDate(application.submittedAt)}</p>

      <section className="mt-6 rounded-lg border border-black/5 p-5">
        <h2 className="text-sm font-semibold text-ink">Application answers</h2>
        <dl className="mt-3 space-y-3 text-sm">
          {Object.entries(application.answers).map(([key, value]) => (
            <div key={key}>
              <dt className="font-medium capitalize text-ink-soft">{key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="mt-0.5 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-6">
        <ApplicationDecisionPanel initialStatus={application.status} />
      </div>

      <p className="mt-4 text-xs text-ink-soft">
        Note: {student.fullName.split(" ")[0]} cannot be messaged directly — coordinate any next
        steps with {getSchoolName(student.schoolId)} via Messages.
      </p>
    </div>
  );
}
