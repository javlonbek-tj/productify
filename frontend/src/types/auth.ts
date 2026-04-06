import type { AuthUser } from './user';

// Requests
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  password: string;
}

// Responses
export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface VerifyResetOtpResponse {
  resetToken: string;
}
