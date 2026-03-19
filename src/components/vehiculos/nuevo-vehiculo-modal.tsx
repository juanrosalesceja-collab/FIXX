"use client";

import { X, AlertCircle } from "lucide-react";

export default function NuevoVehiculoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Nuevo Vehículo</h2><p className="text-sm text-[#6B7280] mt-1">Registra y vincula una unidad a un cliente</p></div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center">1</div><span className="text-sm font-semibold text-[#111827]">Cliente</span></div>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center">2</div><span className="text-sm font-semibold text-[#111827]">Vehículo</span></div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF]">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><span className="text-sm font-bold text-[#1D4ED8]">UC</span></div><div><p className="text-sm font-medium text-[#111827]">Usuario Cliente</p><p className="text-xs text-[#6B7280]">Propietario del vehículo</p></div></div>
            <button className="text-xs text-[#EA580C] hover:underline font-semibold">Cambiar</button>
          </div>
          <h3 className="text-sm font-semibold text-[#111827]">Datos del vehículo</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Placa</label><input type="text" defaultValue="ABC-1234" className="w-full border border-[#FECACA] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]" /><p className="flex items-center gap-1 mt-1 text-xs text-[#DC2626]"><AlertCircle className="w-3 h-3" />La placa es requerida</p></div>
            <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Año (opcional)</label><input type="text" defaultValue="2026" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Marca</label><input type="text" defaultValue="Toyota" className="w-full border border-[#FECACA] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]" /><p className="flex items-center gap-1 mt-1 text-xs text-[#DC2626]"><AlertCircle className="w-3 h-3" />La marca es requerida</p></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Modelo</label><input type="text" defaultValue="Corolla" className="w-full border border-[#FECACA] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]" /><p className="flex items-center gap-1 mt-1 text-xs text-[#DC2626]"><AlertCircle className="w-3 h-3" />El modelo es requerido</p></div>
            </div>
            <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Color (opcional)</label><input type="text" defaultValue="Blanco" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Kilometraje (opcional)</label><div className="relative"><input type="text" defaultValue="50000" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] font-semibold">KM</span></div><p className="text-xs text-[#94A3B8] mt-1">Odómetro actual</p></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[#EAECEF]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB] transition-colors border border-[#E5E7EB]">Volver</button>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors">Registrar Vehículo</button>
        </div>
      </div>
    </div>
  );
}
