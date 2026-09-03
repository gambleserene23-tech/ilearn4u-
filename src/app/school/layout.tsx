import { PortalShell } from "@/components/layout/PortalShell";
import { getCurrentSchool } from "@/lib/services/schools";
import type { ReactNode } from "react";

export default async function SchoolLayout({ children }: { children: ReactNode }) {
  const school = await getCurrentSchool();
  return (
    <PortalShell role="school" userName={school.counsellorName}>
      {children}
    </PortalShell>
  );
}
