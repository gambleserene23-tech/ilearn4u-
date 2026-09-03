import { faqs } from "@/config/faqs.config";

/**
 * Renders the FAQ accordion plus matching FAQPage JSON-LD structured data.
 * Reads from src/config/faqs.config.ts — edit that file to change questions.
 */
export function FAQSection({ heading = "Frequently asked questions" }: { heading?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-semibold text-brand-green sm:text-3xl">{heading}</h2>
      <div className="mt-8 divide-y divide-black/5 rounded-lg border border-black/5 bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group p-5 open:bg-brand-tan/20">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink">
              {faq.question}
              <span className="shrink-0 text-brand-orange transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
