export type UserRole = "ADMIN" | "CLIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  tradingPairs?: string[];
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface UpdateUserStatusDto {
  isActive: boolean;
}
