import type { Metadata } from "next";
import { BadgePercent, ChevronDown, Handshake, MessageCircle, PackageCheck, Truck, Warehouse } from "lucide-react";
import { Rail } from "@/components/carousels/Rail";
import { CtaBand } from "@/components/CtaBand";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { PageHero, SeasonCard, TestimonialCard, sampleTestimonials } from "@/components/blocks";
import { Button, Container, Pending, SectionHeading, WhatsAppButton } from "@/components/ui";
import { photos } from "@/lib/images";
import { featuredSeason, seasons } from "@/lib/seasons";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Distribuidores · Cómo comprar al mayoreo",
  description:
    "Conviértase en distribuidor de El Shaddai MZI: precios preferenciales de mayoreo, surtido por temporada y envíos a todo México.",
  alternates: { canonical: "/distribuidores" },
};

const MESSAGE = "Buen día, me interesa ser distribuidor. ¿Me comparte condiciones y precios de mayoreo?";

const steps = [
  { I: MessageCircle, t: "Escríbanos", d: "Envíenos un mensaje por WhatsApp e indíquenos qué temporada le interesa y en qué ciudad vende." },
  { I: BadgePercent, t: "Reciba su cotización", d: "Le compartimos catálogo, existencias y precios de mayoreo vigentes." },
  { I: PackageCheck, t: "Confirme su pedido", d: "Elija modelos y cantidades; un asesor le confirma el total y la forma de pago." },
  { I: Truck, t: "Reciba o recoja", d: "Enviamos a cualquier estado de la República o puede recoger en nuestra bodega." },
];

// PENDIENTE: confirmar respuestas con el cliente (compra mínima, formas de pago, paqueterías y tiempos).
const faqs = [
  {
    q: "¿Cuál es la compra mínima de mayoreo?",
    a: "La compra mínima depende del producto y de la temporada. Un asesor le indicará las condiciones vigentes al solicitar su cotización.",
  },
  {
    q: "¿Hacen envíos fuera de la Ciudad de México?",
    a: "Sí. Realizamos envíos a todo México. El costo y el tiempo de entrega dependen del destino y del volumen de su pedido.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Su asesor le confirmará las formas de pago disponibles al momento de cerrar su pedido.",
  },
  {
    q: "¿Puedo visitar la bodega antes de comprar?",
    a: `Con gusto. Estamos en ${site.address.street}, ${site.address.neighborhood}, CDMX. Horario: ${site.hours.label.toLowerCase()}.`,
  },
  {
    q: "¿Cuándo me conviene surtir cada temporada?",
    a: "Le recomendamos comprar antes de la fecha indicada en nuestro calendario de temporadas, para llegar surtido al pico de venta.",
  },
];

export default function DistributorsPage() {
  const featured = featuredSeason(new Date());

  return (
    <>
      {/* A · Atención */}
      <PageHero
        eyebrow="Programa de distribuidores"
        title={
          <>
            Su negocio merece <span className="gold-text">precio de mayoreo</span>
          </>
        }
        lead="Compre directamente a la comercializadora, con surtido por temporada, asesoría personalizada y envíos a todo México."
        image={photos.paraguasBodega1}
      >
        <WhatsAppButton message={MESSAGE} size="lg" label="Quiero ser distribuidor" />
        <Button href="/cotizador" variant="outline" size="lg">
          Cotizador de mayoreo
        </Button>
      </PageHero>

      {/* I · Interés */}
      <section id="como-comprar" className="scroll-mt-24 py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Cómo comprar"
            title={
              <>
                Cuatro pasos para <span className="gold-text">surtir su negocio</span>
              </>
            }
            intro="Sin trámites complicados. Todo el proceso se atiende por WhatsApp o en nuestra bodega."
          />
          <ol className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ I, t, d }, i) => (
              <li
                key={t}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                className="relative rounded-3xl border border-cream/10 bg-ink-2 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-gold text-ink">
                    <I className="size-5" />
                  </span>
                  <span className="display text-5xl text-gold/25">0{i + 1}</span>
                </div>
                <h3 className="display mt-6 text-3xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {[
              { I: Handshake, t: "Asesoría sin costo", d: "Le orientamos para elegir el producto con mejor rotación en su zona." },
              { I: Warehouse, t: "Bodega en el Centro", d: "Mercancía disponible para revisar y recoger en persona." },
              { I: Truck, t: "Envíos nacionales", d: "Su pedido llega a cualquier estado de la República." },
            ].map(({ I, t, d }) => (
              <div key={t} className="flex gap-4 rounded-3xl border border-cream/10 p-6" data-reveal>
                <I className="size-7 shrink-0 text-gold" />
                <div>
                  <h3 className="font-extrabold">{t}</h3>
                  <p className="mt-1 text-sm text-cream/65">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* D · Deseo */}
      <section className="border-t border-cream/10 bg-ink-2/60 py-24 sm:py-32">
        <Container>
          <div data-reveal>
            <ProfitCalculator
              product={featured.name.toLowerCase()}
              defaultCost={featured.calc.cost}
              defaultPrice={featured.calc.price}
              message={MESSAGE}
            />
          </div>

          <div className="mt-24">
            <SectionHeading eyebrow="Testimonios" title="Distribuidores que crecen con nosotros" />
            <div className="mt-10">
              <Rail label="Testimonios" slideClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3" autoplay delay={5500}>
                {sampleTestimonials.map((t) => (
                  <TestimonialCard key={t.name} t={t} />
                ))}
              </Rail>
            </div>
          </div>

          <div className="mt-24 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos sus dudas" />
              <div className="mt-6">
                <Pending>Respuestas por confirmar con el cliente</Pending>
              </div>
            </div>
            <div className="divide-y divide-cream/10 border-y border-cream/10 lg:col-span-8">
              {faqs.map((f) => (
                <details key={f.q} className="group py-2" data-reveal>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold marker:hidden [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 pr-10 leading-relaxed text-cream/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <SectionHeading eyebrow="Temporadas" title="Elija por dónde empezar" />
            <div className="mt-10">
              <Rail label="Temporadas" slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3">
                {seasons.map((s) => (
                  <SeasonCard key={s.slug} season={s} featured={s.slug === featured.slug} />
                ))}
              </Rail>
            </div>
          </div>
        </Container>
      </section>

      {/* A · Acción */}
      <CtaBand
        eyebrow="Empiece hoy"
        title={
          <>
            Su primer pedido está <span className="gold-text">a un mensaje</span>
          </>
        }
        text="Escríbanos y reciba catálogo, precios de mayoreo y opciones de envío para su ciudad."
        image={photos.lucesMuroNeon}
        message={MESSAGE}
      />
    </>
  );
}
