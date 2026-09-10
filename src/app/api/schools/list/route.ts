import { NextResponse } from "next/server";
import { createSupabasePublicClient } from "@/lib/supabase/public";

// Public — powers the "which school are you at?" dropdown on /signup,
// which runs before the visitor has an account. Safe: schools have a
// public-read RLS policy (0008_student_verification.sql), same as
// organisations.
export async function GET() {
  const supabase = createSupabasePublicClient();
  if (!supabase) return NextResponse.json([]);

  const { data, error } = await supabase.from("schools").select("id, name, suburb").order("name");
  if (error || !data) return NextResponse.json([]);
  return NextResponse.json(data);
}
