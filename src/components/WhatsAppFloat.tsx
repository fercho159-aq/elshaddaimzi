"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { brand } from "@/lib/images";
import { messageForPath } from "@/lib/nav";
import { daysUntil, featuredSeason, getSeason, nextStockDate } from "@/lib/seasons";
import { businessStatus, whatsappUrl } from "@/lib/whatsapp";

const DISMISS_KEY = "wa-bubble-dismissed";
const DELAY_MS = 12_000;
const SCROLL_TRIGGER = 0.4;
const AUTO_HIDE_MS = 15_000;

/**
 * Botón flotante de WhatsApp con disparador de urgencia.
 * Solo usa datos verdaderos: días a la fecha recomendada de surtido y horario real de atención.
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const [bubble, setBubble] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setNow(new Date()), 0);
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {}
    if (dismissed) return () => clearTimeout(t);

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setBubble(true);
      // Se retira solo para no estorbar la lectura; no vuelve a aparecer en la sesión.
      hideTimer = setTimeout(() => {
        setBubble(false);
        try {
          sessionStorage.setItem(DISMISS_KEY, "1");
        } catch {}
      }, AUTO_HIDE_MS);
    };
    const timer = setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_TRIGGER) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      clearTimeout(timer);
      if (hideTimer) clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setBubble(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  // El cotizador tiene su propia barra de pedido con WhatsApp.
  if (pathname.startsWith("/cotizador")) return null;

  const slug = pathname.match(/^\/temporadas\/([^/]+)/)?.[1];
  const season = (slug && getSeason(slug)) || (now ? featuredSeason(now) : null);
  const days = season && now ? daysUntil(nextStockDate(season, now), now) : null;
  const open = now ? businessStatus(now).open : null;
  const href = whatsappUrl(messageForPath(pathname));

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {bubble && season && days !== null && (
        <div
          role="dialog"
          aria-label="Mensaje de ventas"
          className="pointer-events-auto w-[min(20rem,calc(100vw-2rem))] max-sm:w-[calc(100vw-7rem)] max-sm:self-end max-sm:mr-0 origin-bottom-right animate-float-in overflow-hidden rounded-2xl border border-gold/30 bg-ink-2 shadow-2xl shadow-black/60"
        >
          <div className="hidden items-center gap-3 bg-ink px-4 py-3 sm:flex">
            <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-ink-2 p-1.5">
              <Image src={brand.logoDoradoLeon} alt="" className="h-full w-auto" sizes="40px" />
              <span
                className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-ink ${open ? "bg-wa" : "bg-gold"}`}
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-cream">Ventas El Shaddai</span>
              <span className="block text-xs text-cream/60">
                {open ? "En línea · respondemos en horario de atención" : "Déjenos su pedido; respondemos al abrir"}
              </span>
            </span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar mensaje"
              className="grid size-8 place-items-center rounded-full text-cream/60 hover:bg-cream/10 hover:text-cream"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="relative space-y-3 p-4">
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar mensaje"
              className="absolute right-2 top-2 grid size-8 place-items-center rounded-full text-cream/60 hover:text-cream sm:hidden"
            >
              <X className="size-4" />
            </button>
            <p className="pr-6 text-sm leading-relaxed text-cream/85 sm:pr-0">
              {days > 0 ? (
                <>
                  Faltan{" "}
                  <strong className="display text-2xl text-gold">
                    {days} {days === 1 ? "día" : "días"}
                  </strong>{" "}
                  para la fecha recomendada de surtido de <strong className="text-cream">{season.name.toLowerCase()}</strong>.
                </>
              ) : (
                <>
                  Hoy es la fecha recomendada para surtir <strong className="text-cream">{season.name.toLowerCase()}</strong>.
                </>
              )}
            </p>
            <p className="hidden text-xs text-cream/60 sm:block">
              Los modelos de mayor demanda se agotan primero. Aparte su pedido antes del pico de venta.
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              onClick={dismiss}
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-wa text-sm font-extrabold text-ink transition hover:brightness-110 sm:h-12"
            >
              <WhatsAppIcon className="size-4" />
              Cotizar ahora
            </a>
          </div>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label="Escribir por WhatsApp"
        className="group pointer-events-auto relative grid size-16 place-items-center rounded-full bg-wa text-ink shadow-[0_12px_40px_-8px_rgba(37,211,102,0.8)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-wa" />
        <WhatsAppIcon className="relative size-8" />
        {open !== null && (
          <span
            className={`absolute right-0.5 top-0.5 size-4 rounded-full border-[3px] border-ink ${open ? "bg-wa" : "bg-gold"}`}
          />
        )}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-cream px-4 py-2 text-sm font-bold text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
          ¿Le cotizamos hoy?
        </span>
      </a>
    </div>
  );
}
