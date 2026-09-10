"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const justVerified = searchParams.get("verified") === "1";
  const linkExpired = searchParams.get("error") === "invalid_or_expired_link";
  const redirectTo = searchParams.get("redirectTo");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const result = await res.json();
    setSubmitting(false);

    if (result.success) {
      router.push(redirectTo || result.redirectTo || "/");
      router.refresh();
    } else {
      setError(result.reason ?? "Login failed.");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      {justVerified && (
        <Alert tone="success" className="mb-4">
          Email verified — log in below.
        </Alert>
      )}
      {linkExpired && (
        <Alert tone="warning" className="mb-4">
          That link has expired or was already used. Try again.
        </Alert>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field label="Password" htmlFor="password" required>
          <Input id="password" name="password" type="password" required />
        </Field>

        {error && <Alert tone="warning">{error}</Alert>}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="text-brand-green underline">
          Forgot password?
        </Link>
        <Link href="/signup" className="font-semibold text-brand-green underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}
