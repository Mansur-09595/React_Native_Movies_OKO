import { useState, useEffect } from "react";
import axios from "axios"; // если используешь Axios

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      // Расширенная отладка ошибок
      if (axios.isAxiosError(err)) {
        console.error("❌ Axios error message:", err.message);
        console.error("🛠️ Axios error config:", err.config);
        console.error("🧾 Axios error response:", err.response?.data);
        setError(new Error(err.message));
      } else if (err instanceof Error) {
        console.error("❌ Standard error:", err.message);
        setError(err);
      } else {
        console.error("❓ Unknown error:", err);
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
