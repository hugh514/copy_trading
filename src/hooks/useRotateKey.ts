import { useMutation } from "@tanstack/react-query";
import { keyService } from "../services/keyService";

export function useRotateKey() {
  return useMutation({
    mutationFn: () => keyService.rotateKey(),
  });
}
