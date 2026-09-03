import { getCurrentParentStudents, getSchoolName } from "@/lib/services/students";
import { Card, CardBody } from "@/components/ui/Card";

export default async function ParentStudentsPage() {
  const students = await getCurrentParentStudents();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">Linked Students</h1>
      <p className="mt-1 text-ink-soft">Basic profile information for students linked to your account.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {students.map((student) => (
          <Card key={student.id}>
            <CardBody>
              <h2 className="text-base font-semibold text-ink">{student.fullName}</h2>
              <p className="text-sm text-ink-soft">
                {student.educationLevel} · {getSchoolName(student.schoolId)}
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Age</dt>
                  <dd className="text-ink">{student.age}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Location</dt>
                  <dd className="text-ink">{student.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Career goals</dt>
                  <dd className="max-w-[60%] text-right text-ink">{student.careerGoals}</dd>
                </div>
              </dl>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
