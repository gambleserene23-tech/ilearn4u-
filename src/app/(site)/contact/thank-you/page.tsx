import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { FeedbackWidget } from "@/components/domain/FeedbackWidget";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Thanks for reaching out",
  robots: { index: false, follow: true }, // thank-you pages shouldn't rank
};

export default function ContactThankYouPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
        Message sent
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-brand-green sm:text-4xl">
        Thanks — we&apos;ve got your message.
      </h1>
      <p className="mt-3 text-ink-soft">{siteConfig.contact.responseTimePromise}</p>

      <div className="mt-10 text-left">
        <FeedbackWidget />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <LinkButton href="/">Back to home</LinkButton>
        <LinkButton href="/opportunities" variant="outline">
          Browse opportunities
        </LinkButton>
      </div>
    </div>
  );
}
