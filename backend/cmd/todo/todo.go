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

var (
	todoList = &TodoList{Items: []TodoItem{}}
	once     sync.Once
)

func generateID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}

func removeTodoByID(todos []TodoItem, id string) ([]TodoItem, bool) {
	for i, item := range todos {
		if item.ID == id {
			return append(todos[:i], todos[i+1:]...), true
		}
	}
	return todos, false
}

func Todo(mux *http.ServeMux) {
	once.Do(func() {
		mux.HandleFunc("/api/todo", handleTodo)
	})
}

func handleTodo(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		todoList.mu.Lock()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(todoList.Items)
		todoList.mu.Unlock()

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

	case http.MethodPut:
		var requestData map[string]interface{}
		if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
			http.Error(w, "無効なリクエスト形式", http.StatusBadRequest)
			return
		}
		id, ok := requestData["id"].(string)
		if !ok {
			http.Error(w, "id フィールドが必要です", http.StatusBadRequest)
			return
		}
		todoList.mu.Lock()
		found := false
		for i := range todoList.Items {
			if todoList.Items[i].ID == id {
				todoList.Items[i].Flag = !todoList.Items[i].Flag
				found = true
				break
			}
		}
		todoList.mu.Unlock()

		if !found {
			http.Error(w, "Todo not found", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "success"})

	case http.MethodDelete:
		idToDelete := r.URL.Query().Get("id")
		if idToDelete == "" {
			http.Error(w, "ID is required", http.StatusBadRequest)
			return
		}
		todoList.mu.Lock()
		var found bool
		todoList.Items, found = removeTodoByID(todoList.Items, idToDelete)
		todoList.mu.Unlock()

		if !found {
			http.Error(w, "Todo not found", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "success"})

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
