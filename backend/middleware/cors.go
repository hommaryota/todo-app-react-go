package middleware

import "net/http"

// CORSミドルウェア - すべてのハンドラーにCORSヘッダーを追加
func Cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// CORSヘッダーを設定
		allowedOrigins := map[string]bool{
			"http://localhost:3000": true,
			"http://localhost:5173": true,
		}

		// リクエスト元のオリジンを取得
		origin := r.Header.Get("Origin")

		// CORSヘッダーを設定
		// リクエスト元のオリジンが許可リストに含まれていれば、そのオリジンを許可
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
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
