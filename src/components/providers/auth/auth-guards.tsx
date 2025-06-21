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
  const isLogged = !isAuthenticated && !isLoading && !error;

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
        if (isLogged) {
          login();
        }
        break;
      case LoginMethod.Manual:
        if (!isLogged && !isInLogin) {
          navigate('/auth/login');
        }
        break;
      default:
        return;
    }
  }, [isLogged, isInLogin, login, props.authenticated]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <AuthWithoutPermission />;
  }

  return props.layout ?? <Outlet />;
};
