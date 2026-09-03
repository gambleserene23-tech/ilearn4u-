# Connecting Square payments

Two products need paying for: **School subscriptions** ($49.99 AUD/month,
recurring) and **Organisation opportunity slots** ($5.99 AUD per slot,
one-off or top-up). Both are shown in the UI (`/pricing`,
`/school/settings`, `/organisation/billing`) but **no real charge happens
yet** — this doc is how you connect Square so they do.

## 1. Create a Square account + application

1. Sign up at [squareup.com](https://squareup.com) (or log in if you already
   have one for in-person sales).
2. Go to the [Square Developer Dashboard](https://developer.squareup.com/apps)
   → **Create your first application** → name it `ilearn4u`.
3. Start in the **Sandbox** — it gives you fake test cards so you can build
   and test the whole flow without moving real money. Switch to **Production**
   only once you're ready to go live.

## 2. Get your keys

From your application's dashboard (Sandbox tab first):

| Value | Env variable | Notes |
|---|---|---|
| Sandbox Access Token | `SQUARE_ACCESS_TOKEN` | Server-only secret |
| Sandbox Application ID | `NEXT_PUBLIC_SQUARE_APPLICATION_ID` | Safe for the browser — used by Square's Web Payments SDK to render the card form |
| Location ID (**Locations** tab) | `SQUARE_LOCATION_ID` | Identifies which of your Square locations receives the payment |
| Webhook Signature Key (**Webhooks** tab, after step 4) | `SQUARE_WEBHOOK_SIGNATURE_KEY` | Used to verify webhook calls are really from Square |

Add all four to `.env.local` (dev) and Netlify's environment variables
(production) — see `.env.example`.

## 3. How the two pricing models map to Square

- **Organisation slots ($5.99/slot)** — a one-off **Order + Payment**.
  When an organisation buys N slots, create a Square order for
  `N × $5.99 AUD`, take payment via the Web Payments SDK, and only on a
  confirmed webhook write a row to `organisation_slot_purchases` and bump
  `organisations.total_slots`.
- **School subscriptions ($49.99/month)** — a recurring **Subscription**
  using [Square Subscriptions API](https://developer.squareup.com/docs/subscriptions-api/overview),
  which needs a Subscription Plan created once in the Square dashboard
  (**Catalog → Subscription Plans**). Store the resulting
  `square_subscription_id` on `school_subscriptions`.

## 4. Server-side flow (never trust the client)

This repo already isolates payments behind
[`src/lib/services/payments.ts`](../src/lib/services/payments.ts) so the
actual Square SDK calls live in one place. The flow to implement:

1. Frontend collects card details using Square's **Web Payments SDK**
   (never handle raw card numbers yourself — this keeps you out of PCI-DSS
   scope).
2. Frontend sends the resulting payment **token** (not the card) to a
   Next.js Route Handler / Server Action.
3. Server code calls the Square Payments/Subscriptions API with
   `SQUARE_ACCESS_TOKEN` to actually charge.
4. Square sends a **webhook** (`payment.updated`, `subscription.updated`,
   etc) to a route you create (e.g. `/api/webhooks/square`). Verify its
   signature with `SQUARE_WEBHOOK_SIGNATURE_KEY` before trusting it.
5. **Only after a verified webhook confirms success** do you write to
   `school_subscriptions` / `organisation_slot_purchases` and unlock access
   (e.g. set `schools.subscription_status = 'active'`). This is why those
   tables have no client-writable RLS policy — see
   `supabase/migrations/0003_rls_policies.sql`.

## 5. Go live

1. Complete Square's account activation (business details, bank account for
   payouts).
2. Repeat step 2 using the **Production** tab's keys.
3. Update the Netlify environment variables from sandbox to production
   values.
4. Test with a real small card charge before announcing publicly.

## What's already built vs. what you still need to wire up

| Done | Still to do |
|---|---|
| Pricing displayed consistently from `src/config/site.config.ts` | Web Payments SDK card form on `/organisation/billing` and `/school/settings` |
| Billing UI (slot counter, subscription status) | Route Handler(s) to create Square orders/subscriptions |
| Database tables to record confirmed payments | Webhook endpoint + signature verification |
| `.env.example` documents all required Square variables | Actually creating the Square application/keys (your account, step 1–2 above) |
