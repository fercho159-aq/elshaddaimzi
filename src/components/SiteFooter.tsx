import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "./icons";
import { brand } from "@/lib/images";
import { seasons } from "@/lib/seasons";
import { site } from "@/lib/site";
import { formatPhone, phoneHref, whatsappUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden border-t border-gold/20 bg-ink-2 print:hidden">
      <Image
        src={brand.logoDoradoLeon}
        alt=""
        className="pointer-events-none absolute -right-20 -top-10 h-[120%] w-auto opacity-[0.04]"
        sizes="800px"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src={brand.logoDorado} alt="El Shaddai MZI Comercializadora" className="h-36 w-auto" sizes="160px" />
            <p className="voice mt-6 max-w-sm text-2xl leading-snug text-cream/85">
              Surtimos a quienes venden, temporada tras temporada, desde {site.foundedYear}.
            </p>
            <div className="mt-6 flex gap-3">
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
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Temporadas" className="lg:col-span-3">
            <p className="eyebrow">Temporadas</p>
            <ul className="mt-5 space-y-3">
              {seasons.map((s) => (
                <li key={s.slug}>
                  <Link href={`/temporadas/${s.slug}`} className="group flex items-baseline justify-between gap-3 text-cream/80 hover:text-gold">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-xs text-cream/45 group-hover:text-gold/70">{s.months}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa" className="lg:col-span-2">
            <p className="eyebrow">Empresa</p>
            <ul className="mt-5 space-y-3 text-cream/80">
              <li><Link href="/cotizador" className="font-semibold hover:text-gold">Cotizador de mayoreo</Link></li>
              <li><Link href="/distribuidores" className="font-semibold hover:text-gold">Distribuidores</Link></li>
              <li><Link href="/nosotros" className="font-semibold hover:text-gold">Nosotros</Link></li>
              <li><Link href="/contacto" className="font-semibold hover:text-gold">Contacto</Link></li>
              <li>
                <a href={site.catalogUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold hover:text-gold">
                  Catálogo <ArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li>
                <a href={site.storeUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold hover:text-gold">
                  Tienda en línea <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            </ul>
          </nav>

          <address className="not-italic lg:col-span-3">
            <p className="eyebrow">Visítenos</p>
            <ul className="mt-5 space-y-4 text-sm text-cream/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={site.address.mapsUrl} target="_blank" rel="noopener" className="hover:text-gold">
                  {site.address.street}, {site.address.neighborhood}, {site.address.city}, C.P. {site.address.postalCode}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.hours.label}
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="hover:text-gold">
                  {formatPhone(site.whatsapp)}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={phoneHref} className="hover:text-gold">
                  {formatPhone(site.phone)}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="gold-rule mt-16" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p>Precios y disponibilidad sujetos a cambio sin previo aviso.</p>
        </div>
      </div>
    </footer>
  );
}
