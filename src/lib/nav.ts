import { getSeason } from "./seasons";

export const mainNav = [
  { href: "/", label: "Inicio", mobileOnly: true },
  { href: "/temporadas", label: "Temporadas", mega: true },
  { href: "/tienda", label: "Tienda en línea", externa: true },
  { href: "/distribuidores", label: "Distribuidores" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Mensaje prellenado de WhatsApp según la página que se está viendo. */
export function messageForPath(pathname: string) {
  const slug = pathname.match(/^\/temporadas\/([^/]+)/)?.[1];
  const season = slug ? getSeason(slug) : undefined;
  if (season) return season.whatsappMessage;
  if (pathname.startsWith("/distribuidores"))
    return "Buen día, me interesa ser distribuidor. ¿Me comparte condiciones y precios de mayoreo?";
  if (pathname.startsWith("/contacto")) return "Buen día, deseo recibir atención de un asesor de ventas.";
  return "Buen día, me interesa conocer sus precios de mayoreo de temporada.";
}
