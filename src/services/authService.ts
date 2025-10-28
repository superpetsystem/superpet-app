import { api } from "@/lib/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  User,
} from "@/types/auth";

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async refreshToken(data: RefreshTokenRequest): Promise<{ access_token: string }> {
    const response = await api.post("/auth/refresh", data);
    return response.data;
  },

  async logout(refreshToken: string): Promise<{ message: string }> {
    const response = await api.post("/auth/logout", { refreshToken });
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await api.post("/auth/change-password", data);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string; token?: string }> {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },
};

