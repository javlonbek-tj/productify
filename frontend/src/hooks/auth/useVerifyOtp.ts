import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { App } from 'antd';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';

export function useVerifyOtp(email: string) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { message } = App.useApp();

  const verify = useMutation({
    mutationFn: (otp: string) => authApi.verifyOtp({ email, otp }),
    onSuccess: ({ data }) => {
      setAuth(data.data.accessToken, data.data.user);
      navigate('/');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      message.error(
        error.response?.data?.message ?? 'Invalid or expired code.',
      );
    },
  });

  const resend = useMutation({
    mutationFn: () => authApi.resendOtp(email),
    onSuccess: () => message.success('A new code has been sent to your email.'),
    onError: () => message.error('Failed to resend code. Please try again.'),
  });

  return { verify, resend };
}
