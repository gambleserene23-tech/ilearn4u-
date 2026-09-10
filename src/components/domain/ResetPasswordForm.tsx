"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export function ResetPasswordForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const result = await res.json();
    setSubmitting(false);

    if (result.success) {
      router.push("/login?verified=1");
    } else {
      setError(result.reason ?? "Could not reset your password.");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Field label="New password" htmlFor="password" required helpText="At least 8 characters.">
        <Input id="password" name="password" type="password" minLength={8} required />
      </Field>
      <Field label="Confirm new password" htmlFor="confirm" required>
        <Input id="confirm" name="confirm" type="password" minLength={8} required />
      </Field>
      {error && <Alert tone="warning">{error}</Alert>}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Saving…" : "Set new password"}
      </Button>
    </form>
  );
}
