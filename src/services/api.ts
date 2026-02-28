import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to inject JWT
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.error("Não autorizado (401): Sessão expirada ou token inválido.");
      deleteCookie("token");
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (!path.includes("/login") && !path.includes("/register")) {
          window.location.href = "/login?expired=true";
        }
      }
    }

    if (status === 500) {
      console.error("Erro interno do servidor (500).");
    }

    return Promise.reject(error);
  },
);

export default api;
