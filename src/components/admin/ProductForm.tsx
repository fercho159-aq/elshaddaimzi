"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Copy, ExternalLink, ImagePlus, Minus, Plus, Trash2, X } from "lucide-react";
import { Btn, Card, Field, Toggle, inputCls } from "./ui";
import { demo, mxn, totalStock, useDemoDB } from "@/lib/demo/store";
import { TIER_LABELS, type Product, type SeasonSlug } from "@/lib/demo/types";
import { seasons } from "@/lib/seasons";

type Errors = Partial<Record<string, string>>;
type Status = { kind: "nuevo" | "sucio" | "ok" | "mal"; text: string };

const emptyProduct = (): Product => ({
  id: "",
  sku: "",
  name: "",
  season: "luces-navidenas",
  category: "",
  size: "",
  material: "",
  description: "",
  image: "",
  cutout: false,
  piecesPerBox: 24,
  tiers: [
    { min: 1, price: 0 },
    { min: 12, price: 0 },
    { min: 100, price: 0 },
  ],
  variants: [{ id: "v1", name: "Única", stock: 0 }],
  published: true,
  featured: false,
  updatedAt: "",
});

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const VARIANT_SHORTCUTS = ["Multicolor", "Blanco cálido", "Blanco frío", "Chica", "Mediana", "Grande", "Surtido"];

