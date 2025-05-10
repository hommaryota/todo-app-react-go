// hooks/useCounter.ts
import useSWR from "swr";
import { Count } from "../../../types/api";
import { fetcher } from "../../../utils/fetcher";

export function useCount() {
  const { data, isLoading, error, mutate } = useSWR<Count, Error>(
    "http://localhost:8081/api/count",
    fetcher
  );

  const increment = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/countup");
      if (!response.ok) throw new Error(`APIエラー: ${response.status}`);
      const newData = await response.json();
      mutate(newData, false);
      return newData;
    } catch (error) {
      console.error("Increment error:", error);
      throw error;
    }
  };

  const decrement = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/countdown");
      if (!response.ok) throw new Error(`APIエラー: ${response.status}`);
      const newData = await response.json();
      mutate(newData, false);
      return newData;
    } catch (error) {
      console.error("Decrement error:", error);
      throw error;
    }
  };

  return {
    count: data?.count ?? 0,
    message: data?.message,
    isLoading,
    error,
    increment,
    decrement,
  };
}
