import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';
import { useEffect, useRef } from 'react';

import { URL_SERVICE, USER_AGENT } from '@/utils/envs';

import useExampleRequest, { ExampleRequest } from './rest/useExampleRequest';

export interface HttpProviderContext {
  examples: ExampleRequest;
}

export function useHttpProvider(): HttpProviderContext {
  const { getAccessTokenSilently } = useAuth0();
  const httpInstance = useRef<AxiosInstance>(axios.create({}));

  const examples = useExampleRequest(httpInstance);

  useEffect(() => {
    httpInstance.current = axios.create({
      baseURL: URL_SERVICE,
      headers: {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    httpInstance.current.interceptors.request.use(async (config) => {
      const token = await getAccessTokenSilently();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('Token no encontrado en localStorage.');
      }
      return config;
    });
  }, [getAccessTokenSilently]);

  return { examples };
}
