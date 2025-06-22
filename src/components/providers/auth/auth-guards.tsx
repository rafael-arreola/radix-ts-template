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
  authMethod: LoginMethod;
  layout?: ReactNode;
}
export const GuardNavigation = (props: PropsWithChildren<AuthRequiredProps>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error, login } = useAuth();
  const isInLogin = location.pathname.startsWith('/auth');

  useEffect(() => {
    if (!isLoading && isAuthenticated && isInLogin) {
      navigate('/');
      return;
    }

    switch (props.authMethod) {
      case LoginMethod.NotRequired:
        break;
      case LoginMethod.Automatic:
        if (isAuthenticated) {
          login();
        }
        break;
      case LoginMethod.Manual:
        if (!isAuthenticated && !isInLogin) {
          navigate('/auth/login');
        }
        break;
      default:
        return;
    }
  }, [isLoading, isAuthenticated, isInLogin, login, props.authMethod, navigate]);
  console.log({ isLoading, isAuthenticated, isInLogin });
  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error('Auth error:', error);
    return <AuthWithoutPermission />;
  }

  console.log(props.layout ? 'Layout provided' : 'No layout provided');
  return props.layout ?? <Outlet />;
};
