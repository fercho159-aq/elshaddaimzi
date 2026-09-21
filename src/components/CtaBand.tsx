import Image from "next/image";
import type { ReactNode } from "react";
import { Countdown } from "./Countdown";
import { Button, Container, WhatsAppButton } from "./ui";
import type { Photo } from "@/lib/images";
import { site } from "@/lib/site";

/** Bloque de cierre (la "R" de PASTOR / la "A" de AIDA): llamada a la acción con urgencia real. */
export function CtaBand({
  eyebrow,
  title,
  text,
  image,
  message,
  countdownTo,
  countdownLabel,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  image: Photo;
  message: string;
  countdownTo?: string;
  countdownLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Image src={image.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,146,15,0.25),transparent_65%)]" />
      <Container className="relative text-center">
        <div data-reveal className="mx-auto max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-4 text-5xl sm:text-7xl lg:text-8xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">{text}</p>
          {countdownTo && (
            <div className="mt-8 flex flex-col items-center gap-3">
              {countdownLabel && <p className="text-xs font-bold uppercase tracking-widest text-cream/60">{countdownLabel}</p>}
              <Countdown target={countdownTo} />
            </div>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton message={message} size="lg" label="Solicitar cotización" />
            <Button href="/tienda" variant="outline" size="lg" external>
              Ver tienda en línea
            </Button>
          </div>
          <p className="mt-6 text-xs text-cream/50">{site.hours.label} · Atención personalizada por WhatsApp</p>
        </div>
      </Container>
    </section>
  );
}
