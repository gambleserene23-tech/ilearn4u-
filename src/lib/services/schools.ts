import { schools } from "@/data/schools";
import { students } from "@/data/students";
import type { School } from "@/data/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Demo mode fallback only (used if Supabase env vars aren't set).
export const demoSchool: School = schools[0];

function mapSchoolRow(row: {
  id: string;
  name: string;
  suburb: string;
  contact_email: string;
  subscription_status: string;
  counsellor_name: string | null;
}): School {
  return {
    id: row.id,
    name: row.name,
    suburb: row.suburb,
    contactEmail: row.contact_email,
    subscriptionStatus: row.subscription_status as School["subscriptionStatus"],
    counsellorName: row.counsellor_name ?? "",
  };
}

/**
 * Returns the logged-in counsellor's real school. src/middleware.ts
 * guarantees a session exists for every /school/* route.
 */
export async function getCurrentSchool(): Promise<School> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return demoSchool;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("getCurrentSchool called with no authenticated user");

  const { data: membership } = await supabase
    .from("school_members")
    .select("school_id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!membership) throw new Error("No school membership found for the logged-in user");

  const { data, error } = await supabase
    .from("schools")
    .select("id, name, suburb, contact_email, subscription_status, counsellor_name")
    .eq("id", membership.school_id)
    .single();

  if (error || !data) throw new Error("School not found");
  return mapSchoolRow(data);
}

export async function getSchoolById(id: string): Promise<School | undefined> {
  return schools.find((s) => s.id === id);
}

export async function getSchoolStats(schoolId: string) {
  const schoolStudents = students.filter((s) => s.schoolId === schoolId);
  return {
    totalStudents: schoolStudents.length,
  };
}
