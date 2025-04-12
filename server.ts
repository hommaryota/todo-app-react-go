import express, { Request, Response } from "express";
import path from "path";
import { spawn } from "child_process";

const app = express();
const port: number = 3000;

// JSON解析ミドルウェア
app.use(express.json());

// GoバックエンドへのAPIリクエストを転送
app.use("/api", (req: Request, res: Response, next) => {
  // 本来はここでプロキシを設定するべきですが、簡易実装として
  // リダイレクトを使います。実際のプロジェクトではhttp-proxy-middlewareなどを使用してください
  res.redirect(`http://localhost:8080${req.url}`);
});

// 開発環境の場合
if (process.env.NODE_ENV !== "production") {
  // 開発中はReactアプリとGoバックエンドを起動
  console.log("Starting in development mode...");

  // Goバックエンドを起動
  const goBackend = spawn("go", ["run", "main.go"], {
    cwd: path.join(__dirname, "backend"),
    stdio: "inherit",
  });

  goBackend.on("error", (err) => {
    console.error("Failed to start Go backend:", err);
  });

  // React開発サーバー起動（viteを想定）
  const reactDev = spawn("npm", ["run", "dev"], {
    cwd: path.join(__dirname, "frontend"),
    stdio: "inherit",
    shell: true,
  });

  reactDev.on("error", (err) => {
    console.error("Failed to start React development server:", err);
  });

  // APIリクエスト以外は全てReact開発サーバーにリダイレクト
  app.use("/", (req: Request, res: Response) => {
    res.redirect("http://localhost:5173" + req.originalUrl);
  });
} else {
  // 本番環境では静的ファイルを配信
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // その他のルートはReactのルーティングに任せる
  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
}

// サーバー起動
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

// 終了処理
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  process.exit();
});
