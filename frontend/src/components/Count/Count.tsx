import { Button, Stack } from "@mui/material";
import { useState } from "react";

export const Count: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleCount = async (type: string) => {
    console.log(type);
    try {
      const response = await fetch("http://localhost:8081/api/countup");
      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status}`);
      }
      const data = await response.json();
      if (data && typeof data.count === "number") {
        setCount(data.count);
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
        <span>Count:{count}</span>
      </div>
    </>
  );
};
