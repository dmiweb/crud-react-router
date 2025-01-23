import { useState, useEffect, useRef, useCallback } from "react";
import { TPost } from '../models/index';

type FetchResult = {
  data: TPost | TPost[] | null,
  loading: boolean,
  error: string | null,
};
  
export const useFetchData = (
  url: string | null,
  opts: RequestInit = {},
): [FetchResult] => {
  const [data, setData] = useState<TPost | TPost[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const lastAddedCreated = useRef<number | null>(null);
  const isFetching = useRef<boolean>(false);

  const fetchNews = useCallback(async () => {
      if (!url || isFetching.current) return;

    isFetching.current = true;
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(url, { ...opts });

      if (!response.ok) {
        throw new Error(`Ошибка! Status: ${response.status}`);
        }
         const responseData = response.status !== 204 ? await response.json() : null;

      if (responseData) {
          // Убеждаемся, что данные это массив, если это так, то сортируем и ищем максимальный created
        if (Array.isArray(responseData)) {
          responseData.sort((a, b) => (b.created || 0) - (a.created || 0));

          if ( lastAddedCreated.current === null || (responseData[0]?.created || 0) > lastAddedCreated.current) {
                setData(responseData);
              lastAddedCreated.current = responseData[0]?.created || 0;
              }
            } else {
          //Если это не массив, то просто сетим данные
            setData(responseData);
            lastAddedCreated.current = responseData?.created;
            }
         }
      } catch (err) {
         setError(`${err}`);
     } finally {
         setLoading(false);
          isFetching.current = false;
       }
  }, [url, opts]);

useEffect(() => {
      fetchNews();
  }, [fetchNews]);


return [{ data, loading, error }];
};


// import { useState, useEffect } from "react";
// import { TPost } from '../models/index';

// type FetchResult = {
//   data: TPost | TPost[] | null,
//   loading: boolean,
//   error: string | null,
// };

// export const useFetchData = (url: string | null, opts = {}): [FetchResult] => {
//   const [data, setData] = useState<TPost | TPost[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!url) return;

//     const abortController = new AbortController();
//     const signal = abortController.signal;

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(url, { ...opts, signal });

//         if (!response.ok) {
//           setError(`Ошибка! Status: ${response.status}`);
//         }

//         const resData = response.status !== 204 && await response.json() || null;

//         setData(resData);
//       } catch (err) {
//         if (!signal?.aborted) {
//           console.log(err);
//           setError(`${err}`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       if (!Object.keys(opts).length) abortController.abort();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url]);

//   return [{ data, loading, error }];
// };