import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-tan px-3 py-1 text-xs font-medium text-brand-green",
        className
      )}
      {...rest}
    />
  );
}
