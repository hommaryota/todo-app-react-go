import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

const app = express();
const port: number = 3000;

// JSON解析ミドルウェア
app.use(express.json());

// GoバックエンドへのAPIリクエストを転送
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://go-backend:8081",
    changeOrigin: true,
  })
);

// 開発環境の場合
if (process.env.NODE_ENV !== "production") {
  console.log("Starting in development mode...");

  // Docker環境ではサービス名でアクセス
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://react-frontend:5173",
      changeOrigin: true,
      ws: true,
    })
  );
} else {
  // 本番環境では静的ファイルを配信
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // その他のルートはReactのルーティングに任せる
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
}

// サーバー起動
app.listen(port, "0.0.0.0", () => {
  console.log(`Express server running at http://localhost:${port}`);
});

// 終了処理
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  process.exit();
});
