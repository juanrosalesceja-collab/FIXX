"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2, Plus, Minus, AlertTriangle, Package, Clock, ArrowUpDown } from "lucide-react";
import EditarRepuestoModal from "@/components/inventario/editar-repuesto-modal";

export default function RepuestoDetallePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("resumen");
  const [stock, setStock] = useState(1);

  const tabs = ["Resumen", "Movimientos", "Configuración"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/inventario" className="p-2 rounded-lg hover:bg-[#F5F7FB] transition-colors"><ArrowLeft className="w-5 h-5 text-[#6B7280]" /></Link>
          <div><h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Detalle del repuesto</h1><p className="text-sm text-[#6B7280] mt-1">Información completa, stock y movimientos.</p></div>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#DBEAFE] flex items-center justify-center"><Package className="w-7 h-7 text-[#1D4ED8]" /></div>
            <div><h2 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Filtro de aceite sintético</h2><p className="text-sm text-[#94A3B8] font-mono">FE-23434</p></div>
            <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"><span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />Stock bajo</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setStock(Math.max(0, stock - 1))} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:bg-[#F5F7FB]"><Minus className="w-3.5 h-3.5" />Reducir</button>
            <button onClick={() => setStock(stock + 1)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:bg-[#F5F7FB]"><Plus className="w-3.5 h-3.5" />Aumentar</button>
            <button onClick={() => setShowEditModal(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:bg-[#F5F7FB]"><Pencil className="w-3.5 h-3.5" />Editar</button>
            <button onClick={() => { if (confirm("¿Estás seguro de eliminar este repuesto?")) alert("Repuesto eliminado."); }} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#FECACA] text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2]"><Trash2 className="w-3.5 h-3.5" />Eliminar</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Stock", value: String(stock), color: "text-[#111827]" },
          { label: "Mínimo", value: "1", color: "text-[#111827]" },
          { label: "Margen", value: "18%", color: "text-[#EA580C]" },
          { label: "Valor inv.", value: `$${(stock * 30).toFixed(2)}`, color: "text-[#111827]" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm text-center">
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">{m.label}</p>
            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
            <div className="flex border-b border-[#EAECEF]">
              {tabs.map((t) => (
                <button key={t} onClick={() => setActiveTab(t.toLowerCase())} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === t.toLowerCase() ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>{t}</button>
              ))}
            </div>

            {activeTab === "resumen" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-3">Nivel de stock</h3>
                  <div className="flex items-end gap-3 mb-3">
                    <span className="text-4xl font-bold text-[#111827]">{stock}</span>
                    <span className="text-sm font-semibold text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#FDE68A] mb-1">{stock <= 0 ? "Sin stock" : stock <= 1 ? "Bajo" : "En stock"}</span>
                  </div>
                  <div className="relative h-3 bg-[#F5F7FB] rounded-full mb-2"><div className="absolute left-0 top-0 h-3 bg-[#D97706] rounded-full" style={{ width: `${Math.min(100, (stock / 3) * 100)}%` }} /></div>
                  <div className="flex items-center justify-between text-xs text-[#94A3B8]"><span>0</span><span>Min: 1</span><span>3</span></div>
                  {stock <= 1 && (
                    <div className="mt-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#92400E] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#92400E]">Stock bajo. Está por debajo del mínimo de 1 unidades.</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-3">Precios y rentabilidad</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Costo</p><p className="text-lg font-bold text-[#111827]">$24.57</p></div>
                    <div><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Venta</p><p className="text-lg font-bold text-[#111827]">$30.00</p></div>
                    <div><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mb-1">Margen</p><p className="text-lg font-bold text-[#EA580C]">18%</p></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "movimientos" && (
              <div className="p-6">
                <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Historial de movimientos</h3>
                <div className="space-y-3">
                  {[
                    { action: "Usado en OT-0009", qty: -1, date: "16 mar 2026", type: "Salida" },
                    { action: "Ingreso inicial", qty: 2, date: "6 mar 2026", type: "Entrada" },
                  ].map((mov, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-[#EAECEF] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mov.qty > 0 ? "bg-[#DCFCE7]" : "bg-[#FEE2E2]"}`}>
                          <ArrowUpDown className={`w-4 h-4 ${mov.qty > 0 ? "text-[#16A34A]" : "text-[#DC2626]"}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{mov.action}</p>
                          <p className="text-xs text-[#94A3B8]">{mov.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${mov.qty > 0 ? "text-[#16A34A]" : "text-[#DC2626]"}`}>{mov.qty > 0 ? `+${mov.qty}` : mov.qty}</span>
                        <p className="text-xs text-[#94A3B8]">{mov.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "configuración" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Configuración de alertas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-[#EAECEF] rounded-lg">
                      <div><p className="text-sm font-medium text-[#111827]">Alerta de stock bajo</p><p className="text-xs text-[#6B7280]">Notificar cuando el stock baje de 1 unidad</p></div>
                      <div className="w-10 h-6 bg-[#EA580C] rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" /></div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-[#EAECEF] rounded-lg">
                      <div><p className="text-sm font-medium text-[#111827]">Alerta de sin stock</p><p className="text-xs text-[#6B7280]">Notificar cuando el stock llegue a 0</p></div>
                      <div className="w-10 h-6 bg-[#EA580C] rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" /></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-3">Información del producto</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F5F7FB] rounded-lg p-4"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">SKU</p><p className="text-sm font-medium text-[#111827]">FE-23434</p></div>
                    <div className="bg-[#F5F7FB] rounded-lg p-4"><p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Stock mínimo</p><p className="text-sm font-medium text-[#111827]">1 unidad</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-4">Resumen rápido</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Estado actual</span><span className="font-semibold text-[#92400E]">{stock <= 0 ? "Sin stock" : "Stock bajo"}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Unidades disponibles</span><span className="font-semibold text-[#111827]">{stock}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-[#6B7280]">Precio de venta</span><span className="font-semibold text-[#111827]">$30.00</span></div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && <EditarRepuestoModal onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
