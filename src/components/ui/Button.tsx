import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-dark",
  secondary: "bg-brand-green text-white hover:bg-brand-green-dark",
  outline: "border border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
  ghost: "text-brand-green hover:bg-brand-tan",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </Link>
  );
}
