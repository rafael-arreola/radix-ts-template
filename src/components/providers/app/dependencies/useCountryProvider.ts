import { useCallback, useEffect, useState } from 'react';

import { Country } from '@/domain/country';

interface CountryType {
  label: string;
  value: string;
  icon: string;
}
export interface CountryProviderProps {
  flag: string | null;
  countries: CountryType[];
  country: Country | undefined;
  isLoading: boolean;
  onChgCountry: (value: string) => void;
  showModal: boolean;
  onRequestCountry: () => void;
  closeCountryModal: () => void;
}

const countries = [
  { value: 'MEX', icon: '🇲🇽', label: 'México' },
  { value: 'CHL', icon: '🇨🇱', label: 'Chile' },
  { value: 'COL', icon: '🇨🇴', label: 'Colombia' },
  { value: 'PER', icon: '🇵🇪', label: 'Perú' },
];

export function useCountryProvider(): CountryProviderProps {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const [flag, setFlag] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChgCountry = useCallback((value: string) => {
    localStorage.setItem('country', value);
    setCountry(value as Country);
    setFlag(countries.find((c) => c.value === value)?.icon || null);
  }, []);

  useEffect(() => {
    const value = localStorage.getItem('country') as Country;
    if (value) {
      setCountry(value);
      setFlag(countries.find((c) => c.value === value)?.icon || null);
    } else {
      setShowModal(true);
    }
    setLoading(false);
  }, []);

  const onRequestCountry = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeCountryModal = useCallback(() => {
    if (country) {
      setShowModal(false);
    }
  }, [country]);

  return {
    flag,
    country,
    countries,
    isLoading,
    onChgCountry,
    showModal,
    onRequestCountry,
    closeCountryModal,
  };
}
