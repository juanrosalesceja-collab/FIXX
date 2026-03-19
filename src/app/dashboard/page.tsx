"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";
import { ingresosSemanales } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">
          Dashboard
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Resumen operativo del taller. Estado actual y actividad del día.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                En proceso
              </p>
              <p className="text-3xl font-bold text-[#111827] mt-1">2</p>
              <p className="text-xs text-[#6B7280] mt-1">
                Órdenes activas ahora
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#1D4ED8]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                Ingresos del día
              </p>
              <p className="text-3xl font-bold text-[#EA580C] mt-1">
                $1,807.50
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Operación del día
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#EA580C]" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[#111827] font-[family-name:var(--font-manrope)] mb-1">
          Ingresos de la semana
        </h2>
        <p className="text-xs text-[#6B7280] mb-6">
          Actividad de facturación y gastos operativos
        </p>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ingresosSemanales}>
              <defs>
                <linearGradient id="colorIngreso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EA580C" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAECEF" />
              <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "13px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
              <Area type="monotone" dataKey="ingreso" stroke="#EA580C" strokeWidth={2} fill="url(#colorIngreso)" />
              <Area type="monotone" dataKey="gasto" stroke="#2563EB" strokeWidth={2} fill="url(#colorGasto)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
