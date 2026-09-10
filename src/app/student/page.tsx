import Link from "next/link";
import { getCurrentStudent, getSchoolName } from "@/lib/services/students";
import { getRecommendedOpportunities, getOrganisationName } from "@/lib/services/opportunities";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { getOpportunityById } from "@/lib/services/opportunities";
import { OpportunityCard } from "@/components/domain/OpportunityCard";
import { StatCard } from "@/components/domain/StatAndPricing";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

export default async function StudentDashboardPage() {
  const student = await getCurrentStudent();
  const [recommended, applications] = await Promise.all([
    getRecommendedOpportunities({
      preferredType: student.preferredType,
      interests: student.interests,
      age: student.age,
    }),
    getApplicationsByStudent(student.id),
  ]);

  const recentApplications = await Promise.all(
    applications.slice(0, 3).map(async (app) => ({
      app,
      opportunity: await getOpportunityById(app.opportunityId),
    }))
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Welcome back, {student.fullName.split(" ")[0]}</h1>
      <p className="mt-1 text-ink-soft">{getSchoolName(student.schoolId)}</p>

      {student.interests.length === 0 && (
        <Alert tone="info" title="Not sure where to start?" className="mt-4">
          Take the 2-minute pathway quiz and we&apos;ll suggest interests and an opportunity type
          for your profile.{" "}
          <Link href="/student/quiz" className="font-semibold underline">
            Take the quiz →
          </Link>
        </Alert>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Applications" value={applications.length} />
        <StatCard
          label="Accepted"
          value={applications.filter((a) => a.status === "accepted").length}
        />
        <StatCard
          label="Under review"
          value={applications.filter((a) => a.status === "under_review" || a.status === "submitted").length}
        />
        <StatCard label="Recommended" value={recommended.length} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Recommended for you</h2>
        <Link href="/student/opportunities" className="text-sm font-semibold text-brand-green">
          View all →
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.slice(0, 3).map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} organisationName={getOrganisationName(opp.organisationId)} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Recent applications</h2>
        <Link href="/student/applications" className="text-sm font-semibold text-brand-green">
          View all →
        </Link>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-tan/40 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {recentApplications.map(({ app, opportunity }) =>
              opportunity ? (
                <tr key={app.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-ink">{opportunity.title}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(app.submittedAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge statusId={app.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/student/applications/${app.id}`} className="font-semibold text-brand-green">
                      View
                    </Link>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <LinkButton href="/student/opportunities">Browse more opportunities</LinkButton>
      </div>
    </div>
  );
}
