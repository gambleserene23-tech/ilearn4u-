import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export function PublicFooter() {
  return (
    <footer className="border-t border-black/5 bg-brand-tan/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-green text-xs font-bold text-white">
                {siteConfig.brand.logoInitial}
              </span>
              <span className="font-display text-lg font-semibold text-brand-green">
                {siteConfig.brand.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{siteConfig.footer.blurb}</p>
          </div>

          {siteConfig.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-soft hover:text-brand-green">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p>{siteConfig.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
