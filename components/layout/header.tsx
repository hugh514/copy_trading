import Link from "next/link";
import {
  Bell,
  Search,
  UserCircle,
  LogOut,
  Settings,
  User,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function Header() {
  const notifications = [
    {
      id: 1,
      title: "Robô Sincronizado com Sucesso",
      description:
        "O Expert Advisor foi conectado na conta corrente terminada em 4321.",
      time: "Há 2 horas",
      type: "success",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      read: false,
    },
    {
      id: 2,
      title: "Alerta de Margem Baixa",
      description:
        "A margem livre na sua conta atingiu o nível de alerta (abaixo de 20%).",
      time: "Há 5 horas",
      type: "warning",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      read: false,
    },
    {
      id: 3,
      title: "Atualização Disponível v1.0.0",
      description:
        "Uma nova versão do CopyTrade EA está disponível para download. Vá até a aba 'Baixar Robô'.",
      time: "Ontem",
      type: "info",
      icon: <Info className="h-4 w-4 text-blue-500" />,
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

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
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100 focus:outline-none">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4 mt-1" align="end">
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
              <h4 className="font-semibold text-sm">Notificações</h4>
              {unreadCount > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} novas
                </span>
              )}
            </div>
            <ScrollArea className="h-80">
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-neutral-50 hover:bg-neutral-50 transition-colors flex gap-3 items-start ${!notification.read ? "bg-primary/5" : ""}`}
                  >
                    <div className="mt-0.5 shrink-0 bg-white rounded-full p-1.5 border border-neutral-100 shadow-sm">
                      {notification.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium leading-none ${!notification.read ? "text-neutral-900" : "text-neutral-700"}`}
                        >
                          {notification.title}
                        </p>
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center text-[10px] text-neutral-400 gap-1 pt-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t border-neutral-100">
              <Button
                variant="ghost"
                className="w-full text-xs h-8 text-primary font-medium"
                size="sm"
              >
                <Check className="h-3 w-3 mr-2" /> Marcar todas como lidas
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-200 shadow-sm hover:ring-2 hover:ring-primary/20 transition-all focus:outline-none">
              <UserCircle className="h-full w-full text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">João Silva</p>
                <p className="text-xs leading-none text-muted-foreground">
                  joao.silva@exemplo.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span>Meu Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="h-4 w-4" />
                <span>Sair da conta</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
