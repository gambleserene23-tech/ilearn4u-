import type { Metadata } from "next";
import { getCurrentSchool, getPendingStudentsForSchool } from "@/lib/services/schools";
import { VerificationQueue } from "@/components/domain/VerificationQueue";

export const metadata: Metadata = {
  title: "Student Verifications",
};

export default async function SchoolVerificationsPage() {
  const school = await getCurrentSchool();
  const pending = await getPendingStudentsForSchool(school.id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-green">Student verifications</h1>
      <p className="mt-1 text-ink-soft">
        New students who selected {school.name} at signup appear here until you verify them.
      </p>
      <div className="mt-6">
        <VerificationQueue students={pending} />
      </div>
    </div>
  );
}
