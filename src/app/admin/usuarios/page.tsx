"use client";

import { useState } from "react";
import { Check, Minus, Trash2, UserPlus } from "lucide-react";
import { Btn, Card, Field, PageTitle, inputCls } from "@/components/admin/ui";
import { useMounted } from "@/components/admin/useMounted";
import { demo, useDemoDB } from "@/lib/demo/store";
import type { Role } from "@/lib/demo/types";

const ROLES: Record<Role, { label: string; desc: string }> = {
  super: { label: "Super administrador", desc: "Todo el panel, incluidos usuarios y configuración." },
  admin: { label: "Administrador", desc: "Productos, precios, existencias y cotizaciones." },
  ventas: { label: "Ventas", desc: "Consulta productos y atiende cotizaciones." },
};

const PERMISOS: [string, Role[]][] = [
  ["Ver productos y cotizaciones", ["super", "admin", "ventas"]],
  ["Cambiar estado de cotizaciones", ["super", "admin", "ventas"]],
  ["Dar de alta y editar productos", ["super", "admin"]],
  ["Cambiar precios y existencias", ["super", "admin"]],
  ["Eliminar productos", ["super"]],
  ["Usuarios y configuración", ["super"]],
];

export default function UsersPage() {
  const db = useDemoDB();
  const mounted = useMounted();
  const [form, setForm] = useState({ name: "", email: "", role: "ventas" as Role });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  if (!mounted) return null;

  const invite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Escriba nombre y un correo válido.");
      return;
    }
    demo.addUser({ name: form.name.trim(), email: form.email.trim(), role: form.role });
    setOk(`Invitación enviada a ${form.email.trim()}.`);
    setForm({ name: "", email: "", role: "ventas" });
  };

  return (
    <>
      <PageTitle title="Usuarios" intro="Quién puede entrar al panel y qué puede hacer cada perfil." />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <ul className="divide-y divide-ink/5">
              {db.users.map((u) => (
                <li key={u.id} className="flex items-center gap-4 px-5 py-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-bold text-gold">
                    {u.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{u.name}</span>
                    <span className="block truncate text-xs text-ink/55">{u.email}</span>
                  </span>
                  <span
                    className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:inline ${
                      u.role === "super" ? "bg-ink text-gold" : u.role === "admin" ? "bg-gold/20 text-gold-deep" : "bg-ink/5 text-ink/70"
                    }`}
                  >
                    {ROLES[u.role].label}
                  </span>
                  {u.role === "super" ? (
                    <span className="w-9 text-center text-xs text-ink/40">Usted</span>
                  ) : (
                    <button
                      type="button"
                      aria-label={`Quitar acceso a ${u.name}`}
                      onClick={() => confirm(`¿Quitar el acceso de ${u.name}?`) && demo.removeUser(u.id)}
                      className="grid size-9 place-items-center rounded-full text-ink/45 hover:bg-[#B3261E]/10 hover:text-[#B3261E]"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <h2 className="text-lg font-extrabold">Qué puede hacer cada perfil</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <thead>
                  <tr className="text-left text-xs text-ink/50">
                    <th className="pb-3 font-bold">Permiso</th>
                    {(Object.keys(ROLES) as Role[]).map((r) => (
                      <th key={r} className="pb-3 text-center font-bold">
                        {ROLES[r].label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {PERMISOS.map(([p, roles]) => (
                    <tr key={p}>
                      <td className="py-2.5">{p}</td>
                      {(Object.keys(ROLES) as Role[]).map((r) => (
                        <td key={r} className="py-2.5 text-center">
                          {roles.includes(r) ? <Check className="mx-auto size-4 text-green-700" /> : <Minus className="mx-auto size-4 text-ink/25" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card className="self-start lg:col-span-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <UserPlus className="size-5" /> Invitar usuario
          </h2>
          <form onSubmit={invite} className="mt-4 space-y-4" noValidate>
            <Field label="Nombre" htmlFor="us-nombre">
              <input id="us-nombre" value={form.name} onChange={(e) => (setForm({ ...form, name: e.target.value }), setError(""), setOk(""))} className={inputCls} />
            </Field>
            <Field label="Correo" htmlFor="us-correo">
              <input id="us-correo" type="email" value={form.email} onChange={(e) => (setForm({ ...form, email: e.target.value }), setError(""), setOk(""))} className={inputCls} />
            </Field>
            <Field label="Perfil" htmlFor="us-perfil" hint={ROLES[form.role].desc}>
              <select id="us-perfil" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className={inputCls}>
                <option value="admin">{ROLES.admin.label}</option>
                <option value="ventas">{ROLES.ventas.label}</option>
              </select>
            </Field>
            {error && <p className="text-xs font-bold text-[#B3261E]">{error}</p>}
            {ok && <p className="text-xs font-bold text-green-700">✓ {ok}</p>}
            <Btn variant="pri" type="submit" className="w-full">
              Enviar invitación
            </Btn>
          </form>
        </Card>
      </div>
    </>
  );
}
