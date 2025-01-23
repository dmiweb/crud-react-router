// import { useState, useEffect, useRef } from "react";
// import { TPost } from '../models/index';

// type FetchResult = {
//   data: TPost | TPost[] | null,
//   loading: boolean,
//   error: string | null
// };

// export const useFetchData = (url: string | null, opts = {}): [FetchResult] => {
//   const [data, setData] = useState<TPost | TPost[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const lastAddedCreated = useRef<number>(0);
//   const isFetching = useRef<boolean>(true);

//   useEffect(() => {
//     // if (!isFetching) return;
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

//         if (resData.length) {
//           if (resData[resData.length - 1].created > lastAddedCreated.current) {
//             console.log(resData[resData.length - 1].created > lastAddedCreated.current)
//             setData(resData);
//             lastAddedCreated.current = resData[resData.length - 1].created;
//             isFetching.current = false;
//           }
//         } else if (!resData.length && resData !== null) {
//           setData(resData);
//           isFetching.current = false;
//         } else {
//           isFetching.current = true;
//         }
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

//     const intervalId = setInterval(() => {
//       if (isFetching.current) fetchData();
//       console.log(isFetching.current)
//     }, 10000);



//     return () => {
//       // if (Object.keys(opts).length) abortController.abort();
//       // abortController.abort();
//       clearInterval(intervalId);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url]);

//   return [{ data, loading, error }];
// };


import { useState, useEffect } from "react";
import { TPost } from '../models/index';

type FetchResult = {
  data: TPost | TPost[] | null,
  loading: boolean,
  error: string | null,
};

export const useFetchData = (url: string | null, opts = {}): [FetchResult] => {
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
  }, [url]);

  return [{ data, loading, error }];
};