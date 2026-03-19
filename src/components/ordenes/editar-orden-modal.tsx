"use client";

import { useState } from "react";
import { X } from "lucide-react";

const estados = [
  { key: "Pendiente", label: "Pendiente" },
  { key: "En Proceso", label: "En Proceso" },
  { key: "Finalizado", label: "Finalizado" },
  { key: "Entregado", label: "Entregado" },
];

export default function EditarOrdenModal({ onClose }: { onClose: () => void }) {
  const [activeStado, setActiveStado] = useState("En Proceso");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Editar Orden #OT-0009</h2>
              <p className="text-sm text-[#6B7280] mt-1">Modifica el estado, diagnóstico y notas de la orden.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Estado */}
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Estado de la Orden</h3>
            <div className="flex gap-2">
              {estados.map((e) => (
                <button
                  key={e.key}
                  onClick={() => setActiveStado(e.key)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors border ${
                    e.key === activeStado
                      ? "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]"
                      : "bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-[#F5F7FB]"
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current state card */}
          <div className={`rounded-lg p-4 border ${
            activeStado === "En Proceso" ? "bg-[#DBEAFE] border-[#BFDBFE]" :
            activeStado === "Pendiente" ? "bg-[#FEF3C7] border-[#FDE68A]" :
            activeStado === "Entregado" ? "bg-[#DCFCE7] border-[#86EFAC]" :
            "bg-[#FFF7ED] border-[#FDBA74]"
          }`}>
            <p className={`text-sm font-semibold ${
              activeStado === "En Proceso" ? "text-[#1D4ED8]" :
              activeStado === "Pendiente" ? "text-[#92400E]" :
              activeStado === "Entregado" ? "text-[#166534]" :
              "text-[#EA580C]"
            }`}>{activeStado}</p>
            <p className={`text-xs mt-0.5 opacity-70 ${
              activeStado === "En Proceso" ? "text-[#1D4ED8]" :
              activeStado === "Pendiente" ? "text-[#92400E]" :
              activeStado === "Entregado" ? "text-[#166534]" :
              "text-[#EA580C]"
            }`}>Estado actual</p>
          </div>

          {/* Cancel toggle */}
          <div className="flex items-center justify-between bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF]">
            <div><p className="text-sm font-medium text-[#111827]">Cancelar orden</p><p className="text-xs text-[#6B7280]">Orden cancelada — puede reactivarse</p></div>
            <button className="w-10 h-6 bg-[#E5E7EB] rounded-full relative transition-colors"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm" /></button>
          </div>

          {/* Kilometraje */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Kilometraje</label>
            <div className="relative"><input type="text" defaultValue="60000" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] font-semibold">KM</span></div>
          </div>

          {/* Diagnóstico */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Diagnóstico técnico</label>
            <textarea rows={3} defaultValue="Prueba prueba" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors" />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Notas adicionales</label>
            <textarea rows={3} defaultValue="Prueba prueba" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors" />
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[#EAECEF]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB] transition-colors border border-[#E5E7EB]">Cancelar</button>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
