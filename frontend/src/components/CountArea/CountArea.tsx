import { Button, Stack } from "@mui/material";
import { useCount } from "./hooks/useCount";

export const CountArea: React.FC = () => {
  const { count, message, isLoading, increment, decrement } = useCount();
  console.log(message);

  return (
    <>
      <div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={increment}>
            +
          </Button>
          <Button variant="outlined" color="error" onClick={decrement}>
            -
          </Button>
        </Stack>
        {isLoading ? <span>読み込み中...</span> : <span>Count:{count}</span>}
      </div>
    </>
  );
};
