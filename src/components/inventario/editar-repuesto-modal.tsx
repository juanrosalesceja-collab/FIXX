"use client";

import { X } from "lucide-react";

export default function EditarRepuestoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Editar repuesto</h2><p className="text-sm text-[#6B7280] mt-1">Modifica los datos del repuesto.</p></div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div><h3 className="text-sm font-semibold text-[#111827] mb-4">Información general</h3>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Nombre</label><input type="text" defaultValue="Filtro de aceite sintético" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">SKU</label><input type="text" defaultValue="FE-23434" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            </div>
          </div>
          <div><h3 className="text-sm font-semibold text-[#111827] mb-4">Precios</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Precio de costo</label><input type="number" step="0.01" defaultValue="24.57" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Precio de venta</label><input type="number" step="0.01" defaultValue="30" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            </div>
          </div>
          <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm text-[#EA580C] font-medium">Margen bruto estimado</span>
            <span className="text-sm font-bold text-[#EA580C]">+18.1%</span>
          </div>
          <div><h3 className="text-sm font-semibold text-[#111827] mb-4">Inventario</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Stock actual</label><input type="number" defaultValue="1" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Stock mínimo</label><input type="number" defaultValue="1" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            </div>
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
