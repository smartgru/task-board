import { ApiQueryHookResult, BackendApiQueryHookProps } from './types.ts';
import { useEffect, useRef, useState } from 'react';
import { MockBackend } from './mock-backend.ts';
import { isEqual } from 'lodash';
import { BackendApiSchema, BackendEndpoint } from './api-schema.ts';

const MOCK_DELAY_BASE = 1.5;
const MOCK_DELAY_EXP_MAX = 4;
const MOCK_ERROR_PERCENTAGE = 0.1;

function getRandomDelay() {
  const delay =
    1000 *
    Math.random() *
    // scale timeout randomly in an exponential manner
    MOCK_DELAY_BASE ** (1.5 * (Math.random() * MOCK_DELAY_EXP_MAX));
  return delay;
}

export const useApiQuery = <T extends BackendEndpoint>(
  endpoint: T,
  { skip, props }: BackendApiQueryHookProps<T> = {},
): ApiQueryHookResult<T> => {
  const [data, setData] = useState<BackendApiSchema[T]['result']>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const prevProps = useRef<BackendApiSchema[T]['props']>();
  const firstRun = useRef<boolean>(true);

  const refetch = (propsOverride?: BackendApiSchema[T]['props']) => {
    return new Promise<BackendApiSchema[T]['result']>((resolve, reject) => {
      if (loading) {
        console.log(
          'Multiple requests sent simultaneously, data might get unstable',
        );
      }
      // clear loading indicators and errors
      setError(undefined);
      setLoading(true);
      firstRun.current = false;

      const handleError = (err: Error) => {
        setTimeout(() => {
          setLoading(false);
          setError(err);
          reject(err);
        }, getRandomDelay());
      };

      // randomly throw errors to simulate network issues
      if (Math.random() < MOCK_ERROR_PERCENTAGE) {
        handleError(new Error('Simulated network error'));
      }

      let value:
        | Promise<BackendApiSchema[T]['result']>
        | BackendApiSchema[T]['result'];
      // handle thrown errors immediately
      try {
        value = MockBackend[endpoint](propsOverride ?? props!);
      } catch (err) {
        handleError(err as Error);
        return;
      }

      Promise.resolve(value)
        .then((result) => {
          // simulate network latency by delaying randomly
          setTimeout(() => {
            setLoading(false);
            setData(result);
            resolve(result);
          }, getRandomDelay());
        })
        .catch(handleError);
    });
  };

  useEffect(() => {
    if (!skip && (!isEqual(prevProps.current, props) || firstRun.current)) {
      prevProps.current = props;
      refetch(props);
    }
  }, [skip, props]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useApiMutation = <T extends BackendEndpoint>(
  endpoint: T,
): [
  ApiQueryHookResult<T>['refetch'],
  Omit<ApiQueryHookResult<T>, 'refetch'>,
] => {
  const { refetch, ...rest } = useApiQuery(endpoint, {
    skip: true,
  });

  return [refetch, rest];
};