function Section({ n, title, intro, children }: { n: number; title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-bold text-cream">{n}</span>
        <div>
          <h2 className="text-lg font-extrabold leading-tight">{title}</h2>
          {intro && <p className="mt-0.5 text-sm text-ink/55">{intro}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function StockStepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="fm-stepper flex h-11 items-center overflow-hidden rounded-xl border border-ink/15 bg-[#FCFBF8]">
      <button type="button" aria-label={`Restar una pieza de ${label}`} onClick={() => onChange(Math.max(0, value - 1))} className="grid h-full w-10 place-items-center text-ink/60 hover:bg-ink/5">
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        onFocus={(e) => e.currentTarget.select()}
        aria-label={`Existencias de ${label}`}
        value={value || ""}
        placeholder="0"
        onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
        className="h-full w-16 bg-transparent text-center font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button type="button" aria-label={`Sumar una pieza a ${label}`} onClick={() => onChange(value + 1)} className="grid h-full w-10 place-items-center text-ink/60 hover:bg-ink/5">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

/** Reduce la foto en el navegador para que quepa en el almacenamiento de la demostración. */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("decode"));
      img.onload = () => {
        const max = 900;
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function ProductForm({ initial, justCreated = false }: { initial?: Product; justCreated?: boolean }) {
  const router = useRouter();
  const db = useDemoDB();
  const isNew = !initial;
  const [draft, setDraft] = useState<Product>(() => structuredClone(initial ?? emptyProduct()));
  const [baseline, setBaseline] = useState(() => JSON.stringify(initial ?? emptyProduct()));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(
    justCreated
      ? { kind: "ok", text: "Producto creado. Ya puede seguir editándolo." }
      : isNew
        ? { kind: "nuevo", text: "Cuando esté listo, créelo." }
        : { kind: "ok", text: "Sin cambios pendientes." },
  );
  const [photoError, setPhotoError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const dirty = JSON.stringify(draft) !== baseline;
  const shownStatus: Status = dirty && !isNew && status.kind !== "mal" ? { kind: "sucio", text: "Tiene cambios sin guardar." } : status;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const categories = useMemo(() => [...new Set(db.products.map((p) => p.category))].sort(), [db.products]);

  const set = <K extends keyof Product>(k: K, v: Product[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (status.kind === "mal") setStatus(isNew ? { kind: "nuevo", text: "Cuando esté listo, créelo." } : { kind: "sucio", text: "" });
  };
  const setTier = (i: number, k: "min" | "price", v: number) => {
    const tiers = draft.tiers.map((t, j) => (j === i ? { ...t, [k]: v } : t)) as Product["tiers"];
    set("tiers", tiers);
    setErrors((e) => ({ ...e, tiers: undefined }));
  };
  const setVariant = (id: string, patch: Partial<Product["variants"][number]>) =>
    set("variants", draft.variants.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  const addVariant = (name = "") =>
    set("variants", [...draft.variants, { id: `v${Date.now().toString(36)}`, name, stock: 0 }]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!draft.name.trim()) e.name = "Escriba el nombre del producto.";
    if (!draft.sku.trim()) e.sku = "Escriba el SKU o clave del producto.";
    else if (db.products.some((p) => p.sku.toLowerCase() === draft.sku.trim().toLowerCase() && p.id !== draft.id))
      e.sku = "Ya existe otro producto con ese SKU.";
    if (!draft.category.trim()) e.category = "Elija o escriba una categoría.";
    const [a, b, c] = draft.tiers;
    if (draft.tiers.some((t) => !t.price || t.price <= 0)) e.tiers = "Escriba el precio por pieza de los tres niveles.";
    else if (!(a.min < b.min && b.min < c.min)) e.tiers = "Cada nivel debe empezar en más piezas que el anterior.";
    else if (!(a.price >= b.price && b.price >= c.price)) e.tiers = "El precio por pieza debe bajar (o mantenerse) al subir de nivel.";
    if (!draft.piecesPerBox || draft.piecesPerBox < 1) e.piecesPerBox = "Indique cuántas piezas trae una caja.";
    if (draft.variants.length === 0) e.variants = "Agregue al menos una presentación.";
    else if (draft.variants.some((v) => !v.name.trim())) e.variants = "Escriba el nombre de cada presentación.";
    if (!draft.image) e.image = "Suba una foto del producto.";
    return e;
  };

  const save = () => {
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      setStatus({ kind: "mal", text: `Falta un dato: ${e[first]}` });
      document.querySelector(`[data-campo="${first}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const clean: Product = { ...draft, name: draft.name.trim(), sku: draft.sku.trim(), category: draft.category.trim() };
    if (isNew) {
      clean.id = `${slugify(clean.name)}-${slugify(clean.sku)}`;
      const saved = demo.saveProduct(clean);
      setBaseline(JSON.stringify(clean));
      router.replace(`/admin/productos/${saved.id}?creado=1`);
      return;
    }
    const saved = demo.saveProduct(clean);
    setDraft(saved);
    setBaseline(JSON.stringify(saved));
    setStatus({ kind: "ok", text: "Cambios guardados." });
  };

  const discard = () => {
    setDraft(JSON.parse(baseline));
    setErrors({});
    setStatus(isNew ? { kind: "nuevo", text: "Cuando esté listo, créelo." } : { kind: "ok", text: "Cambios descartados." });
  };

  const onPhoto = async (file?: File) => {
    setPhotoError("");
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setPhotoError("Ese archivo no es una foto compatible. Use una foto JPG, PNG o WebP.");
      return;
    }
    try {
      set("image", await resizeImage(file));
    } catch {
      setPhotoError("No se pudo leer la foto. Intente con otra imagen JPG.");
    }
  };

  const stock = totalStock(draft);

  return (
    <div className="pb-28">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink/45">{isNew ? "Productos · Nuevo" : `Productos · ${draft.sku}`}</p>
          <h1 className="display mt-1 text-4xl sm:text-5xl">{isNew ? "Nuevo producto" : draft.name || "Sin nombre"}</h1>
        </div>
        {!isNew && (
          <div className="adm-cabecera-fin flex flex-wrap gap-2">
            <Btn
              onClick={() => {
                const copy = demo.duplicateProduct(draft.id);
                if (copy) router.push(`/admin/productos/${copy.id}`);
              }}
            >
              <Copy className="size-4" /> Duplicar
            </Btn>
            <a
              href={`/temporadas/${draft.season}`}
              target="_blank"
              rel="noopener"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 text-sm font-bold hover:border-ink/40"
            >
              Ver la temporada <ExternalLink className="size-4" />
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="fm-main space-y-4 lg:col-span-8">
          <Section n={1} title="Lo básico" intro="Cómo se identifica el producto y en qué temporada aparece.">
            <div className="grid gap-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <Field label="SKU o clave" htmlFor="fm-sku" error={errors.sku}>
                <input id="fm-sku" data-campo="sku" value={draft.sku} aria-invalid={Boolean(errors.sku)} onChange={(e) => set("sku", e.target.value.toUpperCase())} className={`${inputCls} font-mono`} placeholder="HZ8072B" />
              </Field>
              <Field label="Nombre" htmlFor="fm-nombre" error={errors.name} hint={draft.name && `Así aparece en el catálogo: «${draft.name}»`}>
                <input id="fm-nombre" data-campo="name" value={draft.name} aria-invalid={Boolean(errors.name)} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Serie LED 300 luces" />
              </Field>
              <Field label="Temporada" htmlFor="fm-temporada">
                <select id="fm-temporada" value={draft.season} onChange={(e) => set("season", e.target.value as SeasonSlug)} className={inputCls}>
                  {seasons.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Categoría" htmlFor="fm-categoria" error={errors.category} hint="Elija una existente o escriba una nueva.">
                <input id="fm-categoria" data-campo="category" list="fm-categorias" value={draft.category} aria-invalid={Boolean(errors.category)} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Series LED" />
                <datalist id="fm-categorias">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
            </div>
          </Section>

          <Section n={2} title="Precios por volumen" intro="El precio por pieza que paga el cliente según cuántas piezas compra.">
            <div data-campo="tiers" className="space-y-2">
              <div className="hidden grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)_5rem] gap-3 px-1 text-xs font-bold text-ink/50 sm:grid">
                <span>Nivel</span>
                <span>Desde (piezas)</span>
                <span>Precio por pieza</span>
                <span className="text-right">Ahorro</span>
              </div>
              {draft.tiers.map((t, i) => {
                const pct = i > 0 && draft.tiers[0].price > 0 && t.price > 0 ? Math.round((1 - t.price / draft.tiers[0].price) * 100) : 0;
                return (
                  <div key={i} className="grid grid-cols-2 items-center gap-3 rounded-xl bg-[#FAF8F3] p-3 sm:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)_5rem] sm:bg-transparent sm:p-0">
                    <span className="col-span-2 font-bold sm:col-span-1">{TIER_LABELS[i]}</span>
                    <label className="block">
                      <span className="mb-1 block text-xs text-ink/50 sm:hidden">Desde (piezas)</span>
                      <input
                        id={`fm-min-${i}`}
                        type="number"
                        min={1}
                        disabled={i === 0}
                        value={t.min}
                        aria-invalid={Boolean(errors.tiers)}
                        onChange={(e) => setTier(i, "min", Math.max(1, Math.floor(Number(e.target.value) || 1)))}
                        className={`${inputCls} disabled:opacity-60`}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-ink/50 sm:hidden">Precio por pieza</span>
                      <span className="relative block">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink/45">$</span>
                        <input
                          id={`fm-precio-${i}`}
                          type="number"
                          min={0}
                          value={t.price || ""}
                          placeholder="0"
                          aria-invalid={Boolean(errors.tiers)}
                          onChange={(e) => setTier(i, "price", Math.max(0, Number(e.target.value) || 0))}
                          className={`${inputCls} pl-7`}
                        />
                      </span>
                    </label>
                    <span className={`col-span-2 text-sm font-bold sm:col-span-1 sm:text-right ${pct > 0 ? "text-green-700" : "text-ink/35"}`}>
                      {i === 0 ? "—" : pct > 0 ? `−${pct}%` : "0%"}
                    </span>
                  </div>
                );
              })}
              {errors.tiers && <p className="text-xs font-bold text-[#B3261E]">{errors.tiers}</p>}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Piezas por caja" htmlFor="fm-caja" error={errors.piecesPerBox} hint="Cuántas piezas trae una caja completa.">
                <input id="fm-caja" data-campo="piecesPerBox" type="number" min={1} value={draft.piecesPerBox || ""} onChange={(e) => set("piecesPerBox", Math.max(0, Math.floor(Number(e.target.value) || 0)))} className={inputCls} />
              </Field>
              <div>
                <p className="mb-1.5 text-xs font-bold text-ink/70">Atajos</p>
                <div className="fm-atajos flex flex-wrap gap-2">
                  {[
                    { l: "Mayoreo desde 6", f: () => setTier(1, "min", 6) },
                    { l: "Mayoreo desde 12", f: () => setTier(1, "min", 12) },
                    { l: "Volumen = 1 caja", f: () => setTier(2, "min", Math.max(draft.tiers[1].min + 1, draft.piecesPerBox)) },
                  ].map((a) => (
                    <button key={a.l} type="button" onClick={a.f} className="h-9 rounded-full border border-ink/15 bg-white px-3 text-xs font-bold hover:border-gold">
                      {a.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section n={3} title="Presentaciones y existencias" intro="Colores, tamaños o modelos del producto y cuántas piezas hay de cada uno.">
            <div data-campo="variants" className="space-y-2">
              {draft.variants.map((v) => (
                <div key={v.id} className="fm-variante flex flex-wrap items-center gap-2 rounded-xl bg-[#FAF8F3] p-2.5 sm:flex-nowrap">
                  <input
                    value={v.name}
                    aria-label="Nombre de la presentación"
                    placeholder="Ej. Multicolor, Chica, Azul"
                    onChange={(e) => setVariant(v.id, { name: e.target.value })}
                    className={`${inputCls} min-w-0 flex-1 bg-white`}
                  />
                  <StockStepper value={v.stock} onChange={(n) => setVariant(v.id, { stock: n })} label={v.name || "presentación"} />
                  <button
                    type="button"
                    aria-label={`Quitar ${v.name || "presentación"}`}
                    onClick={() => set("variants", draft.variants.filter((x) => x.id !== v.id))}
                    className="grid size-10 place-items-center rounded-full text-ink/45 hover:bg-[#B3261E]/10 hover:text-[#B3261E]"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
              {errors.variants && <p className="text-xs font-bold text-[#B3261E]">{errors.variants}</p>}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => addVariant()} className="fm-agregar inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-bold text-cream hover:bg-ink-3">
                <Plus className="size-4" /> Agregar presentación
              </button>
              <div className="fm-atajos flex flex-wrap gap-1.5">
                {VARIANT_SHORTCUTS.filter((n) => !draft.variants.some((v) => v.name === n)).map((n) => (
                  <button key={n} type="button" onClick={() => addVariant(n)} className="h-8 rounded-full border border-dashed border-ink/25 px-3 text-xs font-bold text-ink/65 hover:border-gold hover:text-ink">
                    + {n}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-ink/60">
              Total en bodega: <b className={stock === 0 ? "text-[#B3261E]" : stock <= 10 ? "text-gold-deep" : "text-ink"}>{stock} piezas</b>
              {stock === 0 ? " · aparece como agotado" : stock <= 10 ? " · aviso de pocas piezas" : ""}
            </p>
          </Section>

          <Section n={4} title="Medidas y material" intro="Datos que ayudan al cliente a decidir.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tamaño o medidas" htmlFor="fm-medidas" optional hint="Ej. 6 m · 300 luces, 40 × 30 × 14 cm">
                <input id="fm-medidas" value={draft.size} onChange={(e) => set("size", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Material" htmlFor="fm-material" optional>
                <input id="fm-material" value={draft.material} onChange={(e) => set("material", e.target.value)} className={inputCls} />
              </Field>
            </div>
          </Section>

          <Section n={5} title="Foto y descripción" intro="Una foto clara del producto; de preferencia sobre fondo blanco.">
            <div data-campo="image" className="grid gap-4 sm:grid-cols-[12rem_minmax(0,1fr)]">
              <div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onPhoto(e.dataTransfer.files[0]);
                  }}
                  className={`fm-foto group relative grid aspect-square w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed ${
                    errors.image || photoError ? "border-[#B3261E]/60" : "border-ink/20 hover:border-gold"
                  } ${draft.cutout ? "bg-white" : "bg-[#FAF8F3]"}`}
                >
                  {draft.image ? (
                    <>
                      <Image src={draft.image} alt="Foto del producto" fill sizes="192px" className={draft.cutout ? "object-contain p-3" : "object-cover"} />
                      <span className="absolute inset-x-2 bottom-2 rounded-full bg-ink/80 py-1.5 text-xs font-bold text-cream opacity-0 transition group-hover:opacity-100">
                        Cambiar foto
                      </span>
                    </>
                  ) : (
                    <span className="flex flex-col items-center gap-2 p-4 text-center text-xs font-bold text-ink/55">
                      <ImagePlus className="size-7 text-ink/40" /> Subir foto
                      <span className="font-normal">o arrástrela aquí</span>
                    </span>
                  )}
                </button>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
                {(errors.image || photoError) && <p className="fm-error-foto mt-2 text-xs font-bold text-[#B3261E]">{photoError || errors.image}</p>}
                <div className="mt-3">
                  <Toggle checked={draft.cutout} onChange={(v) => set("cutout", v)} label="Fondo blanco" hint="La foto se muestra completa." />
                </div>
              </div>
              <Field label="Descripción" htmlFor="fm-desc" optional hint={`${draft.description.length}/300 caracteres`}>
                <textarea
                  id="fm-desc"
                  rows={7}
                  maxLength={300}
                  value={draft.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={`${inputCls} h-auto py-3 leading-relaxed`}
                  placeholder="Qué es, para qué sirve y por qué se vende bien."
                />
              </Field>
            </div>
          </Section>

          {!isNew && (
            <div className="fm-peligro flex flex-col gap-3 rounded-2xl border border-[#B3261E]/25 bg-[#FAF0EF] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-[#B3261E]">Eliminar producto</p>
                <p className="text-sm text-ink/60">Se borra del catálogo del panel. Si solo no hay piezas, mejor apague «Publicado».</p>
              </div>
              <Btn
                variant="danger"
                onClick={() => {
                  if (confirm(`¿Eliminar «${draft.name}»? Esta acción no se puede deshacer.`)) {
                    demo.deleteProduct(draft.id);
                    router.replace("/admin/productos");
                  }
                }}
              >
                <Trash2 className="size-4" /> Eliminar producto
              </Btn>
            </div>
          )}
        </div>

        <aside className="fm-lado space-y-4 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <Card>
            <h2 className="mb-4 font-extrabold">En el sitio</h2>
            <div className="space-y-4">
              <Toggle id="fm-publicado" checked={draft.published} onChange={(v) => set("published", v)} label="Publicado" hint="Aparece en el catálogo." />
              <div className="border-t border-ink/10" />
              <Toggle id="fm-destacado" checked={draft.featured} onChange={(v) => set("featured", v)} label="Destacado" hint="Sale primero en su temporada." />
            </div>
          </Card>
          <Card>
            <p className="mb-3 text-center text-[0.65rem] font-bold uppercase tracking-widest text-ink/45">Así se verá en el catálogo</p>
            <div className="overflow-hidden rounded-2xl bg-ink p-4 text-cream">
              <div className={`relative mx-auto aspect-square w-full max-w-[14rem] overflow-hidden rounded-xl ${draft.cutout ? "bg-white" : "bg-ink-3"}`}>
                {draft.image ? (
                  <Image src={draft.image} alt="" fill sizes="224px" className={draft.cutout ? "object-contain p-3" : "object-cover"} />
                ) : (
                  <span className="grid h-full place-items-center text-xs text-cream/40">Sin foto</span>
                )}
                {!draft.published && <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[0.6rem] font-bold">Oculto</span>}
              </div>
              <p className="mt-3 font-extrabold leading-tight">{draft.name || "Nombre del producto"}</p>
              <p className="text-xs text-cream/55">{draft.size || "Medidas"} · {draft.sku || "SKU"}</p>
              <div className="mt-3 grid grid-cols-3 gap-1">
                {draft.tiers.map((t, i) => (
                  <div key={i} className={`rounded-lg border px-2 py-1.5 ${i === 1 ? "border-gold bg-gold/15" : "border-cream/10"}`}>
                    <p className={`text-[0.55rem] font-bold uppercase tracking-wider ${i === 1 ? "text-gold" : "text-cream/50"}`}>{TIER_LABELS[i]}</p>
                    <p className="display text-lg leading-none">{t.price ? mxn.format(t.price) : "$—"}</p>
                    <p className="text-[0.55rem] text-cream/45">desde {t.min}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </aside>
      </div>

      <div className="fm-barra fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <p
            role="status"
            className={`fm-estado ${shownStatus.kind} min-w-0 flex-1 text-sm font-bold ${
              shownStatus.kind === "ok" ? "text-green-700" : shownStatus.kind === "mal" ? "text-[#B3261E]" : shownStatus.kind === "sucio" ? "text-gold-deep" : "text-ink/55"
            }`}
          >
            {shownStatus.kind === "ok" && "✓ "}
            {shownStatus.text}
          </p>
          {dirty && !isNew && (
            <Btn variant="ghost" onClick={discard}>
              Descartar
            </Btn>
          )}
          <Btn variant="pri" onClick={save} className="btn-pri h-11 px-6" disabled={!isNew && !dirty}>
            {isNew ? "Crear producto" : "Guardar cambios"}
          </Btn>
        </div>
      </div>
    </div>
  );
}
