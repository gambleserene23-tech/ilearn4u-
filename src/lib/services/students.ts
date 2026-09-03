import { students, demoStudent, demoParent } from "@/data/students";
import { schools } from "@/data/schools";
import type { Student } from "@/data/types";

export async function getStudentById(id: string): Promise<Student | undefined> {
  return students.find((s) => s.id === id);
}

export async function getStudentsBySchool(schoolId: string): Promise<Student[]> {
  return students.filter((s) => s.schoolId === schoolId);
}

export async function getCurrentStudent(): Promise<Student> {
  // Demo mode: always returns the signed-in demo student.
  return demoStudent;
}

export async function getCurrentParentStudents(): Promise<Student[]> {
  const linkedIds = demoParent.studentIds;
  return students.filter((s) => linkedIds.includes(s.id));
}

export function getSchoolName(schoolId: string): string {
  return schools.find((s) => s.id === schoolId)?.name ?? "Unknown school";
}

export function getSchoolCounsellor(schoolId: string): string {
  return schools.find((s) => s.id === schoolId)?.counsellorName ?? "your counsellor";
}
