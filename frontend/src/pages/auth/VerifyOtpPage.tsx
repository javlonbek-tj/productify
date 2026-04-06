import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from '@/lib/schemas/auth.schema';
import { useVerifyOtp } from '@/hooks/auth/useVerifyOtp';
import LinkedInLogo from '@/components/ui/brand/LinkedInLogo';
import FieldItem from '@/components/ui/form/FieldItem';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { email?: string } | null };
  const email = state?.email ?? '';

  useEffect(() => {
    if (!email) navigate('/register', { replace: true });
  }, [email, navigate]);

  const { verify, resend } = useVerifyOtp(email);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
  });

  return (
    <div className='min-h-screen bg-[#F3F2EE]'>
      <header className='flex justify-center pt-6 pb-2'>
        <LinkedInLogo />
      </header>

      <main className='flex flex-col items-center px-4 pt-6'>
        <div className='w-full max-w-100 rounded-lg bg-white px-8 py-8 shadow-md'>
          <h1 className='mb-1 text-2xl font-semibold text-gray-900'>
            Verify your email
          </h1>
          <p className='mb-6 text-sm text-gray-600'>
            Enter the 6-digit code sent to{' '}
            <span className='font-semibold'>{email}</span>
          </p>

          <form
            onSubmit={handleSubmit(({ otp }) => verify.mutate(otp))}
            noValidate
          >
            <FieldItem id='otp' error={errors.otp?.message}>
              <Controller
                name='otp'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='otp'
                    size='large'
                    maxLength={6}
                    placeholder='6-digit code'
                    className='text-center text-xl tracking-[0.5em]'
                    status={errors.otp ? 'error' : ''}
                  />
                )}
              />
            </FieldItem>

            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              loading={verify.isPending}
              className='mt-4 h-12 rounded-full text-base font-semibold'
            >
              Verify
            </Button>
          </form>

          <div className='mt-4 text-center'>
            <span className='text-sm text-gray-600'>
              Didn't receive a code?{' '}
            </span>
            <Button
              type='link'
              onClick={() => resend.mutate()}
              loading={resend.isPending}
              className='p-0 text-sm font-semibold text-[#0A66C2]'
            >
              Resend
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
