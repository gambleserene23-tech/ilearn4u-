import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <div className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-brand-green sm:text-4xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-3 text-ink-soft">
            The page you&apos;re looking for may have moved, or the link might be out of date.
            Here are a few places to go instead.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="/" size="lg">
              Back to home
            </LinkButton>
            <LinkButton href="/opportunities" variant="outline" size="lg">
              Browse opportunities
            </LinkButton>
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            Still stuck?{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-green underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
