import { AxiosInstance } from 'axios';
import { MutableRefObject, useCallback } from 'react';

export interface ExampleRequest {
  example: () => Promise<void>;
}
export default function useExampleRequest(
  httpInstance: MutableRefObject<AxiosInstance | null>,
): ExampleRequest {
  const example = useCallback(async () => {
    if (!httpInstance.current) {
      throw new Error('Http instance is not initialized');
    }
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('REQUEST DEMO DE 2 SEGUNDOS');
        resolve();
      }, 2000);
    });
  }, [httpInstance]);

  return { example };
}
