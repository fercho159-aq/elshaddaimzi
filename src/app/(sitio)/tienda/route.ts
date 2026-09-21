import { redirect } from "next/navigation";
import { featuredSeason, getSeason } from "@/lib/seasons";
import { site } from "@/lib/site";

/**
 * «Tienda en línea» lleva a la tienda del cliente que corresponde a la temporada en venta.
 * Con ?temporada=slug se puede pedir una en concreto.
 */
export function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("temporada");
  const season = (slug && getSeason(slug)) || featuredSeason(new Date());
  redirect(season.storeUrl ?? site.storeUrl);
}
