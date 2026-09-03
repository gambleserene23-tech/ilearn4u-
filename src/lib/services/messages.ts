import { messageThreads } from "@/data/messages";
import type { MessageThread } from "@/data/types";

export async function getThreadsBySchool(schoolId: string): Promise<MessageThread[]> {
  return messageThreads.filter((t) => t.schoolId === schoolId);
}

export async function getThreadsByOrganisation(organisationId: string): Promise<MessageThread[]> {
  return messageThreads.filter((t) => t.organisationId === organisationId);
}

export async function getThreadById(id: string): Promise<MessageThread | undefined> {
  return messageThreads.find((t) => t.id === id);
}
