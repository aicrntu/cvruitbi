import api from "@/lib/axios";

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export async function adminLogin(email: string, password: string) {
  const res = await api.post<LoginResponse>("/admin/login", {
    email,
    password,
  });
  return res.data;
}

export async function registerAdmin(email: string, password: string) {
  const res = await api.post<RegisterResponse>("/admin/register", {
    email,
    password,
  });
  return res.data;
}

export function logoutAdmin() {
  localStorage.removeItem("admin_token");
}
