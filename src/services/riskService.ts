import api from "./api";
import { RiskSettings, UpdateRiskDto } from "../types/risk";

export const riskService = {
  async getSettings(): Promise<RiskSettings> {
    const response = await api.get("/risk/settings");
    return response.data.data || response.data;
  },

  async updateSettings(dto: UpdateRiskDto): Promise<RiskSettings> {
    const response = await api.put("/risk/settings", dto);
    return response.data.data || response.data;
  },
};
