import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const abortCont = new AbortController(); 

    setTimeout(async () => {
      try {
        const res = await fetch(url, { signal: abortCont.signal });
      if (!res.ok) {
        throw Error("Could not fetch the data for that resource!");
      }
      const result = await res.json();
      setData(result);
      setIsPending(false);
      setError(null);
      } catch (err) {
        console.log(err);
        if(err.name === 'AbortError') {
          console.log('Fetch Aborted');
        }else {
          setError(err.message);
          setIsPending(false);
        }         
      }
      
      // fetch(url, { signal: abortCont.signal })
      //   .then((res) => {
      //     if (!res.ok) {
      //       throw Error("Could not fetch the data for that resource!");
      //     }
      //     return res.json();
      //   })
      //   .then((result) => {
      //     setData(result);
      //     setIsPending(false);
      //     setError(null);
      //   })
      //   .catch((err) => {
          // if(err.name === 'AbortError') {
          //   console.log('Fetch Aborted');
          // }else {
          //   setError(err.message);
          //   setIsPending(false);
          // }         
      //   });
    }, 1000);

    return () => abortCont.abort()

  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
