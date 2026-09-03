import type { Metadata } from "next";
import { getPublicOpportunities } from "@/lib/services/opportunities";
import { opportunityTypes } from "@/config/opportunity-types";
import { locationOptions, careerCategoryOptions } from "@/config/application-questions";
import { OpportunityCard } from "@/components/domain/OpportunityCard";
import { Select } from "@/components/ui/Input";
import { Breadcrumbs } from "@/components/domain/Breadcrumbs";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Opportunities",
  description: `Browse internships, apprenticeships, trainships, headstart programs, work experience and university opportunities on ${siteConfig.brand.name}, filtered by location, industry and career interest.`,
};

export default async function OpportunitiesPage({
  searchParams,
}: PageProps<"/opportunities">) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;
  const location = typeof params.location === "string" ? params.location : undefined;
  const industry = typeof params.industry === "string" ? params.industry : undefined;

  const results = await getPublicOpportunities({ type, location, industry });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Opportunities" }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold text-brand-green">Opportunities</h1>
        <p className="mt-2 text-ink-soft">
          Browse internships, apprenticeships, trainships, headstart programs and more. Filter by
          what matters to you.
        </p>
      </div>

      <form className="mt-8 grid grid-cols-1 gap-4 rounded-lg border border-black/5 bg-brand-tan/30 p-5 sm:grid-cols-3">
        <Select name="type" defaultValue={type ?? ""}>
          <option value="">All types</option>
          {opportunityTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </Select>
        <Select name="location" defaultValue={location ?? ""}>
          <option value="">All locations</option>
          {locationOptions().map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
        <Select name="industry" defaultValue={industry ?? ""}>
          <option value="">All industries</option>
          {careerCategoryOptions().map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </Select>
        <div className="sm:col-span-3">
          <button className="rounded-full bg-brand-green px-5 py-2 text-sm font-medium text-white hover:bg-brand-green-dark">
            Apply filters
          </button>
        </div>
      </form>

      <p className="mt-8 text-sm text-ink-soft">{results.length} opportunities found</p>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(({ opportunity, organisationName }) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} organisationName={organisationName} />
        ))}
      </div>
      </div>
    </div>
  );
}
