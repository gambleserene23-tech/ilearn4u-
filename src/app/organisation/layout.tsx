import { PortalShell } from "@/components/layout/PortalShell";
import { getCurrentOrganisation } from "@/lib/services/organisations";
import type { ReactNode } from "react";

export default async function OrganisationLayout({ children }: { children: ReactNode }) {
  const organisation = await getCurrentOrganisation();
  return (
    <PortalShell role="organisation" userName={organisation.name}>
      {children}
    </PortalShell>
  );
}
