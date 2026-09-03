import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { PricingCard } from "@/components/domain/StatAndPricing";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${siteConfig.brand.name} pricing in AUD — free for students and parents, $${siteConfig.pricing.school.price}/month for schools, $${siteConfig.pricing.organisation.price} per opportunity slot for businesses and universities.`,
};

export default function PricingPage() {
  const { pricing } = siteConfig;

  return (
    <div>
      <Breadcrumbs items={[{ label: "Pricing" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Pricing</h1>
        <p className="mt-2 text-ink-soft">
          Simple pricing in Australian dollars. Students and parents are always free.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <PricingCard {...pricing.student} currencySymbol={pricing.currencySymbol} />
        <PricingCard {...pricing.parent} currencySymbol={pricing.currencySymbol} />
        <PricingCard {...pricing.school} currencySymbol={pricing.currencySymbol} highlight />
        <PricingCard {...pricing.organisation} currencySymbol={pricing.currencySymbol} />
      </div>

      <div className="mt-10 rounded-lg border border-black/5 bg-brand-tan/30 p-6 text-sm leading-6 text-ink-soft">
        <p>
          Businesses and universities pay per active opportunity slot — for example, 5 active
          listings means 5 slots. Schools pay a flat monthly subscription for full access to the
          school portal. Billing connects to a real payment provider (see the developer README);
          no payment is processed in this demo.
        </p>
      </div>
      </div>
    </div>
  );
}
