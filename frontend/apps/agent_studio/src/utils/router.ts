import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

interface QueryRouter {
  get: (key: string) => string | null;
  set: (key: string, value?: string | number) => void;
  remove: (key: string) => void;
  getQueryString: () => string;
}

function useQueryRouter(): QueryRouter {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const set = useCallback(
    (key: string, value?: string | number) => {
      if (searchParams.get(key) === `${value}`) return;

      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, String(value));

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const remove = useCallback(
    (key: string) => {
      if (!searchParams.has(key)) return;

      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);

      // 如果还有其他参数保留，否则清空
      setSearchParams(newParams.size > 0 ? newParams : {}, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const getQueryString = useCallback(() => {
    const query = searchParams.toString();
    return query ? `?${query}` : '';
  }, [searchParams]);

  return useMemo(
    () => ({
      get,
      set,
      remove,
      getQueryString,
    }),
    [get, set, remove, getQueryString],
  );
}

export default useQueryRouter;
