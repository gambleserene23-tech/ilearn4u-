import { getCurrentSchool } from "@/lib/services/schools";
import { getThreadsBySchool } from "@/lib/services/messages";
import { organisations } from "@/data/organisations";
import { SchoolMessageCentre } from "@/components/domain/SchoolMessageCentre";

export default async function SchoolMessagesPage(){const school=await getCurrentSchool();const threads=await getThreadsBySchool(school.id);const names=Object.fromEntries(organisations.map(o=>[o.id,o.name]));return <div><p className="eyebrow">Safeguarded communication</p><h1 className="portal-title">Messages</h1><p className="portal-subtitle">School ↔ organisation conversations for placements, interviews, dates and documentation. Students are not included in these threads.</p><SchoolMessageCentre threads={threads} names={names}/></div>}
