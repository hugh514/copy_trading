import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => dashboardService.getSummary(),
    refetchInterval: 30000,
  });
}

export function useDashboardPositions() {
  return useQuery({
    queryKey: ["dashboard-positions"],
    queryFn: () => dashboardService.getPositions(),
    refetchInterval: 5000,
  });
}
