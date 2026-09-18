import { site } from "./site";

export const whatsappNumber = `52${site.whatsapp}`;

export function whatsappUrl(message = "Buen día, me interesa conocer sus precios de mayoreo.") {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const phoneHref = `tel:+52${site.phone}`;

export function formatPhone(n: string) {
  return `${n.slice(0, 2)} ${n.slice(2, 6)} ${n.slice(6)}`;
}

/** Estado de atención según el horario en CDMX. */
export function businessStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hours.timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) + Number(get("minute")) / 60;
  const open = (site.hours.days as readonly number[]).includes(day) && hour >= site.hours.open && hour < site.hours.close;
  return { open };
}
