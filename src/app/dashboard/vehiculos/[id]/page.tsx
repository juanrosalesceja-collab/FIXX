"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, MoreHorizontal, Phone, Mail, Plus, Clock, CheckCircle2, FileText, Car, Gauge, Palette, Calendar } from "lucide-react";
import { ordenes, recordatorios } from "@/lib/mock-data";
import NuevoRecordatorioModal from "@/components/vehiculos/nuevo-recordatorio-modal";
import EditarVehiculoModal from "@/components/vehiculos/editar-vehiculo-modal";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "En proceso": "bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]",
    Pendiente: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    Entregado: "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]",
    Finalizado: "bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]",
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}><span className={`w-1.5 h-1.5 rounded-full ${status === "En proceso" ? "bg-[#1D4ED8]" : status === "Pendiente" ? "bg-[#D97706]" : status === "Finalizado" ? "bg-[#EA580C]" : "bg-[#16A34A]"}`} />{status}</span>;
}

const vehiculoOrdenes = ordenes.filter((_, i) => i < 8);
const tabItems = ["Información", "Historial", "Servicios", "Recordatorios"];

export default function VehiculoDetallePage() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Historial");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/vehiculos" className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><ArrowLeft className="w-5 h-5 text-[#6B7280]" /></Link>
          <div><h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Detalle del vehículo</h1><p className="text-sm text-[#6B7280] mt-1">Información completa, historial y recordatorios.</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Toyota Corolla</h2>
              <span className="text-sm font-mono text-[#94A3B8]"># ABCD</span>
              <span className="text-sm text-[#6B7280]">(2024)</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <Link href="/dashboard/clientes/1" className="hover:text-[#EA580C] hover:underline font-medium">Usuario Cliente</Link>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> 64470741</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> prueba@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowEditModal(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB]"><Pencil className="w-4 h-4" />Editar</button>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F7FB]"><MoreHorizontal className="w-4 h-4 text-[#6B7280]" /></button>
              {showMenu && (
                <div className="absolute right-0 top-11 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-20">
                  <button onClick={() => { setShowMenu(false); alert("Historial exportado."); }} className="w-full text-left px-4 py-2.5 text-sm text-[#111827] hover:bg-[#F5F7FB]">Exportar historial</button>
                  <button onClick={() => { setShowMenu(false); alert("Vehículo archivado."); }} className="w-full text-left px-4 py-2.5 text-sm text-[#DC2626] hover:bg-[#FEE2E2]">Archivar vehículo</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">OTs totales</p><p className="text-2xl font-bold text-[#111827]">9</p></div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Entregadas</p><p className="text-2xl font-bold text-[#111827]">5</p></div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Total facturado</p><p className="text-2xl font-bold text-[#EA580C]">$3,097.29</p></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] mb-6">
        {tabItems.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${activeTab === t ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>{t}</button>
        ))}
      </div>

      {/* Información tab */}
      {activeTab === "Información" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Datos del vehículo</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Car, label: "Marca", value: "Toyota" },
                  { icon: Car, label: "Modelo", value: "Corolla" },
                  { icon: Calendar, label: "Año", value: "2024" },
                  { icon: Palette, label: "Color", value: "Rojo" },
                  { icon: Gauge, label: "Kilometraje", value: "50,000 km" },
                  { icon: FileText, label: "Placa", value: "ABCD" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-4 bg-[#F5F7FB] rounded-lg border border-[#EAECEF]">
                    <item.icon className="w-5 h-5 text-[#94A3B8]" />
                    <div>
                      <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">{item.label}</p>
                      <p className="text-sm font-medium text-[#111827]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Propietario</h3>
              <Link href="/dashboard/clientes/1" className="flex items-center gap-3 p-3 rounded-lg border border-[#EAECEF] hover:border-[#FDBA74] hover:bg-[#FFF7ED] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><span className="text-sm font-bold text-[#1D4ED8]">UC</span></div>
                <div><p className="text-sm font-medium text-[#111827]">Usuario Cliente</p><p className="text-xs text-[#94A3B8]">64470741</p></div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Historial tab */}
      {activeTab === "Historial" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-[#EAECEF]">
                  <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">OT</th>
                  <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Estado</th>
                  <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Total</th>
                </tr></thead>
                <tbody>
                  {vehiculoOrdenes.map((o) => (
                    <tr key={o.id} className="border-b border-[#EAECEF] last:border-b-0 hover:bg-[#F5F7FB] transition-colors">
                      <td className="px-6 py-4"><Link href={`/dashboard/ordenes/${o.id}`} className="text-sm font-semibold text-[#111827] hover:text-[#EA580C]">{o.id}</Link></td>
                      <td className="px-6 py-4"><StatusBadge status={o.estado} /></td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-[#111827]">${o.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Línea de tiempo</h3>
              {vehiculoOrdenes.slice(0, 5).map((o, i) => (
                <div key={o.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${o.estado === "En proceso" ? "bg-[#DBEAFE]" : o.estado === "Pendiente" ? "bg-[#FEF3C7]" : "bg-[#DCFCE7]"}`}>
                      {o.estado === "Entregado" ? <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> : o.estado === "Pendiente" ? <Clock className="w-4 h-4 text-[#D97706]" /> : <FileText className="w-4 h-4 text-[#1D4ED8]" />}
                    </div>
                    {i < 4 && <div className="w-px h-full bg-[#EAECEF] my-1" />}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[#111827]">{o.id}</p><p className="text-xs text-[#6B7280]">ABCD · Toyota Corolla</p></div><p className="text-sm font-semibold text-[#111827]">${o.total.toFixed(2)}</p></div>
                    <p className="text-xs text-[#94A3B8] mt-1">{o.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Resumen rápido</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">OTs totales</span><span className="font-semibold text-[#111827]">9</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Entregadas</span><span className="font-semibold text-[#111827]">5</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Valor total</span><span className="font-semibold text-[#EA580C]">$3,097.29</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Servicios tab */}
      {activeTab === "Servicios" && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="p-5 border-b border-[#EAECEF]"><h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)]">Servicios realizados</h3><p className="text-xs text-[#6B7280] mt-1">Resumen de los servicios aplicados a este vehículo.</p></div>
          <div className="divide-y divide-[#EAECEF]">
            {[
              { service: "Cambio de filtro de aceite", ot: "OT-0009", date: "16 mar 2026", cost: "$30.00" },
              { service: "Revisión general", ot: "OT-0005", date: "15 mar 2026", cost: "$1,170.00" },
              { service: "Mantenimiento preventivo", ot: "OT-0004", date: "14 mar 2026", cost: "$428.86" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-[#F5F7FB] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">{s.service}</p>
                  <div className="flex items-center gap-2 mt-1"><Link href={`/dashboard/ordenes/${s.ot}`} className="text-xs text-[#EA580C] hover:underline font-semibold">{s.ot}</Link><span className="text-xs text-[#94A3B8]">{s.date}</span></div>
                </div>
                <p className="text-sm font-semibold text-[#111827]">{s.cost}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recordatorios tab */}
      {activeTab === "Recordatorios" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-1">Sistema de recordatorios</h3>
              <p className="text-xs text-[#6B7280] mb-4">Recordatorios relevantes para este vehículo.</p>
              <button onClick={() => setShowReminderModal(true)} className="w-full flex items-center justify-center gap-2 border border-dashed border-[#FDBA74] rounded-lg py-2.5 text-sm text-[#EA580C] font-semibold hover:bg-[#FFF7ED] transition-colors mb-4"><Plus className="w-4 h-4" />Nuevo recordatorio</button>
              <div className="space-y-4">
                {recordatorios.map((r) => (
                  <div key={r.id} className="border border-[#EAECEF] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-[#111827]">{r.titulo}</h4>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">{r.tipo}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${r.modo === "Automático" ? "bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]" : "bg-[#F5F7FB] text-[#6B7280] border border-[#E5E7EB]"}`}>{r.modo}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-2">{r.subtitulo}</p>
                    <p className="text-xs text-[#111827] font-medium mb-3">{r.nota}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#F5F7FB] rounded-lg p-2"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Programado</p><p className="text-xs font-medium text-[#111827]">{r.programado}</p></div>
                      <div className="bg-[#F5F7FB] rounded-lg p-2"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Enviado</p><p className="text-xs font-medium text-[#111827]">{r.enviado}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => alert("Mostrando todos los recordatorios.")} className="w-full mt-4 text-center text-xs text-[#EA580C] font-semibold hover:underline">Ver todos los recordatorios</button>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Resumen</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Total</span><span className="font-semibold text-[#111827]">{recordatorios.length}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Enviados</span><span className="font-semibold text-[#16A34A]">{recordatorios.filter(r => r.tipo === "Enviado").length}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Pendientes</span><span className="font-semibold text-[#D97706]">0</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReminderModal && <NuevoRecordatorioModal onClose={() => setShowReminderModal(false)} />}
      {showEditModal && <EditarVehiculoModal onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
