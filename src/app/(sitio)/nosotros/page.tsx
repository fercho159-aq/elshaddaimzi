import type { Metadata } from "next";
import Image from "next/image";
import { Eye, HeartHandshake, Lightbulb, Sparkles, Target, Umbrella } from "lucide-react";
import { Reels } from "@/components/carousels/Reels";
import { CtaBand } from "@/components/CtaBand";
import { YouTubeLite } from "@/components/YouTubeLite";
import { Gallery, PageHero } from "@/components/blocks";
import { Button, Container, SectionHeading, WhatsAppButton } from "@/components/ui";
import { brand, photos } from "@/lib/images";
import { seasons } from "@/lib/seasons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros · Comercializadora desde 2011",
  description:
    "Desde 2011, El Shaddai MZI ofrece paraguas, luces navideñas, juguetes y mochilas al mayoreo desde el Centro de la Ciudad de México.",
  alternates: { canonical: "/nosotros" },
};

export default function AboutPage() {
  const years = new Date().getFullYear() - site.foundedYear;
  return (
    <>
      {/* A · Atención */}
      <PageHero
        eyebrow={`Nosotros · Desde ${site.foundedYear}`}
        title={
          <>
            Iluminamos y protegemos <span className="gold-text">sus momentos</span>
          </>
        }
        lead="Somos una comercializadora mexicana dedicada a surtir a comerciantes y familias con productos de temporada de calidad, a precios que hacen crecer su negocio."
        image={photos.fachadaNavidad}
      >
        <WhatsAppButton size="lg" label="Hablar con un asesor" />
      </PageHero>

      {/* I · Interés */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="relative lg:col-span-5" data-reveal>
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(214,146,15,0.35),transparent_65%)]" />
              <Image src={brand.logoDorado} alt="Logotipo de El Shaddai MZI" className="relative mx-auto h-full w-auto p-6" sizes="420px" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Nuestra historia"
              title={
                <>
                  Más de {years} años <span className="gold-text">en el corazón del Centro</span>
                </>
              }
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/75" data-reveal>
              <p>
                En El Shaddai MZI nos apasiona iluminar y proteger los momentos especiales de las familias mexicanas. Desde{" "}
                {site.foundedYear} ofrecemos paraguas y luces navideñas de alta calidad, además de juguetes y mochilas escolares, para
                acompañar a nuestros clientes durante todo el año.
              </p>
              <p>
                Nuestro equipo está disponible para ayudarle a encontrar el producto adecuado para su negocio, con
                atención personalizada en bodega y por WhatsApp.
              </p>
            </div>
          </div>
        </Container>

        <Container className="mt-24">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="relative overflow-hidden rounded-[2rem] border border-cream/10 bg-ink-2 p-8 sm:p-10" data-reveal>
              <Target className="size-8 text-gold" />
              <h2 className="display mt-5 text-5xl">Misión</h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/75">
                Proporcionar productos de alta calidad, innovadores y accesibles, que hagan que cada celebración y el día a
                día de nuestros clientes sean especiales y memorables, con un compromiso con el desarrollo local.
              </p>
            </article>
            <article
              className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gold p-8 text-ink sm:p-10"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <Eye className="size-8" />
              <h2 className="display mt-5 text-5xl">Visión</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">
                Ser la comercializadora líder en México en productos de temporada, reconocida por su creatividad, atención
                al cliente y responsabilidad social, llevando alegría y celebración a cada hogar mexicano.
              </p>
            </article>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { I: Sparkles, t: "Calidad", d: "Producto revisado y seleccionado para cada temporada." },
              { I: HeartHandshake, t: "Trato cercano", d: "Atención personalizada en bodega y por WhatsApp." },
              { I: Lightbulb, t: "Innovación", d: "Novedades cada año en luces, figuras y diseños." },
              { I: Umbrella, t: "Compromiso", d: "Precios justos para que su negocio crezca." },
            ].map(({ I, t, d }, i) => (
              <li
                key={t}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="rounded-3xl border border-cream/10 bg-ink-2 p-6"
              >
                <I className="size-6 text-gold" />
                <h3 className="mt-4 text-lg font-extrabold">{t}</h3>
                <p className="mt-2 text-sm text-cream/65">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* D · Deseo */}
      <section className="border-t border-cream/10 bg-ink-2/60 py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Conózcanos"
                title="Una bodega hecha para comerciantes"
                intro="Visítenos en Plaza del Estudiante, en el Centro Histórico, o recorra nuestra mercancía desde su celular."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
                <Button href="/contacto">Cómo llegar</Button>
                <Button href={site.social.tiktok} variant="outline">
                  Ver más videos
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <YouTubeLite id="VABPbsD6kJE" title="Conozca El Shaddai MZI" />
            </div>
          </div>

          <div className="mt-24">
            <Reels clips={seasons.flatMap((s) => s.clips)} />
          </div>

          <div className="mt-24">
            <Gallery
              items={[
                photos.fachadaNavidad,
                photos.paraguasPasillo,
                photos.lucesTienda,
                photos.paraguasBodega5,
                photos.lucesEsferas,
                photos.paraguasBodega4,
              ]}
            />
          </div>
        </Container>
      </section>

      {/* A · Acción */}
      <CtaBand
        eyebrow="Trabajemos juntos"
        title={
          <>
            Sea parte de la <span className="gold-text">familia El Shaddai</span>
          </>
        }
        text="Hacemos envíos a todo México con precios preferenciales para distribuidores, para que usted obtenga un mejor margen de ganancia."
        image={photos.lucesPrecios}
        message="Buen día, me interesa ser distribuidor de El Shaddai."
      />
    </>
  );
}
