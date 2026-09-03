import { siteConfig } from "@/config/site.config";

/**
 * Small trust-signal banner. Edit the wording in
 * site.config.ts -> contact.responseTimePromise.
 */
export function ResponseTimePromise({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-brand-tan/40 px-4 py-2 text-xs font-medium text-brand-green ${className ?? ""}`}
    >
      <span aria-hidden="true">⏱</span>
      {siteConfig.contact.responseTimePromise}
    </div>
  );
}
