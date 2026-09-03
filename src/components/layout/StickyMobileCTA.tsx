import Link from "next/link";
import { siteConfig } from "@/config/site.config";

/**
 * Fixed bottom action bar shown on small screens only, across public pages.
 * Keeps the primary CTA reachable without scrolling back to the hero.
 * Edit the label/href via `homepage.hero.primaryCta` in site.config.ts.
 */
export function StickyMobileCTA() {
  const cta = siteConfig.homepage.hero.primaryCta;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link
        href={cta.href}
        className="flex w-full items-center justify-center rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-orange/20"
      >
        {cta.label}
      </Link>
    </div>
  );
}
