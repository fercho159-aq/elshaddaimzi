import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Rail } from "@/components/carousels/Rail";
import { Reels } from "@/components/carousels/Reels";
import { CtaBand } from "@/components/CtaBand";
import { Marquee } from "@/components/Marquee";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { YouTubeLite } from "@/components/YouTubeLite";
import { Gallery, PageHero, SeasonCard, TestimonialCard, sampleTestimonials } from "@/components/blocks";
import { Button, Container, SectionHeading, WhatsAppButton } from "@/components/ui";
import { getSeason, seasonDeadline, seasons } from "@/lib/seasons";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return seasons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/temporadas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSeason(slug);
  if (!s) return {};
  return {
    title: `${s.name} al mayoreo · ${s.occasion}`,
    description: `${s.lead} Temporada ${s.months}. Envíos a todo México.`,
    alternates: { canonical: `/temporadas/${s.slug}` },
    openGraph: { images: [{ url: s.hero.src.src, width: s.hero.src.width, height: s.hero.src.height }] },
  };
}

export default async function SeasonPage({ params }: PageProps<"/temporadas/[slug]">) {
  const { slug } = await params;
  const season = getSeason(slug);
  if (!season) notFound();

  const now = new Date();
  const plazo = seasonDeadline(season, now);
  const others = seasons.filter((s) => s.slug !== season.slug);
  const testimonials = [
    ...sampleTestimonials.filter((t) => season.name.toLowerCase().includes(t.season.toLowerCase().split(" ")[0])),
    ...sampleTestimonials.filter((t) => !season.name.toLowerCase().includes(t.season.toLowerCase().split(" ")[0])),
  ];

  return (
    <>
      {/* A · Atención */}
      <PageHero
        eyebrow={`${season.occasion} · ${season.months}`}
        title={season.headline}
        lead={season.lead}
        image={season.hero}
        product={season.cutout}
        countdownTo={plazo.date.toISOString()}
        countdownLabel={plazo.enVenta ? `En venta ahora · ${plazo.label}` : `${plazo.label} · tiempo restante`}
      >
        <WhatsAppButton message={season.whatsappMessage} size="lg" label="Solicitar cotización" />
        {season.storeUrl ? (
          <Button href={`/tienda?temporada=${season.slug}`} variant="outline" size="lg" external>
            Comprar en línea
          </Button>
        ) : (
          <Button href="/distribuidores" variant="outline" size="lg">
            Cómo comprar
          </Button>
        )}
      </PageHero>

      <div className="border-y border-gold/30 bg-gold py-4 text-ink">
        <Marquee items={season.categories.map((c) => c.title)} duration={30} />
      </div>

      {/* I · Interés */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="¿Por qué vender en esta temporada?"
            title={
              <>
                {season.name}: <span className="gold-text">demanda que se repite</span> cada año
              </>
            }
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {season.reasons.map((r, i) => (
              <article
                key={r.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                className="rounded-3xl border border-cream/10 bg-ink-2 p-7"
              >
                <span className="display text-6xl text-gold/30">0{i + 1}</span>
                <h3 className="display mt-4 text-3xl">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/70">{r.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-24">
            <SectionHeading eyebrow="Lo que encontrará" title="Surtido completo para su punto de venta" />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {season.categories.map((c, i) => {
                const photo = season.productShots[i % season.productShots.length];
                return (
                  <article
                    key={c.title}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                    className="group overflow-hidden rounded-3xl bg-cream text-ink"
                  >
                    <div className={`relative aspect-square overflow-hidden ${season.cutout ? "bg-white" : "bg-ink"}`}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        placeholder="blur"
                        className={`transition-transform duration-700 group-hover:scale-105 ${
                          season.cutout ? "object-contain p-6" : "object-cover"
                        }`}
                      />
                    </div>
                    <div className="border-t-2 border-dashed border-ink/15 p-4 sm:p-5">
                      <h3 className="display text-xl sm:text-2xl">{c.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink/65 sm:text-sm">{c.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* D · Deseo */}
      <section className="border-t border-cream/10 bg-ink-2/60 py-24 sm:py-32">
        <Container>
          <div data-reveal>
            <ProfitCalculator
              product={season.name.toLowerCase()}
              defaultCost={season.calc.cost}
              defaultPrice={season.calc.price}
              message={season.whatsappMessage}
            />
          </div>
          {season.storeUrl && (
            <p className="mt-6 text-center text-sm text-cream/70" data-reveal>
              ¿Ya sabe qué quiere comprar?{" "}
              <a href={`/tienda?temporada=${season.slug}`} target="_blank" rel="noopener" className="font-bold text-gold hover:text-gold-light">
                Compre en nuestra tienda en línea →
              </a>
            </p>
          )}

          <div className="mt-24">
            <SectionHeading eyebrow="Galería" title="Así luce la mercancía" intro="Fotografías de nuestra bodega y producto de temporada." />
            <div className="mt-10">
              <Gallery items={season.gallery} product={season.cutout} />
            </div>
          </div>

          {season.clips.length > 0 && (
            <div className="mt-24">
              <SectionHeading eyebrow="En video" title="Recorra la temporada" />
              <div className="mt-10">
                <Reels clips={season.clips} label={`Videos de ${season.name}`} />
              </div>
            </div>
          )}

          {season.youtubeId && (
            <div className="mx-auto mt-24 max-w-4xl" data-reveal>
              <YouTubeLite id={season.youtubeId} title={`Más sobre la temporada de ${season.name.toLowerCase()}`} />
            </div>
          )}

          <div className="mt-24">
            <SectionHeading eyebrow="Testimonios" title="Comerciantes que ya surten con nosotros" />
            <div className="mt-10">
              <Rail label="Testimonios" slideClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.name} t={t} />
                ))}
              </Rail>
            </div>
          </div>
        </Container>
      </section>

      {/* A · Acción */}
      <CtaBand
        eyebrow={`${season.occasion} · ${season.hours}`}
        title={
          <>
            Aparte hoy su pedido de <span className="gold-text">{season.name.toLowerCase()}</span>
          </>
        }
        text="Un asesor le confirmará existencias, precios de mayoreo y tiempo de envío a su ciudad. Los modelos de mayor demanda se agotan primero."
        image={season.cutout ? seasons[0].hero : season.hero}
        message={season.whatsappMessage}
        countdownTo={plazo.date.toISOString()}
        countdownLabel={plazo.label}
      />

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Siguientes temporadas" title="Planee todo su año" />
          <div className="mt-10">
            <Rail label="Otras temporadas" slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3">
              {others.map((s) => (
                <SeasonCard key={s.slug} season={s} />
              ))}
            </Rail>
          </div>
        </Container>
      </section>
    </>
  );
}
