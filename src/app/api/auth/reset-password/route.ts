import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { success: false, reason: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ success: false, reason: "Not available yet." }, { status: 503 });
  }

  // This only succeeds because the /auth/callback route already exchanged
  // the recovery link's code for a temporary session (see that route).
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { success: false, reason: "Your reset link has expired. Request a new one." },
      { status: 401 }
    );
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return NextResponse.json({ success: false, reason: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
