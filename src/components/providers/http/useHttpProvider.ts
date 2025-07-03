import axios, { AxiosInstance } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/hooks/auth';
import { URL_SERVICE, USER_AGENT } from '@/utils/envs';

import useExampleRequest, { ExampleRequest } from './rest/useExampleRequest';

export interface HttpProviderContext {
  httpIsReady: boolean;
  examples: ExampleRequest;
}

export function useHttpProvider(): HttpProviderContext {
  const { getToken } = useAuth();
  const httpInstance = useRef<AxiosInstance>(axios.create({}));
  const [httpIsReady, setHttpIsReady] = useState(false);

  const examples = useExampleRequest(httpInstance);

  useEffect(() => {
    const instance = axios.create({
      baseURL: URL_SERVICE,
      headers: {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('No token found, requests may fail.');
      }
      return config;
    });

    httpInstance.current = instance;
    setHttpIsReady(true);
  }, [getToken]);

  return { httpIsReady, examples };
}
