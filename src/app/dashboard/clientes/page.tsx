"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Phone, Mail, Users, Car, AtSign } from "lucide-react";
import NuevoClienteModal from "@/components/clientes/nuevo-cliente-modal";

const tabItems = ["Todos", "Con vehículos", "Sin vehículos"];

export default function ClientesPage() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Todos");

  // Mock clients
  const clientes = [
    { id: "1", nombre: "Usuario Cliente", iniciales: "UC", telefono: "64470741", email: "prueba@gmail.com", nota: "Cliente nuevo", desde: "6 MAR 2026", tieneVehiculos: true },
  ];

  const filtered = clientes.filter((c) => {
    if (activeTab === "Con vehículos") return c.tieneVehiculos;
    if (activeTab === "Sin vehículos") return !c.tieneVehiculos;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Clientes</h1>
          <p className="text-sm text-[#6B7280] mt-1">Gestiona tu cartera de clientes y su historial de servicios.</p>
        </div>
        <button onClick={() => setShowNewModal(true)} className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"><Plus className="w-4 h-4" />Nuevo cliente</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: "Total clientes", value: "1", bg: "bg-[#DBEAFE]", color: "text-[#1D4ED8]" },
          { icon: Car, label: "Con vehículos", value: "1", bg: "bg-[#FFF7ED]", color: "text-[#EA580C]" },
          { icon: Phone, label: "Con teléfono", value: "1", bg: "bg-[#FEF3C7]", color: "text-[#D97706]" },
          { icon: AtSign, label: "Con email", value: "1", bg: "bg-[#F5F7FB]", color: "text-[#6B7280]" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div><p className="text-2xl font-bold text-[#111827]">{kpi.value}</p><p className="text-xs text-[#6B7280]">{kpi.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="p-5 border-b border-[#EAECEF]">
          <h2 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)]">Directorio de clientes</h2>
          <p className="text-xs text-[#6B7280] mt-1">Encuentra, segmenta y administra tu cartera.</p>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-[#EAECEF] flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm"><Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder="Buscar por nombre, teléfono o email..." className="w-full border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            <div className="flex border-b border-[#E5E7EB]">
              {tabItems.map((t) => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === t ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>{t}</button>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#EA580C] bg-[#FFF7ED] px-2 py-1 rounded-md font-semibold border border-[#FDBA74]">1 con vehículos</span>
        </div>

        <div className="p-4">
          {filtered.map((c) => (
            <Link key={c.id} href={`/dashboard/clientes/${c.id}`} className="block bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md transition-shadow hover:border-[#FDBA74]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0"><span className="text-base font-bold text-[#1D4ED8]">{c.iniciales}</span></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-[#111827]">{c.nombre}</h3><span className="text-xs text-[#94A3B8]">Desde {c.desde}</span></div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {c.telefono}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {c.email}</span>
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">{c.nota}</span>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-[#94A3B8]">No se encontraron clientes en esta categoría.</div>
          )}
        </div>
      </div>

      {showNewModal && <NuevoClienteModal onClose={() => setShowNewModal(false)} />}
    </div>
  );
}
