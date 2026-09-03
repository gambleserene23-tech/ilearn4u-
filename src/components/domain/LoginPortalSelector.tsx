"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { roles } from "@/config/roles";

const visibleRoles = roles.filter((r) => r.id !== "admin");

export function LoginPortalSelector() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("123");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f7f3ed] px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Portal access</p>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-green">Welcome to ilearn4u</h1>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Select a portal and sign in. This presentation build uses a shared demo credential
            across every role.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-[#ddd7ce] bg-white p-6 shadow-[0_20px_60px_rgba(15,61,46,.08)] sm:p-8">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {visibleRoles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`rounded-lg border p-4 text-left transition ${
                  role === r.id ? "border-brand-orange bg-[#fff8f2]" : "border-[#e1e7e4] hover:border-brand-green"
                }`}
              >
                <span className="block text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                  {r.label}
                </span>
                <span className="mt-2 block text-sm font-semibold text-brand-green">{r.label} Portal</span>
                <span className="mt-1 block text-[10px] leading-5 text-ink-soft">{r.description}</span>
              </button>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <label className="block text-xs font-semibold text-ink-soft">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#dbe3df] px-3 py-3 text-sm"
            />
            <label className="mt-4 block text-xs font-semibold text-ink-soft">Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#dbe3df] px-3 py-3 text-sm"
            />
            <div className="mt-4 rounded-md border-l-4 border-brand-orange bg-[#fff8f2] p-3 text-xs text-ink-soft">
              Demo credentials: <b>123</b> / <b>123</b>
            </div>
            {error && <p className="mt-3 text-xs font-semibold text-red-700">{error}</p>}
            <button
              onClick={() => {
                if (email !== "123" || password !== "123") {
                  setError("Use 123 for both fields in the demo.");
                  return;
                }
                router.push(`/${role}`);
              }}
              className="mt-5 w-full rounded-md bg-brand-green px-4 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
            >
              Sign in to {visibleRoles.find((r) => r.id === role)?.label} Portal →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
