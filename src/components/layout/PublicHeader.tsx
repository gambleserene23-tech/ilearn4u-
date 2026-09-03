"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { LinkButton } from "@/components/ui/Button";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-green text-xs font-bold text-white">
            {siteConfig.brand.logoInitial}
          </span>
          <span className="font-display text-lg font-semibold text-brand-green">
            {siteConfig.brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink hover:text-brand-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LinkButton href="/login" variant="secondary" size="sm">
            Login
          </LinkButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-ink" />
            <span className="h-0.5 w-5 bg-ink" />
            <span className="h-0.5 w-5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {siteConfig.publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-ink hover:bg-brand-tan"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand-green px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
