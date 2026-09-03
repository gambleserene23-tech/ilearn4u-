import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "info" | "success" | "warning";

const toneClasses: Record<Tone, string> = {
  info: "bg-brand-tan text-brand-green border-brand-tan-dark",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-brand-orange/10 text-brand-orange-dark border-brand-orange/30",
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border px-4 py-3 text-sm", toneClasses[tone], className)}>
      {title && <p className="mb-0.5 font-semibold">{title}</p>}
      <p>{children}</p>
    </div>
  );
}
