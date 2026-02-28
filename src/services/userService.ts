import api from "./api";
import { User, CreateUserDto, UpdateUserStatusDto } from "../types/user";

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get("/api/users");
    const data = response.data.data || response.data;
    if (
      data &&
      !Array.isArray(data) &&
      typeof data === "object" &&
      "users" in data
    ) {
      return (data as any).users;
    }
    return Array.isArray(data) ? data : [];
  },

  async create(data: CreateUserDto): Promise<User> {
    const response = await api.post("/api/users", data);
    return response.data.data || response.data;
  },

  async toggleStatus(id: string, isActive: boolean): Promise<User> {
    const response = await api.patch(`/api/users/${id}/status`, { isActive });
    return response.data.data || response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/users/${id}`);
  },

  async resetPassword(id: string): Promise<{ message: string }> {
    const response = await api.post(`/api/users/${id}/reset-password`);
    return response.data.data || response.data;
  },
};
