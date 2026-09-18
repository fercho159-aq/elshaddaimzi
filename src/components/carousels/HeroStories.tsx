"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { WhatsAppIcon } from "../icons";
import { brand, type Photo } from "@/lib/images";
import { whatsappUrl } from "@/lib/whatsapp";

export type HeroSlide = {
  id: string;
  kind: "photo" | "product";
  image: Photo;
  eyebrow: string;
  title: string;
  /** Palabra(s) del título que se resaltan en dorado. */
  highlight?: string;
  text: string;
  href: string;
  cta: string;
  waMessage: string;
  badge?: string;
};

const DURATION = 6500;

function Title({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) return <>{title}</>;
  const [a, b] = title.split(highlight);
  return (
    <>
      {a}
      <span className="gold-text">{highlight}</span>
      {b}
    </>
  );
}

/** Portada tipo "stories": pantalla completa, barras de progreso, swipe y pausa al mantener presionado. */
export function HeroStories({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, api] = useEmblaCarousel({ loop: true, duration: 32 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);

  const onSelect = useCallback(() => api && setIndex(api.selectedScrollSnap()), [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const running = !paused && !held;

  return (
    <section
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink"
      aria-roledescription="carrusel"
      aria-label="Temporadas destacadas"
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <article
                key={s.id}
                className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${slides.length}: ${s.eyebrow}`}
                aria-hidden={!active}
              >
                {s.kind === "photo" ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      preload={i === 0}
                      sizes="100vw"
                      placeholder="blur"
                      quality={80}
                      className={`object-cover ${active ? "animate-kenburns" : "scale-110"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
                  </div>
                ) : (
                  <div className="grain absolute inset-0 bg-ink">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(214,146,15,0.28),transparent_60%)]" />
                    <Image
                      src={brand.logoDoradoLeon}
                      alt=""
                      className="absolute -left-24 bottom-0 h-[70%] w-auto opacity-[0.06]"
                      sizes="600px"
                    />
                    <div className="absolute left-1/2 top-[12%] aspect-square w-[44vw] max-w-[240px] -translate-x-1/2 sm:top-[16%] sm:w-[50vw] sm:max-w-[420px] lg:left-auto lg:right-[8%] lg:top-1/2 lg:w-[40vw] lg:-translate-y-1/2 lg:translate-x-0">
                      <div
                        className={`relative size-full overflow-hidden rounded-full bg-white ring-1 ring-gold/40 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] ${
                          active ? "scale-100" : "scale-90"
                        }`}
                      >
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          fill
                          sizes="(min-width: 1024px) 40vw, 78vw"
                          placeholder="blur"
                          className="object-contain p-[8%]"
                        />
                      </div>
                      <span className="tag absolute -left-4 top-[8%] rotate-[-6deg] text-sm sm:text-lg lg:-left-6">Mayoreo</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/80 to-transparent lg:hidden" />
                  </div>
                )}

                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-28 pt-40 sm:px-6 sm:pb-32 lg:px-10 lg:pb-24">
                  <div
                    className={`max-w-2xl transition-all duration-1000 ease-[var(--ease-out-expo)] ${
                      active ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <p className="eyebrow">{s.eyebrow}</p>
                      {s.badge && <span className="tag text-xs">{s.badge}</span>}
                    </div>
                    {i === 0 ? (
                      <h1 className="display text-[3.4rem] sm:text-7xl lg:text-8xl">
                        <Title title={s.title} highlight={s.highlight} />
                      </h1>
                    ) : (
                      <h2 className="display text-[3.4rem] sm:text-7xl lg:text-8xl">
                        <Title title={s.title} highlight={s.highlight} />
                      </h2>
                    )}
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">{s.text}</p>
                    <div className="mt-7 flex gap-2 sm:mt-8 sm:gap-3">
                      <a
                        href={whatsappUrl(s.waMessage)}
                        target="_blank"
                        rel="noopener"
                        tabIndex={active ? 0 : -1}
                        className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 text-sm font-extrabold text-ink transition hover:bg-gold-light sm:h-14 sm:flex-none sm:px-7 sm:text-base"
                      >
                        <WhatsAppIcon className="size-5" /> <span className="sm:hidden">Cotizar</span>
                        <span className="hidden sm:inline">Solicitar cotización</span>
                      </a>
                      <Link
                        href={s.href}
                        tabIndex={active ? 0 : -1}
                        className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full border border-cream/30 px-4 text-sm font-bold text-cream backdrop-blur-sm transition hover:border-gold hover:text-gold sm:h-14 sm:flex-none sm:px-7 sm:text-base"
                      >
                        <span className="sm:hidden">Ver más</span>
                        <span className="hidden sm:inline">{s.cta}</span> <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Barras de progreso tipo stories */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center gap-4 pb-8 pl-4 pr-24 sm:pl-6 lg:pl-10 xl:pr-10">
          <div className="pointer-events-auto flex flex-1 gap-1.5 sm:gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir a ${s.eyebrow}`}
                aria-current={i === index}
                className="group relative h-8 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/25">
                  {i < index && <span className="absolute inset-0 bg-gold" />}
                  {i === index && (
                    <span
                      key={`${index}-${s.id}`}
                      className="absolute inset-0 origin-left animate-progress bg-gold"
                      style={{
                        ["--story-duration" as string]: `${DURATION}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      onAnimationEnd={() => api?.scrollNext()}
                    />
                  )}
                </span>
                <span className="absolute left-0 top-full hidden truncate text-left text-[0.65rem] font-bold uppercase tracking-widest text-cream/50 group-hover:text-cream lg:block">
                  {s.eyebrow.split("·")[0]}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
            className="pointer-events-auto grid size-10 place-items-center rounded-full border border-cream/25 text-cream backdrop-blur transition hover:border-gold hover:text-gold"
          >
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
