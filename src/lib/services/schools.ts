import { schools } from "@/data/schools";
import { students } from "@/data/students";
import type { School } from "@/data/types";

// Demo mode: the signed-in school is always Riverbend State High School.
export const demoSchool: School = schools[0];

export async function getCurrentSchool(): Promise<School> {
  return demoSchool;
}

export async function getSchoolById(id: string): Promise<School | undefined> {
  return schools.find((s) => s.id === id);
}

export async function getSchoolStats(schoolId: string) {
  const schoolStudents = students.filter((s) => s.schoolId === schoolId);
  return {
    totalStudents: schoolStudents.length,
  };
}
