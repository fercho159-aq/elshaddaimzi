"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Minus, Package, Plus, Printer, Search, Trash2, TrendingDown, X } from "lucide-react";
import { WhatsAppIcon } from "../icons";
import { demo, mxn, priceFor, totalStock, useDemoDB } from "@/lib/demo/store";
import { TIER_LABELS, type Product, type SeasonSlug } from "@/lib/demo/types";
import { seasons } from "@/lib/seasons";

const CART_KEY = "elshaddai-cotizacion";

type Cart = Record<string, number>;

function loadCart(): Cart {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}") as Cart;
  } catch {
    return {};
  }
}

function Stepper({ value, onChange, step = 1, label }: { value: number; onChange: (v: number) => void; step?: number; label: string }) {
  return (
    <div className="flex h-11 items-center overflow-hidden rounded-full border border-cream/20 bg-ink">
      <button
        type="button"
        aria-label={`Quitar ${step} de ${label}`}
        onClick={() => onChange(Math.max(0, value - step))}
        className="grid h-full w-11 place-items-center text-cream/80 hover:bg-cream/10 disabled:opacity-30"
        disabled={value === 0}
      >
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        onFocus={(e) => e.currentTarget.select()}
        min={0}
        aria-label={`Piezas de ${label}`}
        value={value || ""}
        placeholder="0"
        onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
        className="h-full w-16 bg-transparent text-center font-bold tabular-nums text-cream outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label={`Agregar ${step} de ${label}`}
        onClick={() => onChange(value + step)}
        className="grid h-full w-11 place-items-center text-cream/80 hover:bg-cream/10"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function ProductRow({ p, qty, setQty }: { p: Product; qty: number; setQty: (v: number) => void }) {
  const { tierIndex, unit } = priceFor(p, qty);
  const next = p.tiers[tierIndex + 1];
  const stock = totalStock(p);
  const missing = next ? next.min - qty : 0;
  const saveNext = next ? (unit - next.price) * next.min : 0;

  return (
    <article className="cz-producto grid gap-4 rounded-3xl border border-cream/10 bg-ink-2 p-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:p-5">
      <div className="flex gap-4 sm:block">
        <div className={`relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28 ${p.cutout ? "bg-white" : "bg-ink"}`}>
          <Image src={p.image} alt={p.name} fill sizes="112px" className={p.cutout ? "object-contain p-2" : "object-cover"} />
        </div>
        <div className="min-w-0 sm:hidden">
          <h3 className="font-extrabold leading-tight">{p.name}</h3>
          <p className="mt-1 text-xs text-cream/55">
            {p.size} · {p.sku}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <div className="hidden items-start justify-between gap-4 sm:flex">
          <div>
            <h3 className="text-lg font-extrabold leading-tight">{p.name}</h3>
            <p className="mt-1 text-xs text-cream/55">
              {p.size} · SKU {p.sku} · Caja de {p.piecesPerBox} pzas
            </p>
          </div>
          <p className={`shrink-0 text-xs font-bold ${stock === 0 ? "text-red-400" : stock <= 10 ? "text-gold" : "text-cream/50"}`}>
            {stock === 0 ? "Agotado" : `${stock.toLocaleString("es-MX")} disponibles`}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5" role="list" aria-label="Precios por volumen">
          {p.tiers.map((t, i) => (
            <div
              key={i}
              role="listitem"
              className={`rounded-xl border px-2.5 py-2 transition-colors ${
                qty > 0 && i === tierIndex ? "border-gold bg-gold/15" : "border-cream/10 bg-ink/60"
              }`}
            >
              <p className={`text-[0.6rem] font-extrabold uppercase tracking-widest ${qty > 0 && i === tierIndex ? "text-gold" : "text-cream/50"}`}>
                {TIER_LABELS[i]}
              </p>
              <p className="display mt-0.5 text-xl leading-none sm:text-2xl">{mxn.format(t.price)}</p>
              <p className="mt-0.5 text-[0.65rem] text-cream/50">desde {t.min} pza{t.min > 1 ? "s" : ""}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Stepper value={qty} onChange={setQty} label={p.name} />
          <button
            type="button"
            onClick={() => setQty(qty + p.piecesPerBox)}
            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-cream/15 px-4 text-xs font-bold text-cream/80 hover:border-gold hover:text-gold"
          >
            <Package className="size-4" /> +1 caja ({p.piecesPerBox})
          </button>
          {qty > 0 && (
            <p className="ml-auto text-right">
              <span className="block text-[0.65rem] uppercase tracking-widest text-cream/50">
                {qty} × {mxn.format(unit)}
              </span>
              <span className="display text-2xl text-gold">{mxn.format(qty * unit)}</span>
            </p>
          )}
        </div>

        {qty > 0 && next && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-wa/10 px-3 py-2 text-xs text-cream/85">
            <TrendingDown className="mt-0.5 size-4 shrink-0 text-wa" />
            <span>
              Agregue <b>{missing} pza{missing > 1 ? "s" : ""}</b> más y pague <b>{mxn.format(next.price)}</b> por pieza (
              {TIER_LABELS[tierIndex + 1].toLowerCase()}): ahorra <b>{mxn.format(saveNext)}</b>.
            </span>
          </p>
        )}
        {qty > 0 && qty > stock && (
          <p className="mt-2 text-xs text-gold">
            Hay {stock} piezas en bodega. Un asesor le confirmará la fecha de la siguiente llegada.
          </p>
        )}
      </div>
    </article>
  );
}

/** Cotizador de mayoreo: el precio por pieza baja según el volumen del pedido. */
export function Cotizador() {
  const db = useDemoDB();
  const [cart, setCart] = useState<Cart>({});
  const [season, setSeason] = useState<SeasonSlug | "todas">("todas");
  const [query, setQuery] = useState("");
  const [sheet, setSheet] = useState(false);
  const [customer, setCustomer] = useState({ name: "", city: "", phone: "" });
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setCart(loadCart());
      const q = new URLSearchParams(window.location.search).get("temporada");
      if (q && seasons.some((s) => s.slug === q)) setSeason(q as SeasonSlug);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const setQty = (id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c, [id]: qty };
      if (!qty) delete next[id];
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    setSent(null);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return db.products.filter(
      (p) =>
        p.published &&
        (season === "todas" || p.season === season) &&
        (!q || `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [db.products, season, query]);

  const lines = db.products
    .filter((p) => cart[p.id])
    .map((p) => {
      const qty = cart[p.id];
      const { unit, tierIndex } = priceFor(p, qty);
      return { p, qty, unit, tier: TIER_LABELS[tierIndex], list: p.tiers[0].price * qty };
    });
  const pieces = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.unit, 0);
  const listTotal = lines.reduce((s, l) => s + l.list, 0);
  const savings = listTotal - total;
  const minimum = db.settings.minimumOrder;
  const belowMin = total > 0 && total < minimum;

  const send = () => {
    const quote = demo.addQuote({
      customer: customer.name || "Cliente del sitio web",
      phone: customer.phone,
      city: customer.city,
      total,
      lines: lines.map((l) => ({ productId: l.p.id, name: l.p.name, sku: l.p.sku, qty: l.qty, unitPrice: l.unit, tier: l.tier })),
    });
    const text = [
      `Buen día, solicito la cotización ${quote.id}:`,
      ...lines.map((l) => `• ${l.qty} × ${l.p.name} (${l.p.sku}) a ${mxn.format(l.unit)} c/u = ${mxn.format(l.qty * l.unit)}`),
      `Total estimado: ${mxn.format(total)} (${pieces} piezas)`,
      customer.name && `Nombre / negocio: ${customer.name}`,
      customer.city && `Ciudad: ${customer.city}`,
    ]
      .filter(Boolean)
      .join("\n");
    setSent(quote.id);
    window.open(`https://wa.me/52${db.settings.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const summary = (
    <div className="cz-resumen flex h-full flex-col">
      <div className="flex items-center justify-between pr-12 lg:pr-0">
        <h2 className="display text-3xl">Su pedido</h2>
        {lines.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setCart({});
              try {
                localStorage.removeItem(CART_KEY);
              } catch {}
            }}
            className="text-xs font-bold text-cream/50 hover:text-cream print:hidden"
          >
            Vaciar
          </button>
        )}
      </div>

      {lines.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-cream/15 p-5 text-sm text-cream/60">
          Elija cantidades en los productos para ver su precio de mayoreo y el total estimado.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-cream/10">
          {lines.map((l) => (
            <li key={l.p.id} className="flex items-start gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{l.p.name}</p>
                <p className="text-xs text-cream/55">
                  {l.qty} × {mxn.format(l.unit)} · <span className="text-gold">{l.tier}</span>
                </p>
              </div>
              <p className="text-sm font-bold tabular-nums">{mxn.format(l.qty * l.unit)}</p>
              <button
                type="button"
                aria-label={`Quitar ${l.p.name}`}
                onClick={() => setQty(l.p.id, 0)}
                className="text-cream/40 hover:text-red-400 print:hidden"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 border-t border-cream/10 pt-4 text-sm">
        <div className="flex justify-between text-cream/65">
          <dt>Piezas</dt>
          <dd className="tabular-nums">{pieces.toLocaleString("es-MX")}</dd>
        </div>
        {savings > 0 && (
          <>
            <div className="flex justify-between text-cream/50">
              <dt>A precio de menudeo</dt>
              <dd className="tabular-nums line-through">{mxn.format(listTotal)}</dd>
            </div>
            <div className="flex justify-between font-bold text-wa">
              <dt>Su ahorro por volumen</dt>
              <dd className="tabular-nums">−{mxn.format(savings)}</dd>
            </div>
          </>
        )}
        <div className="flex items-end justify-between pt-2">
          <dt className="font-bold">Total estimado</dt>
          <dd className="display text-4xl text-gold tabular-nums">{mxn.format(total)}</dd>
        </div>
      </dl>

      {belowMin && (
        <p className="mt-3 rounded-xl bg-gold/10 px-3 py-2 text-xs text-cream/85">
          El pedido mínimo de mayoreo es de <b>{mxn.format(minimum)}</b>. Le faltan {mxn.format(minimum - total)}.
        </p>
      )}

      {lines.length > 0 && (
        <div className="mt-5 space-y-2.5 print:hidden">
          <input
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            placeholder="Nombre o negocio (opcional)"
            className="h-11 w-full rounded-xl border border-cream/15 bg-ink px-4 text-sm outline-none placeholder:text-cream/35 focus:border-gold"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <input
              value={customer.city}
              onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
              placeholder="Ciudad"
              className="h-11 w-full rounded-xl border border-cream/15 bg-ink px-4 text-sm outline-none placeholder:text-cream/35 focus:border-gold"
            />
            <input
              value={customer.phone}
              inputMode="tel"
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              placeholder="Teléfono"
              className="h-11 w-full rounded-xl border border-cream/15 bg-ink px-4 text-sm outline-none placeholder:text-cream/35 focus:border-gold"
            />
          </div>
          <button
            type="button"
            onClick={send}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-wa font-extrabold text-ink transition hover:brightness-110"
          >
            <WhatsAppIcon className="size-5" /> Enviar cotización por WhatsApp
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-cream/20 text-sm font-bold text-cream/80 hover:border-gold hover:text-gold"
          >
            <Printer className="size-4" /> Imprimir o guardar en PDF
          </button>
          {sent && <p className="text-center text-xs text-wa">Cotización {sent} registrada. Un asesor le responderá por WhatsApp.</p>}
        </div>
      )}
      <p className="mt-4 text-[0.7rem] leading-relaxed text-cream/40">
        Precios de demostración, sujetos a existencias. El precio final se confirma con su asesor.
      </p>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12">
        <div className="min-w-0 space-y-5 lg:col-span-8 print:hidden">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar producto o SKU"
                className="h-12 w-full rounded-full border border-cream/15 bg-ink-2 pl-11 pr-4 text-sm outline-none placeholder:text-cream/35 focus:border-gold"
              />
            </label>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ slug: "todas", name: "Todas" }, ...seasons].map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSeason(s.slug as SeasonSlug | "todas")}
                aria-pressed={season === s.slug}
                className={`h-10 shrink-0 rounded-full px-4 text-sm font-bold transition-colors ${
                  season === s.slug ? "bg-gold text-ink" : "border border-cream/15 text-cream/75 hover:border-gold hover:text-gold"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visible.map((p) => (
              <ProductRow key={p.id} p={p} qty={cart[p.id] || 0} setQty={(v) => setQty(p.id, v)} />
            ))}
            {visible.length === 0 && (
              <p className="rounded-3xl border border-dashed border-cream/15 p-8 text-center text-cream/60">
                No encontramos productos con ese criterio.
              </p>
            )}
          </div>
        </div>

        <aside className="hidden lg:col-span-4 lg:block print:col-span-12 print:block">
          <div className="sticky top-28 rounded-3xl border border-gold/25 bg-ink-2 p-6">{summary}</div>
        </aside>
      </div>

      {/* Barra inferior y hoja de resumen en celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-ink/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden print:hidden">
        <button
          type="button"
          onClick={() => setSheet(true)}
          className="flex h-14 w-full items-center justify-between rounded-full bg-gold px-5 font-extrabold text-ink"
        >
          <span className="flex items-center gap-2 text-sm">
            <ChevronUp className="size-5" /> Ver pedido ({pieces} pzas)
          </span>
          <span className="display text-2xl">{mxn.format(total)}</span>
        </button>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-[70] lg:hidden print:hidden" role="dialog" aria-modal="true" aria-label="Resumen del pedido">
          <button type="button" aria-label="Cerrar" onClick={() => setSheet(false)} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
          <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] animate-float-in overflow-y-auto rounded-t-3xl border-t border-gold/30 bg-ink-2 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => setSheet(false)}
              aria-label="Cerrar resumen"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-cream/15"
            >
              <X className="size-4" />
            </button>
            {summary}
          </div>
        </div>
      )}
    </>
  );
}
