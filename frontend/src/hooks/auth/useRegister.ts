import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { App } from 'antd';
import { authApi } from '@/api/auth.api';
import type { RegisterRequest } from '@/types';

export function useRegister() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (_, variables) => {
      navigate('/verify-otp', { state: { email: variables.email } });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      message.error(
        error.response?.data?.message ??
          'Registration failed. Please try again.',
      );
    },
  });
}
