import Image from "next/image";
import { Button, Container, WhatsAppButton } from "@/components/ui";
import { brand } from "@/lib/images";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90svh] items-center overflow-hidden pt-32">
      <Image
        src={brand.logoDoradoLeon}
        alt=""
        className="pointer-events-none absolute -right-24 top-1/2 h-[80%] w-auto -translate-y-1/2 opacity-[0.07]"
        sizes="700px"
      />
      <Container className="relative">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-4 text-6xl sm:text-8xl">
          Esta página <span className="gold-text">no está en bodega</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-cream/75">
          Es posible que la dirección haya cambiado. Le invitamos a volver al inicio o a escribirnos directamente.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Volver al inicio
          </Button>
          <WhatsAppButton size="lg" label="Escribir por WhatsApp" />
        </div>
      </Container>
    </section>
  );
}
