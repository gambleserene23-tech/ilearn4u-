import { getCurrentStudent } from "@/lib/services/students";
import { studentProfileFields } from "@/config/application-questions";
import { opportunityTypes } from "@/config/opportunity-types";
import { Field, Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default async function StudentProfilePage() {
  const student = await getCurrentStudent();

  const values: Record<string, string> = {
    fullName: student.fullName,
    age: String(student.age),
    location: student.location,
    school: "Riverbend State High School",
    educationLevel: student.educationLevel,
    careerGoals: student.careerGoals,
    interests: student.interests[0] ?? "",
    skills: student.skills.join(", "),
    preferredType:
      opportunityTypes.find((t) => t.id === student.preferredType)?.label ?? "No preference",
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">My Profile</h1>
      <p className="mt-1 text-ink-soft">
        Keep this up to date — it&apos;s used to match you with opportunities and pre-fills your
        applications.
      </p>

      <form className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {studentProfileFields.map((field) => (
          <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : undefined}>
            <Field label={field.label} htmlFor={field.id} required={field.required} helpText={field.helpText}>
              {field.type === "textarea" ? (
                <Textarea id={field.id} name={field.id} defaultValue={values[field.id]} />
              ) : field.type === "select" ? (
                <Select id={field.id} name={field.id} defaultValue={values[field.id]}>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  defaultValue={values[field.id]}
                />
              )}
            </Field>
          </div>
        ))}
        <div className="sm:col-span-2">
          <Button type="submit">Save profile</Button>
        </div>
      </form>
    </div>
  );
}
