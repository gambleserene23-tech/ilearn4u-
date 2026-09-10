export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

export function formatCurrency(amount: number, currencySymbol = "$"): string {
  return `${currencySymbol}${amount.toFixed(2)}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Safely serializes an object for embedding in a <script type="application/ld+json">
 * tag. Plain JSON.stringify does NOT escape "</script>", so a database value
 * (an opportunity title, for example) containing that literal text could
 * close the script tag early and inject arbitrary HTML — this escapes it.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
