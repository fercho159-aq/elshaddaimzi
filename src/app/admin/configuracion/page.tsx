"use client";

import { useState } from "react";
import { Btn, Card, Field, PageTitle, inputCls } from "@/components/admin/ui";
import { useMounted } from "@/components/admin/useMounted";
import { demo, useDemoDB } from "@/lib/demo/store";
import type { SeasonSlug, Settings } from "@/lib/demo/types";
import { seasons } from "@/lib/seasons";

function SettingsForm({ initial }: { initial: Settings }) {
  const [s, setS] = useState(initial);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const save = () => {
    if (!/^\d{10}$/.test(s.whatsapp)) {
      setMsg({ ok: false, text: "El WhatsApp debe tener 10 dígitos, sin espacios ni lada internacional." });
      return;
    }
    demo.saveSettings(s);
    setMsg({ ok: true, text: "Configuración guardada. El cotizador ya usa estos datos." });
  };
  const upd = (patch: Partial<Settings>) => {
    setS({ ...s, ...patch });
    setMsg(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-extrabold">Contacto y ventas</h2>
        <div className="mt-5 space-y-4">
          <Field label="WhatsApp de ventas" htmlFor="whatsapp" hint="10 dígitos. Aquí llegan las cotizaciones del sitio.">
            <input id="whatsapp" inputMode="numeric" value={s.whatsapp} onChange={(e) => upd({ whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })} className={`${inputCls} font-mono`} />
          </Field>
          <Field label="Teléfono" htmlFor="telefono">
            <input id="telefono" inputMode="numeric" value={s.phone} onChange={(e) => upd({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} className={`${inputCls} font-mono`} />
          </Field>
          <Field label="Horario de atención" htmlFor="horario">
            <input id="horario" value={s.hours} onChange={(e) => upd({ hours: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Pedido mínimo de mayoreo (MXN)" htmlFor="minimo" hint="El cotizador avisa al cliente si su pedido no lo alcanza.">
            <input id="minimo" type="number" min={0} value={s.minimumOrder} onChange={(e) => upd({ minimumOrder: Math.max(0, Number(e.target.value) || 0) })} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-extrabold">Fechas recomendadas para surtir</h2>
        <p className="mt-1 text-sm text-ink/55">Alimentan la cuenta regresiva del sitio y del botón de WhatsApp.</p>
        <div className="mt-5 space-y-4">
          {seasons.map((season) => {
            const [m, d] = s.stockBy[season.slug as SeasonSlug].split("-");
            return (
              <Field key={season.slug} label={`${season.name} · ${season.months}`} htmlFor={`surtir-${season.slug}`}>
                <input
                  id={`surtir-${season.slug}`}
                  type="date"
                  value={`2026-${m}-${d}`}
                  onChange={(e) => {
                    const [, mm, dd] = e.target.value.split("-");
                    if (mm && dd) upd({ stockBy: { ...s.stockBy, [season.slug]: `${mm}-${dd}` } });
                  }}
                  className={inputCls}
                />
              </Field>
            );
          })}
        </div>
      </Card>

      <div className="flex flex-col items-start gap-3 lg:col-span-2 sm:flex-row sm:items-center">
        <Btn variant="pri" onClick={save} className="h-11 px-6">
          Guardar configuración
        </Btn>
        {msg && <p className={`text-sm font-bold ${msg.ok ? "adm-ok text-green-700" : "text-[#B3261E]"}`}>{msg.ok ? "✓ " : ""}{msg.text}</p>}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const db = useDemoDB();
  const mounted = useMounted();
  return (
    <>
      <PageTitle title="Configuración" intro="Datos del negocio que usa el sitio." />
      {mounted && <SettingsForm initial={db.settings} />}
    </>
  );
}
