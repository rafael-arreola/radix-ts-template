// prettier-ignore
import '@radix-ui/themes/styles.css';
// prettier-ignore
import '@/styles/global.css';

import { RouteManager } from '@/router-manager';
import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AuthFirebaseWrapperProvider from './components/providers/auth/firebase/auth-firebase';

// Auth methods:
// AuthZeroWrapperProvider
// AuthFirebaseWrapperProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme
        // radius="full"
        // accentColor="blue"
        // grayColor="slate"
        panelBackground="solid"
        //scaling="110%"
      >
        <AuthFirebaseWrapperProvider>
          <RouteManager />
        </AuthFirebaseWrapperProvider>
      </Theme>
    </BrowserRouter>
  </StrictMode>,
);
