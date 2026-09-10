import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const VALID_ROLES = ["student", "parent", "school", "organisation"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { role, fullName, email, password, ...extra } = body ?? {};

  if (
    !VALID_ROLES.includes(role) ||
    typeof fullName !== "string" ||
    fullName.trim().length < 1 ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return NextResponse.json(
      { success: false, reason: "Please fill in all required fields (password must be at least 8 characters)." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { success: false, reason: "Signup isn't available yet — Supabase isn't configured." },
      { status: 503 }
    );
  }

  const origin = new URL(request.url).origin;

  // Extra role-specific fields (school_name, organisation_name, age, etc.)
  // are stored as auth user metadata and read by the handle_new_user()
  // trigger (supabase/migrations/0007_auth_provisioning.sql) to create the
  // matching students/schools/organisations row automatically.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, full_name: fullName.trim(), ...extra },
      emailRedirectTo: `${origin}/auth/callback?next=/login?verified=1`,
    },
  });

  if (error) {
    return NextResponse.json({ success: false, reason: error.message }, { status: 400 });
  }

  // Supabase returns a user with no error even for an email that already
  // exists, as a defence against account enumeration — identities.length
  // is the documented way to tell "new signup" from "already registered".
  const alreadyRegistered = data.user && data.user.identities && data.user.identities.length === 0;
  if (alreadyRegistered) {
    return NextResponse.json(
      { success: false, reason: "An account with that email already exists. Try logging in instead." },
      { status: 409 }
    );
  }

  return NextResponse.json({ success: true });
}
