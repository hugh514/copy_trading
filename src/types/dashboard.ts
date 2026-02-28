export interface DashboardSummary {
  balance: number;
  equity: number;
  dailyProfit: number;
  winRate: number;
}

export interface TradePosition {
  id: string;
  asset: string;
  type: "BUY" | "SELL";
  volume: number;
  openPrice: number;
  currentProfit: number;
}
