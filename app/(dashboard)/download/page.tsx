"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDownloadUrl } from "@/src/hooks/useDownloadUrl";

export default function DownloadPage() {
  const { toast } = useToast();
  const downloadUrlMutation = useDownloadUrl();

  const handleDownload = async () => {
    try {
      const response = await downloadUrlMutation.mutateAsync();
      const downloadUrl = response.url;

      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      } else {
        throw new Error("URL de download não encontrada.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no download",
        description:
          error.response?.data?.message ||
          "Não foi possível obter a URL de download.",
      });
    }
  };

  const isDownloading = downloadUrlMutation.isPending;
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
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm w-full md:w-auto justify-center disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              {isDownloading ? "Processando..." : "Fazer Download"}
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
