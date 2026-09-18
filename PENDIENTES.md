# Pendientes con el cliente

Todo lo que hoy es provisional está marcado en el código con `PENDIENTE` y, cuando es visible, con la etiqueta
punteada "Ejemplo · reemplazar".

## Marca

- [ ] Logotipo en vector (SVG, AI, PDF o EPS). Hoy se usa el PNG de 1350 px separado en león + nombre.

## Datos del negocio (`src/lib/site.ts`)

- [ ] WhatsApp de ventas: ¿55 6296 3430?
- [ ] Teléfono fijo: ¿55 1559 1982?
- [ ] Horario real (el sitio anterior tenía uno distinto en cada página). Hoy: Lun–Sáb 9:00–18:00.
- [ ] Redes vigentes: `el_shaddai_919` o `el_shaddai_mx` (Instagram / TikTok) y cuál perfil de Facebook.
- [ ] Catálogo y tienda vigentes: `anegocios.com.mx` y `elshaddaimzi.sicarx.shop`.
- [ ] Google Analytics `G-BR1HGBMXZD`: confirmar si se conserva (aún no está instalado) y si se agrega el píxel de Meta.

## Temporadas (`src/lib/seasons.ts`)

- [ ] Meses de venta: paraguas "Enero–Septiembre" o "Junio–Septiembre".
- [ ] Fechas recomendadas para surtir (alimentan la cuenta regresiva y el botón de WhatsApp):
      luces 15 nov · juguetes 26 dic · paraguas 31 may · mochilas 15 jul.
- [ ] Horario por temporada.
- [ ] Valores de la calculadora (costo de mayoreo y precio de venta sugerido).
- [ ] Confirmar que "los modelos de mayor demanda se agotan primero" es un mensaje con el que el cliente está de acuerdo.

## Contenido

- [ ] 2 a 4 testimonios reales (nombre o negocio, ciudad, temporada y autorización para publicar).
- [ ] Preguntas frecuentes: compra mínima, formas de pago, paqueterías y tiempos de envío.
- [ ] Productos reales para los carriles (`src/lib/catalog.ts`).
- [ ] Verificar derechos de uso de: `luces/clienta.jpg`, `luces/muro-neon.jpg`, `luces/esferas.jpg`
      (parecen fotos de medios o de banco de imágenes tomadas del sitio anterior).
- [ ] Fotos nuevas: producto por temporada, bodega, equipo y luces encendidas (ideal: sesión en la bodega).

## Publicación

- [ ] Repositorio en GitHub y proyecto en Vercel.
- [ ] Apuntar el DNS de `elshaddaimzi.com` (Hostinger) a Vercel **conservando los registros MX** si hay correo
      en ese dominio.
- [ ] Eliminar del hosting anterior `public_html/.htaccess.zip` (respaldo completo de 788 MB con `wp-config.php`).
