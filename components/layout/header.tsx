import Link from "next/link";
import { Bell, Search, UserCircle, LogOut } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 w-full shadow-sm">
      <div className="flex items-center gap-4 text-neutral-500">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="search"
            placeholder="Buscar ativo..."
            className="pl-9 pr-4 py-2 bg-neutral-100 border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white w-64 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 relative">
        <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
          <UserCircle className="h-full w-full text-neutral-400" />
        </div>
        <Link
          href="/login"
          className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full ml-2"
          title="Sair da Conta"
        >
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
