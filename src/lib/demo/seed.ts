import { photos, products as cutouts } from "../images";
import { site } from "../site";
import type { DemoDB, Product, Tier } from "./types";

/**
 * Datos de demostración. PENDIENTE: sustituir por el catálogo y los precios reales del cliente.
 * Los precios de las series de luces salen de las etiquetas de la bodega (p. ej. 300 luces 6 m a $90 de mayoreo).
 */
const T = (a: [number, number], b: [number, number], c: [number, number]): [Tier, Tier, Tier] => [
  { min: a[0], price: a[1] },
  { min: b[0], price: b[1] },
  { min: c[0], price: c[1] },
];

const v = (...names: [string, number][]) => names.map(([name, stock], i) => ({ id: `v${i + 1}`, name, stock }));

const UPDATED = "2026-09-15T10:00:00.000Z";

const p = (x: Omit<Product, "published" | "featured" | "updatedAt"> & Partial<Product>): Product => ({
  published: true,
  featured: false,
  updatedAt: UPDATED,
  ...x,
});

export const seedProducts: Product[] = [
  p({
    id: "luz-300-6m", sku: "HZ8072B", name: "Serie LED 300 luces", season: "luces-navidenas", category: "Series LED",
    size: "6 m · 300 luces", material: "Cable PVC, LED", cutout: false, image: photos.lucesPrecios.src.src, piecesPerBox: 50,
    description: "Serie de 300 luces LED de 6 metros con 8 efectos. Ideal para árboles, fachadas y aparadores.",
    tiers: T([1, 120], [12, 90], [100, 80]), variants: v(["Multicolor", 240], ["Blanco cálido", 180], ["Blanco frío", 96]), featured: true,
  }),
  p({
    id: "luz-300-15m", sku: "CA1013C", name: "Serie LED 300 luces larga", season: "luces-navidenas", category: "Series LED",
    size: "15 m · 300 luces", material: "Cable PVC, LED", cutout: false, image: photos.lucesTienda.src.src, piecesPerBox: 40,
    description: "Serie de 15 metros para cubrir fachadas y árboles grandes sin empalmes.",
    tiers: T([1, 130], [12, 100], [100, 88]), variants: v(["Multicolor", 160], ["Blanco cálido", 7]),
  }),
  p({
    id: "luz-musical-140", sku: "YK-5140BL", name: "Serie musical 140 luces", season: "luces-navidenas", category: "Series LED",
    size: "7 m · 140 luces", material: "Cable PVC, LED", cutout: false, image: photos.lucesSeries.src.src, piecesPerBox: 60,
    description: "Serie con melodías navideñas y control de efectos. Uno de los modelos de mayor rotación.",
    tiers: T([1, 70], [12, 50], [100, 44]), variants: v(["Multicolor", 300], ["Azul", 0]),
  }),
  p({
    id: "figura-neon", sku: "FN-220", name: "Figura luminosa tipo neón", season: "luces-navidenas", category: "Figuras luminosas",
    size: "45 cm de diámetro", material: "Manguera LED flexible", cutout: false, image: photos.lucesMuroNeon.src.src, piecesPerBox: 12,
    description: "Espirales, estrellas y copos con luz tipo neón. Muy vistosas en aparador.",
    tiers: T([1, 250], [6, 199], [48, 175]), variants: v(["Espiral", 36], ["Estrella", 24], ["Copo", 5]), featured: true,
  }),
  p({
    id: "baston-luminoso", sku: "BL-130", name: "Bastón luminoso", season: "luces-navidenas", category: "Adornos",
    size: "60 cm", material: "Plástico y LED", cutout: false, image: photos.lucesBastones.src.src, piecesPerBox: 24,
    description: "Bastón de caramelo iluminado para jardines, entradas y decoración de negocios.",
    tiers: T([1, 160], [6, 130], [48, 115]), variants: v(["Rojo y blanco", 72]),
  }),
  p({
    id: "esferas-12", sku: "ES-12", name: "Esferas navideñas (caja de 12)", season: "luces-navidenas", category: "Adornos",
    size: "8 cm · 12 piezas", material: "Plástico irrompible", cutout: false, image: photos.lucesEsferas.src.src, piecesPerBox: 24,
    description: "Caja con 12 esferas irrompibles en acabados brillante y mate.",
    tiers: T([1, 45], [12, 32], [120, 27]), variants: v(["Rojo", 120], ["Dorado", 90], ["Plata", 60]),
  }),
  p({
    id: "paraguas-baston", sku: "PB-60", name: "Paraguas de bastón", season: "paraguas", category: "Paraguas",
    size: "Cobertura 105 cm", material: "Poliéster y varilla de fibra", cutout: false, image: photos.paraguasBodega4.src.src, piecesPerBox: 60,
    description: "Paraguas clásico de bastón, resistente al viento. El de mayor venta en temporada de lluvias.",
    tiers: T([1, 90], [12, 65], [120, 55]), variants: v(["Negro", 420], ["Azul marino", 180], ["Estampado", 90]), featured: true,
  }),
  p({
    id: "paraguas-plegable", sku: "PP-3", name: "Paraguas plegable", season: "paraguas", category: "Paraguas",
    size: "Cerrado 28 cm", material: "Poliéster", cutout: false, image: photos.paraguasBodega3.src.src, piecesPerBox: 80,
    description: "Compacto, cabe en bolsa y mochila. Disponible en colores lisos y estampados.",
    tiers: T([1, 70], [12, 45], [120, 38]), variants: v(["Lisos surtidos", 640], ["Estampados", 210]),
  }),
  p({
    id: "paraguas-infantil", sku: "PI-45", name: "Paraguas infantil estampado", season: "paraguas", category: "Paraguas",
    size: "Cobertura 80 cm", material: "Poliéster, puntas protegidas", cutout: false, image: photos.paraguasColores.src.src, piecesPerBox: 60,
    description: "Diseños con personajes y colores que eligen los niños. Puntas redondeadas de seguridad.",
    tiers: T([1, 80], [12, 55], [120, 48]), variants: v(["Surtido", 350]),
  }),
  p({
    id: "paraguas-jumbo", sku: "PJ-130", name: "Paraguas jumbo", season: "paraguas", category: "Paraguas",
    size: "Cobertura 130 cm", material: "Poliéster doble capa", cutout: false, image: photos.paraguasMuro.src.src, piecesPerBox: 30,
    description: "Gran cobertura para dos personas. Doble capa antiviento.",
    tiers: T([1, 150], [12, 110], [60, 95]), variants: v(["Negro", 8], ["Azul", 40]),
  }),
  p({
    id: "mochila-mariposas", sku: "MO-201", name: "Mochila con mariposas", season: "mochilas", category: "Infantil",
    size: "40 × 30 × 14 cm", material: "Poliéster 600D", cutout: true, image: cutouts.mochilaMariposas.src.src, piecesPerBox: 20,
    description: "Mochila escolar lila con estampado de mariposas y aplicación 3D.",
    tiers: T([1, 280], [12, 220], [60, 195]), variants: v(["Lila", 64]), featured: true,
  }),
  p({
    id: "mochila-infantil", sku: "MO-202", name: "Mochila infantil", season: "mochilas", category: "Infantil",
    size: "38 × 28 × 12 cm", material: "Poliéster 600D", cutout: true, image: cutouts.mochilaInfantil.src.src, piecesPerBox: 20,
    description: "Azul con detalles naranjas, respaldo acolchado y bolsa lateral.",
    tiers: T([1, 260], [12, 205], [60, 180]), variants: v(["Azul / naranja", 48]),
  }),
  p({
    id: "mochila-estampada", sku: "MO-305", name: "Mochila estampada", season: "mochilas", category: "Juvenil",
    size: "45 × 32 × 15 cm", material: "Poliéster", cutout: true, image: cutouts.mochilaEstampada.src.src, piecesPerBox: 20,
    description: "Estampado actual para secundaria y preparatoria, con porta laptop.",
    tiers: T([1, 320], [12, 250], [60, 225]), variants: v(["Azul estampado", 3]),
  }),
  p({
    id: "mochila-azul", sku: "MO-110", name: "Mochila clásica azul cielo", season: "mochilas", category: "Clásica",
    size: "42 × 30 × 14 cm", material: "Poliéster", cutout: true, image: cutouts.mochilaAzul.src.src, piecesPerBox: 25,
    description: "Lisa, ligera y resistente. Para todos los niveles.",
    tiers: T([1, 240], [12, 185], [60, 165]), variants: v(["Azul cielo", 90], ["Marino", 70]),
  }),
  p({
    id: "volteo-rojo", sku: "JG-501", name: "Camión de volteo", season: "juguetes", category: "Vehículos",
    size: "35 cm de largo", material: "Plástico resistente", cutout: true, image: cutouts.jugueteVolteoRojo.src.src, piecesPerBox: 12,
    description: "Camión con caja de volteo articulada. Uno de los favoritos para Día de Reyes.",
    tiers: T([1, 210], [6, 165], [48, 145]), variants: v(["Rojo / amarillo", 60]), featured: true,
  }),
  p({
    id: "peluche-didactico", sku: "JG-620", name: "Peluche didáctico", season: "juguetes", category: "Didácticos",
    size: "30 cm", material: "Felpa, con sonido", cutout: true, image: cutouts.juguetePeluche.src.src, piecesPerBox: 12,
    description: "Peluche con sonidos y luces que enseña colores y números.",
    tiers: T([1, 350], [6, 280], [48, 250]), variants: v(["Perrito", 24]),
  }),
  p({
    id: "bloques", sku: "JG-310", name: "Bloques de construcción", season: "juguetes", category: "Construcción",
    size: "40 piezas", material: "Madera pintada", cutout: true, image: cutouts.jugueteBloques.src.src, piecesPerBox: 24,
    description: "Set de bloques de madera de colores para armar.",
    tiers: T([1, 190], [6, 150], [48, 132]), variants: v(["Colores", 0]), published: false,
  }),
  p({
    id: "set-bebe", sku: "JG-120", name: "Set de juguetes para bebé", season: "juguetes", category: "Bebé",
    size: "5 piezas", material: "Plástico libre de BPA", cutout: true, image: cutouts.jugueteSetBebe.src.src, piecesPerBox: 18,
    description: "Set de primeros juguetes: aros apilables, osito y carrito.",
    tiers: T([1, 240], [6, 190], [48, 168]), variants: v(["Surtido", 36]),
  }),
];

