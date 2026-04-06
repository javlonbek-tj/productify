import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Divider } from 'antd';
import { Link } from 'react-router';
import { loginSchema, type LoginFormValues } from '@/lib/schemas/auth.schema';
import { useLogin } from '@/hooks/auth/useLogin';
import LinkedInLogo from '@/components/ui/brand/LinkedInLogo';
import FieldItem from '@/components/ui/form/FieldItem';

export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className='min-h-screen bg-[#F3F2EE]'>
      <header className='flex justify-center pt-6 pb-2'>
        <LinkedInLogo />
      </header>

      <main className='flex flex-col items-center px-4 pt-6'>
        <div className='w-full max-w-100'>
          <div className='rounded-lg bg-white px-8 py-8 shadow-md'>
            <h1 className='mb-5 text-2xl font-semibold text-gray-900'>
              Sign in
            </h1>

            <form onSubmit={handleSubmit((data) => mutate(data))} noValidate>
              <div className='space-y-4'>
                <FieldItem
                  id='email'
                  label='Email'
                  error={errors.email?.message}
                >
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id='email'
                        size='large'
                        type='email'
                        placeholder='Email'
                        status={errors.email ? 'error' : ''}
                      />
                    )}
                  />
                </FieldItem>

                <FieldItem
                  id='password'
                  label='Password'
                  error={errors.password?.message}
                >
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        id='password'
                        size='large'
                        placeholder='Password'
                        status={errors.password ? 'error' : ''}
                      />
                    )}
                  />
                </FieldItem>
              </div>

              <div className='mt-1 text-right'>
                <Link
                  to='/forgot-password'
                  className='text-sm font-semibold text-[#0A66C2] hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                loading={isPending}
                className='mt-5 h-12 rounded-full text-base font-semibold'
              >
                Sign in
              </Button>
            </form>
          </div>

          <Divider className='my-4 text-gray-500 text-sm'>or</Divider>

          <p className='text-center text-sm text-gray-700'>
            New to LinkedIn?{' '}
            <Link
              to='/register'
              className='font-semibold text-[#0A66C2] hover:underline'
            >
              Join now
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
