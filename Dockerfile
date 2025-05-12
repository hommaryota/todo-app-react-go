FROM node:22-alpine

# Koyebでは/workspaceが使われているようなので合わせる
WORKDIR /workspace

# まず依存関係ファイルをコピー
COPY package*.json ./
COPY tsconfig.json ./

# サーバー側の依存関係インストール
RUN npm install

# ソースコードをコピー
COPY server.ts ./
COPY frontend ./frontend/

# TypeScriptコンパイル（明示的に実行）
RUN npx tsc

# フロントエンドのビルド
RUN cd frontend && npm install && npm run build

# ビルド結果の確認（デバッグ用）
RUN ls -la dist/

EXPOSE 3000

# 絶対パスで指定して確実に見つけられるようにする
CMD ["node", "/workspace/dist/server.js"]