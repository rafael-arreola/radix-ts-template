import { CountryProviderProps, useCountryProvider } from './dependencies/useCountryProvider';

export interface AppProviderProps {
  countryProv: CountryProviderProps;
}
export function useAppProvider(): AppProviderProps {
  const countryProv = useCountryProvider();

  return { countryProv };
}
