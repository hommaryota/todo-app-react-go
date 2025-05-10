import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

interface Props {
  text: string;
  onChangeTextField: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUpdateTodo: () => Promise<void>;
}

export const ListInput: React.FC<Props> = (props) => {
  const { text, onChangeTextField, handleUpdateTodo } = props;

  const replaceText = text.replace(/[\s\u3000]/g, "");

  return (
    <div>
      <TextField
        id="outlined-password-input"
        label="message"
        type="text"
        autoComplete="current-password"
        onChange={onChangeTextField}
        value={text}
      />
      <Button
        variant="outlined"
        disabled={!replaceText}
        onClick={handleUpdateTodo}
        endIcon={<Send />}
      >
        追加
      </Button>
    </div>
  );
};
