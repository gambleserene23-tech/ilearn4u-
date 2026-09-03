"use client";

import { useState } from "react";
import Link from "next/link";
import { applicationFormFields } from "@/config/application-questions";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { Opportunity, Student } from "@/data/types";

export function ApplicationForm({
  opportunity,
  organisationName,
  student,
}: {
  opportunity: Opportunity;
  organisationName: string;
  student: Student;
}) {
  const [step, setStep] = useState<"form" | "review" | "submitted">("form");

  const defaults: Record<string, string> = {
    fullName: student.fullName,
    age: String(student.age),
    school: "Riverbend State High School",
    location: student.location,
    careerInterests: student.careerGoals,
    relevantSkills: student.skills.join(", "),
    previousExperience: "",
    whyInterested: "",
    availability: "",
  };

  const [answers, setAnswers] = useState<Record<string, string>>(defaults);

  function update(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  if (step === "submitted") {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold text-brand-green">Application Submitted</h1>
        <Alert tone="success" className="mt-4">
          Your application has been sent to the organisation. Your school counsellor will
          receive updates about your application and help coordinate the next steps.
        </Alert>
        <div className="mt-6 flex gap-3">
          <Link href="/student/applications" className="text-sm font-semibold text-brand-green underline">
            View My Applications
          </Link>
          <Link href="/student/opportunities" className="text-sm font-semibold text-brand-green underline">
            Browse more opportunities
          </Link>
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold text-brand-green">Review Application</h1>
        <p className="mt-1 text-ink-soft">
          {opportunity.title} · {organisationName}
        </p>

        <dl className="mt-6 space-y-4 rounded-lg border border-black/5 bg-brand-tan/30 p-5 text-sm">
          {applicationFormFields.map((field) => (
            <div key={field.id}>
              <dt className="font-medium text-ink-soft">{field.label}</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-ink">{answers[field.id] || "—"}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => setStep("form")}>
            Back to edit
          </Button>
          <Button onClick={() => setStep("submitted")}>Submit Application</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-green">Apply</h1>
      <p className="mt-1 text-ink-soft">
        {opportunity.title} · {organisationName}
      </p>
      <p className="mt-3 text-sm text-ink-soft">
        Some fields are pre-filled from your student profile — update them here if needed.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setStep("review");
        }}
      >
        {applicationFormFields.map((field) => (
          <Field
            key={field.id}
            label={field.label}
            htmlFor={field.id}
            required={field.required}
            helpText={field.helpText ?? (field.source === "profile" ? "Pre-filled from your profile" : undefined)}
          >
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                value={answers[field.id] ?? ""}
                onChange={(e) => update(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <Input
                id={field.id}
                type={field.type}
                value={answers[field.id] ?? ""}
                onChange={(e) => update(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </Field>
        ))}
        <Button type="submit">Review Application</Button>
      </form>
    </div>
  );
}
