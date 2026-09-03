import type { Metadata } from "next";
import Link from "next/link";
import { roles } from "@/config/roles";
import { Field, Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Create Your Account",
  description: `Sign up for ${siteConfig.brand.name} as a student, parent, school or business/university.`,
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green">Create your account</h1>
      <p className="mt-2 text-ink-soft">Get started with ilearn4u in a couple of minutes.</p>

      <form className="mt-8 space-y-4">
        <Field label="I am a..." htmlFor="role" required>
          <Select id="role" name="role" defaultValue="student">
            {roles
              .filter((r) => r.id !== "admin")
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
          </Select>
        </Field>
        <Field label="Full name" htmlFor="fullName" required>
          <Input id="fullName" name="fullName" required />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field label="Password" htmlFor="password" required>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-green underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
