// hooks/useCounter.ts
import useSWR from "swr";
import { Count } from "../../../types/api";
import { fetcher } from "../../../utils/fetcher";
import { API_URL } from "../../../utils/config";

export function useCount() {
  const { data, isLoading, error, mutate } = useSWR<Count, Error>(
    `${API_URL}/api/count`,
    fetcher
  );

  const updateCount = async (operation: "increment" | "decrement") => {
    try {
      const response = await fetch(`${API_URL}/api/count`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ operation }),
      });
      if (!response.ok) throw new Error(`APIエラー: ${response.status}`);
      const newData = await response.json();
      mutate(newData, false);
      return newData;
    } catch (error) {
      console.error("Increment error:", error);
      throw error;
    }
  };

  return {
    count: data?.count ?? 0,
    message: data?.message,
    isLoading,
    error,
    updateCount,
  };
}
