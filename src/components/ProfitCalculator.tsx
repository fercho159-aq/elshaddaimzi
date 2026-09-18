"use client";

import { useId, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl } from "@/lib/whatsapp";

const mxn = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-cream/75">
          {label}
        </label>
        <output htmlFor={id} className="display text-2xl text-cream">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-gold"
        style={{ background: `linear-gradient(90deg, var(--color-gold) ${pct}%, rgba(248,240,232,0.12) ${pct}%)` }}
      />
    </div>
  );
}

/**
 * Calculadora de ganancia: el visitante estima su margen con sus propios números.
 * PENDIENTE: ajustar valores iniciales con precios reales de mayoreo por temporada.
 */
export function ProfitCalculator({
  product,
  defaultCost,
  defaultPrice,
  defaultUnits = 100,
  message,
}: {
  product: string;
  defaultCost: number;
  defaultPrice: number;
  defaultUnits?: number;
  message: string;
}) {
  const [units, setUnits] = useState(defaultUnits);
  const [cost, setCost] = useState(defaultCost);
  const [price, setPrice] = useState(defaultPrice);

  const investment = units * cost;
  const revenue = units * price;
  const profit = revenue - investment;
  const margin = investment > 0 ? Math.round((profit / investment) * 100) : 0;

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-gold/25 bg-ink-2 lg:grid-cols-2">
      <div className="space-y-7 p-6 sm:p-9">
        <div>
          <p className="eyebrow">Calcule su ganancia</p>
          <h3 className="display mt-2 text-4xl">¿Cuánto puede ganar con {product}?</h3>
        </div>
        <Slider label="Piezas que compra" value={units} onChange={setUnits} min={10} max={1000} step={10} format={(v) => `${v} pzas`} />
        <Slider label="Costo de mayoreo por pieza" value={cost} onChange={setCost} min={5} max={500} step={5} format={mxn.format} />
        <Slider label="Su precio de venta por pieza" value={price} onChange={setPrice} min={5} max={900} step={5} format={mxn.format} />
        <p className="text-xs text-cream/50">
          Valores de ejemplo. Consulte precios vigentes de mayoreo por WhatsApp.
        </p>
      </div>
      <div className="relative flex flex-col justify-between gap-8 bg-gold p-6 text-ink sm:p-9">
        <dl className="grid grid-cols-2 gap-6">
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-ink/60">Inversión</dt>
            <dd className="display mt-1 text-3xl">{mxn.format(investment)}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-ink/60">Venta total</dt>
            <dd className="display mt-1 text-3xl">{mxn.format(revenue)}</dd>
          </div>
          <div className="col-span-2 border-t border-ink/20 pt-6">
            <dt className="text-xs font-bold uppercase tracking-widest text-ink/60">Ganancia estimada</dt>
            <dd className={`display mt-1 text-6xl sm:text-7xl ${profit < 0 ? "text-red-900" : ""}`}>{mxn.format(profit)}</dd>
            <dd className="mt-2 text-sm font-bold">{margin}% sobre su inversión</dd>
          </div>
        </dl>
        <a
          href={whatsappUrl(`${message} Estoy considerando alrededor de ${units} piezas.`)}
          target="_blank"
          rel="noopener"
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-ink font-extrabold text-cream transition hover:bg-ink-3"
        >
          <WhatsAppIcon className="size-5 text-wa" />
          Cotizar {units} piezas
        </a>
      </div>
    </div>
  );
}
