# FlowMark Website

FlowMark の公式サイト/ドキュメントサイトです。  
Astro + Starlight をベースに、カスタムコンポーネントと多言語（英語/日本語）構成で実装されています。

## 技術スタック

- Astro
- Starlight
- Tailwind CSS
- React (`react-icons` 利用)
- remark-github-alerts

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

デフォルトでは `http://localhost:4321` で起動します。

## ビルド

```bash
npm run build
```

## プレビュー

```bash
npm run preview
```

## 主なディレクトリ

```text
src/
  assets/                       # 画像や静的アセット
  components/
    override-components/        # Starlight の上書きコンポーネント
    user-components/            # 再利用 UI コンポーネント
  config/                       # サイト設定（メニュー、サイドバー、ロケール等）
  content/
    docs/                       # ドキュメント本体（en/ja）
    i18n/                       # 翻訳テキスト
    sections/                   # セクションデータ（CTA など）
  styles/                       # グローバル/コンポーネントスタイル
astro.config.mjs                # Astro / Starlight 設定
```

## 主な設定ファイル

- `src/config/config.json`  
  サイト基本情報、ヘッダーボタン設定など。

- `src/config/menu.en.json`
- `src/config/menu.ja.json`  
  ヘッダーメニュー構成。

- `src/config/sidebar.json`  
  ドキュメントのサイドバー構成。

- `src/config/locals.json`  
  言語設定（`en`, `ja`）。

## コンテンツ編集

- 英語: `src/content/docs/**`
- 日本語: `src/content/docs/ja/**`

新規ページは `.md` または `.mdx` で追加します。  
サイドバーに表示する場合は `src/config/sidebar.json` の slug/directory と一致させてください。

## 注意事項

- パス/slug を変更した場合は、メニュー・サイドバー・内部リンクをあわせて更新してください。
- 旧URL互換が必要な場合は、移行用ページ（案内ページ）を追加して対応してください。
