import Image from "next/image";
import { brand } from "@/lib/images";

/** Logotipo horizontal: león + nombre, armado a partir del logo original. */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={brand.logoDoradoLeon}
        alt=""
        className="h-full w-auto"
        sizes="80px"
        preload
      />
      {!compact && (
        <Image
          src={brand.logoDoradoTexto}
          alt="El Shaddai MZI Comercializadora"
          className="h-[62%] w-auto"
          sizes="220px"
          preload
        />
      )}
    </span>
  );
}
