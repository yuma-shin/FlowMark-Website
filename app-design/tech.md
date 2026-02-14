# 技術スタック

## アーキテクチャ

Electronの3プロセスモデル（Main / Preload / Renderer）に基づくデスクトップアプリケーション。Viteによるビルドシステムと`electron-vite`による統合設定を採用。

- **Main Process**: ファイルシステム操作、ウィンドウ管理、IPCハンドラ
- **Preload**: `contextBridge`によるセキュアなAPI公開
- **Renderer**: React SPAによるUI

## コア技術

- **言語**: TypeScript（strict mode）
- **フレームワーク**: React 19 + Electron 39
- **ビルドツール**: Vite 7 + electron-vite 4
- **ランタイム**: Node.js（ESNext / ES modules）

## 主要ライブラリ

- **エディタ**: `@uiw/react-codemirror` + CodeMirror 6（Markdown言語サポート）
- **Markdown処理**: remark / rehype エコシステム（remark-gfm, rehype-highlight, rehype-prism-plus）
- **ルーティング**: react-router-dom v7 + electron-router-dom
- **UIコンポーネント**: shadcn/ui（New Yorkスタイル）+ Tailwind CSS v4 + lucide-react
- **Front Matter**: gray-matter
- **ユーティリティ**: clsx + tailwind-merge（`cn()`ヘルパー）

## 開発基準

### 型安全性
- TypeScript strict mode有効
- `tsconfig.json`で`noEmit`設定（型チェックのみ、ビルドはViteが担当）
- パスエイリアス: `@/*` → `src/*`

### コード品質
- **Linter/Formatter**: Biome（ESLint/Prettier の代替）
  - インデント: スペース2
  - セミコロン: asNeeded
  - クォート: シングルクォート（JSXはダブル）
  - 改行: LF
  - import整理は手動（organizeImports: off）

### テスト
- 現時点ではテストフレームワーク未導入

## 開発環境

### 必要ツール
- Node.js（ESNext対応バージョン）
- pnpm 10+（パッケージマネージャ）

### 主要コマンド
```bash
# 開発: pnpm dev
# ビルド: pnpm build（compile:app + electron-builder）
# Lint: pnpm lint / pnpm lint:fix
# 型チェック: pnpm typecheck
```

## 主要な技術的決定

- **フレームレスウィンドウ**: `frame: false`でカスタムタイトルバーを実装
- **IPC通信パターン**: `ipcMain.handle` / `ipcRenderer.invoke`による非同期リクエスト/レスポンス
- **状態管理**: React Context API（`AppContext`）+ localStorage永続化（外部状態管理ライブラリ不使用）
- **ファイル監視**: Node.js `fs.watch`による外部変更検知
- **ビルド出力**: `node_modules/.dev/`に開発ビルドを配置

---
_標準とパターンを文書化し、すべての依存関係を列挙しない_
