import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { riskService } from "../services/riskService";
import { UpdateRiskDto } from "../types/risk";

export function useRiskSettings() {
  return useQuery({
    queryKey: ["risk-settings"],
    queryFn: () => riskService.getSettings(),
  });
}

export function useUpdateRiskSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateRiskDto) => riskService.updateSettings(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risk-settings"] });
    },
  });
}
