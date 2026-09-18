"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Copy, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Btn, PageTitle, StockBadge } from "@/components/admin/ui";
import { demo, mxn, totalStock, useDemoDB } from "@/lib/demo/store";
import type { Product, SeasonSlug } from "@/lib/demo/types";
import { seasons } from "@/lib/seasons";

function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-gold" : "bg-ink/20"}`}
    >
      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function ProductsPage() {
  const db = useDemoDB();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [season, setSeason] = useState<SeasonSlug | "todas">("todas");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return db.products.filter(
      (p) => (season === "todas" || p.season === season) && (!s || `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(s)),
    );
  }, [db.products, q, season]);

  const seasonName = (p: Product) => seasons.find((s) => s.slug === p.season)?.name ?? p.season;

  const remove = (p: Product) => {
    if (confirm(`¿Eliminar «${p.name}»? Esta acción no se puede deshacer.`)) demo.deleteProduct(p.id);
  };
  const duplicate = (p: Product) => {
    const copy = demo.duplicateProduct(p.id);
    if (copy) router.push(`/admin/productos/${copy.id}`);
  };

  return (
    <>
      <PageTitle
        title="Productos"
        intro={`${db.products.length} productos · ${db.products.reduce((s, p) => s + p.variants.length, 0)} presentaciones`}
        actions={
          <Btn variant="pri" href="/admin/productos/nuevo" className="adm-nuevo">
            <Plus className="size-4" /> Nuevo producto
          </Btn>
        }
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, SKU o categoría"
            className="h-11 w-full rounded-full border border-ink/15 bg-white pl-10 pr-4 text-sm outline-none focus:border-gold"
          />
        </label>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {[{ slug: "todas", name: "Todas" }, ...seasons].map((s) => (
            <button
              key={s.slug}
              type="button"
              aria-pressed={season === s.slug}
              onClick={() => setSeason(s.slug as SeasonSlug | "todas")}
              className={`h-9 shrink-0 rounded-full px-3.5 text-sm font-bold ${
                season === s.slug ? "bg-ink text-cream" : "border border-ink/15 bg-white text-ink/70 hover:border-ink/40"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla en escritorio */}
      <div className="adm-tabla hidden overflow-hidden rounded-2xl border border-ink/10 bg-white md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/10 bg-[#FAF8F3] text-left text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3 font-bold">Producto</th>
              <th className="px-4 py-3 font-bold">Temporada</th>
              <th className="px-4 py-3 text-right font-bold">Menudeo</th>
              <th className="px-4 py-3 text-right font-bold">Mayoreo</th>
              <th className="px-4 py-3 font-bold">Existencias</th>
              <th className="px-4 py-3 font-bold">Publicado</th>
              <th className="px-4 py-3 font-bold">Destacado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {list.map((p) => (
              <tr key={p.id} className="hover:bg-[#FCFBF8]">
                <td className="px-4 py-3">
                  <Link href={`/admin/productos/${p.id}`} className="flex items-center gap-3">
                    <span className={`relative size-12 shrink-0 overflow-hidden rounded-lg ${p.cutout ? "bg-white ring-1 ring-ink/10" : "bg-ink"}`}>
                      <Image src={p.image} alt="" fill sizes="48px" className={p.cutout ? "object-contain p-1" : "object-cover"} />
                    </span>
                    <span>
                      <span className="block font-bold hover:text-gold-deep">{p.name}</span>
                      <span className="block font-mono text-xs text-ink/45">{p.sku}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink/70">{seasonName(p)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{mxn.format(p.tiers[0].price)}</td>
                <td className="px-4 py-3 text-right font-bold tabular-nums">{mxn.format(p.tiers[1].price)}</td>
                <td className="px-4 py-3">
                  <StockBadge n={totalStock(p)} />
                </td>
                <td className="px-4 py-3">
                  <Switch on={p.published} label={`Publicar ${p.name}`} onClick={() => demo.patchProduct(p.id, { published: !p.published })} />
                </td>
                <td className="px-4 py-3">
                  <Switch on={p.featured} label={`Destacar ${p.name}`} onClick={() => demo.patchProduct(p.id, { featured: !p.featured })} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/productos/${p.id}`} aria-label={`Editar ${p.name}`} className="grid size-9 place-items-center rounded-full text-ink/60 hover:bg-ink/5 hover:text-ink">
                      <Pencil className="size-4" />
                    </Link>
                    <button type="button" onClick={() => duplicate(p)} aria-label={`Duplicar ${p.name}`} className="grid size-9 place-items-center rounded-full text-ink/60 hover:bg-ink/5 hover:text-ink">
                      <Copy className="size-4" />
                    </button>
                    <button type="button" onClick={() => remove(p)} aria-label={`Eliminar ${p.name}`} className="grid size-9 place-items-center rounded-full text-ink/60 hover:bg-[#B3261E]/10 hover:text-[#B3261E]">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="p-8 text-center text-sm text-ink/55">No hay productos con ese criterio.</p>}
      </div>

      {/* Tarjetas en celular */}
      <ul className="space-y-3 md:hidden">
        {list.map((p) => (
          <li key={p.id} className="rounded-2xl border border-ink/10 bg-white p-4">
            <Link href={`/admin/productos/${p.id}`} className="flex items-center gap-3">
              <span className={`relative size-16 shrink-0 overflow-hidden rounded-xl ${p.cutout ? "bg-white ring-1 ring-ink/10" : "bg-ink"}`}>
                <Image src={p.image} alt="" fill sizes="64px" className={p.cutout ? "object-contain p-1" : "object-cover"} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{p.name}</span>
                <span className="block text-xs text-ink/50">
                  {seasonName(p)} · {p.sku}
                </span>
                <span className="mt-1 block text-sm">
                  <b>{mxn.format(p.tiers[1].price)}</b> <span className="text-ink/50">mayoreo</span>
                </span>
              </span>
              <StockBadge n={totalStock(p)} />
            </Link>
            <div className="mt-3 flex items-center gap-4 border-t border-ink/10 pt-3 text-xs font-bold text-ink/70">
              <span className="flex items-center gap-2">
                <Switch on={p.published} label={`Publicar ${p.name}`} onClick={() => demo.patchProduct(p.id, { published: !p.published })} /> Publicado
              </span>
              <span className="flex items-center gap-2">
                <Switch on={p.featured} label={`Destacar ${p.name}`} onClick={() => demo.patchProduct(p.id, { featured: !p.featured })} /> Destacado
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
