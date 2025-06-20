import { createContext } from 'react';

type LoginFn = (params?: unknown) => void;
type LogoutFn = (params?: unknown) => void;

export interface AuthProviderProps {
  user?: unknown;
  error?: string;
  login: LoginFn;
  logout: LogoutFn;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}
export const AuthContext = createContext({} as AuthProviderProps);
