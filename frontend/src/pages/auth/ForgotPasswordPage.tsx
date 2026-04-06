import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Steps } from 'antd';
import { Link } from 'react-router';
import { useState } from 'react';
import {
  forgotPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
  type ForgotPasswordFormValues,
  type VerifyResetOtpFormValues,
  type ResetPasswordFormValues,
} from '@/lib/schemas/auth.schema';
import { useForgotPassword } from '@/hooks/auth/useForgotPassword';
import LinkedInLogo from '@/components/ui/brand/LinkedInLogo';
import FieldItem from '@/components/ui/form/FieldItem';

type Step = 'email' | 'otp' | 'reset';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  const { sendOtp, verifyOtp, resetPassword } = useForgotPassword();

  const emailForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const otpForm = useForm<VerifyResetOtpFormValues>({
    resolver: zodResolver(verifyResetOtpSchema),
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const stepIndex = step === 'email' ? 0 : step === 'otp' ? 1 : 2;

  return (
    <div className='min-h-screen bg-[#F3F2EE]'>
      <header className='flex justify-center pt-6 pb-2'>
        <LinkedInLogo />
      </header>

      <main className='flex flex-col items-center px-4 pt-6'>
        <div className='w-full max-w-100 rounded-lg bg-white px-8 py-8 shadow-md'>
          <h1 className='mb-6 text-2xl font-semibold text-gray-900'>
            Reset password
          </h1>

          <Steps
            size='small'
            current={stepIndex}
            style={{ marginBottom: 32 }}
            items={[
              { title: 'Email' },
              { title: 'Verify' },
              { title: 'Reset' },
            ]}
          />

          {step === 'email' && (
            <form
              onSubmit={emailForm.handleSubmit(({ email: e }) => {
                setEmail(e);
                sendOtp.mutate(e, { onSuccess: () => setStep('otp') });
              })}
              noValidate
            >
              <FieldItem
                id='fp-email'
                label='Email'
                error={emailForm.formState.errors.email?.message}
              >
                <Controller
                  name='email'
                  control={emailForm.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='fp-email'
                      size='large'
                      type='email'
                      placeholder='Enter your email'
                      status={emailForm.formState.errors.email ? 'error' : ''}
                    />
                  )}
                />
              </FieldItem>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                loading={sendOtp.isPending}
                className='mt-4 h-12 rounded-full text-base font-semibold'
              >
                Send code
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <>
              <p className='mb-4 text-sm text-gray-600'>
                Code sent to <span className='font-semibold'>{email}</span>
              </p>
              <form
                onSubmit={otpForm.handleSubmit(({ otp }) => {
                  verifyOtp.mutate(
                    { email, otp },
                    {
                      onSuccess: ({ data }) => {
                        setResetToken(data.data.resetToken);
                        setStep('reset');
                      },
                    },
                  );
                })}
                noValidate
              >
                <FieldItem
                  id='reset-otp'
                  error={otpForm.formState.errors.otp?.message}
                >
                  <Controller
                    name='otp'
                    control={otpForm.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id='reset-otp'
                        size='large'
                        maxLength={6}
                        placeholder='6-digit code'
                        className='text-center text-xl tracking-[0.5em]'
                        status={otpForm.formState.errors.otp ? 'error' : ''}
                      />
                    )}
                  />
                </FieldItem>
                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  block
                  loading={verifyOtp.isPending}
                  className='mt-4 h-12 rounded-full text-base font-semibold'
                >
                  Verify
                </Button>
              </form>
            </>
          )}

          {step === 'reset' && (
            <form
              onSubmit={resetForm.handleSubmit(({ password }) => {
                resetPassword.mutate(
                  { resetToken, password },
                  { onSuccess: () => window.location.replace('/login') },
                );
              })}
              noValidate
            >
              <FieldItem
                id='new-password'
                label='New password'
                error={resetForm.formState.errors.password?.message}
              >
                <Controller
                  name='password'
                  control={resetForm.control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      id='new-password'
                      size='large'
                      placeholder='Min. 8 characters'
                      status={
                        resetForm.formState.errors.password ? 'error' : ''
                      }
                    />
                  )}
                />
              </FieldItem>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                loading={resetPassword.isPending}
                className='mt-4 h-12 rounded-full text-base font-semibold'
              >
                Reset password
              </Button>
            </form>
          )}

          <div className='mt-6 text-center'>
            <Link
              to='/login'
              className='text-sm font-semibold text-[#0A66C2] hover:underline'
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
