import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <div className="flex-1 pb-20 md:pb-0">{children}</div>
      <PublicFooter />
      <StickyMobileCTA />
    </div>
  );
}
