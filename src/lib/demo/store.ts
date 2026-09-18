"use client";

import { useSyncExternalStore } from "react";
import { seedDB } from "./seed";
import type { DemoDB, Product, Quote, Settings, User } from "./types";

/**
 * Almacén de la demostración. Guarda todo en el navegador (localStorage), así el panel y el cotizador
 * comparten los mismos datos sin servidor. En producción esto se sustituye por una base de datos.
 */
const KEY = "elshaddai-demo:v1";
const listeners = new Set<() => void>();
let cache: DemoDB | null = null;

function read(): DemoDB {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as DemoDB) : null;
    cache = parsed && parsed.version === seedDB.version ? parsed : structuredClone(seedDB);
  } catch {
    cache = structuredClone(seedDB);
  }
  return cache;
}

function write(next: DemoDB) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Sin espacio (fotos muy grandes) o modo privado: el cambio queda solo en memoria.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useDemoDB(): DemoDB {
  return useSyncExternalStore(subscribe, read, () => seedDB);
}

const now = () => new Date().toISOString();

export const demo = {
  saveProduct(product: Product) {
    const db = read();
    const exists = db.products.some((p) => p.id === product.id);
    const saved = { ...product, updatedAt: now() };
    write({
      ...db,
      products: exists ? db.products.map((p) => (p.id === product.id ? saved : p)) : [saved, ...db.products],
    });
    return saved;
  },
  patchProduct(id: string, patch: Partial<Product>) {
    const db = read();
    write({ ...db, products: db.products.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: now() } : p)) });
  },
  deleteProduct(id: string) {
    const db = read();
    write({ ...db, products: db.products.filter((p) => p.id !== id) });
  },
  duplicateProduct(id: string) {
    const db = read();
    const src = db.products.find((p) => p.id === id);
    if (!src) return null;
    const copy: Product = {
      ...structuredClone(src),
      id: `${src.id}-copia-${Date.now().toString(36)}`,
      sku: `${src.sku}-C`,
      name: `${src.name} (copia)`,
      published: false,
      featured: false,
      updatedAt: now(),
    };
    write({ ...db, products: [copy, ...db.products] });
    return copy;
  },
  addQuote(q: Omit<Quote, "id" | "createdAt" | "status">) {
    const db = read();
    const n = 1024 + db.quotes.length;
    const quote: Quote = { ...q, id: `C-${n}`, createdAt: now(), status: "nueva" };
    write({ ...db, quotes: [quote, ...db.quotes] });
    return quote;
  },
  setQuoteStatus(id: string, status: Quote["status"]) {
    const db = read();
    write({ ...db, quotes: db.quotes.map((q) => (q.id === id ? { ...q, status } : q)) });
  },
  saveSettings(settings: Settings) {
    write({ ...read(), settings });
  },
  addUser(user: Omit<User, "id" | "lastSeen">) {
    const db = read();
    write({ ...db, users: [...db.users, { ...user, id: `u${Date.now()}`, lastSeen: "" }] });
  },
  removeUser(id: string) {
    const db = read();
    write({ ...db, users: db.users.filter((u) => u.id !== id) });
  },
  reset() {
    write(structuredClone(seedDB));
  },
};

/** Precio por pieza según la cantidad (el nivel más alto alcanzado). */
export function priceFor(product: Product, qty: number) {
  let idx = 0;
  product.tiers.forEach((t, i) => {
    if (qty >= t.min) idx = i;
  });
  return { tierIndex: idx, unit: product.tiers[idx].price };
}

export const totalStock = (p: Product) => p.variants.reduce((s, v) => s + v.stock, 0);

export const mxn = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
