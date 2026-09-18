import Image from "next/image";
import {
  BadgePercent,
  CalendarDays,
  Handshake,
  PackageX,
  ShieldCheck,
  TrendingDown,
  Truck,
  Warehouse,
} from "lucide-react";
import { HeroStories, type HeroSlide } from "@/components/carousels/HeroStories";
import { Rail } from "@/components/carousels/Rail";
import { Reels } from "@/components/carousels/Reels";
import { CtaBand } from "@/components/CtaBand";
import { Marquee } from "@/components/Marquee";
import { SeasonCalendar } from "@/components/SeasonCalendar";
import { Gallery, ProductCard, SeasonCard, TestimonialCard, sampleTestimonials, stockLabel } from "@/components/blocks";
import { ArrowLink, Button, Container, SectionHeading, WhatsAppButton } from "@/components/ui";
import { catalog } from "@/lib/catalog";
import { photos } from "@/lib/images";
import { featuredSeason, monthNamesLong, nextStockDate, seasons } from "@/lib/seasons";
import { site } from "@/lib/site";

// La portada se regenera cada hora para que la temporada destacada y el orden del carrusel sigan el calendario.
export const revalidate = 3600;

const highlights: Record<string, string> = {
  "luces-navidenas": "Surta a tiempo.",
  juguetes: "no espera.",
  paraguas: "vende.",
  mochilas: "mochila nueva.",
};

