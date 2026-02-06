# NOMLViewer

**NoSQL Schema Visualizer** - A design document viewer that renders NoSQL database schemas beautifully.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[English](#english) | [日本語](#日本語)

---

## English

### What is NOML?

**NOML** = **NoSQL Modeling Language**

NOML is a YAML-based schema definition format for NoSQL databases. NOMLViewer transforms YAML schema definitions into clear, visual documentation for NoSQL database structures.

See [NOML Specification v1.0.0](docs/NOML_SPEC.md) for the full specification.

### Features

- **Visual Schema Rendering** - Transform YAML definitions into readable design documents
- **File Upload & Paste** - Import schemas via file upload or direct paste
- **Firestore Support** - MVP focused on Google Cloud Firestore
- **Bilingual UI** - English and Japanese support

### Quick Start

```bash
# Clone the repository
git clone https://github.com/noml-viewer-developer/noml-viewer.git
cd noml-viewer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### NOML Schema Example

```yaml
noml: "1.0.0"
database: firestore
metadata:
  name: My App
  description: Sample application schema

collections:
  users:
    description: User accounts
    fields:
      id:
        type: string
        source: documentId
      email:
        type: string
        required: true
        validation:
          format: email
      displayName:
        type: string
      createdAt:
        type: timestamp
        default: serverTimestamp

    subcollections:
      posts:
        description: User's blog posts
        fields:
          title:
            type: string
            required: true
          content:
            type: string
          publishedAt:
            type: timestamp
```

### Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

---

## 日本語

### NOMLとは？

**NOML** = **NoSQL Modeling Language**

NOMLはNoSQLデータベース向けのYAMLベースのスキーマ定義フォーマットです。NOMLViewerはYAMLスキーマ定義を、わかりやすいビジュアルドキュメントに変換します。

詳細は[NOML仕様書 v1.0.0](docs/NOML_SPEC.md)をご覧ください。

### 機能

- **ビジュアルスキーマレンダリング** - YAML定義を読みやすいドキュメントに変換
- **ファイルアップロード＆ペースト** - ファイルアップロードまたは直接ペーストでスキーマをインポート
- **Firestoreサポート** - MVPはGoogle Cloud Firestoreに対応
- **バイリンガルUI** - 英語・日本語対応

### クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/noml-viewer-developer/noml-viewer.git
cd noml-viewer

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### NOMLスキーマの例

```yaml
noml: "1.0.0"
database: firestore
metadata:
  name: マイアプリ
  description: サンプルアプリケーションスキーマ

collections:
  users:
    description: ユーザーアカウント
    fields:
      id:
        type: string
        source: documentId
      email:
        type: string
        required: true
        validation:
          format: email
      displayName:
        type: string
      createdAt:
        type: timestamp
        default: serverTimestamp

    subcollections:
      posts:
        description: ユーザーのブログ投稿
        fields:
          title:
            type: string
            required: true
          content:
            type: string
          publishedAt:
            type: timestamp
```

### 技術スタック

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel

### 開発

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番用ビルド
npm run lint         # ESLint実行
npm run format       # Prettierでフォーマット
```

### コントリビューション

コントリビューションを歓迎します！お気軽にPull Requestを送ってください。

### ライセンス

Apache License 2.0 - 詳細は[LICENSE](LICENSE)をご覧ください。

---

Made with passion for better NoSQL documentation.
