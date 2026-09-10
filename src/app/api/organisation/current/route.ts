import { NextResponse } from "next/server";
import { getCurrentOrganisation } from "@/lib/services/organisations";

// Used by the Billing page (a Client Component, since it needs to update
// slot counts live after a payment) to read the current demo organisation's
// slot counts. TODO once real auth exists: read this from the session
// instead of the fixed demo identity.
export async function GET() {
  const organisation = await getCurrentOrganisation();
  return NextResponse.json({
    totalSlots: organisation.totalSlots,
    usedSlots: organisation.usedSlots,
  });
}
