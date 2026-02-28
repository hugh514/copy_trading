"use client";

import { useAuth } from "@/src/contexts/auth-context";
import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  Download,
  Key,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <aside className="w-64 bg-neutral-50 border-r border-neutral-200 h-screen flex-col hidden md:flex sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-md">
          <Activity className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          CopyTrade
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-3">
          Menu Principal
        </div>
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-600 font-medium transition-all hover:text-primary hover:bg-white hover:shadow-sm",
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        {isAdmin && (
          <Link
            href="/dashboard/usuarios"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-600 font-medium transition-all hover:text-primary hover:bg-white hover:shadow-sm",
            )}
          >
            <Users className="h-5 w-5" />
            Gestão de Usuários
          </Link>
        )}
        <Link
          href="/risk-management"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-600 font-medium transition-all hover:text-primary hover:bg-white hover:shadow-sm",
          )}
        >
          <ShieldAlert className="h-5 w-5" />
          Gestão de Risco
        </Link>
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 mt-6 px-3">
          Integração
        </div>
        <Link
          href="/download"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-600 font-medium transition-all hover:text-primary hover:bg-white hover:shadow-sm",
          )}
        >
          <Download className="h-5 w-5" />
          Baixar Robô
        </Link>
        <Link
          href="/access-key"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-600 font-medium transition-all hover:text-primary hover:bg-white hover:shadow-sm",
          )}
        >
          <Key className="h-5 w-5" />
          Chave de Acesso
        </Link>
      </nav>
      <div className="p-6 text-xs text-neutral-400 text-center">
        &copy; 2026 CopyTrade MVP
      </div>
    </aside>
  );
}
