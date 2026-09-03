"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/**
 * Client-side enquiry form. Currently just redirects to the thank-you page —
 * wire the `handleSubmit` body up to a Server Action that inserts into the
 * `enquiries` table (see supabase/migrations/0001_schema.sql) once Supabase
 * is connected. Never mark the enquiry as "sent" until that write succeeds.
 */
export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    // TODO: replace with a Server Action that inserts into `enquiries`
    // (see docs/SUPABASE_SETUP.md) before redirecting.
    router.push("/contact/thank-you");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Field label="Name" htmlFor="name" required>
        <Input id="name" name="name" required />
      </Field>
      <Field label="Email" htmlFor="email" required>
        <Input id="email" name="email" type="email" required />
      </Field>
      <Field label="Message" htmlFor="message" required>
        <Textarea id="message" name="message" required />
      </Field>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
