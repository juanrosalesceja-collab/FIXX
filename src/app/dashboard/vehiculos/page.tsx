"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Car, Search, History } from "lucide-react";
import NuevoVehiculoModal from "@/components/vehiculos/nuevo-vehiculo-modal";

const tabItems = ["Todos", "Con historial", "Sin historial"];

export default function VehiculosPage() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Todos");

  // Mock: single vehicle has history
  const vehiculos = [
    { id: "1", placa: "ABCD", propietario: "Usuario Cliente", vehiculo: "Toyota Corolla (2024)", color: "Rojo", ots: 9, tieneHistorial: true },
  ];

  const filtered = vehiculos.filter((v) => {
    if (activeTab === "Con historial") return v.tieneHistorial;
    if (activeTab === "Sin historial") return !v.tieneHistorial;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Panel de vehículos</h1>
          <p className="text-sm text-[#6B7280] mt-1">Historial y seguimiento de los vehículos registrados.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F7FB] transition-colors"><RefreshCw className="w-4 h-4 text-[#6B7280]" /></button>
          <button onClick={() => setShowNewModal(true)} className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"><Plus className="w-4 h-4" />Nuevo vehículo</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Car, value: "1", label: "Total vehículos", bg: "bg-[#DBEAFE]", color: "text-[#1D4ED8]" },
          { icon: History, value: "1", label: "Con historial", bg: "bg-[#FFF7ED]", color: "text-[#EA580C]" },
          { icon: Car, value: "1", label: "Marcas únicas", bg: "bg-[#FEF3C7]", color: "text-[#D97706]" },
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
          <h2 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)]">Registro de vehículos</h2>
          <p className="text-xs text-[#6B7280] mt-1">Localiza por placa, ordena por historial y gestiona desde una sola vista.</p>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-[#EAECEF] flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm"><Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder="Buscar por placa, marca o propietario…" className="w-full border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            <div className="flex border-b border-[#E5E7EB]">
              {tabItems.map((t) => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === t ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>{t}</button>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#EA580C] bg-[#FFF7ED] px-2 py-1 rounded-md font-semibold border border-[#FDBA74]">1 con historial</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EAECEF]">
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Placa</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Propietario</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Vehículo</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Color</th>
                <th className="text-center text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">OT</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-[#EAECEF] hover:bg-[#F5F7FB] transition-colors">
                  <td className="px-6 py-4"><Link href={`/dashboard/vehiculos/${v.id}`} className="text-sm font-mono font-bold text-[#111827] hover:text-[#EA580C]">{v.placa}</Link></td>
                  <td className="px-6 py-4"><Link href="/dashboard/clientes/1" className="text-sm text-[#6B7280] hover:text-[#EA580C] hover:underline">{v.propietario}</Link></td>
                  <td className="px-6 py-4 text-sm text-[#111827] font-medium">{v.vehiculo}</td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{v.color}</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#FFF7ED] text-xs font-bold text-[#EA580C]">{v.ots}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-[#94A3B8]">No se encontraron vehículos en esta categoría.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNewModal && <NuevoVehiculoModal onClose={() => setShowNewModal(false)} />}
    </div>
  );
}
