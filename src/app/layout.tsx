import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import { whatsappNumber } from "@/lib/whatsapp";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image.jpg`,
  foundingDate: String(site.foundedYear),
  telephone: `+${whatsappNumber}`,
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Ciudad de México",
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: `${String(site.hours.open).padStart(2, "0")}:00`,
      closes: `${String(site.hours.close).padStart(2, "0")}:00`,
    },
  ],
  sameAs: Object.values(site.social),
  areaServed: "MX",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" suppressHydrationWarning className={`${display.variable} ${serif.variable} ${sans.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 font-bold text-ink focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
