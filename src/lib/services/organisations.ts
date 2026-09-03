import { organisations } from "@/data/organisations";
import type { Organisation } from "@/data/types";

// Demo mode: the signed-in organisation is always Northwave Digital.
export const demoOrganisation: Organisation = organisations[0];

export async function getCurrentOrganisation(): Promise<Organisation> {
  return demoOrganisation;
}

export async function getOrganisationById(id: string): Promise<Organisation | undefined> {
  return organisations.find((o) => o.id === id);
}

export async function getAllOrganisations(): Promise<Organisation[]> {
  return organisations;
}
