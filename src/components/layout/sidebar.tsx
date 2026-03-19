"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Car,
  Users,
  User,
  LogOut,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/ordenes", label: "Órdenes", icon: ClipboardList },
  { href: "/dashboard/inventario", label: "Inventario", icon: Package },
  { href: "/dashboard/vehiculos", label: "Vehículos", icon: Car },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/perfil", label: "Mi Perfil", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col min-h-screen fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#E5E7EB]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-[#1F2937] font-[family-name:var(--font-manrope)]">Fixx</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]/40"
                  : "text-[#6B7280] hover:bg-[#F5F7FB] hover:text-[#111827]"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#E5E7EB]">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F5F7FB] hover:text-[#111827] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
