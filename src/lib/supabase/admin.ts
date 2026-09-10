import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 *
 * SERVER-ONLY. Never import this into a Client Component ("use client") or
 * return its data straight to the browser without checking it first. Only
 * use it after independently verifying a request is legitimate (e.g. a
 * confirmed Square payment) — see src/lib/services/payments.ts and
 * docs/SECURITY.md.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
