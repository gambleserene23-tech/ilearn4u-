import { getApplicationStatus } from "@/config/application-statuses";
import { cn } from "@/lib/utils";

const toneClasses: Record<string, string> = {
  neutral: "bg-black/5 text-ink",
  info: "bg-blue-50 text-blue-700",
  success: "bg-green-50 text-green-700",
  danger: "bg-red-50 text-red-700",
  warning: "bg-brand-orange/10 text-brand-orange-dark",
};

export function StatusBadge({ statusId }: { statusId: string }) {
  const status = getApplicationStatus(statusId);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        toneClasses[status.tone]
      )}
    >
      {status.label}
    </span>
  );
}
