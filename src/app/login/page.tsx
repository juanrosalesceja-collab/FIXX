"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, Package, Car, Bell, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Ingresa tu email y contraseña.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
        setLoading(false);
        return;
      }

      // Log login event
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("audit_logs").insert({
          user_id: user.id,
          action: "login",
          metadata: { email },
        }).then(() => {});
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left column — Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#1F2937] text-white flex-col justify-center px-16 py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white/20" />
            <div className="absolute bottom-32 left-10 w-48 h-48 rounded-full border border-white/20" />
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-9 h-9 rounded-lg bg-[#EA580C] flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-manrope)]">Fixx</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-4 font-[family-name:var(--font-manrope)]">
              Control total del taller,
              <br />
              sin desorden.
            </h1>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-10">
              Órdenes, clientes, inventario y seguimiento en una sola
              plataforma. Todo lo necesario para operar rápido y con control.
            </p>

            <div className="flex gap-6 mb-10">
              {[
                { value: "9", label: "órdenes hoy" },
                { value: "2", label: "alertas de stock" },
                { value: "3", label: "recordatorios activos" },
              ].map((m) => (
                <div key={m.label} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                  <p className="text-2xl font-bold text-[#EA580C]">{m.value}</p>
                  <p className="text-xs text-[#94A3B8]">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ClipboardList, title: "Órdenes centralizadas", desc: "Crea, sigue y cierra desde un solo panel." },
                { icon: Package, title: "Inventario con alertas", desc: "Stock actualizado con alertas automáticas." },
                { icon: Car, title: "Historial por vehículo", desc: "Cada unidad con registro completo." },
                { icon: Bell, title: "Seguimiento automático", desc: "Recordatorios y notificaciones por vehículo." },
              ].map((f) => (
                <div key={f.title} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <f.icon className="w-5 h-5 text-[#EA580C] mb-2" />
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1F2937] font-[family-name:var(--font-manrope)]">Fixx</span>
            </div>

            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74] mb-5">
              Acceso operativo
            </span>

            <div className="flex border-b border-[#E5E7EB] mb-6">
              <button className="px-4 py-2.5 text-sm font-semibold text-[#EA580C] border-b-2 border-[#EA580C]">
                Iniciar sesión
              </button>
              <Link href="/registro" className="px-4 py-2.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors">
                Crear cuenta
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-[#111827] font-[family-name:var(--font-manrope)]">Acceder</h2>
            <p className="text-sm text-[#6B7280] mt-1 mb-6">
              Ingresa a tu panel y continúa con la operación del taller.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-sm text-[#DC2626]">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="tu@email.com"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] transition-colors bg-white"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors disabled:opacity-60"
              >
                {loading ? "Ingresando..." : "Entrar al sistema"}
              </button>
            </div>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="text-[#EA580C] font-semibold hover:underline">
                Crea tu cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center py-4 text-xs text-[#94A3B8]">
        © 2026 Fixx · Todos los derechos reservados
      </footer>
    </div>
  );
}
