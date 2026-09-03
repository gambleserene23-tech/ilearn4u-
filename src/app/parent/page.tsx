import Link from "next/link";
import { getCurrentParentStudents, getSchoolName, getSchoolCounsellor } from "@/lib/services/students";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { StatCard } from "@/components/domain/StatAndPricing";

export default async function ParentDashboardPage() {
  const students = await getCurrentParentStudents();
  const student = students[0];
  const applications = student ? await getApplicationsByStudent(student.id) : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Welcome back, Grace</h1>
      {student && (
        <p className="mt-1 text-ink-soft">
          Following {student.fullName}&apos;s journey at {getSchoolName(student.schoolId)}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Applications" value={applications.length} />
        <StatCard label="Accepted" value={applications.filter((a) => a.status === "accepted").length} />
        <StatCard
          label="In progress"
          value={applications.filter((a) => a.status === "submitted" || a.status === "under_review").length}
        />
      </div>

      {student && (
        <div className="mt-8 rounded-lg border border-black/5 bg-brand-tan/30 p-5">
          <h2 className="text-sm font-semibold text-ink">School contact</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {getSchoolCounsellor(student.schoolId)} — {getSchoolName(student.schoolId)}
          </p>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Link href="/parent/students" className="text-sm font-semibold text-brand-green">
          View linked students →
        </Link>
        <Link href="/parent/applications" className="text-sm font-semibold text-brand-green">
          View applications →
        </Link>
      </div>
    </div>
  );
}
