"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useDashboardPositions } from "@/src/hooks/useDashboard";

export function OpenTradesTable() {
  const { data: trades = [], isLoading } = useDashboardPositions();

  return (
    <div className="rounded-2xl border-none bg-white shadow-sm ring-1 ring-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 leading-none tracking-tight">
            Operações Abertas
          </h3>
          <p className="text-sm text-neutral-500 mt-1.5">
            Lista de posições em andamento na sua conta de copy trading.
          </p>
        </div>
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      <div className="w-full overflow-auto min-h-[200px]">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/50">
              <th className="h-12 px-6 text-left align-middle font-medium text-neutral-500">
                Ativo
              </th>
              <th className="h-12 px-6 text-center align-middle font-medium text-neutral-500">
                Tipo
              </th>
              <th className="h-12 px-6 text-right align-middle font-medium text-neutral-500">
                Volume / Lote
              </th>
              <th className="h-12 px-6 text-right align-middle font-medium text-neutral-500">
                Preço de Abertura
              </th>
              <th className="h-12 px-6 text-right align-middle font-medium text-neutral-500">
                Lucro Atual
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/80"
              >
                <td className="p-6 align-middle font-medium text-neutral-900">
                  {trade.asset}
                </td>
                <td className="p-6 align-middle text-center">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-semibold",
                      trade.type === "BUY"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-100",
                    )}
                  >
                    {trade.type}
                  </span>
                </td>
                <td className="p-6 align-middle text-right text-neutral-600">
                  {trade.volume.toFixed(2)}
                </td>
                <td className="p-6 align-middle text-right text-neutral-600">
                  {trade.openPrice.toFixed(4)}
                </td>
                <td
                  className={cn(
                    "p-6 align-middle text-right font-semibold",
                    trade.currentProfit >= 0
                      ? "text-emerald-600"
                      : "text-red-600",
                  )}
                >
                  {trade.currentProfit >= 0 ? "+" : ""}$
                  {trade.currentProfit.toFixed(2)}
                </td>
              </tr>
            ))}
            {!isLoading && trades.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 align-middle text-center text-neutral-500"
                >
                  Nenhuma operação aberta no momento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
