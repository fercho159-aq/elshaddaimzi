import { photos, products, type Photo } from "./images";

export type CatalogItem = { name: string; season: string; slug: string; photo: Photo; cutout: boolean };

/** Muestra de productos para los carriles. PENDIENTE: sustituir por productos y fotos reales del catálogo. */
export const catalog: CatalogItem[] = [
  { name: "Series LED de 300 luces", season: "Navidad", slug: "luces-navidenas", photo: photos.lucesPrecios, cutout: false },
  { name: "Mochila con mariposas", season: "Regreso a clases", slug: "mochilas", photo: products.mochilaMariposas, cutout: true },
  { name: "Paraguas de colores", season: "Lluvias", slug: "paraguas", photo: photos.paraguasColores, cutout: false },
  { name: "Camión de volteo", season: "Día de Reyes", slug: "juguetes", photo: products.jugueteVolteoRojo, cutout: true },
  { name: "Figuras luminosas", season: "Navidad", slug: "luces-navidenas", photo: photos.lucesMuroNeon, cutout: false },
  { name: "Mochila infantil", season: "Regreso a clases", slug: "mochilas", photo: products.mochilaInfantil, cutout: true },
  { name: "Paraguas de bastón", season: "Lluvias", slug: "paraguas", photo: photos.paraguasBodega3, cutout: false },
  { name: "Peluche didáctico", season: "Día de Reyes", slug: "juguetes", photo: products.juguetePeluche, cutout: true },
  { name: "Bastones luminosos", season: "Navidad", slug: "luces-navidenas", photo: photos.lucesBastones, cutout: false },
  { name: "Bloques de construcción", season: "Día de Reyes", slug: "juguetes", photo: products.jugueteBloques, cutout: true },
];
