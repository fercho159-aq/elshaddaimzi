export type SeasonSlug = "luces-navidenas" | "juguetes" | "paraguas" | "mochilas";

/** Nivel de precio por volumen: a partir de `min` piezas, cada pieza cuesta `price`. */
export type Tier = { min: number; price: number };

export type Variant = { id: string; name: string; stock: number };

export type Product = {
  id: string;
  sku: string;
  name: string;
  season: SeasonSlug;
  category: string;
  /** Medidas o tamaño visibles para el cliente (p. ej. "6 m · 300 luces"). */
  size: string;
  material: string;
  description: string;
  /** URL de la foto: estática del sitio o data URL subida desde el panel. */
  image: string;
  /** true = foto de producto recortado sobre blanco. */
  cutout: boolean;
  piecesPerBox: number;
  /** Siempre tres niveles: menudeo, mayoreo y volumen. */
  tiers: [Tier, Tier, Tier];
  variants: Variant[];
  published: boolean;
  featured: boolean;
  updatedAt: string;
};

export type QuoteLine = { productId: string; name: string; sku: string; qty: number; unitPrice: number; tier: string };

export type QuoteStatus = "nueva" | "seguimiento" | "cerrada";

export type Quote = {
  id: string;
  createdAt: string;
  customer: string;
  phone: string;
  city: string;
  lines: QuoteLine[];
  total: number;
  status: QuoteStatus;
};

export type Role = "super" | "admin" | "ventas";

export type User = { id: string; name: string; email: string; role: Role; lastSeen: string };

export type Settings = {
  whatsapp: string;
  phone: string;
  hours: string;
  minimumOrder: number;
  stockBy: Record<SeasonSlug, string>;
};

export type DemoDB = {
  version: number;
  products: Product[];
  quotes: Quote[];
  users: User[];
  settings: Settings;
};

export const TIER_LABELS = ["Menudeo", "Mayoreo", "Volumen"] as const;
