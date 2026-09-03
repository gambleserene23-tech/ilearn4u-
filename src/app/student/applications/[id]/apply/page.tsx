import { notFound } from "next/navigation";
import { getOpportunityById, getOrganisationName } from "@/lib/services/opportunities";
import { getCurrentStudent } from "@/lib/services/students";
import { ApplicationForm } from "@/components/domain/ApplicationForm";

export default async function ApplyPage({
  params,
}: PageProps<"/student/applications/[id]/apply">) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  const student = await getCurrentStudent();
  const organisationName = getOrganisationName(opportunity.organisationId);

  return <ApplicationForm opportunity={opportunity} organisationName={organisationName} student={student} />;
}
