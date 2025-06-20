import { useContext } from 'react';

import { AppContext } from '@/components/providers/app/app-provider';
import { HttpContext } from '@/components/providers/http/http-provider';

export function useApp() {
  return useContext(AppContext);
}

export function useHttp() {
  return useContext(HttpContext);
}
