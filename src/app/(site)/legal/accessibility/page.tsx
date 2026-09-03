import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `${siteConfig.brand.name}'s commitment to an accessible, usable platform for students, parents, schools and organisations of all abilities.`,
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-brand-green sm:text-4xl">Accessibility</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: 17 August 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-ink-soft">
        <p>
          {siteConfig.brand.name} aims to be usable by everyone, including students, parents,
          school staff and organisation staff with disability. We design with clear typography,
          large readable buttons, sufficient colour contrast, visible keyboard focus states, and
          layouts that respond to reduced-motion preferences.
        </p>
        <p>
          We are working towards conformance with the{" "}
          <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>. If you
          experience any difficulty using {siteConfig.brand.name}, or have feedback on how we can
          improve accessibility, please contact us at{" "}
          <strong>{siteConfig.contact.email}</strong>.
        </p>
      </div>
    </div>
  );
}
