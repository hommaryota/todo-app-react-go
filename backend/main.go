package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"time"
)

// TODOアイテム構造体
type TodoItem struct {
	ID        int    `json:"id"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

// Supabase設定
const (
	SUPABASE_URL = "https://yetwyrdjjjlvnytynkrx.supabase.co" // 自分のプロジェクトURLに変更
	SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldHd5cmRqampsdm55dHlua3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDU2MjMsImV4cCI6MjA2MDAyMTYyM30.iDl6iA5t3jnt9JY5lEKbSDDju_Cfcafah64hwZCd-LU" // 自分のAPIキーに変更
	TODO_TABLE   = "todo_items"     // テーブル名
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
	
	// 既存のGETエンドポイント
	mux.HandleFunc("/api/add", func(w http.ResponseWriter, r *http.Request) {
		// GETリクエスト以外は拒否
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		
		// レスポンスの作成
		response := map[string]interface{}{
			"message": "Hello from Go Backend!",
		}
		
		// JSONヘッダーの設定
		w.Header().Set("Content-Type", "application/json")
		
		// JSONエンコードとレスポンス送信
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("エラー: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})
	
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
	
	// PUTエンドポイント - Supabase連携
	mux.HandleFunc("/api/add/", func(w http.ResponseWriter, r *http.Request) {
		// PUTリクエスト以外は拒否
		if r.Method != http.MethodPut {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		
		// URLからIDパラメータを抽出
		idRegex := regexp.MustCompile(`/api/add/(\d+)`)
		matches := idRegex.FindStringSubmatch(r.URL.Path)
		if len(matches) < 2 {
			http.Error(w, "Invalid URL format", http.StatusBadRequest)
			return
		}
		
		// IDを数値に変換
		id, err := strconv.Atoi(matches[1])
		if err != nil {
			http.Error(w, "Invalid ID format", http.StatusBadRequest)
			return
		}
		
		// リクエストボディの読み取り
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "リクエストボディの読み取りに失敗: "+err.Error(), http.StatusBadRequest)
			return
		}
		defer r.Body.Close()
		
		// JSONのデコード
		var todo TodoItem
		if err := json.Unmarshal(body, &todo); err != nil {
			http.Error(w, "無効なJSONデータ: "+err.Error(), http.StatusBadRequest)
			return
		}
		
		// IDを設定
		todo.ID = id
		
		// Supabaseに保存
		updatedItem, err := saveToSupabase(todo)
		if err != nil {
			http.Error(w, "Supabaseへの保存に失敗: "+err.Error(), http.StatusInternalServerError)
			return
		}
		
		// 成功レスポンスを作成
		response := map[string]interface{}{
			"success":     true,
			"message":     "TODOアイテムをSupabaseに保存しました",
			"updatedItem": updatedItem,
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

// Supabaseにデータを保存する関数（変更なし）
func saveToSupabase(todo TodoItem) (map[string]interface{}, error) {
	// リクエスト用のJSONデータを作成
	now := time.Now().Format(time.RFC3339)
	requestData := map[string]interface{}{
		"id":         todo.ID,
		"text":       todo.Text,
		"completed":  todo.Completed,
		"updated_at": now,
	}

	jsonData, err := json.Marshal(requestData)
	if err != nil {
		return nil, err
	}

	// Supabase APIエンドポイント
	endpoint := SUPABASE_URL + "/rest/v1/" + TODO_TABLE

	// UPSERTリクエストの作成 (存在すれば更新、なければ挿入)
	req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}

	// ヘッダーの設定
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("apikey", SUPABASE_KEY)
	req.Header.Set("Authorization", "Bearer "+SUPABASE_KEY)
	req.Header.Set("Prefer", "resolution=merge-duplicates") // UPSERT用設定

	// リクエスト実行
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// レスポンスの読み取り
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// レスポンスのパース
	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		// レスポンスが空の場合、リクエストデータを返す
		if len(body) == 0 {
			// updated_atをUpdatedAtに変換（JSONのキー名を合わせる）
			requestData["updatedAt"] = requestData["updated_at"]
			delete(requestData, "updated_at")
			return requestData, nil
		}
		return nil, err
	}

	// updatedAtフィールドを追加
	result["updatedAt"] = now

	return result, nil
}