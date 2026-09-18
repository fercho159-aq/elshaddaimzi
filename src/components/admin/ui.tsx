"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function PageTitle({ title, intro, actions }: { title: string; intro?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="display text-4xl sm:text-5xl">{title}</h1>
        {intro && <p className="mt-2 max-w-2xl text-sm text-ink/60">{intro}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_1px_2px_rgba(11,10,8,0.04)] sm:p-6 ${className}`} {...props} />;
}

const btn = {
  pri: "bg-gold text-ink hover:bg-gold-light",
  sec: "border border-ink/15 bg-white text-ink hover:border-ink/40",
  dark: "bg-ink text-cream hover:bg-ink-3",
  danger: "border border-[#B3261E]/40 bg-white text-[#B3261E] hover:bg-[#B3261E] hover:text-white",
  ghost: "text-ink/70 hover:bg-ink/5 hover:text-ink",
};

export function Btn({
  variant = "sec",
  className = "",
  href,
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof btn; href?: string }) {
  const cls = `inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors disabled:opacity-40 ${btn[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {props.children}
      </Link>
    );
  }
  return <button type="button" className={cls} {...props} />;
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
  id?: string;
}) {
  return (
    <label className="fm-interruptor flex cursor-pointer items-center justify-between gap-4" htmlFor={id}>
      <span>
        <span className="block text-sm font-bold">{label}</span>
        {hint && <span className="block text-xs text-ink/55">{hint}</span>}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-gold" : "bg-ink/20"}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold text-ink/70">
        {label} {optional && <span className="font-normal text-ink/40">(opcional)</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-bold text-[#B3261E]">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-ink/50">{hint}</p>
      )}
    </div>
  );
}

export const inputCls =
  "h-11 w-full rounded-xl border border-ink/15 bg-[#FCFBF8] px-3.5 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25 aria-[invalid=true]:border-[#B3261E] aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#B3261E]/15";

export function StockBadge({ n }: { n: number }) {
  const cls = n === 0 ? "bg-[#B3261E]/10 text-[#B3261E]" : n <= 10 ? "bg-gold/20 text-gold-deep" : "bg-ink/5 text-ink/70";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${cls}`}>{n === 0 ? "Agotado" : `${n} pzas`}</span>;
}
