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
- [x] Tiendas en línea: `elshaddaimzi.sicarx.shop` (paraguas) y `elshaddaimzinavidad.sicarx.shop` (luces),
      confirmadas por el cliente el 21/09/2026.
- [ ] Tiendas en línea de juguetes y mochilas, si existen (hoy esas temporadas no muestran botón de compra).
- [ ] ¿Se conserva el catálogo de `anegocios.com.mx`? Ya no se enlaza desde el sitio.
- [ ] Google Analytics `G-BR1HGBMXZD`: confirmar si se conserva (aún no está instalado) y si se agrega el píxel de Meta.

## Temporadas (`src/lib/seasons.ts`)

- [ ] Meses de venta y fechas de surtido de cada temporada: el cliente las confirma esta semana.
      De ellas depende qué temporada destaca el home y la cuenta regresiva.
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

## Panel

- [ ] Catálogo real: productos, SKU, precios de los tres niveles, piezas por caja y existencias
      (hoy son datos de demostración en `src/lib/demo/seed.ts`).
- [ ] Pedido mínimo de mayoreo real (demo: $1,500).
- [ ] El manual y el video incluyen una sección del cotizador, que ya salió del sitio: hay que regenerarlos
      (`../manual`) cuando se cierren estos puntos.
- [ ] Si el panel pasa a producción: base de datos, almacenamiento de fotos y usuarios con contraseña propia.

## Publicación

- [ ] Repositorio en GitHub y proyecto en Vercel.
- [ ] Apuntar el DNS de `elshaddaimzi.com` (Hostinger) a Vercel **conservando los registros MX** si hay correo
      en ese dominio.
- [ ] Eliminar del hosting anterior `public_html/.htaccess.zip` (respaldo completo de 788 MB con `wp-config.php`).
