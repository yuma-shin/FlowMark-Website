# プロジェクト構造

## 組織方針

Electronの3プロセスアーキテクチャに基づくレイヤー分離。`src/`配下をプロセス単位で分割し、共有コードは`shared/`で管理する。

## ディレクトリパターン

### Main Process（`src/main/`）
**目的**: Electronメインプロセスのエントリポイント・IPC・OS統合
**構成**:
- `index.ts`: アプリ起動・IPCハンドラ登録
- `services/`: ビジネスロジック（例: `markdown-service.ts`）
- `windows/`: ウィンドウ定義・設定

### Preload（`src/preload/`）
**目的**: `contextBridge`を通じたRenderer向けAPI公開
**構成**: `index.ts`のみ。すべてのIPC呼び出しを`window.App`オブジェクトとして公開

### Renderer（`src/renderer/`）
**目的**: React UIアプリケーション
**構成**:
- `screens/`: 画面単位のルートコンポーネント（`main.tsx`, `editor.tsx`）
- `components/`: UIコンポーネント（PascalCase）
  - `components/ui/`: shadcn/uiベースの汎用コンポーネント
  - `components/editor/`: エディタ関連のコンポーネント
- `contexts/`: React Context（`AppContext.tsx`）
- `hooks/`: カスタムフック（`use`プレフィックス、camelCase）
- `lib/`: ユーティリティ関数（`utils.ts`に`cn()`ヘルパー等）
- `utils/`: ドメイン固有のユーティリティ

### Shared（`src/shared/`）
**目的**: Main/Renderer間で共有する型・定数
**構成**:
- `types.ts`: 共有型定義（`MarkdownNoteMeta`, `FolderNode`, `AppSettings`等）
- `constants.ts`: 環境変数・プラットフォーム定数
- `utils.ts`: 共有ユーティリティ関数

### Lib（`src/lib/`）
**目的**: Electronアプリのインフラストラクチャ
**構成**:
- `electron-router-dom.ts`: ルーティング設定
- `electron-app/factories/`: アプリ・ウィンドウ・IPCのファクトリパターン
- `electron-app/release/`: ビルド・リリースユーティリティ
- `electron-app/utils/`: DevTools設定等

### Resources（`src/resources/`）
**目的**: 静的アセット（アイコン、公開ファイル）

## 命名規約

- **ファイル名（コンポーネント）**: PascalCase（例: `EditorView.tsx`, `FolderTree.tsx`）
- **ファイル名（フック）**: camelCase + `use`プレフィックス（例: `useNotes.ts`）
- **ファイル名（ユーティリティ）**: camelCase（例: `noteFilters.ts`）
- **ファイル名（サービス）**: kebab-case（例: `markdown-service.ts`）
- **関数**: camelCase
- **型/インターフェース**: PascalCase
- **定数オブジェクト**: UPPER_SNAKE_CASE（例: `ENVIRONMENT`, `PLATFORM`）

## インポート構成

```typescript
// Electron/Node.js（Mainプロセス）
import { app, ipcMain } from 'electron'
import * as fs from 'fs'

// パスエイリアス（共有型）
import type { MarkdownNoteMeta } from '@/shared/types'

// 内部ライブラリ（エイリアスなし）
import { makeAppSetup } from 'lib/electron-app/factories/app/setup'

// 相対インポート（同一レイヤー内）
import { CustomTitleBar } from '../components/CustomTitleBar'
import { useApp } from '../contexts/AppContext'
```

**パスエイリアス**:
- `@/*`: `src/*`にマップ
- `~/*`: プロジェクトルートにマップ

## コード構成原則

- **プロセス分離**: Main/Rendererは直接importしない。必ずPreloadのIPC経由で通信
- **サービスパターン**: Mainプロセスのビジネスロジックは`services/`に集約
- **コンポーネント粒度**: 画面は`screens/`、再利用可能なUIは`components/`に配置
- **フックの抽出**: 複雑なロジックはカスタムフックに分離

---
_パターンを文書化し、ファイルツリーではない。パターンに従った新しいファイルはステアリングの更新を必要としない_
