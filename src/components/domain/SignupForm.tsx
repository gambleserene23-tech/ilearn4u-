"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { roles } from "@/config/roles";
import { Field, Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { locationOptions, careerCategoryOptions } from "@/config/application-questions";

const SIGNUP_ROLES = roles.filter((r) => r.id !== "admin");

interface SchoolOption {
  id: string;
  name: string;
  suburb: string;
}

export function SignupForm() {
  const [role, setRole] = useState("student");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [schools, setSchools] = useState<SchoolOption[]>([]);

  useEffect(() => {
    if (role !== "student") return;
    fetch("/api/schools/list")
      .then((r) => r.json())
      .then(setSchools)
      .catch(() => setSchools([]));
  }, [role]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = { role };
    form.forEach((value, key) => {
      payload[key] = String(value);
    });

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.reason ?? "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <Alert tone="success">
        Check your email to confirm your account before logging in — the link expires after a
        while, so verify soon.
      </Alert>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Field label="I am a..." htmlFor="role" required>
        <Select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          {SIGNUP_ROLES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Full name" htmlFor="fullName" required>
        <Input id="fullName" name="fullName" required />
      </Field>

      <Field label="Email" htmlFor="email" required>
        <Input id="email" name="email" type="email" required />
      </Field>

      <Field label="Password" htmlFor="password" required helpText="At least 8 characters.">
        <Input id="password" name="password" type="password" minLength={8} required />
      </Field>

      {role === "student" && (
        <>
          <Field label="Age" htmlFor="age" required>
            <Input id="age" name="age" type="number" min={10} max={25} required />
          </Field>
          <Field label="Location" htmlFor="location" required>
            <Select id="location" name="location" required defaultValue="">
              <option value="" disabled>
                Select your location
              </option>
              {locationOptions().map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="School"
            htmlFor="school_id"
            helpText="Your school will need to verify your profile before it's fully active."
          >
            <Select id="school_id" name="school_id" defaultValue="">
              <option value="">My school isn't listed yet</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.suburb}
                </option>
              ))}
            </Select>
          </Field>
        </>
      )}

      {role === "school" && (
        <>
          <Field label="School name" htmlFor="school_name" required>
            <Input id="school_name" name="school_name" required />
          </Field>
          <Field label="Suburb" htmlFor="suburb" required>
            <Input id="suburb" name="suburb" required />
          </Field>
        </>
      )}

      {role === "organisation" && (
        <>
          <Field label="Organisation name" htmlFor="organisation_name" required>
            <Input id="organisation_name" name="organisation_name" required />
          </Field>
          <Field label="Organisation type" htmlFor="organisation_type" required>
            <Select id="organisation_type" name="organisation_type" defaultValue="business">
              <option value="business">Business</option>
              <option value="university">University</option>
            </Select>
          </Field>
          <Field label="Industry" htmlFor="industry" required>
            <Select id="industry" name="industry" required defaultValue="">
              <option value="" disabled>
                Select an industry
              </option>
              {careerCategoryOptions().map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </Select>
          </Field>
        </>
      )}

      {error && <Alert tone="warning">{error}</Alert>}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-green underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
