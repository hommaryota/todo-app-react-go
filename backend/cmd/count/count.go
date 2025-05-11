package count

import (
	"encoding/json"
	"net/http"
	"sync"
)

type Counter struct {
	mu    sync.Mutex
	count int
}

// カウントを取得するメソッド
func (c *Counter) GetCount() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}

// カウントを増やすメソッド
func (c *Counter) Increment() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count++
	return c.count
}

// カウントを減らすメソッド
func (c *Counter) Decrement() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count--
	return c.count
}

func Count(mux *http.ServeMux) {
	counter := &Counter{count: 0}

	mux.HandleFunc("/api/count", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			response := map[string]interface{}{
				"count":   counter.GetCount(),
				"message": "カウント値を取得しました",
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)

		case http.MethodPatch:
			var requestData map[string]interface{}
			if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
				http.Error(w, "無効なリクエスト形式", http.StatusBadRequest)
				return
			}
			var currentCount int
			operation, ok := requestData["operation"].(string)
			if !ok {
				http.Error(w, "operation フィールドが必要です", http.StatusBadRequest)
				return
			}

			switch operation {
			case "increment":
				currentCount = counter.Increment()
			case "decrement":
				currentCount = counter.Decrement()
			default:
				http.Error(w, "不明な操作: "+operation, http.StatusBadRequest)
				return
			}
			response := map[string]interface{}{
				"count":   currentCount,
				"message": "カウントが更新されました",
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
}
