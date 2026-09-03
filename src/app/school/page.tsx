import { getCurrentSchool } from "@/lib/services/schools";
import { getStudentsBySchool } from "@/lib/services/students";
import { getApplicationsBySchool } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { SchoolTrackingPanel, type TrackingRow } from "@/components/domain/SchoolTrackingPanel";

export default async function SchoolDashboardPage() {
  const school = await getCurrentSchool();
  const students = await getStudentsBySchool(school.id);
  const applications = await getApplicationsBySchool(school.id);
  const rows: TrackingRow[] = await Promise.all(students.map(async student => {
    const app = applications.find(a => a.studentId === student.id) ?? null;
    const opportunity = app ? (await getOpportunityById(app.opportunityId)) ?? null : null;
    return { student, application: app, opportunity, organisation: opportunity ? getOrganisationName(opportunity.organisationId) : "—" };
  }));
  const count=(s:string)=>applications.filter(a=>a.status===s).length;
  return <div className="portal-premium -mx-4 -mt-8 sm:-mx-8 sm:-mt-8">
    <div className="portal-topbar"><div><div className="font-display text-base font-semibold text-brand-green">ilearn<span className="text-brand-orange">4u</span></div><div className="text-[10px] text-ink-soft">School portal · {school.counsellorName}</div></div><div className="flex items-center gap-3"><span className="hidden text-xs text-ink-soft sm:block">Demo environment · editable prototype</span><a href="/" className="rounded-md border border-black/10 px-3 py-2 text-xs font-semibold text-brand-green">Exit</a></div></div>
    <div className="portal-content">
      <p className="eyebrow">School command centre</p><h1 className="portal-title">{school.name}</h1><p className="portal-subtitle">A clear view of students, applications, placements and organisation conversations.</p>
      <div className="portal-stat-grid"><Stat label="Students" value={students.length}/><Stat label="Active applications" value={count("submitted")+count("under_review")}/><Stat label="Accepted" value={count("accepted")}/><Stat label="Awaiting action" value={count("under_review")+count("submitted")}/></div>
      <div className="mt-6"><SchoolTrackingPanel rows={rows}/></div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="portal-panel"><div className="portal-panel__head"><h2>Placement pipeline</h2><a className="text-xs font-semibold text-brand-green" href="/school/applications">Open full tracker →</a></div><div className="portal-panel__body"><div className="grid grid-cols-5 gap-2 text-center text-[10px]">{[["Submitted",count("submitted")],["Review",count("under_review")],["Waitlist",count("waitlisted")],["Accepted",count("accepted")],["Declined",count("declined")]].map(([l,v])=><div key={l as string} className="rounded-md bg-[#f7f9f8] p-3"><strong className="block text-base text-brand-green">{v}</strong><span className="text-ink-soft">{l}</span></div>)}</div></div></div>
        <div className="portal-panel"><div className="portal-panel__head"><h2>Safeguarded communication</h2><a className="text-xs font-semibold text-brand-green" href="/school/messages">Open messages →</a></div><div className="portal-panel__body"><p className="text-xs leading-6 text-ink-soft">Organisation conversations are routed through the school. Students are not placed in direct business or university chats.</p><div className="mt-3 rounded-md border-l-4 border-brand-orange bg-[#fff8f2] p-3 text-[10px] leading-5 text-ink-soft">This keeps placement coordination centralised and gives the school a complete record of the conversation.</div></div></div>
      </div>
    </div>
  </div>;
}
function Stat({label,value}:{label:string,value:number}){return <div className="portal-stat"><small>{label}</small><strong>{value}</strong></div>}
