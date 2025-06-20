import { createContext, PropsWithChildren } from 'react';

import { HttpProviderContext, useHttpProvider } from './useHttpProvider';

export const HttpContext = createContext({} as HttpProviderContext);

export function HttpProvider(props: PropsWithChildren) {
  const values = useHttpProvider();
  return <HttpContext.Provider value={values}>{props.children}</HttpContext.Provider>;
}
