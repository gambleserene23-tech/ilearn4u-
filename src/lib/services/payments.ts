/**
 * PAYMENTS SERVICE — Square
 * =============================================================================
 * Isolates all payment-provider-specific code behind this one file (see
 * README → "No unnecessary lock-in"). Pages and components never import the
 * Square SDK/API directly — they call the functions below, or (from the
 * browser) the Route Handler at src/app/api/payments/organisation-slots/route.ts
 * which calls these functions server-side.
 *
 * IMPORTANT: a slot purchase is only ever recorded in Supabase AFTER Square's
 * CreatePayment API confirms the charge succeeded. Nothing here marks a
 * payment as successful optimistically.
 * =============================================================================
 */

import { randomUUID } from "crypto";
import { siteConfig } from "@/config/site.config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export interface PaymentResult {
  success: boolean;
  reason?: string;
  paymentId?: string;
}

function isSquareConfigured(): boolean {
  return Boolean(
    process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID
  );
}

function squareApiBase(): string {
  return process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

// TEMPORARY BRIDGE — remove once real Supabase Auth/signup exists.
// The Organisation Portal currently always shows a fixed demo identity
// (see src/lib/services/organisations.ts -> getCurrentOrganisation), whose
// `id` is a mock string like "org_northwave", not a real Supabase row id.
// This maps those mock ids to the matching real rows seeded by
// supabase/migrations/0004_demo_data.sql, so a demo payment can still be
// recorded against a real organisation. Once real login exists,
// getCurrentOrganisation() will return the real Supabase id directly and
// this map (and every call site using it) should be deleted.
const DEMO_ORG_ID_BRIDGE: Record<string, string> = {
  org_northwave: "20000000-0000-0000-0000-000000000001",
  org_buildright: "20000000-0000-0000-0000-000000000002",
  org_careplus: "20000000-0000-0000-0000-000000000003",
  org_ferrotech: "20000000-0000-0000-0000-000000000004",
  org_harbourhotels: "20000000-0000-0000-0000-000000000005",
  org_brightstudio: "20000000-0000-0000-0000-000000000006",
  org_stateuni: "20000000-0000-0000-0000-000000000007",
  org_coastaluni: "20000000-0000-0000-0000-000000000008",
};

export function resolveSupabaseOrganisationId(mockOrCurrentId: string): string {
  return DEMO_ORG_ID_BRIDGE[mockOrCurrentId] ?? mockOrCurrentId;
}

/**
 * Charge a card (already tokenized by Square's Web Payments SDK in the
 * browser — see src/components/domain/SquareCardForm.tsx) for
 * `slotCount` opportunity slots, and — only once Square confirms the
 * charge — record the purchase and top up the organisation's slot count.
 */
export async function purchaseOrganisationSlots(
  organisationId: string,
  slotCount: number,
  sourceId: string
): Promise<PaymentResult> {
  if (!isSquareConfigured()) {
    return {
      success: false,
      reason:
        "Square is not connected yet. Add SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID " +
        "(see docs/SQUARE_SETUP.md) before real payments can be taken.",
    };
  }

  const unitPriceAud = siteConfig.pricing.organisation.price;
  const amountCents = Math.round(slotCount * unitPriceAud * 100);

  let response: Response;
  try {
    response = await fetch(`${squareApiBase()}/v2/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2025-01-23",
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: randomUUID(),
        amount_money: { amount: amountCents, currency: "AUD" },
        location_id: process.env.SQUARE_LOCATION_ID,
        note: `ilearn4u — ${slotCount} opportunity slot(s)`,
      }),
    });
  } catch {
    return { success: false, reason: "Could not reach Square. Check your connection and try again." };
  }

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.payment) {
    const detail = body?.errors?.[0]?.detail ?? "Payment was declined.";
    return { success: false, reason: detail };
  }

  const payment = body.payment;
  if (payment.status !== "COMPLETED") {
    return { success: false, reason: `Payment status: ${payment.status}. No slots were added.` };
  }

  const realOrgId = resolveSupabaseOrganisationId(organisationId);
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    const { error: insertError } = await supabase.from("organisation_slot_purchases").insert({
      organisation_id: realOrgId,
      slots_purchased: slotCount,
      price_aud: unitPriceAud,
      square_order_id: payment.id,
    });
    if (insertError) {
      console.error("[payments] failed to record organisation_slot_purchases:", insertError.message, insertError.cause);
    }

    const { data: org, error: selectError } = await supabase
      .from("organisations")
      .select("total_slots")
      .eq("id", realOrgId)
      .maybeSingle();
    if (selectError) {
      console.error("[payments] failed to read organisation total_slots:", selectError.message);
    }

    if (org) {
      const { error: updateError } = await supabase
        .from("organisations")
        .update({ total_slots: org.total_slots + slotCount })
        .eq("id", realOrgId);
      if (updateError) {
        console.error("[payments] failed to update organisation total_slots:", updateError.message);
      }
    }
  } else {
    console.error("[payments] Supabase admin client unavailable — payment succeeded in Square but was not recorded.");
  }

  // The Square charge is already the source of truth here — a Supabase
  // write failure is logged above (and should page someone in production)
  // but doesn't change the fact that the customer was charged, so we still
  // report success to the payer rather than double-charging on retry.
  return { success: true, paymentId: payment.id };
}

/**
 * Start (or resume) a school's monthly subscription ($49.99 AUD/month).
 * NOT YET IMPLEMENTED — Square's Subscriptions API needs a Subscription
 * Plan created once in the Square dashboard (Catalog → Subscription Plans)
 * before this can charge anything. See docs/SQUARE_SETUP.md step 3.
 */
export async function subscribeSchool(schoolId: string): Promise<PaymentResult> {
  void schoolId;
  return {
    success: false,
    reason:
      "School subscriptions aren't wired up yet — this needs a Subscription Plan " +
      "created in the Square dashboard first. See docs/SQUARE_SETUP.md.",
  };
}

/**
 * Verify an incoming Square webhook's signature before trusting its
 * payload. Not required for the synchronous card-payment flow above (its
 * API response IS the confirmation) — this becomes necessary once
 * subscriptions (async lifecycle events) are wired up.
 */
export function verifySquareWebhookSignature(
  _rawBody: string,
  _signatureHeader: string | null
): boolean {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key || !_signatureHeader) return false;
  // TODO once subscriptions are added: implement Square's HMAC-SHA256
  // verification per https://developer.squareup.com/docs/webhooks/step3verify
  return false;
}
