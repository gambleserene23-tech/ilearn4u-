"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PortalRole = keyof typeof siteConfig.portalNav;
const roleLabels: Record<PortalRole, string> = { student:"Student Portal", parent:"Parent Portal", school:"School Portal", organisation:"Business / University Portal" };
const roleDescriptions: Record<PortalRole,string> = { student:"Your opportunities and applications", parent:"Visibility across your linked students", school:"Student pathways and placement coordination", organisation:"Opportunities, applications and school communication" };

export function PortalShell({role,userName,children}:{role:PortalRole;userName:string;children:ReactNode}){
 const pathname=usePathname(); const nav=siteConfig.portalNav[role];
 return <div className="min-h-screen bg-[#f5f7f5] md:flex">
   <aside className="hidden w-[238px] shrink-0 flex-col bg-brand-green text-white md:flex">
    <div className="border-b border-white/10 px-5 py-5"><div className="font-display text-lg font-semibold">ilearn<span className="text-brand-orange">4u</span></div><div className="mt-1 text-[9px] uppercase tracking-[.14em] text-white/50">{roleLabels[role]}</div></div>
    <div className="px-4 py-5"><div className="mb-3 px-2 text-[9px] uppercase tracking-[.12em] text-white/45">Workspace</div><nav className="space-y-1">{nav.map(item=>{const active=pathname===item.href;return <Link key={item.href} href={item.href} className={cn("block rounded-md px-3 py-2.5 text-xs font-semibold transition",active?"bg-white text-brand-green":"text-white/75 hover:bg-white/10 hover:text-white")}>{item.label}</Link>})}</nav></div>
    <div className="mt-auto border-t border-white/10 px-5 py-4"><div className="truncate text-xs font-semibold">{userName}</div><div className="mt-1 text-[9px] text-white/45">{roleDescriptions[role]}</div><Link href="/" className="mt-3 inline-block text-[9px] font-semibold text-white/65 hover:text-white">Exit portal →</Link></div>
   </aside>
   <div className="min-w-0 flex-1">
    <header className="sticky top-0 z-30 flex h-[64px] items-center justify-between border-b border-[#e1e7e4] bg-white/95 px-4 backdrop-blur sm:px-7"><div className="md:hidden"><span className="font-display text-base font-semibold text-brand-green">ilearn<span className="text-brand-orange">4u</span></span></div><div className="hidden text-[10px] text-ink-soft md:block">{roleDescriptions[role]}</div><div className="flex items-center gap-3"><span className="hidden text-[9px] text-ink-soft sm:block">Presentation build · demo data</span><Link href="/" className="rounded-md border border-[#dbe3df] px-3 py-2 text-[10px] font-semibold text-brand-green hover:bg-[#f7f9f8]">Exit</Link></div></header>
    <main className="mx-auto w-full max-w-[1320px] px-4 py-7 sm:px-7">{children}</main>
   </div>
 </div>;
}
