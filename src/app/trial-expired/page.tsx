"use client";

import Link from "next/link";
import { Wrench, AlertTriangle } from "lucide-react";

export default function TrialExpiredPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#EA580C] flex items-center justify-center">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#1F2937] font-[family-name:var(--font-manrope)]">
            Fixx
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFF7ED] flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-[#EA580C]" />
          </div>

          <h1 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)] mb-3">
            Periodo de prueba finalizado
          </h1>

          <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
            Tu prueba gratuita de 7 días ha terminado. Para seguir usando Fixx y
            gestionar tu taller, contacta a nuestro equipo para activar tu plan.
          </p>

          <div className="bg-[#F5F7FB] rounded-lg p-4 mb-6 border border-[#E5E7EB]">
            <p className="text-xs text-[#94A3B8] uppercase font-semibold tracking-wider mb-1">
              Estado de la cuenta
            </p>
            <p className="text-sm font-semibold text-[#D97706]">
              ● Suspendida — prueba expirada
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="https://wa.me/52TUNUMERODEWHATSAPP?text=Hola%2C%20quiero%20activar%20mi%20plan%20de%20Fixx"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors text-center"
            >
              Contactar para activar plan
            </a>

            <Link
              href="/login"
              className="block w-full py-3 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] hover:border-[#D1D5DB] transition-colors text-center"
            >
              Volver al inicio
            </Link>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] mt-6">
          Tu información se mantiene guardada por 30 días. No perderás tus
          datos.
        </p>
      </div>
    </div>
  );
}
