import { getCurrentSchool } from "@/lib/services/schools";
import { getStudentsBySchool } from "@/lib/services/students";
import { getApplicationsByStudent } from "@/lib/services/applications";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { SchoolTrackingPanel, type TrackingRow } from "@/components/domain/SchoolTrackingPanel";

export default async function SchoolStudentsPage(){
 const school=await getCurrentSchool(); const students=await getStudentsBySchool(school.id);
 const rows:TrackingRow[]=await Promise.all(students.map(async student=>{const apps=await getApplicationsByStudent(student.id);const app=apps[0]??null;const opp=app?(await getOpportunityById(app.opportunityId))??null:null;return {student,application:app,opportunity:opp,organisation:opp?getOrganisationName(opp.organisationId):"—"}}));
 return <div><p className="eyebrow">People &amp; pathways</p><h1 className="portal-title">Students</h1><p className="portal-subtitle">{students.length} students allocated to {school.name}. Search, filter and open a student pathway.</p><div className="mt-6"><SchoolTrackingPanel rows={rows}/></div></div>;
}
