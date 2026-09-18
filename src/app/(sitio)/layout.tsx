import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import { whatsappNumber } from "@/lib/whatsapp";

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

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
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
    </>
  );
}
