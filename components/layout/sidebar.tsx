import Link from "next/link";
import { LayoutDashboard, ShieldAlert, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
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
        <Link
          href="/risk-management"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-600 font-medium transition-all hover:text-primary hover:bg-white hover:shadow-sm",
          )}
        >
          <ShieldAlert className="h-5 w-5" />
          Gestão de Risco
        </Link>
      </nav>
      <div className="p-6 text-xs text-neutral-400 text-center">
        &copy; 2026 CopyTrade MVP
      </div>
    </aside>
  );
}
