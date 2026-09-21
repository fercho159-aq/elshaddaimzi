"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, LogOut, RotateCcw } from "lucide-react";
import { brand } from "@/lib/images";
import { demo } from "@/lib/demo/store";

export const SESSION_KEY = "elshaddai-admin-session";
/** Contraseña de la demostración. En producción: autenticación real en el servidor. */
export const DEMO_PASSWORD = "shaddai2026";

const nav = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/cotizaciones", label: "Cotizaciones" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/configuracion", label: "Configuración" },
];

/** Se vuelve a leer en cada cambio de ruta: el layout del panel no se desmonta al pasar del login al resumen. */
function useSession(pathname: string) {
  const [state, setState] = useState<{ path: string; value: "si" | "no" } | null>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      let ok = false;
      try {
        ok = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {}
      setState({ path: pathname, value: ok ? "si" : "no" });
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);
  // Una sesión válida se conserva al navegar; un "no" leído en otra ruta (p. ej. el login) se vuelve a verificar.
  if (!state) return "cargando";
  if (state.value === "si") return "si";
  return state.path === pathname ? "no" : "cargando";
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession(pathname);
  const isLogin = pathname === "/admin/entrar";

  useEffect(() => {
    if (!isLogin && session === "no") router.replace("/admin/entrar");
  }, [isLogin, session, router]);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <div className="adm min-h-dvh bg-[#F4F1EA] font-sans text-ink">
      {isLogin ? (
        children
      ) : session !== "si" ? (
        <div className="grid min-h-dvh place-items-center text-sm text-ink/50">Cargando panel…</div>
      ) : (
        <>
          <header className="adm-top sticky top-0 z-40 border-b border-ink/10 bg-ink text-cream">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
              <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
                <Image src={brand.logoDoradoLeon} alt="" className="h-9 w-auto" sizes="40px" />
                <span className="leading-tight">
                  <span className="block text-sm font-extrabold">El Shaddai</span>
                  <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-gold">Panel</span>
                </span>
              </Link>
              <nav aria-label="Panel" className="no-scrollbar hidden flex-1 items-center gap-1 overflow-x-auto md:flex">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${
                      isActive(n.href) ? "bg-gold text-ink" : "text-cream/75 hover:bg-cream/10 hover:text-cream"
                    }`}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-auto flex items-center gap-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener"
                  className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-cream/75 hover:text-cream sm:inline-flex"
                >
                  Ver sitio <ArrowUpRight className="size-4" />
                </a>
                <span className="hidden rounded-full border border-gold/40 px-3 py-1 text-xs font-bold text-gold lg:inline">
                  Super administrador
                </span>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem(SESSION_KEY);
                    } catch {}
                    // Recarga completa a propósito: descarta el estado de sesión que guarda este layout.
                    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                    window.location.assign("/admin/entrar");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-cream/75 hover:text-cream"
                >
                  <LogOut className="size-4" /> Salir
                </button>
              </div>
            </div>
            <nav aria-label="Panel (celular)" className="no-scrollbar flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold ${
                    isActive(n.href) ? "bg-gold text-ink" : "bg-cream/10 text-cream/80"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="adm-demo border-b border-gold/30 bg-gold/15">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-ink/80 sm:px-6">
              <p>
                <b>Modo demostración.</b> Los cambios se guardan solo en este navegador.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm("¿Restablecer todos los datos de la demostración?")) demo.reset();
                }}
                className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline"
              >
                <RotateCcw className="size-3.5" /> Restablecer datos
              </button>
            </div>
          </div>

          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
        </>
      )}
    </div>
  );
}
