import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  adjustFontFallback: false,
});
const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
});
const sans = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "El Shaddai MZI · Comercializadora de mayoreo por temporada en CDMX",
    template: "%s · El Shaddai MZI",
  },
  description:
    "Paraguas, mochilas escolares, luces y adornos navideños y juguetes al mayoreo. Surtimos a revendedores y negocios de todo México desde 2011, en el Centro de la Ciudad de México.",
  keywords: [
    "mayoreo CDMX",
    "luces navideñas mayoreo",
    "paraguas mayoreo",
    "mochilas escolares mayoreo",
    "juguetes mayoreo",
    "comercializadora Centro Histórico",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" data-scroll-behavior="smooth" suppressHydrationWarning className={`${display.variable} ${serif.variable} ${sans.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
