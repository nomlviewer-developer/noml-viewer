'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/ui/Header';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/* ------------------------------------------------------------------ */
/*  TOC definition                                                    */
/* ------------------------------------------------------------------ */

interface TocItem {
  id: string;
  labelEn: string;
  labelJa: string;
  indent?: boolean;
}

const TOC_ITEMS: TocItem[] = [
  { id: 'sec-versioning', labelEn: 'Versioning & Format', labelJa: 'バージョニングとフォーマット' },
  { id: 'sec-principles', labelEn: 'Design Principles', labelJa: '設計原則' },
  { id: 'sec-terminology', labelEn: 'Terminology', labelJa: '用語定義' },
  { id: 'sec-required', labelEn: 'Required vs Optional', labelJa: '必須 vs オプション' },
  { id: 'sec-fields', labelEn: 'Field Reference', labelJa: 'フィールドリファレンス' },
  { id: 'type-root', labelEn: 'Root', labelJa: 'Root', indent: true },
  { id: 'type-metadata', labelEn: 'MetadataDef', labelJa: 'MetadataDef', indent: true },
  { id: 'type-collection', labelEn: 'CollectionDef', labelJa: 'CollectionDef', indent: true },
  { id: 'type-field', labelEn: 'FieldDef', labelJa: 'FieldDef', indent: true },
  { id: 'type-enum', labelEn: 'EnumDef', labelJa: 'EnumDef', indent: true },
  { id: 'type-keys', labelEn: 'KeysDef', labelJa: 'KeysDef', indent: true },
  { id: 'type-index', labelEn: 'IndexDef', labelJa: 'IndexDef', indent: true },
  { id: 'type-security', labelEn: 'SecurityDef', labelJa: 'SecurityDef', indent: true },
  { id: 'type-validation', labelEn: 'ValidationDef', labelJa: 'ValidationDef', indent: true },
  { id: 'type-denormalization', labelEn: 'Denormalization', labelJa: 'Denormalization', indent: true },
  { id: 'sec-data-types', labelEn: 'Data Types', labelJa: 'データ型' },
  { id: 'sec-special-values', labelEn: 'Special Values', labelJa: '特殊な値' },
  { id: 'sec-extensions', labelEn: 'Extensions', labelJa: '拡張フィールド' },
  { id: 'sec-full-example', labelEn: 'Full Example', labelJa: '完全な実例' },
];

/* ------------------------------------------------------------------ */
/*  TOC link list                                                     */
/* ------------------------------------------------------------------ */

