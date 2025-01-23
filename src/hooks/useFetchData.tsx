import { useState, useEffect, useRef, useCallback } from "react";
import { TPost } from '../models/index';


// export type TPost = {
//     id: number;
//     title: string;
//     content: string;
//     created?: number; 
//     [key: string]: any
//   };

type FetchResult = {
  data: TPost | TPost[] | null,
  loading: boolean,
  error: string | null,
};
  
  export const useFetchData = <T extends TPost>(
      url: string | null,
      opts: RequestInit = {},
    ): [FetchResult, () => void] => {
      const [data, setData] = useState<T | T[] | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const lastAddedCreated = useRef<number | null>(null); // Используем useRef для created
      const isFetching = useRef<boolean>(false);
      const initialFetchCompleted = useRef<boolean>(false);
    
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
    
              if (
                initialFetchCompleted.current === false ||
                (responseData[0]?.created || 0) > (lastAddedCreated.current || 0)
              ) {
                setData(responseData);
                lastAddedCreated.current = responseData[0]?.created || 0;
                initialFetchCompleted.current = true;
              }
            } else {
              //Если это не массив, то просто сетим данные
                setData(responseData);
                lastAddedCreated.current = responseData?.created;
                initialFetchCompleted.current = true;
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
    
      const forceUpdate = useCallback(() => {
        fetchNews();
      }, [fetchNews]);
    
      return [{ data, loading, error }, forceUpdate];
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