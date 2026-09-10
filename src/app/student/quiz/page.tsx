import type { Metadata } from "next";
import { QuizForm } from "@/components/domain/QuizForm";

export const metadata: Metadata = {
  title: "Find Your Pathway Quiz",
};

export default function StudentQuizPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-green">Find your pathway</h1>
      <p className="mt-1 text-ink-soft">
        A few quick questions to suggest interests and an opportunity type for your profile — you
        can always change these later.
      </p>
      <div className="mt-8">
        <QuizForm />
      </div>
    </div>
  );
}
