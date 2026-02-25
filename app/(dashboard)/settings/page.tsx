import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Palette, Globe, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Configurações
        </h1>
        <p className="text-neutral-500 mt-2">
          Ajuste as preferências do sistema para personalizar sua experiência.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-neutral-500" />
              <CardTitle>Preferências de Notificação</CardTitle>
            </div>
            <CardDescription>
              Escolha como e quando ser notificado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
              <div className="space-y-0.5">
                <Label className="text-base text-neutral-900 font-medium">
                  Notificações por Email
                </Label>
                <p className="text-sm text-neutral-500">
                  Receba alertas de margem e novas atualizações via email.
                </p>
              </div>
              <div className="relative inline-block w-11 h-6 select-none bg-primary/20 rounded-full cursor-pointer transition-colors">
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-primary transition-transform translate-x-5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
              <div className="space-y-0.5">
                <Label className="text-base text-neutral-900 font-medium">
                  Notificações no Navegador
                </Label>
                <p className="text-sm text-neutral-500">
                  Permita que o navegador exiba alertas em tempo real.
                </p>
              </div>
              <div className="relative inline-block w-11 h-6 select-none bg-neutral-200 rounded-full cursor-pointer transition-colors">
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-neutral-500" />
              <CardTitle>Aparência</CardTitle>
            </div>
            <CardDescription>
              Gerencie a visualização do painel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-neutral-700">
                Modo de Exibição
              </Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    className="text-primary focus:ring-primary/20"
                    defaultChecked
                  />
                  <span className="text-sm text-neutral-700">Claro</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    className="text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-neutral-700">
                    Escuro (Em Breve)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    className="text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-neutral-700">Automático</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-neutral-500" />
              <CardTitle>Idioma e Região</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-neutral-700">
                  Idioma
                </Label>
                <select className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-neutral-700 text-sm">
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-neutral-700">
                  Fuso Horário
                </Label>
                <select className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-neutral-700 text-sm">
                  <option value="America/Sao_Paulo">
                    (UTC-03:00) Brasília
                  </option>
                  <option value="America/New_York">(UTC-05:00) New York</option>
                  <option value="Europe/London">(UTC+00:00) London</option>
                </select>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                Salvar Configurações
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
