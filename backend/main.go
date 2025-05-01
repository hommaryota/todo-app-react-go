package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
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

func main() {
	r := gin.Default()

	// CORS設定
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// 既存のGETエンドポイント
	r.GET("/api/add", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from Go Backend!",
		})
	})

	// PUTエンドポイント - Supabase連携
	r.PUT("/api/add/:id", func(c *gin.Context) {
		// リクエストボディをバインド
		var todo TodoItem
		if err := c.ShouldBindJSON(&todo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"error":   "無効なリクエストデータ: " + err.Error(),
			})
			return
		}

		// Supabaseに保存
		updatedItem, err := saveToSupabase(todo)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"error":   "Supabaseへの保存に失敗: " + err.Error(),
			})
			return
		}

		// 成功レスポンスを返す
		c.JSON(http.StatusOK, gin.H{
			"success":     true,
			"message":     "TODOアイテムをSupabaseに保存しました",
			"updatedItem": updatedItem,
		})
	})

	r.Run(":8081")
}

// Supabaseにデータを保存する関数
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
	body, err := ioutil.ReadAll(resp.Body)
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