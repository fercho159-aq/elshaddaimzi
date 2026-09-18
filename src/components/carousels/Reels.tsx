"use client";

import { useEffect, useRef } from "react";
import { Rail } from "./Rail";
import type { Clip } from "@/lib/seasons";

function ReelCard({ clip, index }: { clip: Clip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.55) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.55, 1] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="group relative aspect-[9/16] overflow-hidden rounded-3xl bg-ink-3 ring-1 ring-cream/10">
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.label}
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />
      <span className="absolute left-4 top-4 font-mono text-xs font-bold text-gold">{String(index + 1).padStart(2, "0")}</span>
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <span className="display block text-2xl leading-none">{clip.label}</span>
      </figcaption>
    </figure>
  );
}

/** Reels verticales con reproducción automática al entrar en pantalla (sin audio). */
export function Reels({ clips, label = "Videos de la bodega" }: { clips: Clip[]; label?: string }) {
  return (
    <Rail label={label} slideClassName="basis-[64%] sm:basis-[38%] lg:basis-[23%]" options={{ dragFree: true }}>
      {clips.map((c, i) => (
        <ReelCard key={c.src} clip={c} index={i} />
      ))}
    </Rail>
  );
}
