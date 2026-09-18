import type { MetadataRoute } from "next";
import { seasons } from "@/lib/seasons";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/temporadas", "/cotizador", "/distribuidores", "/nosotros", "/contacto"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...seasons.map((s) => ({ url: `${site.url}/temporadas/${s.slug}`, lastModified: now, priority: 0.9 })),
  ];
}
