"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

/**
 * Quick post-enquiry feedback prompt. Currently stores nothing — wire the
 * `handleSubmit` body up to a Server Action that inserts into
 * `enquiry_feedback` (see supabase/migrations/0001_schema.sql) once
 * Supabase is connected.
 */
export function FeedbackWidget() {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="rounded-lg border border-black/5 bg-brand-tan/30 p-5 text-sm font-medium text-brand-green">
        Thanks for the feedback — it helps us improve ilearn4u.
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-black/5 bg-white p-5">
      <p className="text-sm font-semibold text-ink">How easy was that to do?</p>
      <div className="mt-3 flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            aria-label={`${value} out of 5`}
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
              rating === value
                ? "border-brand-orange bg-brand-orange text-white"
                : "border-black/10 text-ink hover:border-brand-orange"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <Textarea
        className="mt-4"
        placeholder="Anything you'd like to add? (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <Button
        className="mt-3"
        size="sm"
        disabled={rating === null}
        onClick={() => setSubmitted(true)}
      >
        Submit feedback
      </Button>
    </div>
  );
}
