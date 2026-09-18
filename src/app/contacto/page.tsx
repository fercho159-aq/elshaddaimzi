import type { Metadata } from "next";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { PageHero } from "@/components/blocks";
import { Button, Container, WhatsAppButton } from "@/components/ui";
import { photos } from "@/lib/images";
import { site } from "@/lib/site";
import { formatPhone, phoneHref, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto · Bodega en el Centro de la CDMX",
  description: `Visítenos en ${site.address.street}, ${site.address.neighborhood}, CDMX, o cotice por WhatsApp. ${site.hours.label}.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const cards = [
    {
      I: WhatsAppIcon,
      t: "WhatsApp de ventas",
      v: formatPhone(site.whatsapp),
      href: whatsappUrl("Buen día, deseo recibir atención de un asesor de ventas."),
      cta: "Enviar mensaje",
    },
    { I: Phone, t: "Teléfono", v: formatPhone(site.phone), href: phoneHref, cta: "Llamar ahora" },
    {
      I: MapPin,
      t: "Bodega",
      v: `${site.address.street}, ${site.address.neighborhood}, ${site.address.city}`,
      href: site.address.mapsUrl,
      cta: "Abrir en Google Maps",
    },
    { I: Clock, t: "Horario", v: site.hours.label, href: undefined, cta: undefined },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Estamos para <span className="gold-text">atenderle</span>
          </>
        }
        lead="Cotice por WhatsApp, llámenos o visítenos en nuestra bodega del Centro Histórico. Le atendemos de manera personalizada."
        image={photos.lucesCalle}
      >
        <WhatsAppButton message="Buen día, deseo recibir atención de un asesor de ventas." size="lg" label="Escribir por WhatsApp" />
        <Button href={phoneHref} variant="outline" size="lg">
          Llamar
        </Button>
      </PageHero>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ I, t, v, href, cta }, i) => (
              <article
                key={t}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="flex flex-col rounded-3xl border border-cream/10 bg-ink-2 p-6"
              >
                <span className="grid size-12 place-items-center rounded-full bg-gold/10 text-gold">
                  <I className="size-5" />
                </span>
                <h2 className="mt-5 text-xs font-bold uppercase tracking-widest text-cream/55">{t}</h2>
                <p className="mt-2 flex-1 text-lg font-bold leading-snug">{v}</p>
                {href && cta && (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:text-gold-light"
                  >
                    {cta} <ArrowUpRight className="size-4" />
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="overflow-hidden rounded-[2rem] border border-cream/10 lg:col-span-8" data-reveal>
              <iframe
                src={site.address.mapsEmbed}
                title="Ubicación de El Shaddai MZI en Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full grayscale-[0.6] invert-[0.9] hue-rotate-180 sm:h-[520px]"
              />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4">
              <div className="flex-1 rounded-[2rem] bg-gold p-8 text-ink" data-reveal>
                <p className="text-xs font-extrabold uppercase tracking-[0.25em]">Cómo llegar</p>
                <p className="display mt-3 text-4xl">Plaza del Estudiante, Centro Histórico</p>
                <p className="mt-3 text-sm text-ink/75">
                  {site.address.street}, {site.address.neighborhood}, {site.address.city}, C.P. {site.address.postalCode}.
                </p>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-extrabold text-cream"
                >
                  Obtener indicaciones <ArrowUpRight className="size-4" />
                </a>
              </div>
              <div className="rounded-[2rem] border border-cream/10 bg-ink-2 p-8" data-reveal>
                <p className="eyebrow">Síganos</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
                    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
                    { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
                    { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-cream/15 px-4 text-sm font-bold hover:border-gold hover:text-gold"
                    >
                      <Icon className="size-4" /> {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
