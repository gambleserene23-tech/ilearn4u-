"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import type { ApplicationStatusId } from "@/config/application-statuses";

export function ApplicationDecisionPanel({ initialStatus }: { initialStatus: ApplicationStatusId }) {
  const [status, setStatus] = useState<ApplicationStatusId>(initialStatus);
  const [decided, setDecided] = useState(false);

  function decide(next: ApplicationStatusId) {
    setStatus(next);
    setDecided(true);
  }

  return (
    <div className="rounded-lg border border-black/5 bg-brand-tan/30 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">Decision</h2>
        <StatusBadge statusId={status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={() => decide("accepted")}>
          Accept
        </Button>
        <Button variant="danger" size="sm" onClick={() => decide("declined")}>
          Decline
        </Button>
        <Button variant="outline" size="sm" onClick={() => decide("waitlisted")}>
          Waitlist
        </Button>
        <Button variant="ghost" size="sm" onClick={() => decide("under_review")}>
          Mark as Under Review
        </Button>
      </div>

      {decided && (
        <Alert tone="success" className="mt-4">
          The student&apos;s school counsellor has been notified of this decision, and the
          student will see the updated status in their portal.
        </Alert>
      )}
    </div>
  );
}
