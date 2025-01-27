import { BackendApiSchema, BackendEndpoint } from './api-schema.ts';

export interface ApiQueryHookResult<T extends BackendEndpoint> {
  /** the most recent data returned from the API */
  data?: BackendApiSchema[T]['result'];
  /** is the API call currently in progress? */
  loading: boolean;
  /** the most recent error returned from the API */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  /**
   * Function to refetch the API. Will fetch with the hook values, or you can
   * specify prop overrides to use instead
   * @param propsOverride - optional props to use instead of the previous props
   * @returns promise with the response data
   */
  refetch: (
    propsOverride?: BackendApiSchema[T]['props'],
  ) => Promise<BackendApiSchema[T]['result']>;
}

export interface BackendApiQueryHookProps<T extends BackendEndpoint> {
  /**
   * should the API be called or not? Changing this from `true` to `false` will trigger
   * an API call. While this is false, changes to `props` will trigger an API call
   */
  skip?: boolean;
  /** the props to use while making the API call */
  props?: BackendApiSchema[T]['props'];
  /**
   * should we keep the previous `data` while the new request is loading? defaults to
   * false
   */
  keepDataWhileRefetching?: boolean;
}
