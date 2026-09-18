"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/** Cuenta regresiva en vivo hacia la fecha recomendada de surtido. */
export function Countdown({ target, className = "", size = "md" }: { target: string; className?: string; size?: "sm" | "md" }) {
  const [left, setLeft] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setLeft(parts(t - Date.now()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [target]);

  const cells: [keyof ReturnType<typeof parts>, string][] = [
    ["d", "días"],
    ["h", "hrs"],
    ["m", "min"],
    ["s", "seg"],
  ];

  return (
    <div className={`flex gap-1.5 sm:gap-2 ${className}`} role="timer" aria-live="off">
      {cells.map(([k, label]) => (
        <div
          key={k}
          className={`flex flex-col items-center rounded-xl border border-gold/30 bg-ink/70 backdrop-blur ${
            size === "sm" ? "min-w-12 px-2 py-1.5" : "min-w-14 px-2.5 py-2 sm:min-w-16"
          }`}
        >
          <span className={`display tabular-nums text-gold ${size === "sm" ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
            {left ? String(left[k]).padStart(2, "0") : "--"}
          </span>
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-cream/60">{label}</span>
        </div>
      ))}
    </div>
  );
}
