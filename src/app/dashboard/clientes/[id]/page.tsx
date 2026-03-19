"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, MoreHorizontal, Phone, Mail, Car } from "lucide-react";
import { ordenes } from "@/lib/mock-data";
import EditarClienteModal from "@/components/clientes/editar-cliente-modal";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "En proceso": "bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]",
    Pendiente: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    Entregado: "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]",
    Finalizado: "bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]",
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}><span className={`w-1.5 h-1.5 rounded-full ${status === "En proceso" ? "bg-[#1D4ED8]" : status === "Pendiente" ? "bg-[#D97706]" : status === "Finalizado" ? "bg-[#EA580C]" : "bg-[#16A34A]"}`} />{status}</span>;
}

const clienteOrdenes = ordenes.slice(0, 3);
const tabItems = ["Información", "Vehículos", "Historial OTs"];

export default function ClienteDetallePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Historial OTs");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/clientes" className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><ArrowLeft className="w-5 h-5 text-[#6B7280]" /></Link>
          <div><h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Detalle del cliente</h1><p className="text-sm text-[#6B7280] mt-1">Información completa, vehículos e historial.</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><span className="text-lg font-bold text-[#1D4ED8]">UC</span></div>
            <div>
              <h2 className="text-xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Usuario Cliente</h2>
              <p className="text-xs text-[#94A3B8] mb-1">Cliente desde 6 mar 2026</p>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> 64470741</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> prueba@gmail.com</span>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">Cliente nuevo</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowEditModal(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-semibold text-[#6B7280] hover:bg-[#F5F7FB]"><Pencil className="w-4 h-4" />Editar</button>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F7FB]"><MoreHorizontal className="w-4 h-4 text-[#6B7280]" /></button>
              {showMenu && (
                <div className="absolute right-0 top-11 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-20">
                  <button onClick={() => { setShowMenu(false); alert("Datos exportados."); }} className="w-full text-left px-4 py-2.5 text-sm text-[#111827] hover:bg-[#F5F7FB]">Exportar datos</button>
                  <button onClick={() => { setShowMenu(false); alert("Cliente archivado."); }} className="w-full text-left px-4 py-2.5 text-sm text-[#DC2626] hover:bg-[#FEE2E2]">Archivar cliente</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Vehículos</p><p className="text-2xl font-bold text-[#111827]">1</p></div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">OTs totales</p><p className="text-2xl font-bold text-[#111827]">3</p></div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Total gastado</p><p className="text-2xl font-bold text-[#EA580C]">$3,097.29</p></div>
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
              <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Datos de contacto</h3>
              <div className="space-y-4">
                {[
                  { label: "Nombre", value: "Usuario Cliente" },
                  { label: "Teléfono", value: "64470741" },
                  { label: "Email", value: "prueba@gmail.com" },
                  { label: "Nota", value: "Cliente nuevo" },
                  { label: "Cliente desde", value: "6 mar 2026" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#EAECEF] last:border-b-0">
                    <span className="text-sm text-[#6B7280]">{item.label}</span>
                    <span className="text-sm font-medium text-[#111827]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Resumen rápido</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Última visita</span><span className="font-semibold text-[#111827]">16 mar 2026</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Tickets por vehículo</span><span className="font-semibold text-[#111827]">3.0</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Valor total</span><span className="font-semibold text-[#EA580C]">$3,097.29</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehículos tab */}
      {activeTab === "Vehículos" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Vehículos registrados</h3>
              <Link href="/dashboard/vehiculos/1" className="flex items-center gap-4 p-4 rounded-xl border border-[#EAECEF] hover:border-[#FDBA74] hover:bg-[#FFF7ED] transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><Car className="w-5 h-5 text-[#1D4ED8]" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#111827]">Toyota Corolla (2024)</p>
                  <p className="text-xs text-[#94A3B8] font-mono">ABCD</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#FFF7ED] text-xs font-bold text-[#EA580C]">9</span>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">OTs</p>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Resumen rápido</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Total vehículos</span><span className="font-semibold text-[#111827]">1</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Marcas</span><span className="font-semibold text-[#111827]">Toyota</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historial OTs tab */}
      {activeTab === "Historial OTs" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="p-5 border-b border-[#EAECEF]"><h3 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)]">Historial cronológico de órdenes</h3><p className="text-xs text-[#6B7280] mt-1">3 órdenes</p></div>
              <div className="divide-y divide-[#EAECEF]">
                {clienteOrdenes.map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-5 hover:bg-[#F5F7FB] transition-colors">
                    <div>
                      <Link href={`/dashboard/ordenes/${o.id}`} className="text-sm font-semibold text-[#111827] hover:text-[#EA580C]">{o.id}</Link>
                      <div className="flex items-center gap-2 mt-1"><StatusBadge status={o.estado} /><span className="text-xs text-[#94A3B8]">{o.fecha}</span></div>
                    </div>
                    <div className="text-right">
                      <Link href="/dashboard/vehiculos/1" className="text-xs text-[#94A3B8] font-mono hover:text-[#EA580C]">ABCD</Link>
                      <p className="text-xs text-[#6B7280]">Toyota Corolla</p>
                      <p className="text-sm font-semibold text-[#111827] mt-1">${o.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Resumen rápido</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Última visita</span><span className="font-semibold text-[#111827]">16 mar 2026</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Tickets por vehículo</span><span className="font-semibold text-[#111827]">3.0</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Valor total</span><span className="font-semibold text-[#EA580C]">$3,097.29</span></div>
              </div>
            </div>

            {/* Vehicle quick card */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Vehículos</h3>
              <Link href="/dashboard/vehiculos/1" className="flex items-center gap-3 p-3 rounded-lg border border-[#EAECEF] hover:border-[#FDBA74] hover:bg-[#FFF7ED] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><Car className="w-4 h-4 text-[#1D4ED8]" /></div>
                <div><p className="text-sm font-medium text-[#111827]">Toyota Corolla</p><p className="text-xs text-[#94A3B8] font-mono">ABCD</p></div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {showEditModal && <EditarClienteModal onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
