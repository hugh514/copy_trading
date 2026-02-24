import { cn } from "@/lib/utils";

interface Trade {
  id: string;
  asset: string;
  type: "BUY" | "SELL";
  volume: number;
  openPrice: number;
  currentProfit: number;
}

const mockTrades: Trade[] = [
  {
    id: "1",
    asset: "EURUSD",
    type: "BUY",
    volume: 1.5,
    openPrice: 1.0854,
    currentProfit: 125.5,
  },
  {
    id: "2",
    asset: "GBPUSD",
    type: "SELL",
    volume: 0.5,
    openPrice: 1.2642,
    currentProfit: -45.2,
  },
  {
    id: "3",
    asset: "USDJPY",
    type: "BUY",
    volume: 2.0,
    openPrice: 150.32,
    currentProfit: 340.0,
  },
  {
    id: "4",
    asset: "XAUUSD",
    type: "SELL",
    volume: 0.1,
    openPrice: 2024.5,
    currentProfit: 85.0,
  },
];

export function OpenTradesTable() {
  return (
    <div className="rounded-2xl border-none bg-white shadow-sm ring-1 ring-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100">
        <h3 className="text-lg font-semibold text-neutral-900 leading-none tracking-tight">
          Operações Abertas
        </h3>
        <p className="text-sm text-neutral-500 mt-1.5">
          Lista de posições em andamento na sua conta de copy trading.
        </p>
      </div>
      <div className="w-full overflow-auto">
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
            {mockTrades.map((trade) => (
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
            {mockTrades.length === 0 && (
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
