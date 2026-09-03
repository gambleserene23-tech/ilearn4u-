/**
 * USER ROLES & PERMISSIONS
 * =============================================================================
 * The role system is intentionally separated from the UI. Pages/components
 * should check `can(role, "someAction")` rather than hard-coding role logic,
 * so permissions can change later without touching every screen.
 *
 * Businesses and universities share the same "organisation" role/portal, but
 * carry an `organisationType` field (see src/data/types.ts) so the system can
 * tell them apart wherever needed.
 *
 * To add a role later (e.g. "admin" is already stubbed below), add it to
 * `roles` and extend `permissions`.
 * =============================================================================
 */

export type RoleId = "student" | "parent" | "school" | "organisation" | "admin";

export interface Role {
  id: RoleId;
  label: string;
  portalPath: string;
  description: string;
}

export const roles: Role[] = [
  {
    id: "student",
    label: "Student",
    portalPath: "/student",
    description: "Browse opportunities, build a profile and apply.",
  },
  {
    id: "parent",
    label: "Parent",
    portalPath: "/parent",
    description: "Follow your child's applications and updates.",
  },
  {
    id: "school",
    label: "School",
    portalPath: "/school",
    description: "Manage student applications and organisation communication.",
  },
  {
    id: "organisation",
    label: "Business / University",
    portalPath: "/organisation",
    description: "List opportunities and review student applications.",
  },
  {
    id: "admin",
    label: "Admin",
    portalPath: "/admin",
    description: "Platform administration (coming soon).",
  },
];

// Permission flags per role. Extend this map to change what a role can do
// without touching page components.
export const permissions: Record<RoleId, Record<string, boolean>> = {
  student: {
    manageOwnProfile: true,
    browseOpportunities: true,
    applyToOpportunities: true,
    viewOwnApplications: true,
    messageOrganisationsDirectly: false, // by design — see safeguarding workflow
    changeApplicationDecisions: false,
  },
  parent: {
    viewLinkedStudent: true,
    viewApplicationStatus: true,
    messageOrganisationsDirectly: false,
    changeApplicationDecisions: false,
  },
  school: {
    manageAllocatedStudents: true,
    viewStudentApplications: true,
    messageOrganisations: true,
    coordinatePlacements: true,
  },
  organisation: {
    manageOrganisationProfile: true,
    purchaseOpportunitySlots: true,
    createOpportunities: true,
    reviewApplications: true,
    decideApplications: true, // accept / decline / waitlist
    messageSchools: true,
    messageStudentsDirectly: false, // by design — see safeguarding workflow
  },
  admin: {
    manageEverything: true,
  },
};

export function can(role: RoleId, permission: string): boolean {
  return Boolean(permissions[role]?.[permission]);
}

export function getRole(id: string): Role | undefined {
  return roles.find((r) => r.id === id);
}
