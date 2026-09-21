import type { Metadata } from "next";
import Image from "next/image";
import { Cotizador } from "@/components/quote/Cotizador";
import { Container } from "@/components/ui";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Cotizador de mayoreo",
  description: "Calcule su pedido de mayoreo: el precio por pieza baja según el volumen. Envíe su cotización por WhatsApp.",
  alternates: { canonical: "/cotizador" },
};

const levels = [
  { t: "Menudeo", d: "Desde 1 pieza" },
  { t: "Mayoreo", d: "Desde 6 o 12 piezas" },
  { t: "Volumen", d: "Por caja o más" },
];

export default function QuotePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44 print:hidden">
        <Image src={photos.lucesPrecios.src} alt="" fill preload sizes="100vw" placeholder="blur" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <Container className="relative">
          <p className="eyebrow">Cotizador de mayoreo</p>
          <h1 className="display mt-4 max-w-4xl text-[3rem] sm:text-7xl">
            Entre más compra, <span className="gold-text">menos paga por pieza</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Elija productos y cantidades. El precio se ajusta solo al nivel de volumen que alcance y al final puede enviar
            su cotización por WhatsApp.
          </p>
          <ol className="mt-8 grid max-w-2xl grid-cols-3 gap-2">
            {levels.map((l, i) => (
              <li key={l.t} className="rounded-2xl border border-cream/10 bg-ink-2/80 p-3 backdrop-blur sm:p-4">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <p className="display mt-1 text-2xl">{l.t}</p>
                <p className="text-xs text-cream/60">{l.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="pb-32 pt-6 lg:pb-24">
        <Container>
          <Cotizador />
        </Container>
      </section>
    </>
  );
}
