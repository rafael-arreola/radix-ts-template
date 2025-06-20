import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/auth';

import { LoadingPage } from './loading';
import { AuthWithoutPermission } from './restricted';

export enum LoginMethod {
  NotRequired = 'not-required',
  Automatic = 'automatic',
  Manual = 'manual',
}
interface AuthRequiredProps {
  authenticated: LoginMethod;
  layout?: ReactNode;
}
export const GuardNavigation = (props: PropsWithChildren<AuthRequiredProps>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error, login } = useAuth();
  const isInLogin = location.pathname.startsWith('/auth');
  useEffect(() => {
    // si el usuario esta autenticado y la ruta empieza con /auth, redirigir a /
    if (!isLoading && isAuthenticated && isInLogin) {
      navigate('/');
      return;
    }

    switch (props.authenticated) {
      case LoginMethod.NotRequired:
        break;
      case LoginMethod.Automatic:
        if (!isLoading && !isAuthenticated && !error) {
          login();
        }
        break;
      case LoginMethod.Manual:
        if (!isLoading && !isAuthenticated && !error) {
          if (!isInLogin) {
            navigate('/auth/login');
          }
        }
        break;
      default:
        return;
    }
  }, [isAuthenticated, error, isLoading, login, isInLogin, navigate, props.authenticated]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <AuthWithoutPermission />;
  }

  return props.layout ?? <Outlet />;
};
