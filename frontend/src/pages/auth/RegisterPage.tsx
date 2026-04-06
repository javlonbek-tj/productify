import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Divider } from 'antd';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/lib/schemas/auth.schema';
import { useRegister } from '@/hooks/auth/useRegister';
import LinkedInLogo from '@/components/ui/brand/LinkedInLogo';
import FieldItem from '@/components/ui/form/FieldItem';

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className='min-h-screen bg-[#F3F2EE]'>
      <header className='flex justify-center pt-6 pb-2 '>
        <LinkedInLogo />
      </header>

      <main className='flex flex-col items-center px-4 pt-6 pb-10'>
        <div className='w-full max-w-100'>
          <div className='rounded-lg bg-white px-8 py-8 shadow-md'>
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

              <p className='mt-4 text-xs text-gray-500'>
                By clicking Agree & Join, you agree to the LinkedIn{' '}
                <span className='text-[#0A66C2]'>User Agreement</span>,{' '}
                <span className='text-[#0A66C2]'>Privacy Policy</span>, and{' '}
                <span className='text-[#0A66C2]'>Cookie Policy</span>.
              </p>

              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                loading={isPending}
                className='mt-4 h-12 rounded-full text-base font-semibold'
              >
                Agree & Join
              </Button>

              <Divider className='my-4 text-gray-500 text-sm'>or</Divider>

              <Button
                size='large'
                block
                className='h-12 rounded-full border-gray-300 text-base font-semibold text-gray-700 flex items-center justify-center gap-2'
              >
                <FcGoogle size={20} />
                Continue with Google
              </Button>
            </form>

            <p className='mt-6 text-center text-sm text-gray-700'>
              Already on LinkedIn?{' '}
              <Link
                to='/login'
                className='font-semibold text-[#0A66C2] hover:underline'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
