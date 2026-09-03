import { getCurrentOrganisation } from "@/lib/services/organisations";
import { getThreadsByOrganisation } from "@/lib/services/messages";
import { getSchoolName } from "@/lib/services/students";
import { ThreadList } from "@/components/domain/ThreadList";
import { Alert } from "@/components/ui/Alert";

export default async function OrganisationMessagesPage() {
  const organisation = await getCurrentOrganisation();
  const threads = await getThreadsByOrganisation(organisation.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">School Communication</h1>
      <p className="mt-1 text-ink-soft">
        Coordinate placement details directly with school counsellors.
      </p>

      <Alert tone="info" className="mt-4">
        Students don&apos;t have a direct messaging option here — all coordination goes through
        their school.
      </Alert>

      <ThreadList threads={threads} getCounterpartName={(t) => getSchoolName(t.schoolId)} />
    </div>
  );
}
