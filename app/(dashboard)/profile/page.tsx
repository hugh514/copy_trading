import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle, Mail, Shield, Smartphone, Key } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Meu Perfil
        </h1>
        <p className="text-neutral-500 mt-2">
          Gerencie suas informações pessoais e configurações de segurança.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 border-neutral-200 shadow-sm text-center pt-6">
          <CardContent className="space-y-4">
            <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <UserCircle className="h-16 w-16" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-neutral-900">João Silva</h3>
              <p className="text-sm text-neutral-500">Membro Premium</p>
            </div>
            <button className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-md transition-colors mt-4">
              Alterar Foto
            </button>
          </CardContent>
        </Card>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados de contato.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-700 block">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    defaultValue="João Silva"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-700 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      defaultValue="joao.silva@exemplo.com"
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-md bg-neutral-50 text-neutral-500 focus:outline-none"
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-700 block">
                    Telefone
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                    <input
                      type="tel"
                      defaultValue="+55 (11) 98765-4321"
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                  Salvar Alterações
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-neutral-900 text-sm">
                      Autenticação de Dois Fatores (2FA)
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Ativado para maior segurança da conta.
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:underline">
                  Configurar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-neutral-500" />
                  <div>
                    <h4 className="font-medium text-neutral-900 text-sm">
                      Senha de Acesso
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Última alteração há 3 meses.
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:underline">
                  Alterar
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
