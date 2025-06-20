import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@/utils/envs';

import { AuthContext } from '../auth-provider';

export default function AuthZeroWrapperProvider(props: PropsWithChildren) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      authorizationParams={{
        prompt: 'login',
        redirect_uri: `${window.location.origin}`,
        audience: `https://${AUTH0_DOMAIN}`,
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
    >
      <AuthWrapper>{props.children}</AuthWrapper>
    </Auth0Provider>
  );
}

function AuthWrapper(props: PropsWithChildren) {
  const auth = useAuth0();
  const user = auth.user
    ? {
        id: auth.user.sub,
        name: auth.user.name,
        email: auth.user.email,
        picture: auth.user.picture,
      }
    : undefined;
  return (
    <AuthContext.Provider
      value={{
        user,
        error: auth.error?.message,
        login: () => {
          auth.loginWithRedirect({
            appState: { returnTo: window.location.pathname },
          });
        },
        logout: () => {
          auth.logout({
            logoutParams: { returnTo: window.location.origin },
          });
        },
        isLoading: auth.isLoading,
        isAuthenticated: auth.isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