export default function HomePage() {
  const now = new Date();
  const featured = featuredSeason(now);
  const ordered = [...seasons].sort((a, b) => +nextStockDate(a, now) - +nextStockDate(b, now));
  const featuredDeadline = nextStockDate(featured, now);

  const slides: HeroSlide[] = [
    {
      id: "marca",
      kind: "photo",
      image: photos.fachadaNavidad,
      eyebrow: `Comercializadora · Desde ${site.foundedYear}`,
      title: "Mayoreo de temporada para hacer crecer su negocio",
      highlight: "de temporada",
      text: "Luces navideñas, juguetes, paraguas y mochilas escolares a precio de mayoreo, en el corazón del Centro de la Ciudad de México y con envíos a todo el país.",
      href: "/temporadas",
      cta: "Conocer temporadas",
      waMessage: "Buen día, me interesa conocer sus precios de mayoreo de temporada.",
    },
    ...ordered.map<HeroSlide>((s) => ({
      id: s.slug,
      kind: s.cutout ? "product" : "photo",
      image: s.hero,
      eyebrow: `${s.occasion} · ${s.months}`,
      title: s.headline,
      highlight: highlights[s.slug],
      text: s.lead,
      href: `/temporadas/${s.slug}`,
      cta: `Ver ${s.name.toLowerCase()}`,
      waMessage: s.whatsappMessage,
      badge: s.slug === featured.slug ? stockLabel(s) : undefined,
    })),
  ];

  const allClips = seasons.flatMap((s) => s.clips);

  return (
    <>
      <HeroStories slides={slides} />

      <div className="border-y border-gold/30 bg-gold py-4 text-ink">
        <Marquee
          items={["Luces navideñas", "Juguetes", "Paraguas", "Mochilas escolares", "Precio de mayoreo", "Envíos a todo México"]}
          duration={50}
        />
      </div>

      {/* P · Problema */}
      <section className="py-24 sm:py-32" aria-labelledby="problema">
        <Container className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div data-reveal>
              <p className="eyebrow">El reto de emprender</p>
              <h2 id="problema" className="display mt-4 text-[2.8rem] sm:text-6xl lg:text-7xl">
                ¿Qué vender, cuándo venderlo y <span className="gold-text">a quién comprárselo?</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/75">
                Usted tiene la disposición de iniciar o hacer crecer su negocio. Sin embargo, elegir el producto
                equivocado, comprarlo fuera de temporada o pagarlo a precio de menudeo puede consumir su capital antes de
                la primera venta.
              </p>
            </div>
            <ul className="mt-10 space-y-4">
              {[
                ["No sabe qué producto se venderá en los próximos meses.", CalendarDays],
                ["Compra a intermediarios y su margen se reduce en cada pieza.", TrendingDown],
                ["Su mercancía llega cuando la temporada ya está terminando.", PackageX],
              ].map(([text, Icon], i) => {
                const I = Icon as typeof CalendarDays;
                return (
                  <li
                    key={i}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
                    className="flex items-start gap-4 rounded-2xl border border-cream/10 bg-ink-2 p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                      <I className="size-5" />
                    </span>
                    <span className="pt-2 text-cream/85">{text as string}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative lg:col-span-6" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src={photos.paraguasPasillo.src}
                alt={photos.paraguasPasillo.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-gold/30 bg-ink/90 p-5 backdrop-blur sm:-left-8 sm:right-auto sm:max-w-xs">
              <p className="voice text-2xl leading-snug text-gold">“Quien surte a tiempo, vende en el pico.”</p>
            </div>
          </div>
        </Container>
      </section>

      {/* A · Amplificar */}
      <section className="grain relative overflow-hidden bg-ink-2 py-24 sm:py-32" aria-labelledby="amplificar">
        <Image
          src={photos.lucesCalle.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.12]"
        />
        <Container className="relative">
          <div data-reveal className="max-w-5xl">
            <p className="eyebrow">Lo que está en juego</p>
            <h2 id="amplificar" className="display mt-4 text-[2.8rem] sm:text-7xl lg:text-8xl">
              Una temporada perdida <span className="gold-text">no se recupera.</span> Regresa hasta el próximo año.
            </h2>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "01",
                title: "Llegar tarde",
                text: "Cada semana sin mercancía en el pico de la temporada es una venta que se lleva otro comerciante.",
              },
              {
                n: "02",
                title: "Pagar de más",
                text: "Comprar a revendedores en lugar de a una comercializadora de mayoreo reduce su ganancia en cada pieza.",
              },
              {
                n: "03",
                title: "Quedarse con inventario",
                text: "El producto equivocado inmoviliza su capital hasta la siguiente temporada, o para siempre.",
              },
            ].map((c, i) => (
              <article
                key={c.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                className="rounded-3xl border border-cream/10 bg-ink/70 p-7 backdrop-blur"
              >
                <span className="display text-6xl text-gold/30">{c.n}</span>
                <h3 className="display mt-4 text-3xl">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/70">{c.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* S · Solución e historia */}
      <section className="py-24 sm:py-32" aria-labelledby="solucion">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="eyebrow">Nuestra historia · Desde {site.foundedYear}</p>
              <h2 id="solucion" className="display mt-4 text-[2.8rem] sm:text-6xl lg:text-7xl">
                Surtimos a quienes venden, <span className="gold-text">temporada tras temporada</span>
              </h2>
            </div>
            <p className="voice text-2xl leading-snug text-cream/85 lg:col-span-5" data-reveal>
              Desde el Centro de la Ciudad de México acompañamos a comerciantes, revendedores y emprendedores con el
              producto que cada época del año demanda, al precio que su negocio necesita.
            </p>
          </div>

          <div className="mt-16 grid gap-10 rounded-[2rem] border border-cream/10 bg-ink-2 p-5 sm:p-8 lg:grid-cols-12 lg:p-10" data-reveal>
            <div className="lg:col-span-4">
              <p className="eyebrow">Calendario del revendedor</p>
              <h3 className="display mt-3 text-4xl sm:text-5xl">Sepa qué surtir en cada mes del año</h3>
              <p className="mt-4 leading-relaxed text-cream/70">
                Organizamos nuestro inventario por temporadas para que usted compre con anticipación y llegue surtido al
                momento de mayor venta.
              </p>
              <p className="mt-6 rounded-2xl bg-gold/10 p-4 text-sm text-cream/85">
                <strong className="text-gold">En temporada ahora:</strong> {featured.name}. {stockLabel(featured)}.
              </p>
            </div>
            <div className="lg:col-span-8 lg:pl-6">
              <SeasonCalendar currentMonth={now.getMonth() + 1} />
            </div>
          </div>

          <div className="mt-16">
            <Rail label="Temporadas" slideClassName="basis-[82%] sm:basis-[46%] lg:basis-[31%]">
              {ordered.map((s, i) => (
                <SeasonCard key={s.slug} season={s} index={i} featured={s.slug === featured.slug} />
              ))}
            </Rail>
          </div>
        </Container>
      </section>

      {/* T · Transformación y testimonios */}
      <section className="border-t border-cream/10 bg-ink-2 py-24 sm:py-32" aria-labelledby="transformacion">
        <Container>
          <SectionHeading
            eyebrow="La transformación"
            title={
              <>
                Del primer pedido a <span className="gold-text">un negocio por temporada</span>
              </>
            }
            intro="Muchos de nuestros clientes iniciaron con un solo pedido. Hoy planean su año completo con nosotros."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { t: "Elija su temporada", d: "Le orientamos sobre el producto con mejor rotación para su zona y su tipo de venta." },
              { t: "Surta a precio de mayoreo", d: "Compre directamente a la comercializadora, en bodega o con envío a su ciudad." },
              { t: "Venda en el pico y repita", d: "Llegue surtido al momento de mayor demanda y prepare la siguiente temporada." },
            ].map((s, i) => (
              <li
                key={s.t}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                className="relative overflow-hidden rounded-3xl border border-cream/10 bg-ink p-7"
              >
                <span className="display absolute -right-2 -top-6 text-[9rem] leading-none text-gold/10">{i + 1}</span>
                <span className="grid size-10 place-items-center rounded-full bg-gold font-extrabold text-ink">{i + 1}</span>
                <h3 className="display mt-5 text-3xl">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-cream/70">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-24 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="La bodega en movimiento"
              title="Véalo con sus propios ojos"
              intro="Recorridos reales por nuestra mercancía de temporada."
            />
            <ArrowLink href={site.social.tiktok} className="shrink-0">
              Más videos en TikTok
            </ArrowLink>
          </div>
          <div className="mt-10">
            <Reels clips={allClips} />
          </div>

          <div className="mt-24">
            <SectionHeading eyebrow="Testimonios" title="Lo que dicen nuestros distribuidores" />
            <div className="mt-10">
              <Rail label="Testimonios" slideClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3" autoplay delay={5500}>
                {sampleTestimonials.map((t) => (
                  <TestimonialCard key={t.name} t={t} />
                ))}
              </Rail>
            </div>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 lg:grid-cols-4">
            {[
              { k: `${now.getFullYear() - site.foundedYear}+`, v: "años surtiendo a comerciantes" },
              { k: "4", v: "temporadas de venta al año" },
              { k: "32", v: "estados con envío disponible" },
              { k: "Lun–Sáb", v: "atención en bodega y WhatsApp" },
            ].map((s) => (
              <div key={s.v} className="bg-ink p-6 sm:p-8" data-reveal>
                <dt className="display text-5xl text-gold sm:text-6xl">{s.k}</dt>
                <dd className="mt-2 text-sm text-cream/70">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* O · Oferta */}
      <section className="py-24 sm:py-32" aria-labelledby="oferta">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div data-reveal>
                <p className="eyebrow">Nuestra propuesta</p>
                <h2 id="oferta" className="display mt-4 text-[2.8rem] sm:text-6xl lg:text-7xl">
                  Todo lo que su negocio necesita, <span className="gold-text">en un solo proveedor</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-cream/75">
                  Le ofrecemos condiciones de mayoreo pensadas para que su inversión se convierta en ganancia.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" data-reveal>
                <WhatsAppButton message="Buen día, me interesa ser distribuidor. ¿Me comparte condiciones y precios de mayoreo?" label="Quiero ser distribuidor" />
                <Button href="/distribuidores" variant="outline">
                  Cómo comprar
                </Button>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {[
                { I: BadgePercent, t: "Precio de mayoreo", d: "Precios preferenciales para distribuidores y compras por volumen." },
                { I: CalendarDays, t: "Surtido por temporada", d: "Inventario listo antes del pico de venta de cada época." },
                { I: Truck, t: "Envíos a todo México", d: "Enviamos su pedido a cualquier estado de la República." },
                { I: Handshake, t: "Asesoría personalizada", d: "Le recomendamos los modelos con mejor rotación." },
                { I: Warehouse, t: "Bodega en el Centro", d: "Visítenos y elija su mercancía en persona." },
                { I: ShieldCheck, t: "Respaldo desde 2011", d: "Más de una década atendiendo a comerciantes." },
              ].map(({ I, t, d }, i) => (
                <li
                  key={t}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(i % 2) * 100}ms` }}
                  className="group rounded-3xl border border-cream/10 bg-ink-2 p-6 transition-colors hover:border-gold/50"
                >
                  <I className="size-7 text-gold transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-4 text-lg font-extrabold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-24 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Mercancía de temporada" title="Lo que puede vender este año" />
            <ArrowLink href="/temporadas" className="shrink-0">
              Ver todas las temporadas
            </ArrowLink>
          </div>
          <div className="mt-10">
            <Rail label="Productos" slideClassName="basis-[72%] sm:basis-[40%] lg:basis-1/4" autoplay delay={3800} options={{ loop: true }}>
              {catalog.map((p) => (
                <ProductCard key={p.name} photo={p.photo} name={p.name} season={p.season} product={p.cutout} />
              ))}
            </Rail>
          </div>

          <div className="mt-24">
            <SectionHeading eyebrow="Nuestra bodega" title="Mercancía real, lista para su negocio" />
            <div className="mt-10">
              <Gallery
                items={[
                  photos.lucesPrecios,
                  photos.paraguasMuro,
                  photos.fachadaNavidad,
                  photos.lucesMuroNeon,
                  photos.paraguasBodega2,
                  photos.lucesBastones,
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* R · Respuesta */}
      <CtaBand
        eyebrow={`Temporada de ${featured.occasion.toLowerCase()}`}
        title={
          <>
            Solicite hoy su <span className="gold-text">cotización de mayoreo</span>
          </>
        }
        text={
          <>
            Escríbanos por WhatsApp y un asesor le compartirá precios, existencias y opciones de envío. Le recomendamos
            surtir {featured.name.toLowerCase()} antes del {featured.stockBy.day} de{" "}
            {monthNamesLong[featured.stockBy.month - 1]}.
          </>
        }
        image={photos.lucesTienda}
        message={featured.whatsappMessage}
        countdownTo={featuredDeadline.toISOString()}
        countdownLabel="Tiempo restante para la fecha recomendada de surtido"
      />
    </>
  );
}