export const seedDB: DemoDB = {
  version: 1,
  products: seedProducts,
  quotes: [
    {
      id: "C-1024", createdAt: "2026-09-16T17:20:00.000Z", customer: "Papelería La Estrella", phone: "5512345678", city: "Toluca",
      lines: [
        { productId: "mochila-mariposas", name: "Mochila con mariposas", sku: "MO-201", qty: 24, unitPrice: 220, tier: "Mayoreo" },
        { productId: "mochila-azul", name: "Mochila clásica azul cielo", sku: "MO-110", qty: 12, unitPrice: 185, tier: "Mayoreo" },
      ],
      total: 7500, status: "seguimiento",
    },
    {
      id: "C-1025", createdAt: "2026-09-17T12:05:00.000Z", customer: "Luis Hernández", phone: "2221234567", city: "Puebla",
      lines: [
        { productId: "luz-300-6m", name: "Serie LED 300 luces", sku: "HZ8072B", qty: 100, unitPrice: 80, tier: "Volumen" },
        { productId: "figura-neon", name: "Figura luminosa tipo neón", sku: "FN-220", qty: 12, unitPrice: 199, tier: "Mayoreo" },
      ],
      total: 10388, status: "nueva",
    },
    {
      id: "C-1026", createdAt: "2026-09-18T09:40:00.000Z", customer: "Regalos Mary", phone: "4421234567", city: "Querétaro",
      lines: [{ productId: "luz-musical-140", name: "Serie musical 140 luces", sku: "YK-5140BL", qty: 60, unitPrice: 50, tier: "Mayoreo" }],
      total: 3000, status: "nueva",
    },
  ],
  users: [
    { id: "u1", name: "Administración El Shaddai", email: "admin@elshaddaimzi.com", role: "super", lastSeen: "2026-09-18T10:00:00.000Z" },
    { id: "u2", name: "Ventas mostrador", email: "ventas@elshaddaimzi.com", role: "ventas", lastSeen: "2026-09-17T18:30:00.000Z" },
    { id: "u3", name: "Encargado de bodega", email: "bodega@elshaddaimzi.com", role: "admin", lastSeen: "2026-09-16T13:10:00.000Z" },
  ],
  settings: {
    whatsapp: site.whatsapp,
    phone: site.phone,
    hours: site.hours.label,
    minimumOrder: 1500,
    stockBy: { "luces-navidenas": "11-15", juguetes: "12-26", paraguas: "05-31", mochilas: "07-15" },
  },
};
