"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { DEMO_PASSWORD, SESSION_KEY } from "@/components/admin/AdminShell";
import { inputCls } from "@/components/admin/ui";
import { brand } from "@/lib/images";

export default function LoginPage() {
  const router = useRouter();
  const [clave, setClave] = useState("");
  const [ver, setVer] = useState(false);
  const [error, setError] = useState("");

  const entrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (clave.trim() !== DEMO_PASSWORD) {
      setError("Contraseña incorrecta. Revise mayúsculas y espacios.");
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    router.replace("/admin");
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(214,146,15,0.25),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-cream">
          <Image src={brand.logoDorado} alt="El Shaddai MZI" className="h-40 w-auto self-start" sizes="200px" />
          <p className="voice max-w-md text-3xl leading-snug">Administre su catálogo de temporada, precios de mayoreo y cotizaciones desde un solo lugar.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-12">
        <form onSubmit={entrar} className="w-full max-w-sm" noValidate>
          <Image src={brand.logoDoradoLeon} alt="" className="mb-8 h-14 w-auto lg:hidden" sizes="60px" />
          <h1 className="display text-5xl">Panel El Shaddai</h1>
          <p className="mt-2 text-sm text-ink/60">Entre con la contraseña del panel.</p>

          <label htmlFor="clave" className="mb-1.5 mt-8 block text-xs font-bold text-ink/70">
            Contraseña
          </label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input
              id="clave"
              type={ver ? "text" : "password"}
              autoComplete="current-password"
              value={clave}
              aria-invalid={Boolean(error)}
              onChange={(e) => {
                setClave(e.target.value);
                setError("");
              }}
              className={`${inputCls} pl-10 pr-11`}
            />
            <button
              type="button"
              onClick={() => setVer((v) => !v)}
              aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-ink/50 hover:text-ink"
            >
              {ver ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {error && <p className="mt-2 text-xs font-bold text-[#B3261E]">{error}</p>}

          <button type="submit" className="btn-pri mt-6 h-12 w-full rounded-full bg-gold font-extrabold text-ink transition hover:bg-gold-light">
            Entrar
          </button>

          <p className="adm-demo mt-8 rounded-xl border border-dashed border-gold/60 bg-gold/10 p-3 text-xs text-ink/75">
            Demostración: la contraseña es <b className="font-mono">{DEMO_PASSWORD}</b>
          </p>
        </form>
      </div>
    </div>
  );
}
