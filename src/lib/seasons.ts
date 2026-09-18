import { photos, products, type Photo } from "./images";

export type Clip = { src: string; poster: string; label: string };

export type Season = {
  slug: string;
  /** Nombre corto del producto estrella (menú, tarjetas). */
  name: string;
  /** Ocasión de venta. */
  occasion: string;
  months: string;
  /** Meses de venta, 1 = enero. Puede cruzar de año (p. ej. [12, 1]). */
  activeMonths: number[];
  /**
   * PENDIENTE: fecha recomendada para surtir antes del pico de venta del revendedor.
   * Alimenta la cuenta regresiva y el botón de WhatsApp.
   */
  stockBy: { month: number; day: number };
  hours: string;
  /** true = imágenes de producto recortado sobre blanco (no fotos de ambiente). */
  cutout: boolean;
  hero: Photo;
  cover: Photo;
  gallery: Photo[];
  productShots: Photo[];
  clips: Clip[];
  youtubeId?: string;
  /** Pregunta con la que abre el mensaje de WhatsApp. */
  whatsappMessage: string;
  headline: string;
  lead: string;
  categories: { title: string; text: string }[];
  reasons: { title: string; text: string }[];
  /** PENDIENTE: valores iniciales de la calculadora (costo de mayoreo y precio de venta sugerido, MXN). */
  calc: { cost: number; price: number };
};

const clip = (name: string, label: string): Clip => ({
  src: `/videos/${name}.mp4`,
  poster: `/videos/${name}.jpg`,
  label,
});

