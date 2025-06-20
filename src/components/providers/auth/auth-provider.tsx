import { createContext } from 'react';

type LoginFn = (params?: unknown) => void;
type LogoutFn = (params?: unknown) => void;
type GetTokenFn = () => Promise<string | undefined>;

export interface AuthProviderProps {
  getToken?: GetTokenFn;
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
