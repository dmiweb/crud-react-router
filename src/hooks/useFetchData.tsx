import { useState, useEffect } from "react";
import { TPost } from '../models/index';

type FetchResult = {
  data: TPost | TPost[] | null,
  loading: boolean,
  error: string | null,
  reqSuccess: boolean
};

export const useFetchData = (url: string | null, opts = {}): [FetchResult] => {
  const [data, setData] = useState<TPost | TPost[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reqSuccess, setReqSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setReqSuccess(false);

      try {
        const response = await fetch(url, { ...opts, signal });

        if (!response.ok) {
          setError(`Ошибка! Status: ${response.status}`);
        }

        const resData = response.status !== 204 && await response.json() || null;

        setData(resData);
        setReqSuccess(true);
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
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [{ data, loading, error, reqSuccess }];
};