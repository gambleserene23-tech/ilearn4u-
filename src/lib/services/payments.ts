/**
 * PAYMENTS SERVICE — Square
 * =============================================================================
 * Isolates all payment-provider-specific code behind this one file (see
 * README → "No unnecessary lock-in"). Pages and components never import the
 * Square SDK directly — they call the functions below.
 *
 * IMPORTANT: nothing in this file marks a payment as successful on its own.
 * A real charge only happens once SQUARE_ACCESS_TOKEN is set and the
 * corresponding webhook handler (to be added at
 * src/app/api/webhooks/square/route.ts) verifies Square's confirmation.
 * Until then, these functions return a clear "not connected" result rather
 * than pretending to succeed — see docs/SQUARE_SETUP.md for the full flow.
 * =============================================================================
 */

import { siteConfig } from "@/config/site.config";

export interface PaymentResult {
  success: boolean;
  reason?: string;
  checkoutUrl?: string;
}

function isSquareConfigured(): boolean {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
}

/**
 * Start a one-off payment for organisation opportunity slots
 * ($5.99 AUD × slotCount). Call this from a Server Action / Route Handler —
 * never from a client component, since it will eventually need
 * SQUARE_ACCESS_TOKEN.
 */
export async function purchaseOrganisationSlots(
  organisationId: string,
  slotCount: number
): Promise<PaymentResult> {
  if (!isSquareConfigured()) {
    return {
      success: false,
      reason:
        "Square is not connected yet. Add SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID " +
        "(see docs/SQUARE_SETUP.md) before real payments can be taken.",
    };
  }

  const totalAud = slotCount * siteConfig.pricing.organisation.price;

  // TODO (once Square is connected): create a Square Order for `totalAud`,
  // return the Web Payments SDK checkout details, and only write to
  // organisation_slot_purchases after the webhook confirms payment.
  // See docs/SQUARE_SETUP.md step 4.
  void organisationId;
  void totalAud;

  return {
    success: false,
    reason: "Square order creation not yet implemented — see docs/SQUARE_SETUP.md.",
  };
}

/**
 * Start (or resume) a school's monthly subscription ($49.99 AUD/month).
 * Uses Square's Subscriptions API against a Subscription Plan you create
 * once in the Square dashboard (Catalog → Subscription Plans).
 */
export async function subscribeSchool(schoolId: string): Promise<PaymentResult> {
  if (!isSquareConfigured()) {
    return {
      success: false,
      reason:
        "Square is not connected yet. Add SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID " +
        "(see docs/SQUARE_SETUP.md) before real subscriptions can be created.",
    };
  }

  // TODO (once Square is connected): call the Square Subscriptions API with
  // the Subscription Plan variation id, store the returned
  // square_subscription_id on school_subscriptions.
  void schoolId;

  return {
    success: false,
    reason: "Square subscription creation not yet implemented — see docs/SQUARE_SETUP.md.",
  };
}

/**
 * Verify an incoming Square webhook's signature before trusting its
 * payload. Call this at the top of src/app/api/webhooks/square/route.ts.
 */
export function verifySquareWebhookSignature(
  _rawBody: string,
  _signatureHeader: string | null
): boolean {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key || !_signatureHeader) return false;

  // TODO (once Square is connected): implement Square's HMAC-SHA256
  // verification per https://developer.squareup.com/docs/webhooks/step3verify
  return false;
}
