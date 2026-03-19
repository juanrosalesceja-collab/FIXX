"use client";

import { X } from "lucide-react";

export default function NuevoClienteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Nuevo Cliente</h2><p className="text-sm text-[#6B7280] mt-1">Registra un nuevo cliente en el sistema.</p></div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-1">Datos personales</h3>
            <p className="text-xs text-[#6B7280] mb-4">Información de contacto del cliente.</p>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Nombre completo</label><input type="text" placeholder="Nombre del cliente" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Teléfono</label><input type="text" placeholder="Ej: 64470741" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Email</label><input type="email" placeholder="correo@ejemplo.com" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-1">Anotaciones</h3>
            <p className="text-xs text-[#6B7280] mb-4">Notas adicionales sobre el perfil del cliente.</p>
            <textarea rows={3} placeholder="Ej: Cliente recomendado, prefiere citas matutinas…" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" />
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[#EAECEF]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB] transition-colors border border-[#E5E7EB]">Cancelar</button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors">Registrar Cliente</button>
        </div>
      </div>
    </div>
  );
}
