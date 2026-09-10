import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/config/site.config";
import { LoginForm } from "@/components/domain/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to your ${siteConfig.brand.name} account.`,
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">Welcome back</p>
        <h1 className="mt-1 text-3xl font-semibold text-brand-green">Log in to {siteConfig.brand.name}</h1>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
