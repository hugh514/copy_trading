export interface TradeAccount {
  id?: string;
  userId?: string;
  balance: number;
  equity: number;
  dailyProfit: number;
  winRate: number;
  lastSyncAt?: string;
}

export interface RiskSettings {
  multiplier: number;
  dailyLossLimit: number;
  isActive: boolean;
}

export interface AccountProfile {
  language: string;
  theme: string;
  timezone: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "CLIENT" | "ADMIN";
  accountProfile: AccountProfile | null;
  riskSettings: RiskSettings | null;
  tradeAccount: TradeAccount | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
