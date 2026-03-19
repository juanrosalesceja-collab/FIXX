"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Clock, Settings, CheckCircle2, Truck, Search } from "lucide-react";
import { ordenes } from "@/lib/mock-data";
import NuevaOrdenModal from "@/components/ordenes/nueva-orden-modal";

const tabs = [
  { key: "all", label: "Todas" },
  { key: "Pendiente", label: "Pendiente" },
  { key: "En proceso", label: "En proceso" },
  { key: "Finalizado", label: "Listo" },
  { key: "Entregado", label: "Entregado" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "En proceso": "bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]",
    Pendiente: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    Entregado: "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]",
    Finalizado: "bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "En proceso" ? "bg-[#1D4ED8]" : status === "Pendiente" ? "bg-[#D97706]" : status === "Finalizado" ? "bg-[#EA580C]" : "bg-[#16A34A]"}`} />
      {status}
    </span>
  );
}

export default function OrdenesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);

  const filtered = activeTab === "all" ? ordenes : ordenes.filter((o) => o.estado === activeTab);
  const pendientes = ordenes.filter((o) => o.estado === "Pendiente").length;
  const enProceso = ordenes.filter((o) => o.estado === "En proceso").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">
            Órdenes de trabajo
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Órdenes activas, pendientes y entregadas del taller.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F7FB] transition-colors">
            <RefreshCw className="w-4 h-4 text-[#6B7280]" />
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva orden
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111827]">{pendientes}</p>
              <p className="text-xs text-[#6B7280]">Pendientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#1D4ED8]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111827]">{enProceso}</p>
              <p className="text-xs text-[#6B7280]">En proceso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-[#EAECEF] flex-wrap gap-3">
          {/* Tabs */}
          <div className="flex border-b border-[#E5E7EB]">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                  activeTab === t.key
                    ? "text-[#EA580C] border-[#EA580C]"
                    : "text-[#6B7280] border-transparent hover:text-[#111827]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar orden..."
                className="border border-[#E5E7EB] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] w-48"
              />
            </div>
            <select className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm bg-white text-[#6B7280]">
              <option>Todos los clientes</option>
              <option>Usuario Cliente</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EAECEF]">
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">OT</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Vehículo</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Mecánico</th>
                <th className="text-left text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Estado</th>
                <th className="text-right text-[10px] font-semibold text-[#94A3B8] px-6 py-3 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-[#EAECEF] last:border-b-0 hover:bg-[#F5F7FB] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/ordenes/${o.id}`} className="text-sm font-semibold text-[#111827] hover:text-[#EA580C]">
                      {o.id}
                    </Link>
                    <p className="text-xs text-[#94A3B8]">{o.fecha}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#111827]">{o.vehiculo}</p>
                    <p className="text-xs text-[#94A3B8] font-mono">ABCD</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{o.mecanico}</td>
                  <td className="px-6 py-4"><StatusBadge status={o.estado} /></td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-[#111827]">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNewModal && <NuevaOrdenModal onClose={() => setShowNewModal(false)} />}
    </div>
  );
}
