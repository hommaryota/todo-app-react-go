import { Button, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { Count } from "../../types/api";
import { useState } from "react";

export const CountArea: React.FC = () => {
  const { data } = useSWR<Count, Error>(
    "http://localhost:8081/api/count",
    fetcher
  );
  const [count, setCount] = useState(data);

  const handleCount = async (type: "increment" | "decrement") => {
    try {
      const response =
        type === "increment"
          ? await fetch("http://localhost:8081/api/countup")
          : await fetch("http://localhost:8081/api/countdown");

      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status}`);
      }
      const data: Count = await response.json();
      if (data) {
        setCount(data);
      } else {
        console.error("countプロパティがありません:", data);
      }
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }
  };

  return (
    <>
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleCount("increment")}
          >
            +
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleCount("decrement")}
          >
            -
          </Button>
        </Stack>
        <span>Count:{count?.count ?? 0}</span>
      </div>
    </>
  );
};
