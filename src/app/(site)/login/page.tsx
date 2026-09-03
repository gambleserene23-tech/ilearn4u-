import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { LoginPortalSelector } from "@/components/domain/LoginPortalSelector";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to your ${siteConfig.brand.name} Student, Parent, School or Business/University portal.`,
};

export default function LoginPage() {
  return <LoginPortalSelector />;
}
