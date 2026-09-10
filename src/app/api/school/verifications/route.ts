import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Uses the school counsellor's own session — the "students: school can
// verify own students" RLS policy (0008_student_verification.sql) is what
// actually enforces "only your own school's students," and a DB trigger
// stops this route being abused to change anything but the status even
// if the check here were bypassed.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const studentId = body?.studentId;
  const decision = body?.decision;

  if (typeof studentId !== "string" || !["verified", "rejected"].includes(decision)) {
    return NextResponse.json({ success: false, reason: "Invalid request." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ success: false, reason: "Not available yet." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, reason: "Not signed in." }, { status: 401 });
  }

  const { error } = await supabase
    .from("students")
    .update({ verification_status: decision })
    .eq("id", studentId);

  if (error) {
    return NextResponse.json({ success: false, reason: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
