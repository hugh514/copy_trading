import { useMutation } from "@tanstack/react-query";
import { systemService } from "../services/systemService";

export function useDownloadUrl() {
  return useMutation({
    mutationFn: () => systemService.getDownloadUrl(),
  });
}