export const seasons: Season[] = [
  {
    slug: "luces-navidenas",
    name: "Luces y adornos navideños",
    occasion: "Navidad",
    months: "Octubre – Diciembre",
    activeMonths: [10, 11, 12],
    stockBy: { month: 11, day: 15 },
    hours: "Lunes a sábado · 9:00 a 19:00 h",
    cutout: false,
    calc: { cost: 90, price: 160 },
    hero: photos.lucesTienda,
    cover: photos.lucesPrecios,
    gallery: [
      photos.lucesPrecios,
      photos.lucesTienda,
      photos.lucesBastones,
      photos.lucesMuroNeon,
      photos.fachadaNavidad,
      photos.lucesEsferas,
      photos.lucesCalle,
      photos.lucesSeries,
    ],
    productShots: [photos.lucesPrecios, photos.lucesMuroNeon, photos.lucesBastones, photos.lucesEsferas],
    clips: [
      clip("luces-tienda", "Cortinas de luz"),
      clip("luces-estrellas", "Figuras luminosas"),
      clip("luces-neon", "Neón y espirales"),
      clip("series-luces", "Series LED"),
      clip("arboles-fabrica", "Árboles de Navidad"),
      clip("inflables", "Inflables"),
    ],
    whatsappMessage: "Buen día, me interesa cotizar luces y adornos navideños de mayoreo.",
    headline: "La Navidad se vende con luz. Surta a tiempo.",
    lead: "Series LED, cortinas, figuras luminosas, esferas, árboles e inflables a precio de mayoreo, para que su punto de venta brille desde octubre.",
    categories: [
      { title: "Series y cortinas LED", text: "Series de 140 a 300 luces, cortinas, cascadas y efecto musical." },
      { title: "Figuras luminosas", text: "Estrellas, copos, espirales y figuras tipo neón." },
      { title: "Esferas y adornos", text: "Esferas, bastones luminosos y guirnaldas de temporada." },
      { title: "Árboles e inflables", text: "Árboles de varios tamaños e inflables decorativos." },
    ],
    reasons: [
      { title: "Compra obligada", text: "Cada hogar y negocio renueva su decoración cada año." },
      { title: "Ticket alto", text: "El cliente compra varias piezas en una sola visita." },
      { title: "Rotación en semanas", text: "Noviembre y diciembre concentran la venta." },
    ],
  },
  {
    slug: "juguetes",
    name: "Juguetes",
    occasion: "Día de Reyes",
    months: "Diciembre – Enero",
    activeMonths: [12, 1],
    stockBy: { month: 12, day: 26 },
    hours: "Lunes a domingo · 9:00 a 18:00 h",
    cutout: true,
    calc: { cost: 110, price: 200 },
    hero: products.jugueteVolteoRojo,
    cover: products.juguetePeluche,
    gallery: [
      products.jugueteVolteoRojo,
      products.juguetePeluche,
      products.jugueteBloques,
      products.jugueteSetBebe,
      products.jugueteVolteoAmarillo,
    ],
    productShots: [
      products.jugueteVolteoRojo,
      products.juguetePeluche,
      products.jugueteBloques,
      products.jugueteSetBebe,
      products.jugueteVolteoAmarillo,
    ],
    clips: [],
    whatsappMessage: "Buen día, me interesa cotizar juguetes de mayoreo para Día de Reyes.",
    headline: "Del 24 de diciembre al 6 de enero, el juguete no espera.",
    lead: "Vehículos, peluches, juguetes didácticos y para bebé a precio de mayoreo, para que su negocio llegue surtido a la temporada más fuerte del año.",
    categories: [
      { title: "Vehículos", text: "Camiones de volteo, carros y montables." },
      { title: "Peluches y didácticos", text: "Peluches interactivos y juguetes de aprendizaje." },
      { title: "Construcción", text: "Bloques y juegos de armar." },
      { title: "Para bebé", text: "Sets de estimulación y primeros juguetes." },
    ],
    reasons: [
      { title: "Dos fechas pico", text: "Navidad y Día de Reyes en menos de dos semanas." },
      { title: "Compra emocional", text: "Nadie deja a un niño sin regalo." },
      { title: "Venta en todo canal", text: "Local, tianguis, bazar o redes sociales." },
    ],
  },
  {
    slug: "paraguas",
    name: "Paraguas",
    occasion: "Temporada de lluvias",
    months: "Enero – Septiembre",
    activeMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    stockBy: { month: 5, day: 31 },
    hours: "Lunes a sábado · 9:00 a 18:00 h",
    cutout: false,
    calc: { cost: 35, price: 70 },
    hero: photos.paraguasPasillo,
    cover: photos.paraguasColores,
    gallery: [
      photos.paraguasPasillo,
      photos.paraguasColores,
      photos.paraguasMuro,
      photos.paraguasBodega1,
      photos.paraguasBodega2,
      photos.paraguasBodega3,
      photos.paraguasBodega4,
      photos.paraguasBodega5,
    ],
    productShots: [photos.paraguasColores, photos.paraguasBodega3, photos.paraguasMuro, photos.paraguasBodega4],
    clips: [clip("paraguas-telas", "Así se fabrica un paraguas")],
    youtubeId: "XHOmBV4js_E",
    whatsappMessage: "Buen día, me interesa cotizar paraguas de mayoreo.",
    headline: "Cuando llueve, el que tiene paraguas vende.",
    lead: "Paraguas jumbo, plegables, de bastón, infantiles y con protección UV al mejor precio de mayoreo, para vender en comercio formal o informal.",
    categories: [
      { title: "Bastón y jumbo", text: "Resistentes, de gran cobertura y alta demanda." },
      { title: "Plegables", text: "Compactos, para bolsa y mochila." },
      { title: "Infantiles", text: "Estampados y personajes que se venden solos." },
      { title: "Protección UV", text: "Para sol y lluvia, venta todo el año." },
    ],
    reasons: [
      { title: "Necesidad inmediata", text: "Con el primer aguacero, la venta se multiplica." },
      { title: "Temporada larga", text: "Meses de venta continua entre lluvias y sol." },
      { title: "Fácil de exhibir", text: "Ocupa poco espacio y se vende en cualquier punto." },
    ],
  },
  {
    slug: "mochilas",
    name: "Mochilas escolares",
    occasion: "Regreso a clases",
    months: "Mayo – Agosto",
    activeMonths: [5, 6, 7, 8],
    stockBy: { month: 7, day: 15 },
    hours: "Lunes a sábado · 9:00 a 17:00 h",
    cutout: true,
    calc: { cost: 120, price: 220 },
    hero: products.mochilaMariposas,
    cover: products.mochilaInfantil,
    gallery: [
      products.mochilaMariposas,
      products.mochilaInfantil,
      products.mochilaEstampada,
      products.mochilaAzul,
      products.mochilaMarino,
    ],
    productShots: [
      products.mochilaMariposas,
      products.mochilaInfantil,
      products.mochilaEstampada,
      products.mochilaAzul,
      products.mochilaMarino,
    ],
    clips: [],
    whatsappMessage: "Buen día, me interesa cotizar mochilas escolares de mayoreo.",
    headline: "Cada ciclo escolar empieza con una mochila nueva.",
    lead: "Mochilas infantiles, juveniles y clásicas a precio de mayoreo, para que su negocio aproveche el regreso a clases desde mayo.",
    categories: [
      { title: "Infantiles", text: "Colores y estampados que eligen los niños." },
      { title: "Juveniles", text: "Diseños actuales para secundaria y preparatoria." },
      { title: "Clásicas", text: "Lisas y resistentes, para todos los niveles." },
      { title: "Estampadas", text: "Mariposas, figuras y diseños de temporada." },
    ],
    reasons: [
      { title: "Demanda asegurada", text: "Millones de estudiantes regresan a clases cada año." },
      { title: "Compra por familia", text: "Una mochila por cada hijo, cada ciclo." },
      { title: "Precio competitivo", text: "Su margen compite con cualquier tienda departamental." },
    ],
  },
];

export const getSeason = (slug: string) => seasons.find((s) => s.slug === slug);

/** Próxima fecha límite de surtido (hoy o posterior) para una temporada. */
export function nextStockDate(season: Season, now: Date): Date {
  const y = now.getFullYear();
  const candidate = new Date(y, season.stockBy.month - 1, season.stockBy.day, 23, 59, 59);
  return candidate >= now ? candidate : new Date(y + 1, season.stockBy.month - 1, season.stockBy.day, 23, 59, 59);
}

/** Temporada destacada: la que tiene la fecha de surtido más próxima. */
export function featuredSeason(now: Date): Season {
  return [...seasons].sort((a, b) => +nextStockDate(a, now) - +nextStockDate(b, now))[0];
}

export function daysUntil(date: Date, now: Date): number {
  return Math.max(0, Math.ceil((+date - +now) / 86_400_000));
}

export const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
export const monthNamesLong = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
