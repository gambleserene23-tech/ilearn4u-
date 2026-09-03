import { getCurrentOrganisation } from "@/lib/services/organisations";
import { siteConfig } from "@/config/site.config";
import { StatCard } from "@/components/domain/StatAndPricing";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default async function OrganisationBillingPage() {
  const organisation = await getCurrentOrganisation();
  const remaining = organisation.totalSlots - organisation.usedSlots;
  const { organisation: pricing, currencySymbol } = siteConfig.pricing;

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

      <form className="mt-8 flex items-end gap-3">
        <div>
          <label htmlFor="slots" className="text-sm font-medium text-ink">
            Slots to purchase
          </label>
          <input
            id="slots"
            name="slots"
            type="number"
            min={1}
            defaultValue={1}
            className="mt-1.5 w-32 rounded-md border border-black/10 px-3.5 py-2.5 text-sm"
          />
        </div>
        <Button type="submit">Purchase slots</Button>
      </form>

      <p className="mt-4 text-xs text-ink-soft">
        This demo does not process real payments. Connect a payment provider (see README) before
        going live — billing will never claim a payment succeeded until it actually has.
      </p>
    </div>
  );
}
