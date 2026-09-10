import { PortalShell } from "@/components/layout/PortalShell";
import { getCurrentParentName } from "@/lib/services/students";
import type { ReactNode } from "react";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const name = await getCurrentParentName();
  return (
    <PortalShell role="parent" userName={name}>
      {children}
    </PortalShell>
  );
}
