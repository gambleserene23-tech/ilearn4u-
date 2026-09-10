import { NextResponse } from "next/server";
import { purchaseOrganisationSlots } from "@/lib/services/payments";
import { getCurrentOrganisation } from "@/lib/services/organisations";

// Runs server-side only — this is where SQUARE_ACCESS_TOKEN and the
// Supabase service role key actually get used. Never move this logic to a
// Client Component.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slots = Number(body?.slots);
  const sourceId = body?.sourceId;

  // Upper bound stops a single request from attempting an enormous charge
  // (typo, bug, or a deliberate abuse/card-testing attempt).
  const MAX_SLOTS_PER_REQUEST = 50;
  if (
    !sourceId ||
    typeof sourceId !== "string" ||
    !Number.isInteger(slots) ||
    slots < 1 ||
    slots > MAX_SLOTS_PER_REQUEST
  ) {
    return NextResponse.json({ success: false, reason: "Invalid request." }, { status: 400 });
  }

  // TODO once real Supabase Auth is wired: read the organisation id from the
  // authenticated session/cookie, never from anything the client could set
  // itself. Today every visitor to /organisation is the same demo identity.
  const organisation = await getCurrentOrganisation();

  const result = await purchaseOrganisationSlots(organisation.id, slots, sourceId);
  return NextResponse.json(result, { status: result.success ? 200 : 402 });
}
