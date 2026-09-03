import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { Application, Opportunity } from "@/data/types";

export function ApplicationCard({
  application,
  opportunity,
  organisationName,
  detailHref,
}: {
  application: Application;
  opportunity: Opportunity;
  organisationName: string;
  detailHref: string;
}) {
  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">{opportunity.title}</h3>
            <p className="text-sm text-ink-soft">{organisationName}</p>
          </div>
          <StatusBadge statusId={application.status} />
        </div>
        <p className="text-xs text-ink-soft">Applied {formatDate(application.submittedAt)}</p>
        <Link href={detailHref} className="mt-1 text-sm font-semibold text-brand-green hover:text-brand-orange">
          View details →
        </Link>
      </CardBody>
    </Card>
  );
}
