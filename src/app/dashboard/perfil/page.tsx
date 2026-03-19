"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Star, CheckCircle2, Users, Car, Package, Bell, Wrench, Clock, Settings } from "lucide-react";
import { usuario, metricas, ordenes } from "@/lib/mock-data";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "En proceso": "bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]",
    Pendiente: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    Entregado: "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]",
    Finalizado: "bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]",
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}><span className={`w-1.5 h-1.5 rounded-full ${status === "En proceso" ? "bg-[#1D4ED8]" : status === "Pendiente" ? "bg-[#D97706]" : status === "Finalizado" ? "bg-[#EA580C]" : "bg-[#16A34A]"}`} />{status}</span>;
}

const tabItems = ["Perfil", "Sistema", "Actividad", "Ajustes"];

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("Perfil");

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Mi Perfil</h1><p className="text-sm text-[#6B7280] mt-1">Centro de información de tu cuenta, permisos y actividad.</p></div>

      {/* User card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#1F2937] flex items-center justify-center"><Wrench className="w-7 h-7 text-[#EA580C]" /></div>
            <div>
              <h2 className="text-xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">{usuario.nombre}</h2>
              <p className="text-sm text-[#6B7280]">{usuario.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#1F2937] text-white"><Shield className="w-3 h-3" />Propietario</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"><Star className="w-3 h-3" />Plan Trial</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]"><CheckCircle2 className="w-3 h-3" />Cuenta activa</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-2">Usuario desde {usuario.desde}. Última actividad {usuario.ultimaActividad}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => alert("Función de editar perfil en desarrollo.")} className="px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB]">Editar perfil</button>
            <button onClick={() => alert("Función de cambiar contraseña en desarrollo.")} className="px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB]">Contraseña</button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Órdenes del taller", value: metricas.ordenesTaller },
          { label: "Órdenes asignadas", value: metricas.ordenesAsignadas },
          { label: "OTs en proceso", value: metricas.otsEnProceso },
          { label: "Facturación acumulada", value: `$${metricas.facturacionAcumulada.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-[#EA580C]" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center">
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">{m.label}</p>
            <p className={`text-2xl font-bold ${(m as {color?: string}).color || "text-[#111827]"}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, value: metricas.clientes, label: "Clientes", bg: "bg-[#DBEAFE]", color: "text-[#1D4ED8]" },
          { icon: Car, value: metricas.vehiculos, label: "Vehículos", bg: "bg-[#FFF7ED]", color: "text-[#EA580C]" },
          { icon: Package, value: metricas.repuestosTotal, label: "Repuestos", bg: "bg-[#FEF3C7]", color: "text-[#D97706]" },
          { icon: Bell, value: metricas.recordatoriosPendientes, label: "Recordatorios pendientes", bg: "bg-[#F5F7FB]", color: "text-[#6B7280]" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div><p className="text-2xl font-bold text-[#111827]">{kpi.value}</p><p className="text-xs text-[#6B7280]">{kpi.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] mb-6">
        {tabItems.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${activeTab === t ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>{t}</button>
        ))}
      </div>

      {/* Perfil tab */}
      {activeTab === "Perfil" && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="p-5 border-b border-[#EAECEF]"><h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)]">Actividad reciente</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#EAECEF]">
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">OT</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Cliente</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Estado</th>
                <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Total</th>
              </tr></thead>
              <tbody>
                {ordenes.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-[#EAECEF] last:border-b-0 hover:bg-[#F5F7FB] transition-colors">
                    <td className="px-6 py-4"><Link href={`/dashboard/ordenes/${o.id}`} className="text-sm font-semibold text-[#111827] hover:text-[#EA580C]">{o.id}</Link></td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{o.cliente}</td>
                    <td className="px-6 py-4"><StatusBadge status={o.estado} /></td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-[#111827]">${o.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sistema tab */}
      {activeTab === "Sistema" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Información del plan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#EAECEF]"><span className="text-sm text-[#6B7280]">Plan actual</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"><Star className="w-3 h-3" />Plan Trial</span></div>
              <div className="flex items-center justify-between py-3 border-b border-[#EAECEF]"><span className="text-sm text-[#6B7280]">Estado</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]"><CheckCircle2 className="w-3 h-3" />Activa</span></div>
              <div className="flex items-center justify-between py-3 border-b border-[#EAECEF]"><span className="text-sm text-[#6B7280]">Registrado</span><span className="text-sm font-medium text-[#111827]">{usuario.desde}</span></div>
              <div className="flex items-center justify-between py-3"><span className="text-sm text-[#6B7280]">Última actividad</span><span className="text-sm font-medium text-[#111827]">{usuario.ultimaActividad}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Permisos y rol</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#EAECEF]"><span className="text-sm text-[#6B7280]">Rol</span><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#1F2937] text-white"><Shield className="w-3 h-3" />Propietario</span></div>
              <div className="flex items-center justify-between py-3 border-b border-[#EAECEF]"><span className="text-sm text-[#6B7280]">Acceso completo</span><span className="text-sm font-medium text-[#16A34A]">Sí</span></div>
              <div className="flex items-center justify-between py-3"><span className="text-sm text-[#6B7280]">Puede gestionar equipo</span><span className="text-sm font-medium text-[#16A34A]">Sí</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Actividad tab */}
      {activeTab === "Actividad" && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
          <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Registro de actividad</h3>
          <div className="space-y-0">
            {[
              { action: "Editó orden OT-0009", detail: "Cambió estado a En proceso", date: "16 mar 2026", icon: Clock },
              { action: "Agregó repuesto", detail: "Filtro de aceite sintético a OT-0009", date: "16 mar 2026", icon: Package },
              { action: "Creó orden OT-0009", detail: "Toyota Corolla · Usuario Cliente", date: "16 mar 2026", icon: CheckCircle2 },
              { action: "Registró vehículo", detail: "Toyota Corolla - ABCD", date: "6 mar 2026", icon: Car },
              { action: "Registró cliente", detail: "Usuario Cliente", date: "6 mar 2026", icon: Users },
              { action: "Cuenta creada", detail: "Registro en Fixx", date: "6 mar 2026", icon: Settings },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0"><item.icon className="w-4 h-4 text-[#EA580C]" /></div>
                  {i < 5 && <div className="w-px h-full bg-[#EAECEF] my-1" />}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-[#111827]">{item.action}</p>
                  <p className="text-xs text-[#6B7280]">{item.detail}</p>
                  <p className="text-xs text-[#94A3B8] mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ajustes tab */}
      {activeTab === "Ajustes" && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
          <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Preferencias de notificaciones</h3>
          <div className="space-y-4">
            {[
              { label: "Nuevas órdenes", desc: "Recibe alertas cuando se crea una orden", active: true },
              { label: "Cambios de estado", desc: "Notificación al cambiar estado de OTs", active: true },
              { label: "Stock bajo", desc: "Alerta cuando un repuesto baje del mínimo", active: true },
              { label: "Recordatorios", desc: "Resumen diario de recordatorios pendientes", active: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between p-4 border border-[#EAECEF] rounded-lg">
                <div><p className="text-sm font-medium text-[#111827]">{pref.label}</p><p className="text-xs text-[#6B7280]">{pref.desc}</p></div>
                <div className={`w-10 h-6 rounded-full relative cursor-pointer ${pref.active ? "bg-[#EA580C]" : "bg-[#E5E7EB]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm ${pref.active ? "right-1" : "left-1"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
