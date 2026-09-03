import { createClient } from "@supabase/supabase-js";

/**
 * A cookie-free Supabase client for fully public, unauthenticated reads
 * (public opportunity listings, organisation names). Safe to call anywhere
 * — including generateStaticParams / build time — because it never touches
 * the request's cookies, unlike src/lib/supabase/server.ts. Only used for
 * data covered by a public-read RLS policy (see 0003_rls_policies.sql).
 */
export function createSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}
