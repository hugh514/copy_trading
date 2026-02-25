import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Key, Copy, RefreshCw } from "lucide-react";

export default function AccessKeyPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Chave de Acesso
        </h1>
        <p className="text-neutral-500 mt-2">
          Gerencie sua chave exclusiva para vincular o Expert Advisor à sua
          conta na plataforma.
        </p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>Sua Chave de Integração</CardTitle>
          <CardDescription>
            Esta chave de acesso é confidencial. Não a compartilhe com
            terceiros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-100 space-y-4">
            <label className="text-sm font-medium text-neutral-700 block">
              Chave de Acesso Atual
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  readOnly
                  value="CT-9F8A-B47C-E21D-8800"
                  className="w-full pl-10 pr-3 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-800 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm">
                <Copy className="h-4 w-4" />
                Copiar
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-900">
                Geração de Nova Chave
              </h4>
              <p className="text-sm text-neutral-500 mt-1">
                Isso invalidará a chave atual imediatamente.
              </p>
            </div>
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-md transition-colors font-medium text-sm">
              <RefreshCw className="h-4 w-4" />
              Gerar Nova Chave
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>Instruções de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-3 text-neutral-600">
            <li>Copie a chave de acesso acima.</li>
            <li>
              Abra as configurações (Inputs) do robô CopyTrade no seu MetaTrader
              5.
            </li>
            <li>
              Cole a chave no campo <strong>"Token"</strong> ou{" "}
              <strong>"Access Key"</strong>.
            </li>
            <li>
              Certifique-se de que a conta não possui ordens abertas
              conflitantes antes de ativar o robô.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
