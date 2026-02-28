export interface RiskSettings {
  multiplier: number;
  dailyLossLimit: number;
  isActive: boolean;
}

export interface UpdateRiskDto {
  multiplier: number;
  dailyLossLimit: number;
  isActive: boolean;
}
