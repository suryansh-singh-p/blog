import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                setIsPending(true);
                setError(null);

                const response = await fetch(url, { signal: abortController.signal });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                console.log("Fetched data:", result);
                setData(result);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.error("Fetch error:", err);
                    setError(err.message);
                }
            } finally {
                setIsPending(false);
            }
        };

        fetchData();

        return () => abortController.abort();
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
