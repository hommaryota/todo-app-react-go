import s from "./ListWrap.module.css";
import { useState } from "react";
import { ListInput } from "../ListInput/ListInput";
import { TodoLists } from "../TodoLists/TodoLists";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { TodoList } from "../../types/api";

const ListWrap = () => {
  const { data, mutate } = useSWR<TodoList[], Error>(
    "http://localhost:8081/api/todo",
    fetcher
  );
  console.log(data);

  const [text, setText] = useState("");
  const replaceText = text.replace(/[\s\u3000]/g, "");

  const onChangeTextField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleUpdateTodo = async () => {
    const response = await fetch("http://localhost:8081/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: replaceText }),
    });
    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }
    const newTodo = await response.json();
    mutate([...(data ?? []), newTodo], false);
    setText("");
  };

  const handleCompleted = async (id: string) => {
    const response = await fetch(`http://localhost:8081/api/todo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error("完了に失敗しました。");
    mutate();
  };

  const handleDeleteList = async (id: string) => {
    const response = await fetch(`http://localhost:8081/api/todo?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("削除に失敗しました");
    }
    mutate();
  };

  return (
    <div className={s.wrap}>
      <ListInput
        text={text}
        replaceText={replaceText}
        onChangeTextField={onChangeTextField}
        handleUpdateTodo={handleUpdateTodo}
      />
      <TodoLists
        lists={data ?? []}
        handleCompleted={handleCompleted}
        handleDeleteList={handleDeleteList}
      />
    </div>
  );
};

export default ListWrap;
