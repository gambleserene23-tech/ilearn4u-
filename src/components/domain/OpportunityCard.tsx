import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { getOpportunityType } from "@/config/opportunity-types";
import { formatDate } from "@/lib/utils";
import type { Opportunity } from "@/data/types";

export function OpportunityCard({
  opportunity,
  organisationName,
}: {
  opportunity: Opportunity;
  organisationName: string;
}) {
  const type = getOpportunityType(opportunity.type);

  return (
    <Card className="flex h-full flex-col">
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-2xl" aria-hidden>
            {type?.icon}
          </span>
          <Badge>{type?.label}</Badge>
        </div>
        <div>
          <h3 className="text-base font-semibold text-ink">{opportunity.title}</h3>
          <p className="text-sm text-ink-soft">{organisationName}</p>
        </div>
        <p className="text-sm text-ink-soft">{opportunity.location}</p>
        <p className="line-clamp-2 text-sm text-ink-soft">{opportunity.description}</p>
        <p className="text-xs text-ink-soft">
          Suitable for ages {opportunity.ageMin}–{opportunity.ageMax}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-xs text-ink-soft">Closes {formatDate(opportunity.closingDate)}</p>
          <LinkButton href={`/opportunities/${opportunity.id}`} size="sm">
            View Opportunity
          </LinkButton>
        </div>
      </CardBody>
    </Card>
  );
}

export function OpportunityCategoryCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="flex h-full flex-col bg-brand-tan/30">
      <CardBody className="flex flex-1 flex-col gap-3">
        <span className="text-3xl" aria-hidden>
          {icon}
        </span>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="flex-1 text-sm text-ink-soft">{description}</p>
        <Link
          href={href}
          className="text-sm font-semibold text-brand-green hover:text-brand-orange"
        >
          Explore →
        </Link>
      </CardBody>
    </Card>
  );
}
