import { createContext, PropsWithChildren } from 'react';

import { AppProviderProps, useAppProvider } from './useAppProvider';

export const AppContext = createContext({} as AppProviderProps);
export function AppProvider(props: PropsWithChildren) {
  const values = useAppProvider();
  return <AppContext.Provider value={values}>{props.children}</AppContext.Provider>;
}
