"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { businessStatus } from "./whatsapp";

/** Hora actual en el cliente; `null` durante el render del servidor para evitar desajustes de hidratación. */
export function useNow(intervalMs = 60_000): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, intervalMs);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [intervalMs]);
  return now;
}

export function useBusinessStatus() {
  const now = useNow();
  return now ? businessStatus(now) : null;
}

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

export function useScrolledPast(px: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > px,
    () => false,
  );
}

export function useScrollProgress() {
  return useSyncExternalStore(
    subscribeScroll,
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.round((window.scrollY / max) * 100) / 100 : 0;
    },
    () => 0,
  );
}
