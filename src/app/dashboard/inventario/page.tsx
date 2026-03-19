"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, AlertTriangle, Package, AlertCircle, DollarSign, Minus, Search } from "lucide-react";
import { repuestos } from "@/lib/mock-data";
import NuevoRepuestoModal from "@/components/inventario/nuevo-repuesto-modal";

const tabs = [
  { key: "all", label: "Todos" },
  { key: "stock", label: "En stock" },
  { key: "bajo", label: "Stock bajo" },
  { key: "sin", label: "Sin stock" },
];

function StockBadge({ estado }: { estado: string }) {
  const styles: Record<string, string> = {
    Bajo: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    "Sin stock": "bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]",
    "En stock": "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${styles[estado] || "bg-gray-100 text-gray-600"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${estado === "Bajo" ? "bg-[#D97706]" : estado === "Sin stock" ? "bg-[#DC2626]" : "bg-[#16A34A]"}`} />
      {estado}
    </span>
  );
}

export default function InventarioPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [stockCounts, setStockCounts] = useState<Record<string, number>>(
    Object.fromEntries(repuestos.map(r => [r.id, r.stock]))
  );

  const getEstado = (id: string, originalEstado: string) => {
    const count = stockCounts[id] ?? 0;
    if (count <= 0) return "Sin stock";
    if (count <= 1) return "Bajo";
    return "En stock";
  };

  const filtered = repuestos.filter((r) => {
    if (activeTab === "all") return true;
    const estado = getEstado(r.id, r.estado);
    if (activeTab === "stock") return estado === "En stock";
    if (activeTab === "bajo") return estado === "Bajo";
    if (activeTab === "sin") return estado === "Sin stock";
    return true;
  });

  const updateStock = (id: string, delta: number) => {
    setStockCounts(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Inventario</h1>
          <p className="text-sm text-[#6B7280] mt-1">Control de repuestos y alertas de stock.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F7FB] transition-colors"><RefreshCw className="w-4 h-4 text-[#6B7280]" /></button>
          <button onClick={() => setShowNewModal(true)} className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"><Plus className="w-4 h-4" />Nuevo repuesto</button>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex items-center gap-3 mb-6">
        <AlertTriangle className="w-5 h-5 text-[#92400E] shrink-0" />
        <div><p className="text-sm font-semibold text-[#92400E]">Stock bajo detectado</p><p className="text-xs text-[#92400E]/70">2 repuestos están por debajo del mínimo configurado</p></div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Package, value: "2", label: "Total repuestos", bg: "bg-[#DBEAFE]", color: "text-[#1D4ED8]" },
          { icon: AlertTriangle, value: "2", label: "Stock bajo", bg: "bg-[#FEF3C7]", color: "text-[#D97706]" },
          { icon: AlertCircle, value: "1", label: "Sin stock", bg: "bg-[#FEE2E2]", color: "text-[#DC2626]" },
          { icon: DollarSign, value: "$30.00", label: "Valor inventario", bg: "bg-[#FFF7ED]", color: "text-[#EA580C]" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div><p className="text-2xl font-bold text-[#111827]">{kpi.value}</p><p className="text-xs text-[#6B7280]">{kpi.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Management center */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="p-5 border-b border-[#EAECEF]">
          <h2 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)]">Control de repuestos</h2>
          <p className="text-xs text-[#6B7280] mt-1">Filtra, ajusta y gestiona el inventario desde una sola vista.</p>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-[#EAECEF] flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm"><Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder="Buscar repuesto o SKU…" className="w-full border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]" /></div>
            <div className="flex border-b border-[#E5E7EB]">
              {tabs.map((t) => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === t.key ? "text-[#EA580C] border-[#EA580C]" : "text-[#6B7280] border-transparent hover:text-[#111827]"}`}>{t.label}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#92400E] bg-[#FEF3C7] px-2 py-1 rounded-md font-semibold border border-[#FDE68A]">2 en alerta</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EAECEF]">
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Repuesto</th>
                <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Costo</th>
                <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Venta</th>
                <th className="text-center text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Stock</th>
                <th className="text-center text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Mín.</th>
                <th className="text-center text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const currentStock = stockCounts[r.id] ?? r.stock;
                const currentEstado = getEstado(r.id, r.estado);
                return (
                  <tr key={r.id} className="border-b border-[#EAECEF] last:border-b-0 hover:bg-[#F5F7FB] transition-colors">
                    <td className="px-6 py-4"><Link href={`/dashboard/inventario/${r.id}`} className="block"><p className="text-sm font-medium text-[#111827] hover:text-[#EA580C]">{r.nombre}</p><p className="text-xs text-[#94A3B8] font-mono">{r.sku}</p></Link></td>
                    <td className="px-6 py-4 text-right text-sm text-[#6B7280]">${r.costo.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right text-sm text-[#6B7280]">${r.venta.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4"><div className="flex items-center justify-center gap-2"><button onClick={() => updateStock(r.id, -1)} className="w-7 h-7 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F5F7FB]"><Minus className="w-3 h-3 text-[#6B7280]" /></button><span className="text-sm font-medium text-[#111827] w-6 text-center">{currentStock}</span><button onClick={() => updateStock(r.id, 1)} className="w-7 h-7 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F5F7FB]"><Plus className="w-3 h-3 text-[#6B7280]" /></button></div></td>
                    <td className="px-6 py-4 text-center text-sm text-[#6B7280]">{r.stockMinimo}</td>
                    <td className="px-6 py-4 text-center"><StockBadge estado={currentEstado} /></td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-[#94A3B8]">No se encontraron repuestos en esta categoría.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNewModal && <NuevoRepuestoModal onClose={() => setShowNewModal(false)} />}
    </div>
  );
}
