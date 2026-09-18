# El Shaddai MZI · Sitio web

Rediseño de [elshaddaimzi.com](https://elshaddaimzi.com): comercializadora de mayoreo por temporada en el Centro de la CDMX.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · Embla Carousel · lucide-react
- **Despliegue:** GitHub → Vercel (sin variables de entorno requeridas)
- **Enfoque:** mobile first, mega menú en escritorio, menú vertical en móvil, WhatsApp con urgencia real

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run lint
```

## Estructura

```
src/
  app/(sitio)/            Sitio público (home, temporadas, cotizador, distribuidores, nosotros, contacto)
  app/admin/              Panel de administración (demo)
  components/
    SiteHeader.tsx        Barra de anuncios, mega menú (escritorio) y panel vertical (móvil)
    WhatsAppFloat.tsx     Botón flotante con cuenta regresiva de temporada y estado de horario
    carousels/            HeroStories (portada tipo stories), Rail (carril genérico), Reels (videos)
    ProfitCalculator.tsx  Calculadora de ganancia (bloque "Deseo" de AIDA)
    SeasonCalendar.tsx    Calendario del revendedor (12 meses × 4 temporadas)
    blocks.tsx            PageHero, SeasonCard, Gallery, testimonios, tarjetas de producto
  lib/
    site.ts               Datos del negocio (teléfonos, horario, dirección, redes)  ← editar aquí
    seasons.ts            Temporadas: textos, fotos, fechas de surtido, calculadora  ← editar aquí
    catalog.ts            Productos de muestra de los carriles
    images.ts             Importación de fotos (optimización automática con next/image)
  assets/images/          Fotos y logotipo (tomados del respaldo del sitio anterior)
public/videos/            Clips verticales (9 s, sin audio) y sus pósters
```

## Estrategia de contenido

- **Home · PASTOR** (tono formal, de "usted"): Problema → Amplificación → Solución/Historia → Transformación y
  testimonios → Oferta → Respuesta.
- **Páginas internas · AIDA:** Atención (portada con cuenta regresiva) → Interés (por qué vender, categorías) →
  Deseo (calculadora, galería, videos, testimonios) → Acción (WhatsApp con mensaje prellenado).

## Temporada destacada y urgencia

La temporada destacada es la que tiene la **fecha recomendada de surtido** más próxima (`stockBy` en
`src/lib/seasons.ts`). Las páginas que dependen de la fecha se regeneran cada hora (ISR). La urgencia usa solo
datos verdaderos: días a esa fecha y horario real de atención (`site.hours`). No hay contadores falsos.

## Cotizador y panel de administración (demostración)

- **`/cotizador`**: el cliente elige productos y cantidades; el precio por pieza baja por niveles
  (menudeo, mayoreo y volumen), sugiere cuántas piezas faltan para el siguiente nivel y envía la cotización por
  WhatsApp.
- **`/admin`** (contraseña de demostración `shaddai2026`): resumen, productos (alta, edición, duplicar, eliminar,
  precios por volumen, presentaciones y existencias, foto), cotizaciones recibidas, usuarios y perfiles, y
  configuración.
- Es un **demo sin servidor**: los datos viven en el `localStorage` del navegador (`src/lib/demo/store.ts`), por eso
  lo que se cambia en el panel se ve al instante en el cotizador del mismo navegador. Para producción se sustituye
  por una base de datos y autenticación reales (p. ej. Neon + Vercel Blob), sin cambiar las pantallas.

## SEO

Metadatos por página, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD `WholesaleStore` y redirecciones 301 desde
las URLs del WordPress anterior (`/octubre-diciembre`, `/junio-septiembre`, etc.) en `next.config.ts`.

Consulte [PENDIENTES.md](PENDIENTES.md) para los datos que faltan confirmar con el cliente.
