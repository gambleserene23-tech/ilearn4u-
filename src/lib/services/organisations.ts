import { organisations } from "@/data/organisations";
import type { Organisation } from "@/data/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Demo mode fallback only (used if Supabase env vars aren't set).
export const demoOrganisation: Organisation = organisations[0];

function mapOrganisationRow(row: {
  id: string;
  name: string;
  type: string;
  industry: string | null;
  description: string | null;
  location: string | null;
  contact_email: string;
  total_slots: number;
  used_slots: number;
}): Organisation {
  return {
    id: row.id,
    name: row.name,
    type: row.type as Organisation["type"],
    industry: row.industry ?? "",
    description: row.description ?? "",
    location: row.location ?? "",
    contactEmail: row.contact_email,
    totalSlots: row.total_slots,
    usedSlots: row.used_slots,
  };
}

/**
 * Returns the logged-in organisation member's real organisation.
 * src/middleware.ts guarantees a session exists for every /organisation/*
 * route.
 */
export async function getCurrentOrganisation(): Promise<Organisation> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return demoOrganisation;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("getCurrentOrganisation called with no authenticated user");

  const { data: membership } = await supabase
    .from("organisation_members")
    .select("organisation_id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!membership) throw new Error("No organisation membership found for the logged-in user");

  const { data, error } = await supabase
    .from("organisations")
    .select("id, name, type, industry, description, location, contact_email, total_slots, used_slots")
    .eq("id", membership.organisation_id)
    .single();

  if (error || !data) throw new Error("Organisation not found");
  return mapOrganisationRow(data);
}

export async function getOrganisationById(id: string): Promise<Organisation | undefined> {
  return organisations.find((o) => o.id === id);
}

export async function getAllOrganisations(): Promise<Organisation[]> {
  return organisations;
}
