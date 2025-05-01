import { useState } from "react";
import { createList } from "../../api/list";
import s from "./List.module.css";

const List = () => {
  const [title, setTitle] = useState("");

  const handleAddList = async () => {
    try {
      await createList(title);
      setTitle("");
      // リストの更新処理を追加する場合はここに実装
    } catch (error) {
      console.error("リストの作成に失敗しました:", error);
    }
  };

  return (
    <div className={s.list}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="リストのタイトルを入力"
      />
      <button onClick={handleAddList}>リストを追加</button>
    </div>
  );
};

export default List;
