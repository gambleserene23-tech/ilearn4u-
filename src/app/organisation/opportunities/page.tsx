import Link from "next/link";
import { getCurrentOrganisation } from "@/lib/services/organisations";
import { getOpportunitiesByOrganisation } from "@/lib/services/opportunities";
import { getApplicationsByOpportunity } from "@/lib/services/applications";
import { getOpportunityType } from "@/config/opportunity-types";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

export default async function OrganisationOpportunitiesPage() {
  const organisation = await getCurrentOrganisation();
  const opportunities = await getOpportunitiesByOrganisation(organisation.id);

  const rows = await Promise.all(
    opportunities.map(async (opp) => ({
      opp,
      applicationCount: (await getApplicationsByOpportunity(opp.id)).length,
    }))
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-green">My Opportunities</h1>
        <LinkButton href="/organisation/opportunities/create">Create Opportunity</LinkButton>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rows.map(({ opp, applicationCount }) => {
          const type = getOpportunityType(opp.type);
          return (
            <Card key={opp.id}>
              <CardBody className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge>{type?.label}</Badge>
                  <span className="text-xs text-ink-soft capitalize">{opp.status}</span>
                </div>
                <h2 className="text-base font-semibold text-ink">{opp.title}</h2>
                <p className="text-sm text-ink-soft">
                  {opp.location} · {opp.availablePlaces} places · closes {formatDate(opp.closingDate)}
                </p>
                <p className="text-sm text-ink-soft">{applicationCount} application(s)</p>
                <Link href={`/organisation/opportunities/${opp.id}`} className="mt-1 text-sm font-semibold text-brand-green">
                  Manage →
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
