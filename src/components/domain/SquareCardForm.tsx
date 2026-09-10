"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

// Square's Web Payments SDK attaches itself to window.Square — there's no
// official TypeScript package for it, so this is a minimal shape covering
// only what this component uses.
interface SquareCardInstance {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => Promise<void>;
}

interface SquarePaymentsInstance {
  card: () => Promise<SquareCardInstance>;
}

declare global {
  interface Window {
    Square?: {
      payments: (applicationId: string, locationId: string) => SquarePaymentsInstance;
    };
  }
}

// Client-side code can only see NEXT_PUBLIC_-prefixed env vars — the
// server-only SQUARE_ENVIRONMENT is invisible here, so this needs its own
// public copy kept in sync with it (see .env.example).
const SQUARE_SDK_SRC =
  process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";

interface SquareCardFormProps {
  amountLabel: string;
  onSubmitToken: (sourceId: string) => Promise<{ success: boolean; reason?: string }>;
  payButtonLabel?: string;
}

/**
 * Renders a Square-hosted card entry field and handles tokenizing the card
 * client-side (the raw card number never touches our own server — only the
 * resulting one-time token does). Pass `onSubmitToken` to send that token
 * to your own API route, which does the actual charge server-side.
 */
export function SquareCardForm({ amountLabel, onSubmitToken, payButtonLabel = "Pay now" }: SquareCardFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<SquareCardInstance | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
  const configured = Boolean(applicationId && locationId);

  useEffect(() => {
    if (!sdkReady || !configured || !containerRef.current || cardRef.current) return;

    let cancelled = false;
    (async () => {
      const payments = window.Square!.payments(applicationId!, locationId!);
      const card = await payments.card();
      if (cancelled) return;
      await card.attach("#square-card-container");
      cardRef.current = card;
      setCardReady(true);
    })();

    return () => {
      cancelled = true;
      cardRef.current?.destroy();
      cardRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady, configured]);

  async function handlePay() {
    if (!cardRef.current) return;
    setStatus("processing");
    setMessage(null);

    const result = await cardRef.current.tokenize();
    if (result.status !== "OK" || !result.token) {
      setStatus("error");
      setMessage(result.errors?.[0]?.message ?? "Card details couldn't be verified.");
      return;
    }

    const outcome = await onSubmitToken(result.token);
    if (outcome.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setMessage(outcome.reason ?? "Payment failed.");
    }
  }

  if (!configured) {
    return (
      <Alert tone="warning">
        Square isn&apos;t connected yet — add your Square keys to <code>.env.local</code> (see
        docs/SQUARE_SETUP.md) to enable real payments.
      </Alert>
    );
  }

  if (status === "success") {
    return <Alert tone="success">Payment successful — {amountLabel} charged.</Alert>;
  }

  return (
    <div className="space-y-3">
      <Script src={SQUARE_SDK_SRC} onReady={() => setSdkReady(true)} strategy="afterInteractive" />
      <div
        id="square-card-container"
        ref={containerRef}
        className="min-h-[56px] rounded-md border border-black/10 p-3"
      />
      {message && <Alert tone="warning">{message}</Alert>}
      <Button onClick={handlePay} disabled={!cardReady || status === "processing"}>
        {status === "processing" ? "Processing…" : `${payButtonLabel} — ${amountLabel}`}
      </Button>
      <p className="text-xs text-ink-soft">
        Sandbox test card: 4111 1111 1111 1111 · any future expiry · any CVV · any postcode.
      </p>
    </div>
  );
}
