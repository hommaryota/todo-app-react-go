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
import { Count } from "./components/Count/Count";

interface Lists {
  id: number;
  text: string;
  completed: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  updatedItem: Lists & {
    updatedAt: string;
  };
}

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [lists, setLists] = useState<Lists[]>([]);
  const replaceText = text.replace(/[\s\u3000]/g, "");

  const test = async () => {
    const res = await fetch("http://localhost:8081/api/add");
    const data = await res.json();
    console.log(data);
  };

  const onChangeTextField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const updateTodoItem = async (todo: Lists): Promise<ApiResponse> => {
    try {
      const res = await fetch(`http://localhost:8081/api/add/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("TODO更新エラー:", error);
      throw error;
    }
  };

  const handleUpdateTodo = async () => {
    // setLoading(true);
    // setMessage("");

    try {
      // 更新前にトグル状態を反転
      // const updatedTodo = { ...todo, completed: !todo.completed };
      const id =
        lists.length === 0 ? 1 : Math.max(...lists.map((item) => item.id)) + 1;

      const updatedTodo = {
        id: id,
        text: text,
        completed: false,
      };

      // APIで更新
      const response = await updateTodoItem(updatedTodo);

      // APIからの応答でリストを更新
      setLists((prevList) =>
        prevList.map((item) =>
          item.id === response.updatedItem.id ? response.updatedItem : item
        )
      );

      // setMessage(
      //   `${response.updatedItem.text}を${
      //     response.updatedItem.completed ? "完了" : "未完了"
      //   }に更新しました`
      // );
    } catch (err) {
      // setMessage("更新に失敗しました");
      // console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  const handleDeleteList = (id: number) => {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
  };

  return (
    <>
      <Header />
      <Layout>
        <div onClick={test}>aaa</div>
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
              onClick={handleUpdateTodo}
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
      <Count />
    </>
  );
};

export default App;
