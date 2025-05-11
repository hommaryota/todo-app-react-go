import { Button, Stack } from "@mui/material";
import { useCount } from "./hooks/useCount";

export const CountArea: React.FC = () => {
  const { count, message, isLoading, updateCount } = useCount();

  return (
    <>
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateCount("increment")}
          >
            +
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => updateCount("decrement")}
          >
            -
          </Button>
        </Stack>
        {isLoading ? (
          <span>読み込み中...</span>
        ) : (
          <>
            <p>Count:{count}</p>
            <p>{message}</p>
          </>
        )}
      </div>
    </>
  );
};
