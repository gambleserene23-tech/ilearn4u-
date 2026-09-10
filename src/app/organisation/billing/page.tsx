"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { StatCard } from "@/components/domain/StatAndPricing";
import { Alert } from "@/components/ui/Alert";
import { SquareCardForm } from "@/components/domain/SquareCardForm";

interface OrganisationSummary {
  totalSlots: number;
  usedSlots: number;
}

export default function OrganisationBillingPage() {
  const [organisation, setOrganisation] = useState<OrganisationSummary | null>(null);
  const [slots, setSlots] = useState(1);
  const { organisation: pricing, currencySymbol } = siteConfig.pricing;

  useEffect(() => {
    fetch("/api/organisation/current")
      .then((r) => r.json())
      .then(setOrganisation)
      .catch(() => setOrganisation(null));
  }, []);

  if (!organisation) {
    return <p className="text-ink-soft">Loading…</p>;
  }

  const remaining = organisation.totalSlots - organisation.usedSlots;
  const totalCost = (slots * pricing.price).toFixed(2);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-green">Billing / Opportunity Slots</h1>
      <p className="mt-1 text-ink-soft">
        Each active listing uses one slot, at {currencySymbol}
        {pricing.price.toFixed(2)} {pricing.unit}.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <StatCard label="Available Opportunity Slots" value={organisation.totalSlots} />
        <StatCard label="Used Slots" value={organisation.usedSlots} />
        <StatCard label="Available Slots" value={remaining} />
      </div>

      {remaining === 0 && (
        <Alert tone="warning" className="mt-6">
          You&apos;re using all of your slots. Purchase more to publish additional listings.
        </Alert>
      )}

      <div className="mt-8 space-y-4 rounded-lg border border-black/5 bg-brand-tan/20 p-5">
        <div>
          <label htmlFor="slots" className="text-sm font-medium text-ink">
            Slots to purchase
          </label>
          <input
            id="slots"
            name="slots"
            type="number"
            min={1}
            value={slots}
            onChange={(e) => setSlots(Math.max(1, Number(e.target.value) || 1))}
            className="mt-1.5 w-32 rounded-md border border-black/10 px-3.5 py-2.5 text-sm"
          />
        </div>

        <SquareCardForm
          amountLabel={`${currencySymbol}${totalCost} AUD`}
          payButtonLabel={`Purchase ${slots} slot${slots === 1 ? "" : "s"}`}
          onSubmitToken={async (sourceId) => {
            const res = await fetch("/api/payments/organisation-slots", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slots, sourceId }),
            });
            const result = await res.json();
            if (result.success) {
              setOrganisation((prev) =>
                prev ? { ...prev, totalSlots: prev.totalSlots + slots } : prev
              );
            }
            return result;
          }}
        />
      </div>

      <p className="mt-4 text-xs text-ink-soft">
        Payments run through Square Sandbox — no real money moves until this switches to
        Square&apos;s production keys (see docs/SQUARE_SETUP.md).
      </p>
    </div>
  );
}
