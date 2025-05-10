package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// CORSミドルウェア - すべてのハンドラーにCORSヘッダーを追加
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// CORSヘッダーを設定
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, Authorization")
		
		// OPTIONSリクエストの場合は早期に返す
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		// 次のハンドラーに処理を渡す
		next.ServeHTTP(w, r)
	})
}

func main() {
	// ルーターの作成
	mux := http.NewServeMux()	
	// カウントアップのエンドポイント追加
	mux.HandleFunc("/api/countup", func(w http.ResponseWriter, r *http.Request) {
		// GETリクエスト以外は拒否
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		
		// レスポンスの作成
		response := map[string]interface{}{
			"count": 1,
			"message": "countが実行されました",
		}
		
		// JSONヘッダーの設定
		w.Header().Set("Content-Type", "application/json")
		
		// JSONエンコードとレスポンス送信
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("エラー: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})	
	// サーバー起動（CORSミドルウェア適用）
	log.Println("サーバーを8081ポートで起動中...")
	log.Fatal(http.ListenAndServe(":8081", corsMiddleware(mux)))
}