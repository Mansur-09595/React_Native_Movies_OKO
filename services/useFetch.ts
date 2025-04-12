// ✅ useFetch.ts — улучшенная версия
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type Status = "idle" | "loading" | "success" | "error";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T>(() => [] as unknown as T);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      setError(null);
      const result = await fetchFunction();
      setData(result);
      setStatus("success");
    } catch (err) {
      setStatus("error");
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
    }
  }, [fetchFunction]);

  const reset = () => {
    setData(() => [] as unknown as T);
    setError(null);
    setStatus("idle");
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    error,
    refetch: fetchData,
    reset,
    status,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    isIdle: status === "idle",
  };
};

export default useFetch;
