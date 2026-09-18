"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CircleCheck, EyeOff, PackageX, Plus } from "lucide-react";
import { Btn, Card, PageTitle } from "@/components/admin/ui";
import { mxn, totalStock, useDemoDB } from "@/lib/demo/store";
import { getSeason } from "@/lib/seasons";

export default function AdminHome() {
  const db = useDemoDB();
  const products = db.products;
  const agotados = products.filter((p) => totalStock(p) === 0);
  const pocas = products.filter((p) => {
    const n = totalStock(p);
    return n > 0 && n <= 10;
  });
  const ocultos = products.filter((p) => !p.published);
  const nuevas = db.quotes.filter((q) => q.status === "nueva");
  const piezas = products.reduce((s, p) => s + totalStock(p), 0);
  const valor = products.reduce((s, p) => s + totalStock(p) * p.tiers[1].price, 0);

  const cards = [
    { label: "Productos", value: products.length, sub: `${products.length - ocultos.length} publicados`, href: "/admin/productos" },
    { label: "Agotados", value: agotados.length, sub: "sin piezas en bodega", href: "/admin/productos", tone: "text-[#B3261E]" },
    { label: "Pocas piezas", value: pocas.length, sub: "10 piezas o menos", href: "/admin/productos", tone: "text-gold-deep" },
    { label: "Cotizaciones nuevas", value: nuevas.length, sub: `${db.quotes.length} en total`, href: "/admin/cotizaciones" },
  ];

  const pendientes = [
    ...agotados.map((p) => ({ icon: PackageX, tone: "text-[#B3261E]", text: `${p.name}: agotado. Reponga u oculte el producto.`, href: `/admin/productos/${p.id}` })),
    ...pocas.map((p) => ({ icon: AlertTriangle, tone: "text-gold-deep", text: `${p.name}: quedan ${totalStock(p)} piezas.`, href: `/admin/productos/${p.id}` })),
    ...ocultos.map((p) => ({ icon: EyeOff, tone: "text-ink/50", text: `${p.name}: oculto en el sitio.`, href: `/admin/productos/${p.id}` })),
  ];

  return (
    <>
      <PageTitle
        title="Resumen"
        intro="Cómo está su catálogo hoy y qué conviene revisar primero."
        actions={
          <Btn variant="pri" href="/admin/productos/nuevo" className="adm-nuevo">
            <Plus className="size-4" /> Nuevo producto
          </Btn>
        }
      />

      <div className="adm-tarjetas grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="adm-tarjeta group rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-gold">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/50">{c.label}</p>
            <p className={`display mt-2 text-5xl ${c.tone ?? ""}`}>{c.value}</p>
            <p className="mt-1 text-xs text-ink/55">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <h2 className="text-lg font-extrabold">Qué necesita atención</h2>
          {pendientes.length === 0 ? (
            <p className="mt-4 flex items-center gap-2 text-sm text-ink/60">
              <CircleCheck className="size-5 text-green-700" /> Todo en orden por ahora.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-ink/10">
              {pendientes.map((x) => (
                <li key={x.text}>
                  <Link href={x.href} className="group flex items-center gap-3 py-3 text-sm">
                    <x.icon className={`size-5 shrink-0 ${x.tone}`} />
                    <span className="flex-1">{x.text}</span>
                    <ArrowRight className="size-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-5">
          <h2 className="text-lg font-extrabold">Estado</h2>
          <dl className="adm-datos mt-3 divide-y divide-ink/10 text-sm">
            {[
              ["Piezas en bodega", piezas.toLocaleString("es-MX")],
              ["Valor a precio de mayoreo", mxn.format(valor)],
              ["WhatsApp de ventas", db.settings.whatsapp],
              ["Pedido mínimo de mayoreo", mxn.format(db.settings.minimumOrder)],
              ["Base de datos", "Demostración (este navegador)"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink/60">{k}</dt>
                <dd className="text-right font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Cotizaciones recientes</h2>
          <Link href="/admin/cotizaciones" className="text-sm font-bold text-gold-deep hover:underline">
            Ver todas
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-ink/10 text-sm">
          {db.quotes.slice(0, 4).map((q) => (
            <li key={q.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3">
              <span className="font-mono text-xs text-ink/50">{q.id}</span>
              <span className="flex-1 font-bold">{q.customer}</span>
              <span className="text-ink/60">{q.lines.map((l) => getSeason(db.products.find((p) => p.id === l.productId)?.season ?? "")?.name ?? l.name).filter((v, i, a) => a.indexOf(v) === i).join(", ")}</span>
              <span className="font-bold tabular-nums">{mxn.format(q.total)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
