import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;

  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ success: false, reason: "Enter a valid email." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ success: false, reason: "Not available yet." }, { status: 503 });
  }

  const origin = new URL(request.url).origin;
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  // Always return success, whether or not the email exists — otherwise
  // this endpoint could be used to check which emails have an account.
  return NextResponse.json({ success: true });
}
