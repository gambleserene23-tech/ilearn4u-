/**
 * APPLICATION STATUSES
 * =============================================================================
 * The application workflow, in order:
 *
 *   submitted -> under_review -> (accepted | declined | waitlisted)
 *
 * Every status badge, filter and dashboard stat reads its label/colour from
 * this file — change wording or colours here, not in individual components.
 * =============================================================================
 */

export type ApplicationStatusId =
  | "submitted"
  | "under_review"
  | "accepted"
  | "declined"
  | "waitlisted";

export interface ApplicationStatus {
  id: ApplicationStatusId;
  label: string;
  description: string;
  // Tailwind-friendly tone used by <StatusBadge>
  tone: "neutral" | "info" | "success" | "danger" | "warning";
}

export const applicationStatuses: ApplicationStatus[] = [
  {
    id: "submitted",
    label: "Applied",
    description: "Sent to the organisation and awaiting review.",
    tone: "neutral",
  },
  {
    id: "under_review",
    label: "Under Review",
    description: "The organisation is currently reviewing this application.",
    tone: "info",
  },
  {
    id: "waitlisted",
    label: "Waitlisted",
    description: "Held on a waitlist in case a place becomes available.",
    tone: "warning",
  },
  {
    id: "accepted",
    label: "Accepted",
    description: "Offered a place. Your school counsellor will be in touch.",
    tone: "success",
  },
  {
    id: "declined",
    label: "Declined",
    description: "Not successful this time.",
    tone: "danger",
  },
];

export function getApplicationStatus(id: string): ApplicationStatus {
  return (
    applicationStatuses.find((s) => s.id === id) ?? applicationStatuses[0]
  );
}
