import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRole } from "@/config/roles";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;
  const password = body?.password;

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ success: false, reason: "Enter your email and password." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ success: false, reason: "Login isn't available yet." }, { status: 503 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Supabase itself refuses to sign in an unconfirmed email and says so
    // — surface that specifically; everything else stays a generic
    // "incorrect email or password" so this can't be used to check which
    // emails have an account.
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return NextResponse.json(
        { success: false, reason: "Please verify your email first — check your inbox for the confirmation link." },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: false, reason: "Incorrect email or password." }, { status: 401 });
  }

  if (!data.user) {
    return NextResponse.json({ success: false, reason: "Incorrect email or password." }, { status: 401 });
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();

  const portalPath = getRole(profile?.role ?? "")?.portalPath ?? "/";
  return NextResponse.json({ success: true, redirectTo: portalPath });
}
