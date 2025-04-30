import { Button, TextField } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Header from "./features/Header/Header";
import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const replaceText = text.replace(/[\s\u3000]/g, "");

  const onChangeTextField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleClickButton = () => {};

  return (
    <>
      <Header />
      <Layout>
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
          onClick={handleClickButton}
        >
          追加
        </Button>
      </Layout>
    </>
  );
};

export default App;
