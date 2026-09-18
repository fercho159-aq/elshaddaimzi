import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl } from "@/lib/whatsapp";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "ghost" | "wa";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

const variants = {
  gold: "bg-gold text-ink hover:bg-gold-light shadow-[0_10px_30px_-10px_rgba(214,146,15,0.7)]",
  outline: "border border-cream/30 text-cream hover:border-gold hover:text-gold",
  ghost: "text-cream hover:text-gold",
  wa: "bg-wa text-ink hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)]",
};

export function Button({ href, children, variant = "gold", size = "md", className = "", external }: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide transition-all duration-300 active:scale-[0.97] ${
    size === "lg" ? "h-14 px-7 text-base" : "h-12 px-6 text-sm"
  } ${variants[variant]} ${className}`;
  const isExternal = external ?? /^https?:|^tel:|^mailto:/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  message,
  label = "Cotizar por WhatsApp",
  ...rest
}: { message?: string; label?: string } & Omit<ButtonProps, "href" | "children" | "variant">) {
  return (
    <Button href={whatsappUrl(message)} variant="wa" {...rest}>
      <WhatsAppIcon className="size-5" />
      {label}
    </Button>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-bold tracking-wide text-gold transition-colors hover:text-gold-light ${className}`}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`} data-reveal>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className="display text-[2.6rem] sm:text-6xl lg:text-7xl">{title}</Tag>
      {intro && <p className="mt-5 text-base leading-relaxed text-cream/75 sm:text-lg">{intro}</p>}
    </div>
  );
}

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`} {...props} />;
}

/** Aviso visible para contenido de ejemplo que debe reemplazarse. */
export function Pending({ children = "Contenido de ejemplo · pendiente de datos reales" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/60 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold/90">
      {children}
    </span>
  );
}
