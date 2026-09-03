/**
 * CORE DATA TYPES
 * =============================================================================
 * These interfaces mirror the suggested database schema, so the demo mock
 * data (src/data/*) and the real database models a developer builds later
 * can share the same shape. See README.md for the future-backend notes.
 * =============================================================================
 */

import type { OpportunityTypeId } from "@/config/opportunity-types";
import type { ApplicationStatusId } from "@/config/application-statuses";
import type { RoleId } from "@/config/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleId;
}

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  location: string;
  schoolId: string;
  educationLevel: string;
  careerGoals: string;
  interests: string[];
  skills: string[];
  preferredType: OpportunityTypeId | "no-preference";
  avatarColor: string;
}

export interface Parent {
  id: string;
  userId: string;
  studentIds: string[];
}

export interface School {
  id: string;
  name: string;
  suburb: string;
  contactEmail: string;
  subscriptionStatus: "active" | "trial" | "inactive";
  counsellorName: string;
}

export type OrganisationType = "business" | "university";

export interface Organisation {
  id: string;
  name: string;
  type: OrganisationType;
  industry: string;
  description: string;
  location: string;
  contactEmail: string;
  totalSlots: number;
  usedSlots: number;
}

export interface Opportunity {
  id: string;
  organisationId: string;
  title: string;
  type: OpportunityTypeId;
  description: string;
  whatYoullLearn: string[];
  requirements: string[];
  location: string;
  ageMin: number;
  ageMax: number;
  industry: string;
  careerPathway: string;
  availablePlaces: number;
  startDate: string;
  endDate: string;
  closingDate: string;
  commitment: string;
  additionalRequirements?: string;
  status: "open" | "closed";
}

export interface Application {
  id: string;
  studentId: string;
  opportunityId: string;
  status: ApplicationStatusId;
  submittedAt: string;
  updatedAt: string;
  answers: Record<string, string>;
}

export interface MessageThread {
  id: string;
  schoolId: string;
  organisationId: string;
  subject: string;
  relatedApplicationId?: string;
  messages: {
    id: string;
    sender: "school" | "organisation";
    senderName: string;
    body: string;
    sentAt: string;
  }[];
}
