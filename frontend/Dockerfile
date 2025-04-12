FROM node:22-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# @supabase/supabase-jsを明示的にインストール
RUN npm install @supabase/supabase-js

# ソースコードをコピー
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]