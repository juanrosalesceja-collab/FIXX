"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Phone, Mail, Car, Plus, Clock, CheckCircle2, FileText } from "lucide-react";
import EditarOrdenModal from "@/components/ordenes/editar-orden-modal";

const timeline = [
  { label: "Items agregados", detail: "Filtro de aceite sintético", date: "16 mar 2026", icon: Plus },
  { label: "Estado actualizado", detail: "En proceso", date: "16 mar 2026", icon: CheckCircle2 },
  { label: "Orden creada", detail: "#OT-0009", date: "16 mar 2026", icon: FileText },
];

export default function OrdenDetallePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("items");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/ordenes" className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">
            Detalle de la orden de trabajo
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Información completa de esta orden</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            En proceso
          </span>
          <button onClick={() => setShowEditModal(true)} className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            <Pencil className="w-4 h-4" />
            Editar orden
          </button>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { label: "ID", value: "#OT-0009", bold: true },
            { label: "Cliente", value: "Usuario Cliente" },
            { label: "Vehículo", value: "Toyota Corolla · ABCD" },
            { label: "Creada", value: "16 mar 2026" },
            { label: "Última actualización", value: "16 mar 2026" },
            { label: "Mecánico", value: "Anyelo Isaac Benavides Gutiérrez" },
            { label: "Kilometraje", value: "60,000 km" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <div>
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">{item.label}</p>
                <p className={`text-sm ${item.bold ? "font-bold" : "font-medium"} text-[#111827]`}>{item.value}</p>
              </div>
              {i < 6 && <div className="w-px h-8 bg-[#EAECEF]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center">
          <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Servicios</p>
          <p className="text-xl font-bold text-[#111827]">$0.00</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center">
          <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Repuestos</p>
          <p className="text-xl font-bold text-[#111827]">$30.00</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center">
          <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Total OT</p>
          <p className="text-xl font-bold text-[#EA580C]">$30.00</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
            <div className="flex border-b border-[#EAECEF]">
              <button onClick={() => setActiveTab("items")} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === "items" ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>Productos y servicios</button>
              <button onClick={() => setActiveTab("diagnostico")} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === "diagnostico" ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>Diagnóstico y notas</button>
            </div>

            {activeTab === "items" && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EAECEF]">
                        <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Descripción</th>
                        <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Tipo</th>
                        <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Cant.</th>
                        <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">P. Unit.</th>
                        <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#EAECEF]">
                        <td className="px-6 py-4 text-sm text-[#111827] font-medium">Filtro de aceite sintético</td>
                        <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F5F7FB] text-[#6B7280] border border-[#E5E7EB]">REPUESTO</span></td>
                        <td className="px-6 py-4 text-sm text-[#111827] text-right">1</td>
                        <td className="px-6 py-4 text-sm text-[#111827] text-right">$30.00</td>
                        <td className="px-6 py-4 text-sm font-semibold text-[#111827] text-right">$30.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4">
                  <button onClick={() => alert("Item agregado correctamente.")} className="flex items-center gap-2 text-sm text-[#EA580C] hover:underline font-semibold">
                    <Plus className="w-4 h-4" />
                    Agregar item
                  </button>
                </div>
              </>
            )}

            {activeTab === "diagnostico" && (
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-2">Diagnóstico técnico</h3>
                  <div className="bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF]">
                    <p className="text-sm text-[#111827]">Prueba prueba</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-2">Notas adicionales</h3>
                  <div className="bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF]">
                    <p className="text-sm text-[#111827]">Prueba prueba</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-2">Kilometraje de ingreso</h3>
                  <p className="text-sm text-[#6B7280]">60,000 km</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right — Sidebar */}
        <div className="space-y-6">
          {/* Info general */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Información general</h3>
            <div className="space-y-3">
              <div className="text-sm text-[#6B7280]">Usuario Cliente</div>
              <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-[#94A3B8]" /><span className="text-[#6B7280]">64470741</span></div>
              <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-[#94A3B8]" /><span className="text-[#6B7280]">prueba@gmail.com</span></div>
              <div className="flex items-center gap-2 text-sm"><Car className="w-4 h-4 text-[#94A3B8]" /><span className="text-[#6B7280]">Toyota Corolla</span></div>
              <div className="text-xs text-[#94A3B8] font-mono">ABCD</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Timeline de la orden</h3>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#EA580C]" />
                    </div>
                    {i < timeline.length - 1 && <div className="w-px h-full bg-[#EAECEF] my-1" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-medium text-[#111827]">{item.label}</p>
                    <p className="text-xs text-[#6B7280]">{item.detail}</p>
                    <p className="text-xs text-[#94A3B8] mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEditModal && <EditarOrdenModal onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
