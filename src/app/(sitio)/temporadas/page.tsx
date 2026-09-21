import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { SeasonCalendar } from "@/components/SeasonCalendar";
import { PageHero, SeasonCard, stockLabel } from "@/components/blocks";
import { Button, Container, SectionHeading, WhatsAppButton } from "@/components/ui";
import { photos } from "@/lib/images";
import { featuredSeason, isInSeason, seasonDeadline, seasonsByRelevance } from "@/lib/seasons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Temporadas de venta al mayoreo",
  description:
    "Calendario de temporadas: luces navideñas, juguetes para Día de Reyes, paraguas para lluvias y mochilas para regreso a clases, al mayoreo en CDMX.",
  alternates: { canonical: "/temporadas" },
};

export default function SeasonsPage() {
  const now = new Date();
  const featured = featuredSeason(now);
  const ordered = seasonsByRelevance(now);
  const plazo = seasonDeadline(featured, now);

  return (
    <>
      <PageHero
        eyebrow="Calendario del revendedor"
        title={
          <>
            Cuatro temporadas, <span className="gold-text">cuatro oportunidades</span> de venta
          </>
        }
        lead="Cada época del año tiene un producto que la gente necesita comprar. Le ayudamos a tenerlo en su punto de venta antes que nadie."
        image={photos.lucesMuroNeon}
        countdownTo={plazo.date.toISOString()}
        countdownLabel={`${plazo.enVenta ? "En venta ahora" : "Siguiente temporada"}: ${featured.name} · ${plazo.label}`}
      >
        <WhatsAppButton message={featured.whatsappMessage} size="lg" label="Cotizar temporada actual" />
        <Button href="/tienda" variant="outline" size="lg" external>
          Tienda en línea
        </Button>
      </PageHero>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Planee su año"
            title={
              <>
                Qué surtir <span className="gold-text">en cada mes</span>
              </>
            }
            intro="Las barras doradas muestran los meses de venta; el punto indica la fecha recomendada para surtir antes del pico de demanda."
          />
          <div className="mt-12 rounded-[2rem] border border-cream/10 bg-ink-2 p-5 sm:p-10" data-reveal>
            <SeasonCalendar currentMonth={now.getMonth() + 1} />
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            {ordered.map((s, i) => (
              <div key={s.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 120}ms` }}>
                <SeasonCard season={s} index={i} featured={s.slug === featured.slug} />
                <p className="mt-3 px-1 text-sm text-cream/60">
                  {isInSeason(s, now) ? "En venta ahora" : stockLabel(s)} · {s.hours}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Asesoría sin costo"
        title={
          <>
            ¿No sabe con qué <span className="gold-text">temporada empezar?</span>
          </>
        }
        text="Cuéntenos dónde vende y cuánto desea invertir. Le recomendaremos el producto con mejor rotación para su negocio."
        image={photos.paraguasMuro}
        message="Buen día, deseo asesoría para elegir con qué temporada empezar a vender."
      />
    </>
  );
}
