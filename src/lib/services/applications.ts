/**
 * APPLICATIONS SERVICE
 * =============================================================================
 * Swap internals for real API/database calls later — see
 * src/lib/services/opportunities.ts for the pattern this follows.
 * =============================================================================
 */
import { applications } from "@/data/applications";
import { opportunities } from "@/data/opportunities";
import { students } from "@/data/students";
import type { Application } from "@/data/types";

export async function getApplicationsByStudent(studentId: string): Promise<Application[]> {
  return applications.filter((a) => a.studentId === studentId);
}

export async function getApplicationById(id: string): Promise<Application | undefined> {
  return applications.find((a) => a.id === id);
}

export async function getApplicationsByOpportunity(opportunityId: string): Promise<Application[]> {
  return applications.filter((a) => a.opportunityId === opportunityId);
}

export async function getApplicationsByOrganisation(organisationId: string): Promise<Application[]> {
  const orgOpportunityIds = opportunities
    .filter((o) => o.organisationId === organisationId)
    .map((o) => o.id);
  return applications.filter((a) => orgOpportunityIds.includes(a.opportunityId));
}

export async function getApplicationsBySchool(schoolId: string): Promise<Application[]> {
  const schoolStudentIds = students.filter((s) => s.schoolId === schoolId).map((s) => s.id);
  return applications.filter((a) => schoolStudentIds.includes(a.studentId));
}

// In the demo, "submitting" or "deciding" an application doesn't persist —
// a real implementation would write to the database here.
export async function submitApplication(input: {
  studentId: string;
  opportunityId: string;
  answers: Record<string, string>;
}): Promise<Application> {
  return {
    id: `app_demo_${Date.now()}`,
    studentId: input.studentId,
    opportunityId: input.opportunityId,
    status: "submitted",
    submittedAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    answers: input.answers,
  };
}
