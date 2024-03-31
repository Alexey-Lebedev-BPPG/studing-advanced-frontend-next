import { useCallback } from 'react';
import { TUseDefineNextURLProps } from './types/types';
import { useAppRouter } from '../../router/navigation';
import { useQueryParams } from '../useQueryParams';

export const useAppNavigation = () => {
  const searchParams = useQueryParams();
  const { push, back, replace, forward, prefetch, refresh } = useAppRouter();

  const defineRedirect = useCallback(
    (props: TUseDefineNextURLProps) => {
      const { path, withParams = true, newParams, paramsToDelete } = props;

      if (!withParams) return path;

      if (paramsToDelete?.length)
        paramsToDelete.forEach(param => delete searchParams[param]);

      const searchParamsToString = new URLSearchParams({
        ...searchParams,
        ...newParams,
      }).toString();

      return path.concat('?', searchParamsToString);
    },
    [searchParams],
  );

  const localPush = (props: TUseDefineNextURLProps) =>
    push(defineRedirect(props), { ...props.options });

  const localReplace = (props: TUseDefineNextURLProps) =>
    replace(defineRedirect(props), { ...props.options });

  // return defineRedirect;
  return {
    back,
    forward,
    prefetch,
    push: localPush,
    refresh,
    replace: localReplace,
  };
};
