import api from "./api";
import { RotateKeyResponse } from "../types/keys";

export const keyService = {
  async rotateKey(): Promise<RotateKeyResponse> {
    const response = await api.post("/keys/rotate");
    return response.data.data || response.data;
  },
};
