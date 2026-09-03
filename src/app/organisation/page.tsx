import Link from "next/link";
import { getCurrentOrganisation } from "@/lib/services/organisations";
import { getOpportunitiesByOrganisation } from "@/lib/services/opportunities";
import { getApplicationsByOrganisation } from "@/lib/services/applications";
import { StatCard } from "@/components/domain/StatAndPricing";
import { LinkButton } from "@/components/ui/Button";

export default async function OrganisationDashboardPage() {
  const organisation = await getCurrentOrganisation();
  const [opportunities, applications] = await Promise.all([
    getOpportunitiesByOrganisation(organisation.id),
    getApplicationsByOrganisation(organisation.id),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-green">{organisation.name}</h1>
      <p className="mt-1 text-ink-soft capitalize">{organisation.type} · {organisation.industry}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Opportunity Slots" value={organisation.totalSlots} />
        <StatCard label="Used Slots" value={organisation.usedSlots} />
        <StatCard label="Live Listings" value={opportunities.length} />
        <StatCard
          label="New Applications"
          value={applications.filter((a) => a.status === "submitted").length}
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <LinkButton href="/organisation/opportunities/create">Create Opportunity</LinkButton>
        <LinkButton href="/organisation/applications" variant="outline">
          Review Applications
        </LinkButton>
        <Link href="/organisation/billing" className="self-center text-sm font-semibold text-brand-green">
          Manage slots →
        </Link>
      </div>
    </div>
  );
}
