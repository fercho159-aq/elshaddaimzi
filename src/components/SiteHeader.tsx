"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { SeasonCalendar } from "./SeasonCalendar";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";
import { mainNav, messageForPath } from "@/lib/nav";
import { seasons } from "@/lib/seasons";
import { site } from "@/lib/site";
import { phoneHref, whatsappUrl } from "@/lib/whatsapp";
import { useBusinessStatus, useNow, useScrolledPast } from "@/lib/hooks";

const announcements = [
  "Precios de mayoreo",
  "Envíos a todo México",
  `Desde ${site.foundedYear}`,
  "Surtido por temporada",
  site.hours.label,
  "Centro Histórico · CDMX",
];

function StatusPill({ className = "" }: { className?: string }) {
  const status = useBusinessStatus();
  if (!status) return <span className={`h-6 w-28 ${className}`} aria-hidden="true" />;
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold ${className}`}>
      <span className="relative flex size-2">
        {status.open && <span className="absolute inset-0 animate-ping-slow rounded-full bg-wa" />}
        <span className={`relative size-2 rounded-full ${status.open ? "bg-wa" : "bg-gold"}`} />
      </span>
      {status.open ? "Abierto ahora" : "Fuera de horario"}
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(24);
  const now = useNow();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [seasonsOpen, setSeasonsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAt = useRef(0);
  const megaId = useId();
  const drawerId = useId();

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!megaOpen) hoverOpenedAt.current = Date.now();
    setMegaOpen(true);
  };
  // Un clic justo después de abrir con hover no debe cerrar el panel.
  const toggleMega = () => {
    if (megaOpen && Date.now() - hoverOpenedAt.current < 600) return;
    setMegaOpen((v) => !v);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || megaOpen;
  const waHref = whatsappUrl(messageForPath(pathname));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 print:hidden">
        {/* Barra de anuncios */}
        <div
          className={`overflow-hidden bg-gold text-ink transition-[max-height] duration-500 ${
            scrolled ? "max-h-0" : "max-h-8"
          }`}
        >
          <div className="flex h-8 w-max animate-marquee items-center [--marquee-duration:45s]">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                {announcements.map((a) => (
                  <span key={a} className="flex items-center gap-6 px-3 text-[0.7rem] font-extrabold uppercase tracking-[0.2em]">
                    {a}
                    <span className="size-1 rounded-full bg-ink/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Barra principal */}
        <div
          className={`relative transition-colors duration-500 ${
            solid
              ? "border-b border-cream/10 bg-ink/90 backdrop-blur-xl"
              : "border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent"
          }`}
          onMouseLeave={scheduleCloseMega}
        >
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[84px] lg:px-10">
            <Link href="/" onClick={closeAll} aria-label="El Shaddai MZI · Inicio" className="h-11 lg:h-[52px]">
              <Logo className="h-full" />
            </Link>

            {/* Navegación escritorio */}
            <nav aria-label="Principal" className="hidden h-full items-center gap-1 lg:flex">
              {mainNav.filter((item) => !("mobileOnly" in item)).map((item) =>
                "mega" in item ? (
                  <div key={item.href} className="flex h-full items-center" onMouseEnter={openMega}>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      onClick={toggleMega}
                      className={`relative flex items-center gap-1 px-4 py-2 text-sm font-bold tracking-wide transition-colors hover:text-gold ${
                        isActive(item.href) || megaOpen ? "text-gold" : "text-cream"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`size-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    onMouseEnter={scheduleCloseMega}
                    target={"externa" in item ? "_blank" : undefined}
                    rel={"externa" in item ? "noopener" : undefined}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-colors hover:text-gold ${
                      isActive(item.href) ? "text-gold" : "text-cream"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" />}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden xl:block">
                <StatusPill className="text-cream/80" />
              </span>
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="hidden h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-extrabold text-ink transition-colors hover:bg-gold-light sm:inline-flex"
              >
                <WhatsAppIcon className="size-4" />
                Cotizar mayoreo
              </a>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-expanded={drawerOpen}
                aria-controls={drawerId}
                aria-label="Abrir menú"
                className="grid size-11 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>

          {/* Mega menú */}
          <div
            id={megaId}
            onMouseEnter={openMega}
            className={`absolute inset-x-0 top-full hidden origin-top border-b border-gold/20 bg-ink-2 shadow-2xl shadow-black/50 transition-all duration-500 ease-[var(--ease-out-expo)] lg:block ${
              megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
            }`}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-10 py-10">
              <div className="col-span-4 flex flex-col">
                <p className="eyebrow">Calendario del revendedor</p>
                <p className="display mt-3 text-4xl">
                  Venda lo que <span className="gold-text">la temporada</span> pide
                </p>
                <div className="mt-6 rounded-2xl border border-cream/10 bg-ink/60 p-4">
                  <SeasonCalendar compact currentMonth={now ? now.getMonth() + 1 : null} onNavigate={closeAll} />
                </div>
                <div className="mt-auto flex items-center gap-5 pt-6">
                  <Link
                    href="/temporadas"
                    onClick={closeAll}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:text-gold-light"
                  >
                    Ver todas las temporadas <ArrowUpRight className="size-4" />
                  </Link>
                  <a
                    href="/tienda"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-cream/70 hover:text-cream"
                  >
                    Tienda en línea <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
              <ul className="col-span-8 grid grid-cols-4 gap-4">
                {seasons.map((s, i) => (
                  <li
                    key={s.slug}
                    style={{ transitionDelay: megaOpen ? `${80 + i * 60}ms` : "0ms" }}
                    className={`transition-all duration-500 ${megaOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  >
                    <Link
                      href={`/temporadas/${s.slug}`}
                      onClick={closeAll}
                      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink"
                    >
                      <Image
                        src={s.cover.src}
                        alt={s.cover.alt}
                        fill
                        sizes="240px"
                        placeholder="blur"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 p-4">
                        <span className="eyebrow block text-[0.6rem]">{s.occasion}</span>
                        <span className="display mt-1 block text-2xl leading-none">{s.name}</span>
                        <span className="mt-2 block text-xs text-cream/70">{s.months}</span>
                      </span>
                      <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-gold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-cream/10">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-4 text-sm">
                <p className="text-cream/70">
                  <span className="voice text-lg text-gold">¿Primera compra de mayoreo?</span> Le orientamos para elegir el
                  producto con mejor rotación.
                </p>
                <Link href="/distribuidores" onClick={closeAll} className="font-bold text-gold hover:text-gold-light">
                  Cómo comprar →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Panel vertical (celular y tableta) */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${drawerOpen ? "visible" : "invisible delay-500"}`}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Cerrar menú"
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-500 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          id={drawerId}
          aria-label="Menú"
          className={`grain absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-2 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-cream/10 px-4 sm:px-6">
            <Link href="/" onClick={closeAll} className="h-11" aria-label="Inicio">
              <Logo className="h-full" />
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Cerrar menú"
              className="grid size-11 place-items-center rounded-full border border-cream/20 text-cream hover:border-gold hover:text-gold"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6">
            <ul className="space-y-1">
              {mainNav.map((item, i) => (
                <li
                  key={item.href}
                  style={{ transitionDelay: drawerOpen ? `${150 + i * 60}ms` : "0ms" }}
                  className={`border-b border-cream/10 transition-all duration-500 ${
                    drawerOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                >
                  {"mega" in item ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setSeasonsOpen((v) => !v)}
                        aria-expanded={seasonsOpen}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-gold">0{i + 1}</span>
                          <span className={`display text-4xl ${isActive(item.href) ? "text-gold" : ""}`}>{item.label}</span>
                        </span>
                        <ChevronDown className={`size-6 text-gold transition-transform duration-300 ${seasonsOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ${
                          seasonsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <ul className="overflow-hidden">
                          {seasons.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/temporadas/${s.slug}`}
                                onClick={closeAll}
                                className="group flex items-center gap-4 py-2.5 pl-8"
                              >
                                <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-ink">
                                  <Image src={s.cover.src} alt="" fill sizes="56px" className="object-cover" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block font-bold text-cream group-hover:text-gold">{s.name}</span>
                                  <span className="block text-xs text-cream/60">
                                    {s.occasion} · {s.months}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                          <li className="pb-4 pl-8 pt-2">
                            <Link href="/temporadas" onClick={closeAll} className="text-sm font-bold text-gold">
                              Ver calendario completo →
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      target={"externa" in item ? "_blank" : undefined}
                      rel={"externa" in item ? "noopener" : undefined}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="font-mono text-xs text-gold">0{i + 1}</span>
                      <span className={`display text-4xl ${isActive(item.href) ? "text-gold" : ""}`}>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-cream/10 bg-ink/50 p-5">
              <StatusPill className="text-cream" />
              <p className="mt-2 text-sm text-cream/70">{site.hours.label}</p>
              <p className="mt-1 text-sm text-cream/70">
                {site.address.street}, {site.address.neighborhood}, CDMX
              </p>
              <div className="mt-4 flex gap-3">
                {[
                  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
                  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
                  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-[1fr_auto] gap-3 border-t border-cream/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            <a
              href={waHref}
              target="_blank"
              rel="noopener"
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-wa font-extrabold text-ink"
            >
              <WhatsAppIcon className="size-5" /> Cotizar por WhatsApp
            </a>
            <a
              href={phoneHref}
              aria-label="Llamar por teléfono"
              className="grid size-14 place-items-center rounded-full border border-cream/20 text-cream"
            >
              <Phone className="size-5" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
