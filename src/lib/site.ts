/**
 * Datos centrales del negocio.
 * Todo lo marcado con `PENDIENTE` debe confirmarse con el cliente (ver PENDIENTES.md).
 */
export const site = {
  name: "El Shaddai MZI",
  legalName: "Comercializadora El Shaddai MZI",
  tagline: "Comercializadora mexicana de mayoreo por temporada",
  url: "https://elshaddaimzi.com",
  foundedYear: 2011,

  // PENDIENTE: confirmar número de WhatsApp de ventas (sin prefijo; se agrega 52 al armar el enlace).
  whatsapp: "5562963430",
  // PENDIENTE: confirmar teléfono fijo.
  phone: "5515591982",

  address: {
    street: "Plaza del Estudiante, Manuel de la Peña y Peña",
    neighborhood: "Centro",
    city: "Cuauhtémoc, Ciudad de México",
    postalCode: "06020",
    region: "CDMX",
    country: "MX",
    geo: { lat: 19.4402711, lng: -99.1284538 },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Comercializadora+%C3%89L+SHADDAI+Plaza+del+Estudiante+CDMX",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.3546329478677!2d-99.1284538!3d19.4402711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f9ff6d0cd4d3%3A0xe97416a56c4c70ca!2sComercializadora%20%C3%89L%20SHADDAI!5e0!3m2!1ses-419!2smx!4v1726720640543!5m2!1ses-419!2smx",
  },

  // PENDIENTE: el sitio anterior mostraba horarios distintos por página. Se usa Lun–Sáb 9:00–18:00.
  // days: 0 = domingo … 6 = sábado. Horas en formato 24 h, zona horaria de CDMX.
  hours: {
    timezone: "America/Mexico_City",
    days: [1, 2, 3, 4, 5, 6],
    open: 9,
    close: 18,
    label: "Lunes a sábado · 9:00 a 18:00 h",
  },

  // Tiendas en línea del cliente (una por temporada). PENDIENTE: las de juguetes y mochilas.
  catalogUrl: "https://anegocios.com.mx/98/COMERCIALIZADORA_EL_SHADDAI",
  storeUrl: "https://elshaddaimzi.sicarx.shop",
  storeUrlNavidad: "https://elshaddaimzinavidad.sicarx.shop",

  // PENDIENTE: existen dos juegos de cuentas (el_shaddai_919 y el_shaddai_mx). Confirmar vigentes.
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61564988111141",
    instagram: "https://www.instagram.com/el_shaddai_919/",
    tiktok: "https://www.tiktok.com/@el.shaddai919",
    youtube: "https://www.youtube.com/watch?v=VABPbsD6kJE",
  },

  // PENDIENTE: confirmar ID de Google Analytics 4 (encontrado en el sitio anterior).
  gaId: "G-BR1HGBMXZD",
} as const;

export type Site = typeof site;
