import type { StaticImageData } from "next/image";

import logoDorado from "@/assets/images/marca/logo-dorado.png";
import logoDoradoLeon from "@/assets/images/marca/logo-dorado-leon.png";
import logoDoradoTexto from "@/assets/images/marca/logo-dorado-texto.png";
import logoCrema from "@/assets/images/marca/logo-crema.png";

import fachadaNavidad from "@/assets/images/bodega/fachada-navidad.jpg";

import paraguasPasillo from "@/assets/images/paraguas/pasillo.jpg";
import paraguasMuro from "@/assets/images/paraguas/muro.jpg";
import paraguasColores from "@/assets/images/paraguas/colores.jpg";
import paraguasBodega1 from "@/assets/images/paraguas/bodega-1.jpg";
import paraguasBodega2 from "@/assets/images/paraguas/bodega-2.jpg";
import paraguasBodega3 from "@/assets/images/paraguas/bodega-3.jpg";
import paraguasBodega4 from "@/assets/images/paraguas/bodega-4.jpg";
import paraguasBodega5 from "@/assets/images/paraguas/bodega-5.jpg";

import lucesTienda from "@/assets/images/luces/tienda.jpg";
import lucesBastones from "@/assets/images/luces/bastones.jpg";
import lucesPrecios from "@/assets/images/luces/precios-mayoreo.jpg";
import lucesMuroNeon from "@/assets/images/luces/muro-neon.jpg";
import lucesCalle from "@/assets/images/luces/calle.jpg";
import lucesClienta from "@/assets/images/luces/clienta.jpg";
import lucesEsferas from "@/assets/images/luces/esferas.jpg";
import lucesSeries from "@/assets/images/luces/series.jpg";

import mochilaAzul from "@/assets/images/mochilas/mochila-azul-cielo.jpg";
import mochilaMariposas from "@/assets/images/mochilas/mochila-mariposas.jpg";
import mochilaMarino from "@/assets/images/mochilas/mochila-marino.jpg";
import mochilaEstampada from "@/assets/images/mochilas/mochila-estampada.jpg";
import mochilaInfantil from "@/assets/images/mochilas/mochila-infantil.jpg";

import juguetePeluche from "@/assets/images/juguetes/peluche-didactico.jpg";
import jugueteSetBebe from "@/assets/images/juguetes/set-bebe.jpg";
import jugueteVolteoRojo from "@/assets/images/juguetes/volteo-rojo.jpg";
import jugueteVolteoAmarillo from "@/assets/images/juguetes/volteo-amarillo.jpg";
import jugueteBloques from "@/assets/images/juguetes/bloques.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const brand = { logoDorado, logoDoradoLeon, logoDoradoTexto, logoCrema };

export const photos = {
  fachadaNavidad: { src: fachadaNavidad, alt: "Fachada de El Shaddai MZI con su letrero de temporada navideña" },
  paraguasPasillo: { src: paraguasPasillo, alt: "Pasillo de la bodega con paraguas colgados del techo al piso" },
  paraguasMuro: { src: paraguasMuro, alt: "Muro de paraguas de colores listos para mayoreo" },
  paraguasColores: { src: paraguasColores, alt: "Paraguas de colores y estampados en exhibición" },
  paraguasBodega1: { src: paraguasBodega1, alt: "Exhibición de paraguas por modelo en la bodega" },
  paraguasBodega2: { src: paraguasBodega2, alt: "Paraguas y carritos de mandado en la bodega" },
  paraguasBodega3: { src: paraguasBodega3, alt: "Paraguas de bastón y plegables organizados por color" },
  paraguasBodega4: { src: paraguasBodega4, alt: "Paraguas de bastón en exhibición" },
  paraguasBodega5: { src: paraguasBodega5, alt: "Surtido de paraguas y carritos en la bodega" },
  lucesTienda: { src: lucesTienda, alt: "Tienda llena de series y cortinas de luces navideñas encendidas" },
  lucesBastones: { src: lucesBastones, alt: "Bastones luminosos y luces navideñas con precio de mayoreo" },
  lucesPrecios: { src: lucesPrecios, alt: "Series de luces con etiquetas de precio de mayoreo escritas a mano" },
  lucesMuroNeon: { src: lucesMuroNeon, alt: "Muro de figuras luminosas tipo neón" },
  lucesCalle: { src: lucesCalle, alt: "Calle del Centro iluminada con adornos navideños" },
  lucesClienta: { src: lucesClienta, alt: "Clienta eligiendo figuras luminosas" },
  lucesEsferas: { src: lucesEsferas, alt: "Esferas y adornos navideños en oferta" },
  lucesSeries: { src: lucesSeries, alt: "Series de luces y adornos navideños colgados" },
} satisfies Record<string, Photo>;

export const products = {
  mochilaAzul: { src: mochilaAzul, alt: "Mochila escolar azul cielo" },
  mochilaMariposas: { src: mochilaMariposas, alt: "Mochila lila con mariposas" },
  mochilaMarino: { src: mochilaMarino, alt: "Mochila azul marino" },
  mochilaEstampada: { src: mochilaEstampada, alt: "Mochila con estampado azul" },
  mochilaInfantil: { src: mochilaInfantil, alt: "Mochila infantil azul con naranja" },
  juguetePeluche: { src: juguetePeluche, alt: "Peluche didáctico" },
  jugueteSetBebe: { src: jugueteSetBebe, alt: "Set de juguetes para bebé" },
  jugueteVolteoRojo: { src: jugueteVolteoRojo, alt: "Camión de volteo rojo con amarillo" },
  jugueteVolteoAmarillo: { src: jugueteVolteoAmarillo, alt: "Camión de volteo amarillo" },
  jugueteBloques: { src: jugueteBloques, alt: "Bloques de madera de colores" },
} satisfies Record<string, Photo>;
