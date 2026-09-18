"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/** Video de YouTube que solo carga el reproductor al hacer clic (no afecta la velocidad de la página). */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink-3 ring-1 ring-cream/10">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0" aria-label={`Reproducir: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- miniatura remota ligera */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 size-8 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-left font-bold text-cream">{title}</span>
        </button>
      )}
    </div>
  );
}
