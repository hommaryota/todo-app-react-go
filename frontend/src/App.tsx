import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Layout from "./components/Layout/Layout";
import Header from "./features/Header/Header";
import { useState } from "react";
import { Send } from "@mui/icons-material";
import ListWrap from "./components/ListWrap/ListWrap";

interface Lists {
  id: number;
  text: string;
  completed: false;
}

const App = () => {
  const [text, setText] = useState("");
  const [lists, setLists] = useState<Lists[]>([]);
  const replaceText = text.replace(/[\s\u3000]/g, "");

  const onChangeTextField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleAddList = () => {
    const newId =
      lists.length === 0 ? 1 : Math.max(...lists.map((item) => item.id)) + 1;
    setLists((prev) => [
      ...prev,
      {
        id: newId,
        text: text,
        completed: false,
      },
    ]);
    setText("");
  };

  const handleDeleteList = (id: number) => {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
  };

  return (
    <>
      <Header />
      <Layout>
        <ListWrap>
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
              onClick={handleAddList}
              endIcon={<Send />}
            >
              追加
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>text</TableCell>
                  <TableCell align="right">completed</TableCell>
                  <TableCell align="right">
                    <Button variant="text">delete</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lists.map((list) => (
                  <TableRow
                    key={list.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {list.text}
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="text">completed</Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        onClick={() => handleDeleteList(list.id)}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListWrap>
      </Layout>
    </>
  );
};

export default App;
