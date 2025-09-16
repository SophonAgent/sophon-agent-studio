import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface QueryRouter {
  get: (key: string) => string | null;
  getAll: () => URLSearchParams;
  set: (key: string, value?: string | number) => void;
  remove: (key: string) => void;
  getQueryString: () => string;
}

function useQueryRouter(): QueryRouter {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getAll = useCallback(() => {
    if (!searchParams) {
      return new URLSearchParams();
    }
    return new URLSearchParams(searchParams);
  }, [searchParams]);

  const get = useCallback(
    (key: string): string | null => {
      return getAll().get(key);
    },
    [getAll],
  );

  const set = useCallback(
    (key: string, value?: string | number) => {
      const params = getAll();
      if (params.get(key) === `${value}`) return;

      params.set(key, `${value}`);
      history.pushState(null, '', `${pathname}?${params.toString()}`);
    },
    [getAll, pathname],
  );

  const remove = useCallback(
    (key: string) => {
      if (!pathname) return;

      const params = getAll();
      if (!params.has(key)) return;

      params.delete(key);
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      history.pushState(null, '', url);
    },
    [getAll, pathname],
  );

  const getQueryString = useCallback(() => {
    const query = getAll().toString();
    return query ? `?${query}` : '';
  }, [getAll]);

  return useMemo(
    () => ({
      get,
      getAll,
      set,
      remove,
      getQueryString,
    }),
    [get, getAll, set, remove, getQueryString],
  );
}

export default useQueryRouter;
