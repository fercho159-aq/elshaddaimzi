"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Card, PageTitle } from "@/components/admin/ui";
import { useMounted } from "@/components/admin/useMounted";
import { demo, mxn, useDemoDB } from "@/lib/demo/store";
import type { Quote, QuoteStatus } from "@/lib/demo/types";

const STATUS: Record<QuoteStatus, { label: string; cls: string }> = {
  nueva: { label: "Nueva", cls: "bg-gold/20 text-gold-deep" },
  seguimiento: { label: "En seguimiento", cls: "bg-blue-100 text-blue-800" },
  cerrada: { label: "Cerrada", cls: "bg-green-100 text-green-800" },
};

const fecha = (iso: string) =>
  new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

function StatusSelect({ q }: { q: Quote }) {
  return (
    <select
      value={q.status}
      aria-label={`Estado de ${q.id}`}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => demo.setQuoteStatus(q.id, e.target.value as QuoteStatus)}
      className={`h-8 rounded-full border-0 px-3 text-xs font-bold outline-none ${STATUS[q.status].cls}`}
    >
      {Object.entries(STATUS).map(([k, v]) => (
        <option key={k} value={k}>
          {v.label}
        </option>
      ))}
    </select>
  );
}

export default function QuotesPage() {
  const db = useDemoDB();
  const mounted = useMounted();
  const [open, setOpen] = useState<string | null>(null);
  const quote = db.quotes.find((q) => q.id === open);
  if (!mounted) return null;

  return (
    <>
      <PageTitle
        title="Cotizaciones"
        intro="Las solicitudes de mayoreo de sus clientes. Cambie el estado conforme las atiende."
      />

      <div className="mb-6 grid grid-cols-3 gap-3">
        {(Object.keys(STATUS) as QuoteStatus[]).map((k) => (
          <Card key={k} className="p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/50">{STATUS[k].label}</p>
            <p className="display mt-1 text-4xl">{db.quotes.filter((q) => q.status === k).length}</p>
          </Card>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <ul className="divide-y divide-ink/5">
          {db.quotes.map((q) => (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => setOpen(q.id)}
                className="cot-fila grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-4 text-left hover:bg-[#FCFBF8] sm:grid-cols-[6rem_minmax(0,1fr)_8rem_7rem_9rem] sm:px-5"
              >
                <span className="font-mono text-xs text-ink/50">{q.id}</span>
                <span className="min-w-0 sm:order-none">
                  <span className="block truncate font-bold">{q.customer}</span>
                  <span className="block text-xs text-ink/55">
                    {q.city || "Sin ciudad"} · {q.lines.reduce((s, l) => s + l.qty, 0)} pzas · {fecha(q.createdAt)}
                  </span>
                </span>
                <span className="hidden text-xs text-ink/55 sm:block">{q.lines.length} producto{q.lines.length > 1 ? "s" : ""}</span>
                <span className="text-right font-bold tabular-nums sm:text-left">{mxn.format(q.total)}</span>
                <span className="col-span-2 sm:col-span-1">
                  <StatusSelect q={q} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {quote && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Cotización ${quote.id}`}>
          <button type="button" aria-label="Cerrar" onClick={() => setOpen(null)} className="absolute inset-0 bg-ink/50" />
          <div className="cot-detalle absolute inset-y-0 right-0 flex w-full max-w-md animate-float-in flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-ink/10 p-5">
              <div>
                <p className="font-mono text-xs text-ink/50">{quote.id}</p>
                <h2 className="text-xl font-extrabold">{quote.customer}</h2>
                <p className="text-sm text-ink/55">
                  {quote.city || "Sin ciudad"} · {fecha(quote.createdAt)}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(null)} aria-label="Cerrar" className="grid size-9 place-items-center rounded-full hover:bg-ink/5">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <StatusSelect q={quote} />
              <table className="mt-5 w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-ink/45">
                  <tr>
                    <th className="pb-2 font-bold">Producto</th>
                    <th className="pb-2 text-right font-bold">Pzas</th>
                    <th className="pb-2 text-right font-bold">Importe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {quote.lines.map((l) => (
                    <tr key={l.productId}>
                      <td className="py-2.5">
                        <span className="block font-bold">{l.name}</span>
                        <span className="text-xs text-ink/50">
                          {l.sku} · {mxn.format(l.unitPrice)} c/u · {l.tier}
                        </span>
                      </td>
                      <td className="py-2.5 text-right tabular-nums">{l.qty}</td>
                      <td className="py-2.5 text-right font-bold tabular-nums">{mxn.format(l.qty * l.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
                <span className="font-bold">Total estimado</span>
                <span className="display text-4xl">{mxn.format(quote.total)}</span>
              </p>
            </div>
            <div className="border-t border-ink/10 p-5">
              {quote.phone ? (
                <a
                  href={`https://wa.me/52${quote.phone}?text=${encodeURIComponent(`Buen día, le escribimos de El Shaddai MZI sobre su cotización ${quote.id}.`)}`}
                  target="_blank"
                  rel="noopener"
                  onClick={() => quote.status === "nueva" && demo.setQuoteStatus(quote.id, "seguimiento")}
                  className="cot-responder flex h-12 items-center justify-center gap-2 rounded-full bg-wa font-extrabold text-ink"
                >
                  <WhatsAppIcon className="size-5" /> Responder por WhatsApp
                </a>
              ) : (
                <p className="text-center text-sm text-ink/55">El cliente no dejó teléfono; espere su mensaje de WhatsApp.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
