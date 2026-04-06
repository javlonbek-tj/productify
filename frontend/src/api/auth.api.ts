import api from './axiosInstance';
import type {
  RegisterRequest,
  LoginRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  VerifyResetOtpRequest,
  ResetPasswordRequest,
  AuthResponse,
  VerifyResetOtpResponse,
} from '@/types';
import type { ApiResponse, ApiMessage } from '@/types';

export const authApi = {
  register: (data: RegisterRequest) =>
    api.post<ApiMessage>('/auth/register', data),

  verifyOtp: (data: VerifyOtpRequest) =>
    api.post<ApiResponse<AuthResponse>>('/auth/verify-otp', data),

  resendOtp: (email: string) =>
    api.post<ApiMessage>('/auth/resend-otp', { email }),

  login: (data: LoginRequest) =>
    api.post<ApiResponse<AuthResponse>>('/auth/login', data),

  logout: () => api.post<ApiMessage>('/auth/logout'),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<ApiMessage>('/auth/forgot-password', data),

  verifyResetOtp: (data: VerifyResetOtpRequest) =>
    api.post<ApiResponse<VerifyResetOtpResponse>>('/auth/verify-reset-otp', data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<ApiMessage>('/auth/reset-password', data),
};
