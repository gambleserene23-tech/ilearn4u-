"use client";

import { useMemo, useState } from "react";
import type { Student, Application, Opportunity } from "@/data/types";
import { getApplicationStatus } from "@/config/application-statuses";

export type TrackingRow = { student: Student; application: Application | null; opportunity: Opportunity | null; organisation: string };

export function SchoolTrackingPanel({ rows }: { rows: TrackingRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = useMemo(() => rows.filter(r => {
    const hay = `${r.student.fullName} ${r.student.educationLevel} ${r.student.interests.join(" ")} ${r.opportunity?.title ?? ""} ${r.organisation}`.toLowerCase();
    const matchesQuery = hay.includes(query.toLowerCase());
    const matchesStatus = status === "all" || r.application?.status === status;
    return matchesQuery && matchesStatus;
  }), [rows,query,status]);
  const selectedRow = filtered.find(r => r.student.id === selected) ?? filtered[0];
  return <div className="tracking-wrap">
    <div className="portal-panel">
      <div className="portal-panel__head"><h2>Student &amp; application tracking</h2><span className="text-xs text-ink-soft">{filtered.length} of {rows.length} students</span></div>
      <div className="portal-panel__body">
        <div className="tracking-filters"><input className="tracking-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search students, interests or opportunities"/><select className="tracking-select" value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All statuses</option><option value="submitted">Submitted</option><option value="under_review">Under review</option><option value="accepted">Accepted</option><option value="waitlisted">Waitlisted</option><option value="declined">Declined</option></select></div>
        <div className="overflow-x-auto"><table className="portal-table"><thead><tr><th>Student</th><th>Pathway</th><th>Organisation</th><th>Status</th><th>Next action</th></tr></thead><tbody>{filtered.map(r=>{const s=r.application?getApplicationStatus(r.application.status):null; return <tr key={r.student.id} className="student-row" onClick={()=>setSelected(r.student.id)}><td><span className="student-avatar">{r.student.fullName.split(" ").map(x=>x[0]).join("").slice(0,2)}</span><strong>{r.student.fullName}</strong><div className="text-[10px] text-ink-soft">{r.student.educationLevel} · {r.student.age}</div></td><td>{r.opportunity?.title ?? "No application"}</td><td>{r.organisation}</td><td>{s?<span><i className={`status-dot ${r.application?.status==='accepted'?'green':r.application?.status==='under_review'?'orange':r.application?.status==='waitlisted'?'purple':r.application?.status==='declined'?'red':''}`}/>{s.label}</span>:"—"}</td><td>{nextAction(r.application?.status)}</td></tr>})}</tbody></table></div>
      </div>
    </div>
    <div className="portal-panel"><div className="portal-panel__head"><h2>Student overview</h2></div><div className="portal-panel__body">{selectedRow?<><div className="flex items-center gap-3"><span className="student-avatar">{selectedRow.student.fullName.split(" ").map(x=>x[0]).join("").slice(0,2)}</span><div><strong className="text-sm text-brand-green">{selectedRow.student.fullName}</strong><div className="text-[10px] text-ink-soft">{selectedRow.student.location} · {selectedRow.student.educationLevel}</div></div></div><dl className="mt-5 space-y-3 text-xs"><div><dt className="text-ink-soft">Career goals</dt><dd className="mt-1 text-ink">{selectedRow.student.careerGoals}</dd></div><div><dt className="text-ink-soft">Interests</dt><dd className="mt-1 text-ink">{selectedRow.student.interests.join(", ")}</dd></div><div><dt className="text-ink-soft">Current pathway</dt><dd className="mt-1 text-ink">{selectedRow.opportunity?.title ?? "Not yet applied"}</dd></div></dl><button className="mt-5 rounded-md bg-brand-green px-3 py-2 text-xs font-semibold text-white" onClick={()=>alert(`Demo: opening ${selectedRow.student.fullName}'s complete profile.`)}>Open student profile</button></>:<p className="text-sm text-ink-soft">Select a student to inspect their pathway.</p>}</div></div>
  </div>;
}

function nextAction(status?: string): string { if(status==='submitted') return 'Awaiting review'; if(status==='under_review') return 'Check in with organisation'; if(status==='accepted') return 'Coordinate placement'; if(status==='waitlisted') return 'Monitor place'; if(status==='declined') return 'Discuss next option'; return 'Invite to apply'; }
