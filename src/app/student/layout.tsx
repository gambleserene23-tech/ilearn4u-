import { PortalShell } from "@/components/layout/PortalShell";
import { getCurrentStudent } from "@/lib/services/students";
import type { ReactNode } from "react";

export default async function StudentLayout({ children }: { children: ReactNode }) {
  const student = await getCurrentStudent();
  return (
    <PortalShell role="student" userName={student.fullName}>
      {children}
    </PortalShell>
  );
}
