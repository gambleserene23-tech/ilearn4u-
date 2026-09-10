import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { SignupForm } from "@/components/domain/SignupForm";

export const metadata: Metadata = {
  title: "Create Your Account",
  description: `Sign up for ${siteConfig.brand.name} as a student, parent, school or business/university.`,
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green">Create your account</h1>
      <p className="mt-2 text-ink-soft">Get started with {siteConfig.brand.name} in a couple of minutes.</p>

      <div className="mt-8">
        <SignupForm />
      </div>
    </div>
  );
}
