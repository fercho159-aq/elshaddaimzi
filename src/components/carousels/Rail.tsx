"use client";

import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carril deslizable (Embla): swipe nativo en celular, flechas y barra de progreso en escritorio.
 * `slideClassName` define el ancho de cada tarjeta (mobile-first), p. ej. "basis-[82%] sm:basis-1/2 lg:basis-1/3".
 */
export function Rail({
  children,
  slideClassName = "basis-[82%] sm:basis-1/2 lg:basis-1/3",
  options,
  autoplay = false,
  delay = 4500,
  label,
  controls = "bottom",
  tone = "dark",
}: {
  children: ReactNode;
  slideClassName?: string;
  options?: EmblaOptionsType;
  autoplay?: boolean;
  delay?: number;
  label: string;
  controls?: "bottom" | "none";
  tone?: "dark" | "light";
}) {
  const [emblaRef, api] = useEmblaCarousel(
    { align: "start", dragFree: false, containScroll: "trimSnaps", ...options },
    autoplay ? [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true })] : [],
  );
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onScroll = useCallback(() => {
    if (!api) return;
    setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("scroll", onScroll).on("reInit", onScroll).on("select", onScroll);
    const t = setTimeout(onScroll, 0);
    return () => {
      clearTimeout(t);
      api.off("scroll", onScroll).off("reInit", onScroll).off("select", onScroll);
    };
  }, [api, onScroll]);

  const btn =
    tone === "dark"
      ? "border-cream/20 text-cream hover:border-gold hover:bg-gold hover:text-ink"
      : "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream";

  return (
    <div className="relative" role="region" aria-roledescription="carrusel" aria-label={label}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex touch-pan-y sm:-ml-5">
          {Children.map(children, (child, i) => (
            <div
              className={`min-w-0 shrink-0 grow-0 pl-4 sm:pl-5 ${slideClassName}`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${Children.count(children)}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {controls === "bottom" && (
        <div className="mt-6 flex items-center gap-5">
          <div className={`relative h-px flex-1 ${tone === "dark" ? "bg-cream/15" : "bg-ink/15"}`}>
            <div
              className="absolute inset-y-0 left-0 w-full origin-left bg-gold transition-transform duration-150"
              style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Anterior"
              className={`grid size-11 place-items-center rounded-full border transition-all disabled:opacity-30 ${btn}`}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              aria-label="Siguiente"
              className={`grid size-11 place-items-center rounded-full border transition-all disabled:opacity-30 ${btn}`}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
