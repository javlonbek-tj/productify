import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { App } from 'antd';
import { authApi } from '@/api/auth.api';

export function useForgotPassword() {
  const { message } = App.useApp();

  const sendOtp = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword({ email }),
    onError: () => void message.error('Failed to send code. Please try again.'),
  });

  const verifyOtp = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyResetOtp({ email, otp }),
    onError: () => void message.error('Invalid or expired code.'),
  });

  const resetPassword = useMutation({
    mutationFn: ({
      resetToken,
      password,
    }: {
      resetToken: string;
      password: string;
    }) => authApi.resetPassword({ resetToken, password }),
    onError: () =>
      void message.error('Failed to reset password. Please try again.'),
  });

  return { sendOtp, verifyOtp, resetPassword };
}

export function useLogout() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => void navigate('/login'),
    onError: () => void message.error('Logout failed.'),
  });
}
