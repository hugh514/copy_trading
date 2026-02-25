import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Baixar Robô
        </h1>
        <p className="text-neutral-500 mt-2">
          Faça o download da versão mais recente do Expert Advisor para
          MetaTrader 5.
        </p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>CopyTrade EA v1.0.0</CardTitle>
          <CardDescription>
            Atualizado em 25 de Fevereiro de 2026
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-neutral-50 p-6 rounded-lg border border-neutral-100">
            <div className="space-y-1">
              <h3 className="font-semibold text-neutral-900">
                Instalação Simples
              </h3>
              <p className="text-sm text-neutral-500 max-w-md">
                Baixe o arquivo .ex5 e coloque na pasta Experts do seu
                MetaTrader 5. Não se esqueça de permitir WebRequest nas opções.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm w-full md:w-auto justify-center">
              <Download className="h-5 w-5" />
              Fazer Download
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>Como Instalar</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-4 text-neutral-600">
            <li>
              Faça o download do arquivo <strong>CopyTrade_v1.0.0.ex5</strong>.
            </li>
            <li>
              Abra o MetaTrader 5 e vá em{" "}
              <strong>Arquivo &gt; Abrir Pasta de Dados</strong>.
            </li>
            <li>
              Navegue até <strong>MQL5 &gt; Experts</strong> e cole o arquivo
              baixado.
            </li>
            <li>
              No MetaTrader 5, vá em{" "}
              <strong>Ferramentas &gt; Opções &gt; Expert Advisors</strong>.
            </li>
            <li>
              Marque{" "}
              <strong>"Permitir WebRequest para as URLs listadas:"</strong> e
              adicione o endereço do servidor (Ex:{" "}
              <em>https://api.copytrade.com</em>).
            </li>
            <li>
              Arraste o Robô para o gráfico desejado e insira sua{" "}
              <strong>Chave de Acesso</strong>.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
