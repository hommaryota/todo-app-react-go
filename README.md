# React + Go アプリケーション環境設定

このリポジトリは React フロントエンド、Go バックエンド、Express 中間サーバーを組み合わせた開発環境です。

## 構成

- **フロントエンド** : React + TypeScript (Vite)
- **バックエンド** : Go (Gin)
- **中間サーバー** : Express + TypeScript

## 前提条件

- Node.js v22.11.0 以上
- Go 1.18 以上
- npm 10.x 以上

## ローカル環境でのセットアップ

### 1. リポジトリのクローン

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token">git</span><span> clone https://github.com/your-username/todo-app-react-go.git
</span></span><span><span></span><span class="token">cd</span><span> todo-app-react-go</span></span></code></pre></div></div></pre>

### 2. 依存関係のインストール

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token"># ルートディレクトリで実行</span><span>
</span></span><span><span></span><span class="token">npm</span><span></span><span class="token"> install</span><span>
</span></span><span>
</span><span><span></span><span class="token"># フロントエンドの依存関係</span><span>
</span></span><span><span></span><span class="token">cd</span><span> frontend
</span></span><span><span></span><span class="token">npm</span><span></span><span class="token"> install</span><span>
</span></span><span><span></span><span class="token">cd</span><span></span><span class="token">..</span><span>
</span></span><span>
</span><span><span></span><span class="token"># バックエンドの依存関係</span><span>
</span></span><span><span></span><span class="token">cd</span><span> backend
</span></span><span>go mod download
</span><span><span></span><span class="token">cd</span><span></span><span class="token">..</span></span></code></pre></div></div></pre>

### 3. 開発サーバーの起動

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token"># ルートディレクトリで実行</span><span>
</span></span><span><span></span><span class="token">npm</span><span> run dev</span></span></code></pre></div></div></pre>

これで以下のサーバーが起動します：

- Express: [http://localhost:3000](http://localhost:3000)
- React: [http://localhost:5173](http://localhost:5173)
- Go: [http://localhost:8081](http://localhost:8081)

メインのアクセスは [http://localhost:3000](http://localhost:3000) から行ってください。

## Docker 環境でのセットアップ

### 1. Docker Compose を使用して起動

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token">docker-compose</span><span> up</span></span></code></pre></div></div></pre>

または、バックグラウンドで実行する場合：

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token">docker-compose</span><span> up -d</span></span></code></pre></div></div></pre>

### 2. コンテナを再ビルドする場合

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token">docker-compose</span><span> up --build</span></span></code></pre></div></div></pre>

### 3. コンテナを停止する場合

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token">docker-compose</span><span> down</span></span></code></pre></div></div></pre>

## 主な機能

- Express 中間サーバーが React フロントエンドと Go バックエンドの接続を管理
- 開発環境ではホットリロードに対応
- TypeScript による型安全性
- Docker 対応で環境構築を簡素化

## ディレクトリ構造

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code><span><span>project-root/
</span></span><span>├── server.ts           # Express中間サーバー
</span><span>├── package.json        # プロジェクト設定
</span><span>├── tsconfig.json       # TypeScript設定
</span><span>├── Dockerfile          # Express用Dockerfile
</span><span>├── docker-compose.yml  # Docker Compose設定
</span><span>├── frontend/           # Reactフロントエンド
</span><span>│   ├── src/
</span><span>│   ├── public/
</span><span>│   └── ...
</span><span>└── backend/            # Goバックエンド
</span><span>    ├── main.go
</span><span>    └── ...</span></code></pre></div></div></pre>

## 本番環境へのデプロイ

本番環境用にビルドするには：

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token"># ルートディレクトリで実行</span><span>
</span></span><span><span></span><span class="token">npm</span><span> run prod</span></span></code></pre></div></div></pre>

## トラブルシューティング

### ポートが既に使用されている場合

以下のコマンドで使用中のポートを確認できます：

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="クリップボードにコピー" data-state="closed"><div class="relative *:transition"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><div class="absolute inset-0 flex items-center justify-center"><label class="select-none inline-flex gap-3 cursor-pointer text-left"><div class="relative"><input class="sr-only peer" type="checkbox"/><div class="w-4 h-4 overflow-hidden flex items-center justify-center border rounded transition-colors duration-100 ease-in-out peer-focus-visible:ring-1 ring-offset-2 ring-offset-bg-300 ring-accent-main-100 bg-bg-000 border-border-200 hover:border-border-100 cursor-pointer rounded-full scale-50 opacity-0"></div></div><span class="leading-none sr-only"></span></label></div></div></button></div></div><div class="text-text-500 text-xs p-3.5 pb-0">bash</div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code class="language-bash"><span><span class="token"># Macの場合</span><span>
</span></span><span><span></span><span class="token">lsof</span><span> -i :3000
</span></span><span><span></span><span class="token">lsof</span><span> -i :5173
</span></span><span><span></span><span class="token">lsof</span><span> -i :8081</span></span></code></pre></div></div></pre>

### API リクエストがエラーになる場合

CORS の設定を確認してください。Go バックエンドの main.go ファイルに CORS 設定が正しく行われているか確認します。

## ライセンス

MIT

### コメント

7 系 6 系の MUI をインストールしたら動かないため 5 系を使用
