import api from "./api";
import { DashboardSummary, TradePosition } from "../types/dashboard";

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const response = await api.get("/dashboard/summary");
    return response.data.data || response.data;
  },

  async getPositions(): Promise<TradePosition[]> {
    const response = await api.get("/dashboard/positions");
    return response.data.data || response.data;
  },
};
