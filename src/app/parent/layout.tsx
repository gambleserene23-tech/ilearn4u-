import { PortalShell } from "@/components/layout/PortalShell";
import type { ReactNode } from "react";

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <PortalShell role="parent" userName="Grace Chen">
      {children}
    </PortalShell>
  );
}
