"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions, scoreQuiz, type QuizOption } from "@/config/quiz.config";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

export function QuizForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, QuizOption>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allAnswered = quizQuestions.every((q) => answers[q.id]);

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    const result = scoreQuiz(answers);

    const res = await fetch("/api/student/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    const body = await res.json();
    setSubmitting(false);

    if (body.success) {
      router.push("/student/profile?quizComplete=1");
      router.refresh();
    } else {
      setError(body.reason ?? "Couldn't save your results — try again.");
    }
  }

  return (
    <div className="space-y-8">
      {quizQuestions.map((q, index) => (
        <fieldset key={q.id}>
          <legend className="text-sm font-semibold text-ink">
            {index + 1}. {q.question}
          </legend>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {q.options.map((option) => {
              const selected = answers[q.id]?.label === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: option }))}
                  className={cn(
                    "rounded-lg border p-3 text-left text-sm transition",
                    selected
                      ? "border-brand-orange bg-brand-orange/10 font-semibold text-brand-green"
                      : "border-black/10 text-ink hover:border-brand-green"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {error && <Alert tone="warning">{error}</Alert>}

      <Button onClick={handleSubmit} disabled={!allAnswered || submitting} size="lg">
        {submitting ? "Saving…" : "See my results"}
      </Button>
    </div>
  );
}
