import { Outlet, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts/dashboard/dashboard-layout';
import Page404 from '@/pages/404';
import WelcomePage from '@/pages/welcome/welcome-page';

import { AppProvider } from './components/providers/app/app-provider';
import { GuardNavigation, LoginMethod } from './components/providers/auth/auth-guards';
import { HttpProvider } from './components/providers/http/http-provider';

/**
 * HttpProvider
 * Libre para agregar dominio de peticiones que estaran disponibles a cualquier nivel de la aplicación via useHttp()
 */

/**
 * AppProvider
 * Libre para agregar proveedores que se comparten a cualquier nivel de la aplicación via useApp()
 */

function WrapperDashboard() {
  return (
    <HttpProvider>
      <AppProvider>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AppProvider>
    </HttpProvider>
  );
}

export function RouteManager() {
  return (
    <Routes>
      <Route path="/auth" element={<GuardNavigation authenticated={LoginMethod.NotRequired} />}>
        <Route path="login" element={<div>Soy un login</div>} />
      </Route>
      <Route
        path="*"
        element={
          <GuardNavigation authenticated={LoginMethod.NotRequired} layout={<WrapperDashboard />} />
        }
      >
        <Route index={true} element={<WelcomePage />} />
        {/* <Route path="/coverage/create-version" element={<CoverageAddPage />} /> */}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
