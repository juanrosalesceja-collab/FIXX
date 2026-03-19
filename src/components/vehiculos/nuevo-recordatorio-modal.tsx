"use client";

import { X } from "lucide-react";

export default function NuevoRecordatorioModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#EAECEF]">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Nuevo recordatorio</h2><p className="text-sm text-[#6B7280] mt-1">Programa el recordatorio para este vehículo.</p></div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><X className="w-5 h-5 text-[#6B7280]" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-1">Información del recordatorio</h3>
            <p className="text-xs text-[#6B7280] mb-4">Elige el tipo de servicio y agrega una nota.</p>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Tipo de recordatorio</label><select className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"><option>Cambio de aceite</option><option>Llantas</option><option>Revisión general</option><option>Otro</option></select></div>
              <div className="bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF]"><p className="text-sm font-medium text-[#111827]">Cambio de aceite</p><p className="text-xs text-[#6B7280] mt-0.5">Mantenimiento preventivo de aceite y filtro</p></div>
              <div><label className="block text-sm font-medium text-[#111827] mb-1.5">Descripción / nota</label><textarea rows={3} placeholder="Ej: incluir revisión de frenos, luces y nivel de coolant." className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /><p className="text-xs text-[#94A3B8] mt-1">Nota interna para tu equipo.</p></div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-1">Fecha del recordatorio</h3>
            <p className="text-xs text-[#6B7280] mb-4">Programa el día exacto.</p>
            <input type="date" defaultValue="2026-03-17" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" />
            <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4 mt-3">
              <p className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider mb-1">Resumen de programación</p>
              <p className="text-sm font-medium text-[#EA580C]">Programado para 17 de marzo de 2026</p>
              <p className="text-xs text-[#EA580C]/70 mt-1">Solo se permiten fechas desde hoy en adelante.</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-1">Tipo de envío</h3>
            <p className="text-xs text-[#6B7280] mb-4">Define si se envía manualmente o de forma automática.</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 bg-[#FFF7ED] rounded-lg p-4 border-2 border-[#EA580C] cursor-pointer"><input type="radio" name="sendType" defaultChecked className="accent-[#EA580C]" /><div><p className="text-sm font-medium text-[#111827]">Manual</p><p className="text-xs text-[#6B7280]">El equipo lo envía cuando considere oportuno.</p></div></label>
              <label className="flex items-center gap-3 bg-[#F5F7FB] rounded-lg p-4 border border-[#EAECEF] cursor-pointer"><input type="radio" name="sendType" className="accent-[#EA580C]" /><div><p className="text-sm font-medium text-[#111827]">Automático</p><p className="text-xs text-[#6B7280]">El sistema lo envía en la fecha programada.</p></div></label>
            </div>
            <div className="mt-3 flex items-center gap-2"><span className="px-2 py-1 rounded text-xs font-semibold bg-[#F5F7FB] text-[#6B7280] border border-[#E5E7EB]">Manual</span><span className="text-xs text-[#94A3B8]">Pendiente hasta que alguien pulse Enviar ahora.</span></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-[#EAECEF]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB] transition-colors border border-[#E5E7EB]">Cancelar</button>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors">Guardar recordatorio</button>
        </div>
      </div>
    </div>
  );
}
