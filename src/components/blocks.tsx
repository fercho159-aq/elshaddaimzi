import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import { Countdown } from "./Countdown";
import { Container, Pending } from "./ui";
import type { Photo } from "@/lib/images";
import { monthNamesLong, type Season } from "@/lib/seasons";

export const stockLabel = (s: Season) => `Surta antes del ${s.stockBy.day} de ${monthNamesLong[s.stockBy.month - 1]}`;

/** Tarjeta vertical de temporada con foto, usada en carriles y cuadrículas. */
export function SeasonCard({ season, index, featured }: { season: Season; index?: number; featured?: boolean }) {
  const product = season.cutout;
  return (
    <Link
      href={`/temporadas/${season.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3 ring-1 ring-cream/10"
    >
      {product ? (
        <>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#fffaf2,#efe3d2_70%)]" />
          <Image
            src={season.cover.src}
            alt={season.cover.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 80vw"
            placeholder="blur"
            className="object-contain p-[12%] pb-[34%] mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
        </>
      ) : (
        <Image
          src={season.cover.src}
          alt={season.cover.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 80vw"
          placeholder="blur"
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      {typeof index === "number" && (
        <span className="absolute left-5 top-5 font-mono text-xs font-bold text-gold">{String(index + 1).padStart(2, "0")}</span>
      )}
      {featured && <span className="tag absolute right-4 top-4 text-xs">En temporada</span>}
      <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span className="eyebrow block">{season.occasion}</span>
        <span className="display mt-2 block text-4xl leading-[0.9] sm:text-5xl">{season.name}</span>
        <span className="mt-3 flex items-center justify-between gap-3 text-sm text-cream/75">
          <span>{season.months}</span>
          <span className="grid size-10 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-5" />
          </span>
        </span>
      </span>
    </Link>
  );
}

/** Portada de páginas internas (la "A" de AIDA). */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  product = false,
  children,
  countdownTo,
  countdownLabel,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  image: Photo;
  product?: boolean;
  children?: ReactNode;
  countdownTo?: string;
  countdownLabel?: string;
}) {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink">
      {product ? (
        <div className="grain absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(214,146,15,0.3),transparent_60%)]" />
          <div className="absolute right-[5%] top-1/2 hidden aspect-square w-[34vw] max-w-[520px] -translate-y-1/2 lg:block">
            <div className="relative size-full overflow-hidden rounded-full bg-white ring-1 ring-gold/40">
              <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 38vw, 70vw" placeholder="blur" className="object-contain p-[9%]" />
            </div>
            <span className="tag absolute left-0 top-[10%] rotate-[-6deg] text-lg">Mayoreo</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent lg:bg-none" />
        </div>
      ) : (
        <div className="absolute inset-0">
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" placeholder="blur" className="animate-kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
        </div>
      )}
      <Container className={`relative pb-16 sm:pb-20 ${product ? "pt-32 lg:pt-44" : "pt-44"}`}>
        <div className={`max-w-3xl animate-float-in ${product ? "lg:max-w-[52%]" : ""}`}>
          {product && (
            <div className="relative mb-8 aspect-square w-[62vw] max-w-[300px] lg:hidden">
              <div className="relative size-full overflow-hidden rounded-full bg-white ring-1 ring-gold/40">
                <Image src={image.src} alt="" fill sizes="62vw" placeholder="blur" className="object-contain p-[9%]" />
              </div>
              <span className="tag absolute -left-2 top-[10%] rotate-[-6deg]">Mayoreo</span>
            </div>
          )}
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={`display mt-4 text-[3.2rem] sm:text-7xl ${product ? "lg:text-[clamp(3.5rem,10svh,5.2rem)]" : "lg:text-[clamp(3.5rem,12svh,6.5rem)]"}`}>{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">{lead}</p>
          {countdownTo && (
            <div className="mt-8">
              {countdownLabel && <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cream/60">{countdownLabel}</p>}
              <Countdown target={countdownTo} size="sm" />
            </div>
          )}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Mosaico de fotos (columnas tipo masonry). */
export function Gallery({ items, product = false }: { items: Photo[]; product?: boolean }) {
  return (
    <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
      {items.map((p, i) => (
        <figure
          key={p.src.src}
          data-reveal
          style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
          className={`group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl sm:mb-4 ${product ? "bg-white" : "bg-ink-3"}`}
        >
          <Image
            src={p.src}
            alt={p.alt}
            sizes="(min-width: 1024px) 33vw, 50vw"
            placeholder="blur"
            className={`h-auto w-full transition-transform duration-[1.2s] group-hover:scale-105 ${product ? "p-6" : ""}`}
          />
          {!product && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/90 to-transparent p-4 text-sm text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {p.alt}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export type Testimonial = { name: string; city: string; business: string; text: string; season: string };

/** PENDIENTE: reemplazar por testimonios reales de distribuidores (nombre, ciudad y autorización). */
export const sampleTestimonials: Testimonial[] = [
  {
    name: "Distribuidora de ejemplo",
    city: "Puebla",
    business: "Local de temporada",
    season: "Luces navideñas",
    text: "Surtí luces en octubre y para la primera semana de diciembre ya había vuelto a pedir. La atención por WhatsApp es muy rápida.",
  },
  {
    name: "Revendedor de ejemplo",
    city: "Estado de México",
    business: "Venta en tianguis",
    season: "Paraguas",
    text: "Con el primer aguacero vendí casi todo el lote. El precio de mayoreo me deja un margen que no encuentro en otro lado.",
  },
  {
    name: "Tienda de ejemplo",
    city: "Querétaro",
    business: "Papelería",
    season: "Mochilas",
    text: "Cada regreso a clases les compro mochilas. Me orientan sobre qué modelos se venden más en mi zona.",
  },
  {
    name: "Emprendedora de ejemplo",
    city: "CDMX",
    business: "Venta por redes sociales",
    season: "Juguetes",
    text: "Empecé con un pedido pequeño para Reyes y hoy surto cada temporada. Me enviaron a domicilio sin problema.",
  },
];

export function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <article className="flex h-full flex-col rounded-3xl border border-cream/10 bg-ink-2 p-6">
      <div className="flex items-center justify-between">
        <Quote className="size-8 text-gold" />
        <Pending>Ejemplo · reemplazar</Pending>
      </div>
      <div className="relative mt-5 flex-1 rounded-2xl rounded-tl-sm bg-[#1f2c23] p-4 text-[0.95rem] leading-relaxed text-cream/90">
        {t.text}
        <span className="mt-2 block text-right text-[0.65rem] text-cream/40">✓✓</span>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-gold font-bold text-ink">{initials}</span>
        <span>
          <span className="block font-bold">{t.name}</span>
          <span className="block text-xs text-cream/60">
            {t.business} · {t.city} · {t.season}
          </span>
        </span>
      </div>
    </article>
  );
}

/** Tarjeta de producto tipo etiqueta de caja. */
export function ProductCard({ photo, name, season, product }: { photo: Photo; name: string; season: string; product: boolean }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-cream text-ink">
      <div className={`relative aspect-square overflow-hidden ${product ? "bg-white" : "bg-ink"}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 70vw"
          placeholder="blur"
          className={`transition-transform duration-700 group-hover:scale-105 ${product ? "object-contain p-8" : "object-cover"}`}
        />
        <span className="tag absolute left-3 top-3 text-xs">Mayoreo</span>
      </div>
      <div className="border-t-2 border-dashed border-ink/15 p-5">
        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-gold-deep">{season}</p>
        <h3 className="display mt-1 text-2xl">{name}</h3>
        <p className="mt-2 text-sm text-ink/60">Precio de mayoreo: consulte por WhatsApp</p>
      </div>
    </article>
  );
}
