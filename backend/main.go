package main

import (
	"log"
	"net/http"

	"github.com/yourusername/express-react-go-app/cmd/count"
	"github.com/yourusername/express-react-go-app/middleware"
)



func main() {
	// ルーターの作成
	mux := http.NewServeMux()

	count.Count(mux)

	// サーバー起動（CORSミドルウェア適用）
	log.Println("サーバーを8081ポートで起動中...")
	log.Fatal(http.ListenAndServe(":8081", middleware.Cors(mux)))
}