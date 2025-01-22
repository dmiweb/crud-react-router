import { useState, useEffect } from "react";
import { TPost } from '../models/index';

type FetchResult = {
  data: TPost | TPost[] | null,
  loading: boolean,
  error: string | null,
};

export const useFetchData = (url: string | null, opts = {}, trigger?: boolean | null): [FetchResult] => {
  const [data, setData] = useState<TPost | TPost[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { ...opts, signal });

        if (!response.ok) {
          setError(`Ошибка! Status: ${response.status}`);
        }

        const resData = response.status !== 204 && await response.json() || null;

        setData(resData);
      } catch (err) {
        if (!signal?.aborted) {
          console.log(err);
          setError(`${err}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (!Object.keys(opts).length) abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, trigger]);

  return [{ data, loading, error }];
};