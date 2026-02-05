'use client';

import { Header } from '@/components/ui/Header';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            NOML<span className="text-blue-500">Viewer</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300">
            {t('NoSQL Schema Documentation', 'NoSQLスキーマドキュメンテーション')}
          </p>
        </section>

        {/* What is NOMLViewer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('What is NOMLViewer?', 'NOMLViewerとは？')}
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
            <p>
              {t(
                'NOMLViewer is a design document viewer for NoSQL database structures. It transforms YAML-based schema definitions into beautiful, readable documentation.',
                'NOMLViewerはNoSQLデータベースの構造を可視化するドキュメントビューアーです。YAMLベースのスキーマ定義を見やすいドキュメントに変換します。'
              )}
            </p>
          </div>
        </section>

        {/* What is NOML */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('What is NOML?', 'NOMLとは？')}
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
            <p>
              {t(
                'NOML stands for NoSQL Modeling Language - a specification for describing NoSQL database schemas. It provides a standardized way to document NoSQL database structures using familiar YAML syntax.',
                'NOMLはNoSQL Modeling Languageの略です。YAMLの親しみやすい構文を使って、NoSQLデータベース構造を標準化された方法でドキュメント化するための仕様です。'
              )}
            </p>
          </div>
        </section>

        {/* Current Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('Current Status', '現在の対応状況')}
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-amber-800 dark:text-amber-200">
                {t('Firestore Only', 'Firestore専用')}
              </span>
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {t(
                'Currently, NOMLViewer supports only Google Cloud Firestore. Support for other NoSQL databases (MongoDB, DynamoDB, etc.) is planned for future releases.',
                '現在、NOMLViewerはGoogle Cloud Firestoreのみをサポートしています。他のNoSQLデータベース（MongoDB、DynamoDBなど）のサポートは今後のリリースで予定しています。'
              )}
            </p>
          </div>
          {/* Lenient Parsing Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-blue-800 dark:text-blue-200">
                {t('Lenient Parsing', '寛容なパース処理')}
              </span>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              {t(
                'NOMLViewer uses lenient parsing. Unknown or undefined parameters will be silently ignored (not rendered, no errors). This allows forward compatibility and custom extensions.',
                'NOMLViewerは寛容なパース処理を採用しています。未定義のパラメータはエラーにならず、単に描画されないだけです。これにより前方互換性とカスタム拡張が可能です。'
              )}
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('Vision', '展望')}
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>{t('Visual Schema Builder', 'ビジュアルスキーマビルダー')}</strong>:{' '}
                {t(
                  'Build schema definitions through an intuitive UI without writing YAML manually, then export to YAML with one click',
                  'YAMLを手書きせずに直感的なUIでスキーマ定義を構築し、ワンクリックでYAMLにエクスポート'
                )}
              </li>
              <li>
                <strong>{t('Firestore Code Generation', 'Firestoreコード生成')}</strong>:{' '}
                {t(
                  'Auto-generate Firestore security rules, composite indexes (firestore.indexes.json), TypeScript type definitions, and seed data scripts from NOML schema',
                  'NOMLスキーマからFirestoreセキュリティルール、複合インデックス（firestore.indexes.json）、TypeScript型定義、シードデータスクリプトを自動生成'
                )}
              </li>
              <li>
                <strong>{t('Multi-database support', 'マルチデータベース対応')}</strong>:{' '}
                {t('MongoDB, DynamoDB, Cassandra, and more', 'MongoDB、DynamoDB、Cassandraなど')}
              </li>
              <li>
                <strong>{t('Export features', 'エクスポート機能')}</strong>:{' '}
                {t(
                  'Generate documentation in various formats (PDF, HTML)',
                  '様々な形式（PDF、HTML）でドキュメントを生成'
                )}
              </li>
              <li>
                <strong>{t('Schema validation', 'スキーマバリデーション')}</strong>:{' '}
                {t(
                  'Real-time validation rules and security rule generation',
                  'リアルタイム検証ルールとセキュリティルール生成'
                )}
              </li>
              <li>
                <strong>{t('Team collaboration', 'チームコラボレーション')}</strong>:{' '}
                {t('Share schemas with your team', 'チームでスキーマを共有')}
              </li>
              <li>
                <strong>{t('VS Code extension', 'VS Code拡張機能')}</strong>:{' '}
                {t(
                  'Edit and preview NOML files directly in your editor',
                  'エディタ内でNOMLファイルを編集・プレビュー'
                )}
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('How to Use (Firestore)', '使い方（Firestore）')}
          </h2>

          {/* Step 1 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white text-sm font-bold rounded-full">
                1
              </span>
              {t('Create a NOML file', 'NOMLファイルを作成')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-3">
              {t(
                'Create a YAML file with the following basic structure:',
                '以下の基本構造でYAMLファイルを作成します：'
              )}
            </p>
            <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`version: "0.1"
database: firestore
metadata:
  name: My App
  description: Description of your database schema

collections:
  # Define your collections here`}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white text-sm font-bold rounded-full">
                2
              </span>
              {t('Define Collections', 'コレクションを定義')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-3">
              {t(
                'Add your Firestore collections with their fields:',
                'Firestoreコレクションとフィールドを追加します：'
              )}
            </p>
            <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`collections:
  users:
    description: User accounts
    fields:
      email:
        type: string
        required: true
        description: User email address
        example: "user@example.com"
      displayName:
        type: string
        description: Display name
      createdAt:
        type: timestamp
        default: serverTimestamp`}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white text-sm font-bold rounded-full">
                3
              </span>
              {t('Add Subcollections', 'サブコレクションを追加')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-3">
              {t(
                'Nest subcollections within parent collections:',
                '親コレクション内にサブコレクションをネストします：'
              )}
            </p>
            <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`collections:
  users:
    fields:
      email:
        type: string
        required: true

    subcollections:
      settings:
        description: User preferences
        fields:
          theme:
            type: string
            default: light
          notifications:
            type: boolean
            default: true`}
            </pre>
          </div>

          {/* Step 4 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white text-sm font-bold rounded-full">
                4
              </span>
              {t('Use References', 'リファレンスを使用')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-3">
              {t(
                'Define relationships between collections using references:',
                'リファレンスを使ってコレクション間のリレーションを定義します：'
              )}
            </p>
            <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`collections:
  posts:
    description: Blog posts
    fields:
      title:
        type: string
        required: true
      authorRef:
        type: reference
        target: users  # Reference to users collection
        description: Author of the post`}
            </pre>
          </div>

          {/* Step 5 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white text-sm font-bold rounded-full">
                5
              </span>
              {t('Visualize', '可視化する')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              {t(
                'Paste your NOML schema into the viewer or drag & drop your YAML file to see the visualization.',
                '作成したNOMLスキーマをビューアーにペーストするか、YAMLファイルをドラッグ&ドロップして可視化します。'
              )}
            </p>
          </div>
        </section>

        {/* YAML Schema Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('YAML Schema Reference', 'YAMLスキーマリファレンス')}
          </h2>

          {/* Root Structure */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3">
              {t('Root Structure', 'ルート構造')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Field', 'フィールド')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Required', '必須')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Description', '説明')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">version</td>
                    <td className="px-4 py-2 text-red-500">{t('Yes', '必須')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('NOML version (e.g., "0.1")', 'NOMLバージョン（例: "0.1"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">database</td>
                    <td className="px-4 py-2 text-red-500">{t('Yes', '必須')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Database type (currently only "firestore")', 'データベース種別（現在は"firestore"のみ）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">metadata</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Project metadata (name, description, author)', 'プロジェクトメタデータ（name, description, author）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-orange-600 dark:text-orange-400">enums</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Reusable enum definitions', '再利用可能なenum定義')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">collections</td>
                    <td className="px-4 py-2 text-red-500">{t('Yes', '必須')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Collection definitions', 'コレクション定義')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Enum Definition */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3">
              {t('Enum Definition', 'Enum定義')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Field', 'フィールド')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Required', '必須')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Description', '説明')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-mono text-orange-600 dark:text-orange-400">description</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Enum description', 'Enumの説明')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-orange-600 dark:text-orange-400">values</td>
                    <td className="px-4 py-2 text-red-500">{t('Yes', '必須')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Array of allowed values', '許可される値の配列')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                {t(
                  'Use the enum name directly as the field type:',
                  'enum名をフィールドのtypeとして直接使用:'
                )}
              </p>
              <pre className="text-xs text-zinc-700 dark:text-zinc-300">
{`enums:
  UserRole:
    description: User permission levels
    values: [user, admin, moderator]

collections:
  users:
    fields:
      role:
        type: UserRole  # enum名をtypeに指定
        default: user`}
              </pre>
            </div>
          </div>

          {/* Collection Definition */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3">
              {t('Collection Definition', 'コレクション定義')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Field', 'フィールド')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Required', '必須')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Description', '説明')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Collection description', 'コレクションの説明')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">path</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Firestore path pattern (e.g., "users/{userId}")', 'Firestoreパスパターン（例: "users/{userId}"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-yellow-600 dark:text-yellow-400">keys</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Key definitions (primary, foreign, unique, compositeUnique)', 'キー定義（primary, foreign, unique, compositeUnique）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">fields</td>
                    <td className="px-4 py-2 text-red-500">{t('Yes', '必須')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Field definitions', 'フィールド定義')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">subcollections</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Nested subcollection definitions', 'ネストされたサブコレクション定義')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">indexes</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Composite index definitions (name, description, fields, order)', '複合インデックス定義（name, description, fields, order）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">security</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Security rules (read, create, update, delete)', 'セキュリティルール（read, create, update, delete）')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Field Definition */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3">
              {t('Field Definition', 'フィールド定義')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Field', 'フィールド')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Required', '必須')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Description', '説明')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">type</td>
                    <td className="px-4 py-2 text-red-500">{t('Yes', '必須')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Field type (Firestore types or enum name)', 'フィールドタイプ（Firestoreタイプまたはenum名）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Field description', 'フィールドの説明')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">required</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Whether field is required (default: false)', '必須フィールドかどうか（デフォルト: false）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-cyan-600 dark:text-cyan-400">nullable</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Whether field can be null (distinguishes from optional)', 'nullを許可するか（optionalとは別概念）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">default</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Default value', 'デフォルト値')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">example</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Example value for documentation', 'ドキュメント用のサンプル値')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-yellow-600 dark:text-yellow-400">source</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Value source (e.g., "documentId")', '値のソース（例: "documentId"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-red-600 dark:text-red-400">immutable</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Field cannot be updated after creation', '作成後に更新不可')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">autoUpdate</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Auto-update on each write (for updatedAt)', '書き込み時に自動更新（updatedAt用）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">validation</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Validation rules (min, max, minLength, maxLength, format, pattern)', 'バリデーションルール（min, max, minLength, maxLength, format, pattern）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-cyan-600 dark:text-cyan-400">denormalizedFrom</td>
                    <td className="px-4 py-2 text-zinc-400">{t('No', '任意')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Source of denormalized data (collection.field)', '非正規化データのソース（collection.field）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">target</td>
                    <td className="px-4 py-2 text-zinc-400">{t('For reference', 'reference用')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Target collection name for reference type', 'reference型の参照先コレクション名')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">items</td>
                    <td className="px-4 py-2 text-zinc-400">{t('For array', 'array用')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Array item type definition (type)', '配列要素のタイプ定義（type）')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Validation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3">
              {t('Validation Rules', 'バリデーションルール（validation）')}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
              {t(
                'Both "validation" and "constraints" keys are supported for backwards compatibility.',
                '"validation"と"constraints"の両方のキーが後方互換性のためサポートされています。'
              )}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Field', 'フィールド')}
                    </th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                      {t('Description', '説明')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">min / max</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Number constraints (min/max value)', '数値の最小・最大値')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">minLength / maxLength</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('String length constraints', '文字列の最小・最大長')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">minItems / maxItems</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Array item count constraints', '配列の最小・最大要素数')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">format</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Common formats: email, url, uuid', 'よく使う形式: email, url, uuid')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">pattern</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Regex pattern for validation', 'バリデーション用の正規表現パターン')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">enum</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Inline list of allowed values (use enums definition for reusability)', 'インラインで許可される値のリスト（再利用にはenums定義を推奨）')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Complete Example */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3">
              {t('Complete Example', '完全な例')}
            </h3>
            <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`version: "1.0"
database: firestore
description: Sample Application Schema

enums:
  UserRole:
    description: User permission levels
    values:
      - value: user
        label: User
        description: Standard user
      - value: admin
        label: Administrator
      - value: moderator
        label: Moderator
  Status:
    values: [draft, published, archived]
    transitions:
      draft: [published]
      published: [archived]

collections:
  users:
    description: User accounts
    path: users/{userId}

    keys:
      primary: userId
      description: Document ID = Firebase Auth UID
      unique:
        - field: email
          enforceBy: firebaseAuth

    fields:
      userId:
        type: string
        required: true
        source: documentId
        description: User ID (Firebase Auth UID)

      email:
        type: string
        required: true
        description: Email address
        example: "user@example.com"
        validation:
          format: email

      name:
        type: string
        required: true
        description: Display name
        validation:
          minLength: 1
          maxLength: 50

      role:
        type: UserRole
        default: user
        description: Permission level

      createdAt:
        type: timestamp
        required: true
        immutable: true
        description: Account creation date

      updatedAt:
        type: timestamp
        required: true
        autoUpdate: true
        description: Last update date

    subcollections:
      settings:
        description: User preferences
        fields:
          theme:
            type: string
            default: light
          notifications:
            type: boolean
            default: true

    indexes:
      - name: users_by_role
        description: List users by role
        fields:
          - field: role
            order: asc
          - field: createdAt
            order: desc

  posts:
    description: Blog posts
    path: posts/{postId}

    keys:
      primary: postId
      foreign:
        - field: authorId
          references: users.userId
          onDelete: restrict

    fields:
      postId:
        type: string
        required: true
        source: documentId

      title:
        type: string
        required: true
        validation:
          maxLength: 100

      authorId:
        type: string
        required: true

      authorName:
        type: string
        required: true
        denormalizedFrom:
          collection: users
          field: name
          key: authorId

      status:
        type: Status
        default: draft`}
            </pre>
          </div>
        </section>

        {/* Field Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('Firestore Field Types', 'Firestoreフィールドタイプ')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                    {t('Type', 'タイプ')}
                  </th>
                  <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                    {t('Description', '説明')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">string</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Text data', 'テキストデータ')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">number</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Integer or float', '整数または浮動小数点')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">boolean</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('True or false', '真偽値')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">timestamp</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Date and time', '日時')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">geopoint</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Geographic coordinates', '地理座標')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">reference</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Document reference', 'ドキュメント参照')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">array</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Array of values', '配列')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">map</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Nested object', 'ネストされたオブジェクト')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Special Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
            {t('Special Default Values', '特殊なデフォルト値')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                    {t('Value', '値')}
                  </th>
                  <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">
                    {t('Description', '説明')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">
                    serverTimestamp
                  </td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t(
                      'Auto-generated server timestamp',
                      'サーバー側で自動生成されるタイムスタンプ'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">autoId</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                    {t('Auto-generated document ID', '自動生成されるドキュメントID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Try Now CTA */}
        <section className="text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            {t('Ready to start?', '始めましょう')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            {t(
              'Go to the viewer and try with the sample schema or your own NOML file.',
              'ビューアーでサンプルスキーマまたは独自のNOMLファイルを試してみてください。'
            )}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            {t('Open Viewer', 'ビューアーを開く')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            NOMLViewer - Open Source Schema Documentation Tool
          </p>
        </div>
      </footer>
    </div>
  );
}
