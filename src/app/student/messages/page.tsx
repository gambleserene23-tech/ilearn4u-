import { getCurrentStudent, getSchoolCounsellor } from "@/lib/services/students";
import { Alert } from "@/components/ui/Alert";

export default async function StudentMessagesPage() {
  const student = await getCurrentStudent();
  const counsellor = getSchoolCounsellor(student.schoolId);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-green">Messages</h1>
      <p className="mt-1 text-ink-soft">
        ilearn4u doesn&apos;t offer direct messaging with businesses or universities.
      </p>

      <Alert tone="info" title="Your school counsellor will contact you" className="mt-6">
        {counsellor} receives updates on your applications and will reach out regarding any next
        steps — such as interviews, start dates or paperwork.
      </Alert>
    </div>
  );
}
