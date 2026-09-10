import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { ForgotPasswordForm } from "@/components/domain/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: `Reset your ${siteConfig.brand.name} account password.`,
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green">Reset your password</h1>
      <p className="mt-2 text-ink-soft">
        Enter your email and we&apos;ll send you a link to set a new password.
      </p>
      <div className="mt-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