function TocLinks({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  const { t } = useLanguage();
  return (
    <ul className="space-y-1">
      {TOC_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              className={`block py-1 transition-colors border-l-2 ${
                item.indent ? 'pl-5' : 'pl-3'
              } ${
                isActive
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                  : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              {t(item.labelEn, item.labelJa)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop sidebar TOC                                               */
/* ------------------------------------------------------------------ */

function DesktopToc({ activeId }: { activeId: string }) {
  const { t } = useLanguage();
  return (
    <nav className="hidden xl:block fixed top-24 w-52 max-h-[calc(100vh-7rem)] overflow-y-auto text-sm pr-2">
      <p className="font-semibold text-zinc-500 dark:text-zinc-400 mb-3 text-xs uppercase tracking-wider">
        {t('On this page', '目次')}
      </p>
      <TocLinks activeId={activeId} />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile TOC dropdown                                               */
/* ------------------------------------------------------------------ */

function MobileToc({ activeId }: { activeId: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const activeItem = TOC_ITEMS.find((i) => i.id === activeId);
  const activeLabel = activeItem ? t(activeItem.labelEn, activeItem.labelJa) : t('On this page', '目次');

  return (
    <div className="xl:hidden sticky top-0 z-30 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-3 text-sm text-zinc-700 dark:text-zinc-200"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-medium truncate">{activeLabel}</span>
          </span>
          <svg
            className={`w-4 h-4 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-4 max-h-[60vh] overflow-y-auto text-sm">
          <TocLinks activeId={activeId} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                           */
/* ------------------------------------------------------------------ */

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2 scroll-mt-20">
      {children}
    </h2>
  );
}

function SubHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-3 whitespace-nowrap scroll-mt-20">
      {children}
    </h3>
  );
}

interface FieldRow {
  name: string;
  required: boolean;
  type: string;
  typeLink?: string;
  descEn: string;
  descJa: string;
}

function FieldTable({ rows }: { rows: FieldRow[] }) {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-100 dark:bg-zinc-800">
            <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Field', 'フィールド')}</th>
            <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Required', '必須')}</th>
            <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Type', '型')}</th>
            <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Description', '説明')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {rows.map((r) => (
            <tr key={r.name} className={r.required ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}>
              <td className={`px-4 py-2 font-mono whitespace-nowrap ${r.required ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {r.name}
              </td>
              <td className={`px-4 py-2 whitespace-nowrap ${r.required ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {r.required ? t('Required', '必須') : t('Optional', '任意')}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-zinc-600 dark:text-zinc-300">
                {r.typeLink ? (
                  <a href={`#${r.typeLink}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2">
                    {r.type}
                  </a>
                ) : r.type}
              </td>
              <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">{t(r.descEn, r.descJa)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  useActiveSection hook                                             */
/* ------------------------------------------------------------------ */

function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length > 0) {
      setActiveId(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    });
    const observer = observerRef.current;
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, handleIntersect]);

  return activeId;
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SpecPage() {
  const { t } = useLanguage();
  const sectionIds = TOC_ITEMS.map((item) => item.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />
      <MobileToc activeId={activeId} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <aside className="hidden xl:block absolute left-0 top-0 w-56">
          <DesktopToc activeId={activeId} />
        </aside>

        <main className="max-w-4xl mx-auto py-12 xl:ml-56">
          {/* Hero */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              NOML <span className="text-blue-500">Specification</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-2">
              {t(
                'The complete reference for NoSQL Modeling Language',
                'NoSQL Modeling Language の完全リファレンス'
              )}
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {t('Version 1.0.0 — Firestore', 'バージョン 1.0.0 — Firestore')}
            </p>
          </section>

          {/* ============================================================ */}
          {/* Versioning & Format                                          */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-versioning">
            <SectionHeading>{t('Versioning & Format', 'バージョニングとフォーマット')}</SectionHeading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">{t('Current version', '現在のバージョン')}</td>
                    <td className="px-4 py-2"><code className="text-blue-600 dark:text-blue-400">1.0.0</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">{t('Version scheme', 'バージョン規則')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t(
                        'Semantic Versioning 2.0.0 — MAJOR.MINOR.PATCH',
                        'セマンティックバージョニング 2.0.0 — MAJOR.MINOR.PATCH'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">{t('Document format', 'ドキュメント形式')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">YAML 1.2 / JSON</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">{t('Encoding', 'エンコーディング')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">UTF-8</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">{t('File extension', 'ファイル拡張子')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      <code className="text-blue-600 dark:text-blue-400">.noml.yaml</code>{' '}
                      <code className="text-blue-600 dark:text-blue-400">.noml.yml</code>{' '}
                      <code className="text-blue-600 dark:text-blue-400">.noml.json</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">{t('Target database', '対象DB')}</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                      {t('Firestore (MVP) — MongoDB, DynamoDB, etc. planned', 'Firestore（MVP）— MongoDB, DynamoDB 等は将来対応予定')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Design Principles                                            */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-principles">
            <SectionHeading>{t('Design Principles', '設計原則')}</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-5">
                <h3 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Lenient Parsing</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {t(
                    'Unknown fields are silently ignored. This allows forward compatibility and custom extensions.',
                    '未知のフィールドは無視されます。これにより前方互換性とカスタム拡張が可能です。'
                  )}
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-5">
                <h3 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                  {t('Minimal Required Fields', '最小限の必須フィールド')}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {t(
                    'Only version, database, and collections (with fields.type) are required. Everything else is optional.',
                    'version、database、collections（fields.type付き）のみ必須。それ以外はすべてオプション。'
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Terminology                                                  */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-terminology">
            <SectionHeading>{t('Terminology', '用語定義')}</SectionHeading>
            <dl className="space-y-4">
              {([
                { termEn: 'Document', termJa: 'Document（ドキュメント）', defEn: 'A single record in a collection, analogous to a row in SQL.', defJa: 'コレクション内の1つのレコード。SQLにおける行に相当。' },
                { termEn: 'Collection', termJa: 'Collection（コレクション）', defEn: 'A group of documents, analogous to a table in SQL.', defJa: 'ドキュメントのグループ。SQLにおけるテーブルに相当。' },
                { termEn: 'Subcollection', termJa: 'Subcollection（サブコレクション）', defEn: 'A collection nested within a document.', defJa: 'ドキュメント内にネストされたコレクション。' },
                { termEn: 'Field', termJa: 'Field（フィールド）', defEn: 'A named property of a document.', defJa: 'ドキュメントの名前付きプロパティ。' },
                { termEn: 'Enum', termJa: 'Enum（列挙型）', defEn: 'A set of predefined allowed values. Can include state machine transitions.', defJa: '定義済みの許可値のセット。ステートマシン遷移も定義可能。' },
                { termEn: 'Reference', termJa: 'Reference（参照）', defEn: 'A field that points to another document in a different collection.', defJa: '別のコレクションのドキュメントを指すフィールド。' },
                { termEn: 'Index', termJa: 'Index（インデックス）', defEn: 'A database structure that improves query performance, especially composite indexes in Firestore.', defJa: 'クエリパフォーマンスを向上させるDB構造。特にFirestoreの複合インデックス。' },
              ] as const).map((item) => (
                <div key={item.termEn} className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                  <dt className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">{t(item.termEn, item.termJa)}</dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-300">{t(item.defEn, item.defJa)}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ============================================================ */}
          {/* Required vs Optional                                         */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-required">
            <SectionHeading>{t('Required vs Optional', '必須 vs オプション')}</SectionHeading>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                {t(
                  'NOML requires only the minimum fields to produce a valid schema:',
                  'NOMLは有効なスキーマに必要な最小限のフィールドのみを要求します：'
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white dark:bg-zinc-800 border border-blue-300 dark:border-blue-700 rounded-lg p-4 text-center">
                  <code className="text-lg font-bold text-blue-600 dark:text-blue-400">version</code>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t('NOML version', 'NOMLバージョン')}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-blue-300 dark:border-blue-700 rounded-lg p-4 text-center">
                  <code className="text-lg font-bold text-blue-600 dark:text-blue-400">database</code>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t('Database type', 'データベース種別')}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-blue-300 dark:border-blue-700 rounded-lg p-4 text-center">
                  <code className="text-lg font-bold text-blue-600 dark:text-blue-400">collections</code>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t('With fields.type', 'fields.type 付き')}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 italic">
                {t(
                  'Everything else — metadata, enums, keys, indexes, security, validation, label, description, etc. — is entirely optional.',
                  'それ以外のすべて — metadata, enums, keys, indexes, security, validation, label, description 等 — は完全にオプションです。'
                )}
              </p>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Field Reference                                              */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-fields">
            <SectionHeading>{t('Field Reference', 'フィールドリファレンス')}</SectionHeading>

            {/* Root */}
            <div className="mb-8">
              <SubHeading id="type-root">Root — <code className="text-base text-blue-500">NomlSchema</code></SubHeading>
              <FieldTable rows={[
                { name: 'version', required: true, type: 'string', descEn: 'NOML version (e.g. "1.0.0")', descJa: 'NOMLバージョン（例: "1.0.0"）' },
                { name: 'database', required: true, type: 'string', descEn: 'Database type (e.g. "firestore")', descJa: 'データベース種別（例: "firestore"）' },
                { name: 'collections', required: true, type: 'Record<string, CollectionDef>', typeLink: 'type-collection', descEn: 'Collection definitions', descJa: 'コレクション定義' },
                { name: 'metadata', required: false, type: 'MetadataDef', typeLink: 'type-metadata', descEn: 'Project metadata', descJa: 'プロジェクトメタデータ' },
                { name: 'description', required: false, type: 'string', descEn: 'Schema description', descJa: 'スキーマの説明' },
                { name: 'updatedAt', required: false, type: 'string', descEn: 'Last update date (ISO 8601)', descJa: '最終更新日（ISO 8601）' },
                { name: 'enums', required: false, type: 'Record<string, EnumDef>', typeLink: 'type-enum', descEn: 'Global enum definitions', descJa: 'グローバルEnum定義' },
              ]} />
            </div>

            {/* Metadata */}
            <div className="mb-8">
              <SubHeading id="type-metadata">Metadata — <code className="text-base text-blue-500">MetadataDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'name', required: true, type: 'string', descEn: 'Schema/project name', descJa: 'スキーマ/プロジェクト名' },
                { name: 'description', required: false, type: 'string', descEn: 'Detailed description', descJa: '詳細な説明' },
                { name: 'author', required: false, type: 'string', descEn: 'Author or team name', descJa: '著者またはチーム名' },
              ]} />
            </div>

            {/* Collection */}
            <div className="mb-8">
              <SubHeading id="type-collection">Collection — <code className="text-base text-blue-500">CollectionDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'fields', required: true, type: 'Record<string, FieldDef>', typeLink: 'type-field', descEn: 'Field definitions', descJa: 'フィールド定義' },
                { name: 'label', required: false, type: 'string', descEn: 'Logical name (e.g. Japanese name)', descJa: '論理名（例: 日本語名）' },
                { name: 'description', required: false, type: 'string', descEn: 'Collection description', descJa: 'コレクションの説明' },
                { name: 'path', required: false, type: 'string', descEn: 'Firestore path pattern (e.g. "users/{userId}")', descJa: 'Firestoreパスパターン（例: "users/{userId}"）' },
                { name: 'keys', required: false, type: 'KeysDef', typeLink: 'type-keys', descEn: 'Key constraints (primary, foreign, unique)', descJa: 'キー制約（primary, foreign, unique）' },
                { name: 'subcollections', required: false, type: 'Record<string, CollectionDef>', typeLink: 'type-collection', descEn: 'Nested subcollection definitions', descJa: 'ネストされたサブコレクション定義' },
                { name: 'indexes', required: false, type: 'IndexDef[]', typeLink: 'type-index', descEn: 'Composite index definitions', descJa: '複合インデックス定義' },
                { name: 'security', required: false, type: 'SecurityDef', typeLink: 'type-security', descEn: 'Security rules', descJa: 'セキュリティルール' },
              ]} />
            </div>

            {/* Field */}
            <div className="mb-8">
              <SubHeading id="type-field">Field — <code className="text-base text-blue-500">FieldDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'type', required: true, type: 'string', descEn: 'Field data type (Firestore type or enum name)', descJa: 'フィールドのデータ型（Firestoreの型またはEnum名）' },
                { name: 'label', required: false, type: 'string', descEn: 'Logical name (e.g. Japanese name)', descJa: '論理名（例: 日本語名）' },
                { name: 'description', required: false, type: 'string', descEn: 'Field description', descJa: 'フィールドの説明' },
                { name: 'required', required: false, type: 'boolean', descEn: 'Whether field is required (default: false)', descJa: '必須かどうか（デフォルト: false）' },
                { name: 'nullable', required: false, type: 'boolean', descEn: 'Whether null is allowed', descJa: 'nullを許可するか' },
                { name: 'default', required: false, type: 'any', descEn: 'Default value', descJa: 'デフォルト値' },
                { name: 'example', required: false, type: 'any', descEn: 'Example value for documentation', descJa: 'ドキュメント用のサンプル値' },
                { name: 'source', required: false, type: 'string', descEn: 'Data source (e.g. "documentId")', descJa: 'データソース（例: "documentId"）' },
                { name: 'immutable', required: false, type: 'boolean', descEn: 'Cannot be updated after creation', descJa: '作成後に更新不可' },
                { name: 'autoUpdate', required: false, type: 'boolean', descEn: 'Auto-update on each write', descJa: '書き込み時に自動更新' },
                { name: 'target', required: false, type: 'string', descEn: 'Target collection for reference type', descJa: 'reference型の参照先コレクション' },
                { name: 'items', required: false, type: 'string | object', descEn: 'Array item type definition', descJa: '配列要素のタイプ定義' },
                { name: 'fields', required: false, type: 'Record<string, FieldDef>', typeLink: 'type-field', descEn: 'Nested fields for map type', descJa: 'map型のネストされたフィールド' },
                { name: 'validation', required: false, type: 'ValidationDef', typeLink: 'type-validation', descEn: 'Validation constraints', descJa: 'バリデーション制約' },
                { name: 'denormalizedFrom', required: false, type: 'object | string', typeLink: 'type-denormalization', descEn: 'Source of denormalized data', descJa: '非正規化データのソース' },
                { name: 'denormalization', required: false, type: 'object', typeLink: 'type-denormalization', descEn: 'Denormalization targets and sync method', descJa: '非正規化ターゲットと同期方法' },
              ]} />
            </div>

            {/* Enum */}
            <div className="mb-8">
              <SubHeading id="type-enum">Enum — <code className="text-base text-blue-500">EnumDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'values', required: true, type: 'array', descEn: 'Allowed values (strings, numbers, or objects with value/label/description)', descJa: '許可値（文字列、数値、またはvalue/label/descriptionを持つオブジェクト）' },
                { name: 'label', required: false, type: 'string', descEn: 'Logical name', descJa: '論理名' },
                { name: 'description', required: false, type: 'string', descEn: 'Enum description', descJa: 'Enumの説明' },
                { name: 'transitions', required: false, type: 'Record<string, string[]>', descEn: 'State machine transitions (from → to[])', descJa: 'ステートマシン遷移（from → to[]）' },
              ]} />
              <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                  {t('Use the enum name directly as the field type:', 'Enum名をフィールドのtypeとして直接使用:')}
                </p>
                <pre className="text-xs text-zinc-700 dark:text-zinc-300">{`enums:
  UserRole:
    values: [user, admin, moderator]

collections:
  users:
    fields:
      role:
        type: UserRole  # enum name as type
        default: user`}</pre>
              </div>
            </div>

            {/* Keys */}
            <div className="mb-8">
              <SubHeading id="type-keys">Keys — <code className="text-base text-blue-500">KeysDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'primary', required: false, type: 'string', descEn: 'Primary key field name', descJa: 'プライマリキーのフィールド名' },
                { name: 'description', required: false, type: 'string', descEn: 'Keys description', descJa: 'キーの説明' },
                { name: 'foreign', required: false, type: 'ForeignKeyDef[]', descEn: 'Foreign key definitions (field, references, onDelete)', descJa: '外部キー定義（field, references, onDelete）' },
                { name: 'unique', required: false, type: 'UniqueKeyDef[]', descEn: 'Unique key definitions (field, enforceBy)', descJa: 'ユニークキー定義（field, enforceBy）' },
                { name: 'compositeUnique', required: false, type: 'CompositeUniqueDef[]', descEn: 'Composite unique key definitions (fields, enforceBy)', descJa: '複合ユニークキー定義（fields, enforceBy）' },
              ]} />
            </div>

            {/* Index */}
            <div className="mb-8">
              <SubHeading id="type-index">Index — <code className="text-base text-blue-500">IndexDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'fields', required: true, type: 'IndexFieldDef[]', descEn: 'Fields to index (field, order, arrayContains)', descJa: 'インデックス対象フィールド（field, order, arrayContains）' },
                { name: 'name', required: false, type: 'string', descEn: 'Index name', descJa: 'インデックス名' },
                { name: 'description', required: false, type: 'string', descEn: 'Index description', descJa: 'インデックスの説明' },
                { name: 'queryExample', required: false, type: 'string', descEn: 'Example query using this index', descJa: 'このインデックスを使用するクエリの例' },
              ]} />
            </div>

            {/* Security */}
            <div className="mb-8">
              <SubHeading id="type-security">Security — <code className="text-base text-blue-500">SecurityDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'read', required: false, type: 'SecurityRuleDef[]', descEn: 'Read operation rules (condition, description, excludeFields)', descJa: '読み取りルール（condition, description, excludeFields）' },
                { name: 'create', required: false, type: 'SecurityRuleDef[]', descEn: 'Create operation rules', descJa: '作成ルール' },
                { name: 'update', required: false, type: 'SecurityRuleDef[]', descEn: 'Update operation rules', descJa: '更新ルール' },
                { name: 'delete', required: false, type: 'SecurityRuleDef[]', descEn: 'Delete operation rules', descJa: '削除ルール' },
              ]} />
            </div>

            {/* Validation */}
            <div className="mb-8">
              <SubHeading id="type-validation">Validation — <code className="text-base text-blue-500">ValidationDef</code></SubHeading>
              <FieldTable rows={[
                { name: 'min', required: false, type: 'number', descEn: 'Minimum value (for number)', descJa: '最小値（number用）' },
                { name: 'max', required: false, type: 'number', descEn: 'Maximum value (for number)', descJa: '最大値（number用）' },
                { name: 'minLength', required: false, type: 'number', descEn: 'Minimum string length', descJa: '最小文字数' },
                { name: 'maxLength', required: false, type: 'number', descEn: 'Maximum string length', descJa: '最大文字数' },
                { name: 'pattern', required: false, type: 'string', descEn: 'Regex pattern', descJa: '正規表現パターン' },
                { name: 'format', required: false, type: 'string', descEn: 'Predefined format (email, url, uuid, date, phone)', descJa: '定義済みフォーマット（email, url, uuid, date, phone）' },
                { name: 'minItems', required: false, type: 'number', descEn: 'Minimum array length', descJa: '最小配列長' },
                { name: 'maxItems', required: false, type: 'number', descEn: 'Maximum array length', descJa: '最大配列長' },
                { name: 'enum', required: false, type: 'array', descEn: 'Inline allowed values (use global enums instead)', descJa: 'インライン許可値（グローバルenums推奨）' },
              ]} />
            </div>

            {/* Denormalization */}
            <div className="mb-8">
              <SubHeading id="type-denormalization">Denormalization</SubHeading>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                {t(
                  'NoSQL databases often denormalize data for read performance. NOML supports documenting both the source and destination of denormalized data.',
                  'NoSQLデータベースでは読み取りパフォーマンスのためにデータを非正規化することがよくあります。NOMLは非正規化データのソースとコピー先の両方をドキュメント化できます。'
                )}
              </p>
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                  <h4 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                    <code className="text-blue-500">denormalization</code> — {t('Source field', 'ソース側')}
                  </h4>
                  <pre className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 p-3 rounded">{`displayName:
  type: string
  denormalization:
    targets:
      - collection: posts
        field: authorName
    syncMethod: cloudFunction`}</pre>
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                  <h4 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                    <code className="text-blue-500">denormalizedFrom</code> — {t('Destination field', 'コピー先')}
                  </h4>
                  <pre className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 p-3 rounded">{`authorName:
  type: string
  denormalizedFrom:
    collection: users
    field: displayName`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Data Types                                                   */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-data-types">
            <SectionHeading>{t('Data Types', 'データ型')}</SectionHeading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Type', '型')}</th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Description', '説明')}</th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Example', '例')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {([
                    { type: 'string', descEn: 'Text data', descJa: 'テキストデータ', example: '"Hello"' },
                    { type: 'number', descEn: 'Integer or float', descJa: '整数または浮動小数点', example: '42, 3.14' },
                    { type: 'boolean', descEn: 'True or false', descJa: '真偽値', example: 'true' },
                    { type: 'timestamp', descEn: 'Date and time', descJa: '日時', example: '2024-01-15T10:30:00Z' },
                    { type: 'geopoint', descEn: 'Geographic coordinates', descJa: '地理座標', example: '{ lat: 35.67, lng: 139.65 }' },
                    { type: 'reference', descEn: 'Document reference', descJa: 'ドキュメント参照', example: '/users/abc123' },
                    { type: 'array', descEn: 'Ordered list', descJa: '配列', example: '["a", "b", "c"]' },
                    { type: 'map', descEn: 'Nested object', descJa: 'ネストされたオブジェクト', example: '{ key: "value" }' },
                  ] as const).map((row) => (
                    <tr key={row.type}>
                      <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">{row.type}</td>
                      <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">{t(row.descEn, row.descJa)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Special Values                                               */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-special-values">
            <SectionHeading>{t('Special Values', '特殊な値')}</SectionHeading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Value', '値')}</th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Description', '説明')}</th>
                    <th className="text-left px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-200">{t('Usage', '使い方')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">serverTimestamp</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">{t('Server-generated timestamp', 'サーバー側で自動生成されるタイムスタンプ')}</td>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-500">default: serverTimestamp</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">autoId</td>
                    <td className="px-4 py-2 text-zinc-600 dark:text-zinc-300">{t('Auto-generated document ID', '自動生成されるドキュメントID')}</td>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-500">default: autoId</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Extensions                                                   */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-extensions">
            <SectionHeading>{t('Specification Extensions', '拡張フィールド')}</SectionHeading>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
              <p>
                {t(
                  'Vendor-specific extensions must use the x- prefix. Unknown fields are silently ignored.',
                  'ベンダー固有の拡張にはx-プレフィックスを使用してください。未知のフィールドは無視されます。'
                )}
              </p>
              <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">{`collections:
  users:
    x-firebase-ttl: 86400
    fields:
      email:
        type: string
        x-algolia-searchable: true
      secretKey:
        type: string
        x-sensitive: true
        x-encryption: AES-256`}</pre>
            </div>
          </section>

          {/* ============================================================ */}
          {/* Full Example                                                 */}
          {/* ============================================================ */}
          <section className="mb-12" id="sec-full-example">
            <SectionHeading>{t('Full Example', '完全な実例')}</SectionHeading>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
              {t(
                'A complete NOML document using all major features — metadata, enums with transitions, collections, subcollections, references, keys, indexes, validation, security, and denormalization.',
                '主要な機能をすべて使用した完全なNOMLドキュメント — metadata, ステートマシン付きenum, collections, subcollections, references, keys, indexes, validation, security, denormalization。'
              )}
            </p>
            <pre className="bg-zinc-800 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">{`version: "1.0.0"
database: firestore
metadata:
  name: Blog Platform
  description: A full-featured blog with users, posts, and comments
  author: Platform Team

enums:
  UserRole:
    label: ユーザー権限
    description: User permission levels
    values:
      - value: user
        label: User
        description: Regular user
      - value: admin
        label: Administrator
  PostStatus:
    label: 投稿ステータス
    values: [draft, review, published, archived]
    transitions:
      draft: [review, archived]
      review: [draft, published]
      published: [archived]
      archived: []

collections:
  users:
    label: ユーザー
    description: Registered user accounts
    keys:
      primary: id
      unique:
        - field: email
          enforceBy: cloudFunction
    fields:
      id:
        type: string
        source: documentId
        required: true
      email:
        type: string
        label: メールアドレス
        required: true
        immutable: true
        validation:
          format: email
      displayName:
        type: string
        label: 表示名
        required: true
        validation:
          maxLength: 100
        denormalization:
          targets:
            - collection: posts
              field: authorName
          syncMethod: cloudFunction
      role:
        type: UserRole
        label: 権限
        default: user
      createdAt:
        type: timestamp
        label: 作成日時
        default: serverTimestamp
        immutable: true

    subcollections:
      settings:
        label: 設定
        description: User preferences
        fields:
          theme:
            type: string
            label: テーマ
            default: system
          language:
            type: string
            default: en

    security:
      read:
        - condition: "request.auth != null"
          description: Authenticated users can read
      update:
        - condition: "request.auth.uid == resource.data.id"
          description: Users can update their own profile
          excludeFields: [role, createdAt]

  posts:
    label: 投稿
    description: Blog posts
    keys:
      foreign:
        - field: authorId
          references: users.id
          onDelete: cascade
    fields:
      title:
        type: string
        label: タイトル
        required: true
        validation:
          maxLength: 200
      authorId:
        type: string
        required: true
        immutable: true
      authorName:
        type: string
        label: 著者名
        denormalizedFrom:
          collection: users
          field: displayName
      tags:
        type: array
        label: タグ
        items: string
        validation:
          maxItems: 10
      status:
        type: PostStatus
        label: ステータス
        default: draft
      createdAt:
        type: timestamp
        default: serverTimestamp
        immutable: true

    indexes:
      - name: posts_by_author
        fields:
          - authorId
          - field: createdAt
            order: desc
      - name: posts_by_tag
        fields:
          - field: tags
            arrayContains: true
          - field: createdAt
            order: desc`}</pre>
          </section>

          {/* CTA */}
          <section className="text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              {t('Try it in the viewer', 'ビューアーで試す')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              {t(
                'Write your NOML and see it visualized instantly.',
                'NOMLを書いて、即座に可視化を確認しましょう。'
              )}
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              {t('Open Viewer', 'ビューアーを開く')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </section>
        </main>
      </div>

      <footer className="border-t border-zinc-200 dark:border-zinc-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            {t('NOMLViewer - Open Source Schema Documentation Tool', 'NOMLViewer - オープンソース スキーマドキュメントツール')}
          </p>
        </div>
      </footer>
    </div>
  );
}
