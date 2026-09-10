import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Saves quiz-suggested interests/preferred type onto the student's own
// row. Uses the session-bound server client (not the admin client) — the
// existing "students: self update" RLS policy is what actually allows
// this, so it's impossible for this route to be used to edit anyone
// else's profile even if the request were forged.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const interests = Array.isArray(body?.interests) ? body.interests : null;
  const preferredType = typeof body?.preferredType === "string" ? body.preferredType : null;

  if (!interests || !preferredType) {
    return NextResponse.json({ success: false, reason: "Invalid quiz result." }, { status: 400 });
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
    .update({ interests, preferred_opportunity_type: preferredType })
    .eq("profile_id", user.id);

  if (error) {
    return NextResponse.json({ success: false, reason: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
