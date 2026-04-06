import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import ProtectedRoute from '@/components/ProtectedRoute';
import GuestRoute from '@/components/GuestRoute';
import AppLayout from '@/components/layout/AppLayout';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const VerifyOtpPage = lazy(() => import('@/pages/auth/VerifyOtpPage'));
const ForgotPasswordPage = lazy(
  () => import('@/pages/auth/ForgotPasswordPage'),
);
const FeedPage = lazy(() => import('@/pages/FeedPage'));

const fallback = (
  <div className='flex h-screen items-center justify-center'>
    <Spin size='medium' />
  </div>
);

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={fallback}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={fallback}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: '/verify-otp',
        element: (
          <Suspense fallback={fallback}>
            <VerifyOtpPage />
          </Suspense>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <Suspense fallback={fallback}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={fallback}>
                <FeedPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);


export default function AppRouter() {
  return <RouterProvider router={router} />;
}
