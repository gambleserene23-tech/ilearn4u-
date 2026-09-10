import { students, demoStudent, demoParent } from "@/data/students";
import { schools } from "@/data/schools";
import type { Student } from "@/data/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function mapStudentRow(row: {
  id: string;
  full_name: string;
  age: number;
  location: string | null;
  school_id: string | null;
  education_level: string | null;
  career_goals: string | null;
  interests: string[] | null;
  skills: string[] | null;
  preferred_opportunity_type: string | null;
  avatar_color: string | null;
}): Student {
  return {
    id: row.id,
    userId: row.id,
    fullName: row.full_name,
    age: row.age,
    location: row.location ?? "",
    schoolId: row.school_id ?? "",
    educationLevel: row.education_level ?? "",
    careerGoals: row.career_goals ?? "",
    interests: row.interests ?? [],
    skills: row.skills ?? [],
    preferredType: (row.preferred_opportunity_type as Student["preferredType"]) ?? "no-preference",
    avatarColor: row.avatar_color ?? "#0F3D2E",
  };
}

/**
 * Returns the logged-in student's real profile. Middleware (src/middleware.ts)
 * guarantees a session exists for every /student/* route, so this throws
 * (rather than silently falling back to demo data) if that invariant is
 * ever broken — a real bug should be loud, not hidden behind fake data.
 */
export async function getCurrentStudent(): Promise<Student> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return demoStudent; // Supabase not configured — local/demo fallback only.

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("getCurrentStudent called with no authenticated user");

  const { data, error } = await supabase
    .from("students")
    .select(
      "id, full_name, age, location, school_id, education_level, career_goals, interests, skills, preferred_opportunity_type, avatar_color"
    )
    .eq("profile_id", user.id)
    .maybeSingle();

  if (error || !data) throw new Error("No student profile found for the logged-in user");
  return mapStudentRow(data);
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return students.find((s) => s.id === id);
}

export async function getStudentsBySchool(schoolId: string): Promise<Student[]> {
  return students.filter((s) => s.schoolId === schoolId);
}

/**
 * The logged-in parent's linked student(s). Real parent-student linking
 * (a student's school approving a parent's request to link, or similar)
 * isn't built yet — a freshly signed-up real parent has no linked students,
 * so this returns real ones if a Supabase link exists, otherwise falls
 * back to the demo link so the existing demo experience keeps working.
 */
export async function getCurrentParentStudents(): Promise<Student[]> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: parentRow } = await supabase
        .from("parents")
        .select("id")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (parentRow) {
        const { data: links } = await supabase
          .from("parent_students")
          .select("student_id")
          .eq("parent_id", parentRow.id);

        if (links && links.length > 0) {
          const { data: rows } = await supabase
            .from("students")
            .select(
              "id, full_name, age, location, school_id, education_level, career_goals, interests, skills, preferred_opportunity_type, avatar_color"
            )
            .in(
              "id",
              links.map((l) => l.student_id)
            );
          if (rows) return rows.map(mapStudentRow);
        }
        return []; // Real parent, but no linked students yet.
      }
    }
  }

  const linkedIds = demoParent.studentIds;
  return students.filter((s) => linkedIds.includes(s.id));
}

export async function getCurrentParentName(): Promise<string> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
      if (data) return data.full_name;
    }
  }
  return "Grace Chen"; // demo fallback
}

// NOTE: kept synchronous and mock-data-backed on purpose — used inline in
// JSX in ~10 places (e.g. {getSchoolName(id)}) that can't await. Real
// students now come from Supabase (getCurrentStudent below), but their
// linked school's display name still resolves via this mock lookup until
// those call sites are migrated too. A real student's school_id currently
// won't match a mock school id, so this falls back to "Unknown school" —
// tracked as follow-up work alongside the wider applications/messages
// Supabase migration.
export function getSchoolName(schoolId: string): string {
  return schools.find((s) => s.id === schoolId)?.name ?? "Unknown school";
}

export function getSchoolCounsellor(schoolId: string): string {
  return schools.find((s) => s.id === schoolId)?.counsellorName ?? "your counsellor";
}
