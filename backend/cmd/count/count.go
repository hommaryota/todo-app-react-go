package count

import (
	"encoding/json"
	"log"
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

func Count (mux *http.ServeMux){
	counter := &Counter{count: 0}

	mux.HandleFunc("/api/count",func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		response := map[string]interface{}{
			"count": counter.count,
			"message": "カウントが実行されました",
		}
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("エラー: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})

	mux.HandleFunc("/api/countup", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		currentCount := counter.Increment()
		response := map[string]interface{}{
			"count": currentCount,
			"message": "カウントが実行されました",
		}
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("エラー: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})

	mux.HandleFunc("/api/countdown", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		currentCount := counter.Decrement()
		response := map[string]interface{}{
			"count": currentCount,
			"message": "カウントが実行されました",
		}
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("エラー: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})
}