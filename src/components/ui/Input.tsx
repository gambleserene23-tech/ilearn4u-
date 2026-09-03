import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

const fieldBase =
  "w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20";

export function Field({
  label,
  htmlFor,
  required,
  helpText,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  helpText?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-orange">*</span>}
      </label>
      {children}
      {helpText && <p className="text-xs text-ink-soft">{helpText}</p>}
    </div>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} className={cn(fieldBase, className)} {...rest} />;
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "bg-white", className)} {...rest}>
      {children}
    </select>
  );
}
