import api from "./api";

export const systemService = {
  async getDownloadUrl(): Promise<{ url: string }> {
    const response = await api.get("/system/download-url");
    return response.data.data || response.data;
  },
};
