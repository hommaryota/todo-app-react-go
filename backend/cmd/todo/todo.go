package todo

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"
)

type TodoItem struct {
	ID   string `json:"id"`   // 大文字に変更し、JSONタグ追加
	Text string `json:"text"` // 大文字に変更し、JSONタグ追加
	Flag bool   `json:"flag"` // 大文字に変更し、JSONタグ追加
}

type TodoList struct {
	mu    sync.Mutex // 小文字のままでOK（JSONエンコード対象外にしたい）
	Items []TodoItem // これは大文字のままでOK
}

type CreateTodoRequest struct {
	Text string `json:"text"`
}

func generateID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}

func Todo(mux *http.ServeMux) {
	todoList := &TodoList{
		// 大文字のフィールド名で初期化
		Items: []TodoItem{},
	}

	mux.HandleFunc("/api/todo", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(todoList.Items)
		case http.MethodPost:
			var req CreateTodoRequest
			if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
				http.Error(w, "無効なリクエスト形式", http.StatusBadRequest)
				return
			}
			if strings.TrimSpace(req.Text) == "" {
				http.Error(w, "無効な登録です：テキストを入力してください", http.StatusBadRequest)
				return
			}

			newItem := TodoItem{
				ID:   generateID(),
				Text: req.Text,
				Flag: false,
			}
			todoList.mu.Lock()
			todoList.Items = append(todoList.Items, newItem)
			todoList.mu.Unlock()

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(newItem)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
}
