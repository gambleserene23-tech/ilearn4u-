import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/domain/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set a New Password",
  robots: { index: false, follow: true },
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green">Set a new password</h1>
      <p className="mt-2 text-ink-soft">Choose a new password for your account.</p>
      <div className="mt-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
