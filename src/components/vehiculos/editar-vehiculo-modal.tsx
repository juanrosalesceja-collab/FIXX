"use client";

import { X } from "lucide-react";

export default function EditarVehiculoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Editar vehículo</h2><p className="text-sm text-[#6B7280] mt-1">Modifica los datos del vehículo.</p></div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Datos del vehículo</h3>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Placa</label><input type="text" defaultValue="ABCD" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Marca</label><input type="text" defaultValue="Toyota" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
                <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Modelo</label><input type="text" defaultValue="Corolla" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Año</label><input type="text" defaultValue="2024" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
                <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Color</label><input type="text" defaultValue="Rojo" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              </div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Kilometraje</label><div className="relative"><input type="text" defaultValue="50000" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] font-semibold">KM</span></div></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[#EAECEF]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB] transition-colors border border-[#E5E7EB]">Cancelar</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
