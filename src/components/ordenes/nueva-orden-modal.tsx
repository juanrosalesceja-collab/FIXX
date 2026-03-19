"use client";

import { X, Car } from "lucide-react";

export default function NuevaOrdenModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Nueva orden de trabajo</h2>
              <p className="text-sm text-[#6B7280] mt-1">Registra el ingreso de un vehículo al taller</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center">1</div><span className="text-sm font-semibold text-[#111827]">Vehículo</span></div>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center">2</div><span className="text-sm font-semibold text-[#111827]">Detalles</span></div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF]">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><Car className="w-5 h-5 text-[#1D4ED8]" /></div><div><p className="text-xs text-[#94A3B8] font-mono">ABCD</p><p className="text-sm font-medium text-[#111827]">Toyota Corolla - Usuario Cliente</p></div></div>
            <button className="text-xs text-[#EA580C] hover:underline font-semibold">Cambiar</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Kilometraje de Ingreso (opcional)</label>
            <div className="relative"><input type="text" placeholder="Ej: 50,000" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] font-semibold">KM</span></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Diagnóstico / Problemas Reportados (opcional)</label>
            <textarea rows={4} placeholder="Describe los problemas reportados por el cliente, observaciones iniciales o el diagnóstico preliminar del vehículo…" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors" />
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[#EAECEF]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB] transition-colors border border-[#E5E7EB]">Volver</button>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors">Crear Orden</button>
        </div>
      </div>
    </div>
  );
}
