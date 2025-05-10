import s from "./ListWrap.module.css";
import { useState } from "react";
import { ListInput } from "../ListInput/ListInput";
import { ApiResponse, Lists } from "../../types/types";
import { TodoLists } from "../TodoLists/TodoLists";

const ListWrap = () => {
  const [text, setText] = useState("");
  const [lists, setLists] = useState<Lists[]>([]);

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
    try {
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
    } catch (err) {
      console.error(err);
    } finally {
      console.log(1);
    }
  };

  const handleDeleteList = (id: number) => {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
  };

  return (
    <div className={s.wrap}>
      <ListInput
        text={text}
        onChangeTextField={onChangeTextField}
        handleUpdateTodo={handleUpdateTodo}
      />

      <TodoLists lists={lists} handleDeleteList={handleDeleteList} />
    </div>
  );
};

export default ListWrap;
