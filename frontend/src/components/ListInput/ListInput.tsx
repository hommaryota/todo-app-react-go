import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

interface Props {
  text: string;
  replaceText: string;
  onChangeTextField: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUpdateTodo: () => Promise<void>;
}

export const ListInput: React.FC<Props> = (props) => {
  const { text, replaceText, onChangeTextField, handleUpdateTodo } = props;

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
