export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  // レスポンスが成功しなかった場合はエラーをスロー
  if (!response.ok) {
    const error = new Error("APIリクエストに失敗しました") as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
};
