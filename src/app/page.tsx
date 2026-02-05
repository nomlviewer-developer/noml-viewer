'use client';

import { useState } from 'react';
import { NomlInput } from '@/components/ui/NomlInput';
import { SchemaViewer } from '@/components/viewer/SchemaViewer';
import { Header } from '@/components/ui/Header';
import { parseAndValidateNoml } from '@/lib/parser';
import type { NomlSchema, ValidationResult } from '@/lib/schema/types';

// Sample NOML for demo
const SAMPLE_NOML = `version: "0.1"
database: firestore
metadata:
  name: Sample Blog App
  description: A simple blog application schema

enums:
  UserRole:
    description: User permission levels
    values: [user, admin, moderator]
  PostStatus:
    description: Publication status of posts
    values: [draft, published, archived]
  Theme:
    description: UI theme options
    values: [light, dark, system]

collections:
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
        example: "John Doe"
      role:
        type: UserRole
        default: user
        description: User permission level
      createdAt:
        type: timestamp
        default: serverTimestamp
        description: Account creation date

    subcollections:
      settings:
        description: User preferences
        fields:
          theme:
            type: Theme
            default: light
            description: UI theme preference
          notifications:
            type: boolean
            example: true

  posts:
    description: Blog posts
    fields:
      title:
        type: string
        required: true
        description: Post title
        example: "Getting Started with Firestore"
      content:
        type: string
        required: true
        description: Post body content
        example: "This is the main content of the blog post..."
      authorRef:
        type: reference
        target: users
        description: Reference to the post author
      tags:
        type: array
        items:
          type: string
        description: Post tags for categorization
        example: ["firebase", "tutorial", "nosql"]
      status:
        type: PostStatus
        default: draft
        description: Publication status
`;

export default function Home() {
  const [schema, setSchema] = useState<NomlSchema | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(true);
  const [yamlText, setYamlText] = useState('');

  const handleYamlChange = (yaml: string) => {
    setYamlText(yaml);

    if (!yaml.trim()) {
      setSchema(null);
      setValidation(null);
      setParseError(null);
      return;
    }

    const result = parseAndValidateNoml(yaml);
    setSchema(result.schema);
    setValidation(result.validation);
    setParseError(result.parseError);
  };

  const loadSample = () => {
    setYamlText(SAMPLE_NOML);
    handleYamlChange(SAMPLE_NOML);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Panel - Collapsible */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isInputOpen ? 'lg:w-1/2' : 'lg:w-0'
            }`}
          >
            <div className={`${isInputOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  Input NOML Schema
                </h2>
                <button onClick={loadSample} className="text-sm text-blue-500 hover:text-blue-600">
                  Load Sample
                </button>
              </div>
              <NomlInput value={yamlText} onYamlChange={handleYamlChange} />

              {/* Error Display */}
              {parseError && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Parse Error
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-mono">
                    {parseError}
                  </p>
                </div>
              )}

              {/* Validation Errors */}
              {validation && !validation.valid && (
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Validation Errors
                  </h3>
                  <ul className="text-sm text-amber-600 dark:text-amber-400 mt-1 space-y-1">
                    {validation.errors.map((error, i) => (
                      <li key={i}>
                        <span className="font-mono">{error.path}</span>: {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success */}
              {validation?.valid && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400">Schema is valid</p>
                </div>
              )}
            </div>
          </div>

          {/* Viewer Panel */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isInputOpen ? 'lg:w-1/2' : 'lg:w-full'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                Schema Visualization
              </h2>
              {/* Toggle Button */}
              <button
                onClick={() => setIsInputOpen(!isInputOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                {isInputOpen ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      />
                    </svg>
                    Hide Editor
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    Show Editor
                  </>
                )}
              </button>
            </div>
            {schema ? (
              <SchemaViewer schema={schema} />
            ) : (
              <div className="flex items-center justify-center h-64 bg-white dark:bg-zinc-800 rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                <p className="text-zinc-400 dark:text-zinc-500">
                  Enter or upload a NOML schema to visualize
                </p>
              </div>
            )}
          </div>
        </div>
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
