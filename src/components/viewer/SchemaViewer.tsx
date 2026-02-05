'use client';

import { useState } from 'react';
import type {
  NomlSchema,
  CollectionDef,
  FieldDef,
  EnumDef,
  EnumValueDef,
  IndexDef,
  IndexFieldDef,
  FieldValidation,
} from '@/lib/schema/types';

interface SchemaViewerProps {
  schema: NomlSchema;
}

export function SchemaViewer({ schema }: SchemaViewerProps) {
  const enums = schema.enums || {};
  const [expandKey, setExpandKey] = useState(0);
  const [isAllExpanded, setIsAllExpanded] = useState(true);

  const handleExpandAll = () => {
    setIsAllExpanded(true);
    setExpandKey((k) => k + 1);
  };

  const handleCollapseAll = () => {
    setIsAllExpanded(false);
    setExpandKey((k) => k + 1);
  };

  return (
    <div className="w-full">
      {/* Header - supports both metadata object and direct description */}
      {(schema.metadata || schema.description) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
            {schema.metadata?.name || 'Schema'}
          </h2>
          {(schema.metadata?.description || schema.description) && (
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              {schema.metadata?.description || schema.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-500">
            <span>Version: {schema.version}</span>
            <span>Database: {schema.database}</span>
            {schema.metadata?.author && <span>Author: {schema.metadata.author}</span>}
            {schema.updatedAt && <span>Updated: {schema.updatedAt}</span>}
          </div>
        </div>
      )}

      {/* Expand/Collapse All Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={handleExpandAll}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
            />
          </svg>
          Collapse All
        </button>
      </div>

      {/* Collections */}
      <div className="space-y-4">
        {Object.entries(schema.collections).map(([name, collection]) => (
          <CollectionCard
            key={`${name}-${expandKey}`}
            name={name}
            collection={collection}
            level={0}
            enums={enums}
            defaultExpanded={isAllExpanded}
          />
        ))}
      </div>

      {/* Enums */}
      {Object.keys(enums).length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-4">Enums</h3>
          <div className="space-y-4">
            {Object.entries(enums).map(([enumName, enumDef]) => (
              <EnumCard
                key={`${enumName}-${expandKey}`}
                name={enumName}
                enumDef={enumDef}
                defaultExpanded={isAllExpanded}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================
// Enum Card
// ===========================================

interface EnumCardProps {
  name: string;
  enumDef: EnumDef;
  defaultExpanded?: boolean;
}

function getEnumValue(item: string | number | EnumValueDef): string {
  if (typeof item === 'string' || typeof item === 'number') {
    return String(item);
  }
  if (item && typeof item === 'object' && 'value' in item) {
    return String(item.value);
  }
  return JSON.stringify(item);
}

function getEnumLabel(item: string | number | EnumValueDef): string | undefined {
  if (item && typeof item === 'object' && 'label' in item) {
    return item.label;
  }
  return undefined;
}

function getEnumDescription(item: string | number | EnumValueDef): string | undefined {
  if (item && typeof item === 'object' && 'description' in item) {
    return item.description;
  }
  return undefined;
}

function EnumCard({ name, enumDef, defaultExpanded }: EnumCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? true);
  const hasDetailedValues = enumDef.values.some(
    (v) => typeof v === 'object' && v !== null && ('label' in v || 'description' in v)
  );

  return (
    <div className="border-l-4 border-orange-500 bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-zinc-50 dark:bg-zinc-700/50 border-b border-zinc-200 dark:border-zinc-600 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded">
              Enum
            </span>
            <h4 className="text-md font-semibold text-zinc-800 dark:text-zinc-100">{name}</h4>
          </div>
          <span className="text-xs text-zinc-500">{enumDef.values.length} values</span>
        </div>
        {enumDef.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 ml-6">
            {enumDef.description}
          </p>
        )}
      </button>
      {isExpanded && (
        <div className="p-4">
          {hasDetailedValues ? (
            <div className="space-y-2">
              {enumDef.values.map((item, index) => (
                <div key={`${index}-${getEnumValue(item)}`} className="flex items-start gap-2">
                  <code className="px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs shrink-0">
                    {getEnumValue(item)}
                  </code>
                  {getEnumLabel(item) && (
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {getEnumLabel(item)}
                    </span>
                  )}
                  {getEnumDescription(item) && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      - {getEnumDescription(item)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {enumDef.values.map((item, index) => (
                <code
                  key={`${index}-${getEnumValue(item)}`}
                  className="px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs"
                >
                  {getEnumValue(item)}
                </code>
              ))}
            </div>
          )}
          {/* Transitions */}
          {enumDef.transitions && Object.keys(enumDef.transitions).length > 0 && (
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <h5 className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                State Transitions
              </h5>
              <div className="space-y-1">
                {Object.entries(enumDef.transitions).map(([from, toList]) => (
                  <div key={from} className="text-xs">
                    <code className="text-orange-600 dark:text-orange-400">{from}</code>
                    <span className="text-zinc-400 mx-2">→</span>
                    {toList.map((to, i) => (
                      <span key={to}>
                        <code className="text-green-600 dark:text-green-400">{to}</code>
                        {i < toList.length - 1 && <span className="text-zinc-400">, </span>}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===========================================
// Collection Card
// ===========================================

interface CollectionCardProps {
  name: string;
  collection: CollectionDef;
  level: number;
  enums: Record<string, EnumDef>;
  defaultExpanded?: boolean;
}

function CollectionCard({
  name,
  collection,
  level,
  enums,
  defaultExpanded,
}: CollectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? true);
  const borderColors = ['border-blue-500', 'border-green-500', 'border-purple-500'];
  const borderColor = borderColors[level % borderColors.length];

  const fieldCount = Object.keys(collection.fields).length;
  const subcollectionCount = collection.subcollections
    ? Object.keys(collection.subcollections).length
    : 0;

  return (
    <div
      className={`border-l-4 ${borderColor} bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden`}
      style={{ marginLeft: level * 20 }}
    >
      {/* Collection Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-zinc-50 dark:bg-zinc-700/50 border-b border-zinc-200 dark:border-zinc-600 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
              Collection
            </span>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{name}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{fieldCount} fields</span>
            {subcollectionCount > 0 && (
              <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded">
                {subcollectionCount} subcollection{subcollectionCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        {/* Path */}
        {collection.path && (
          <div className="mt-1 ml-6">
            <code className="text-xs text-zinc-500 dark:text-zinc-400">{collection.path}</code>
          </div>
        )}
        {collection.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 ml-6">
            {collection.description}
          </p>
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Keys Section */}
          {collection.keys && (
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-700/30">
              <h4 className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">Keys</h4>
              <div className="space-y-1 text-xs">
                {collection.keys.primary && (
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded">
                      PK
                    </span>
                    <code className="text-zinc-700 dark:text-zinc-300">
                      {collection.keys.primary}
                    </code>
                    {collection.keys.description && (
                      <span className="text-zinc-500">- {collection.keys.description}</span>
                    )}
                  </div>
                )}
                {collection.keys.foreign?.map((fk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 rounded">
                      FK
                    </span>
                    <code className="text-zinc-700 dark:text-zinc-300">{fk.field}</code>
                    <span className="text-zinc-400">→</span>
                    <code className="text-blue-600 dark:text-blue-400">{fk.references}</code>
                    {fk.onDelete && (
                      <span className="text-zinc-500">(onDelete: {fk.onDelete})</span>
                    )}
                  </div>
                ))}
                {collection.keys.unique?.map((uk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded">
                      UQ
                    </span>
                    <code className="text-zinc-700 dark:text-zinc-300">{uk.field}</code>
                    {uk.description && <span className="text-zinc-500">- {uk.description}</span>}
                  </div>
                ))}
                {collection.keys.compositeUnique?.map((cu, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded">
                      CU
                    </span>
                    <code className="text-zinc-700 dark:text-zinc-300">
                      [{cu.fields.join(', ')}]
                    </code>
                    {cu.description && <span className="text-zinc-500">- {cu.description}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fields */}
          <div className="p-4">
            <div className="text-sm">
              <div className="flex text-left text-zinc-500 dark:text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-700">
                <div className="w-8"></div>
                <div className="flex-1 font-medium">Field</div>
                <div className="w-32 font-medium">Type</div>
                <div className="w-24 font-medium">Required</div>
              </div>
              <div>
                {Object.entries(collection.fields).map(([fieldName, field]) => (
                  <FieldRow key={fieldName} name={fieldName} field={field} enums={enums} />
                ))}
              </div>
            </div>
          </div>

          {/* Indexes */}
          {collection.indexes && collection.indexes.length > 0 && (
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-600">
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Indexes
              </h4>
              <div className="space-y-2">
                {collection.indexes.map((index, i) => (
                  <IndexRow key={i} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Subcollections */}
          {collection.subcollections && Object.keys(collection.subcollections).length > 0 && (
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-600">
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Subcollections
              </h4>
              <div className="space-y-3">
                {Object.entries(collection.subcollections).map(([subName, subCollection]) => (
                  <CollectionCard
                    key={subName}
                    name={subName}
                    collection={subCollection}
                    level={level + 1}
                    enums={enums}
                    defaultExpanded={defaultExpanded}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ===========================================
// Index Row
// ===========================================

interface IndexRowProps {
  index: IndexDef;
}

function IndexRow({ index }: IndexRowProps) {
  const getFieldDisplay = (field: string | IndexFieldDef): string => {
    if (typeof field === 'string') return field;
    let display = field.field;
    if (field.order) display += ` (${field.order})`;
    if (field.arrayContains) display += ' [array-contains]';
    return display;
  };

  return (
    <div className="text-sm text-zinc-600 dark:text-zinc-400">
      <div className="flex items-start gap-2">
        <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-xs">
          {index.fields.map(getFieldDisplay).join(', ')}
        </code>
        {index.order && !index.fields.some((f) => typeof f === 'object') && (
          <span className="text-zinc-500 text-xs">({index.order.join(', ')})</span>
        )}
      </div>
      {index.name && (
        <div className="text-xs text-zinc-500 mt-1">
          <span className="font-medium">Name:</span> {index.name}
        </div>
      )}
      {index.description && (
        <div className="text-xs text-zinc-500">{index.description}</div>
      )}
    </div>
  );
}

// ===========================================
// Field Row
// ===========================================

interface FieldRowProps {
  name: string;
  field: FieldDef;
  enums: Record<string, EnumDef>;
}

function FieldRow({ name, field, enums }: FieldRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEnumTooltip, setShowEnumTooltip] = useState(false);

  const getTypeDisplay = (f: FieldDef): string => {
    if (f.type === 'reference' && 'target' in f) {
      return `ref → ${f.target}`;
    }
    if (f.type === 'array' && 'items' in f) {
      const itemType = typeof f.items === 'string' ? f.items : f.items.type;
      return `array<${itemType}>`;
    }
    if (f.type === 'map') {
      if ('fields' in f && f.fields) {
        return `map{${Object.keys(f.fields).length}}`;
      }
      return 'map';
    }
    if (enums[f.type]) {
      return f.type;
    }
    return f.type;
  };

  const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return '-';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return JSON.stringify(value);
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const normalizeEnumValue = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (value && typeof value === 'object' && 'value' in value) {
      return String((value as EnumValueDef).value);
    }
    return JSON.stringify(value);
  };

  const isEnumType = enums[field.type] !== undefined;

  const getEnumValues = (): (string | number | EnumValueDef)[] | null => {
    if (isEnumType) {
      return enums[field.type].values;
    }
    const validation = field.validation || field.constraints;
    if (validation?.enum) {
      return validation.enum;
    }
    return null;
  };

  const enumValues = getEnumValues();
  const enumRefName = isEnumType ? field.type : null;

  // Get validation from either validation or constraints (for backwards compatibility)
  const validation: FieldValidation | undefined = field.validation || field.constraints;

  const hasDetails =
    field.description ||
    field.example !== undefined ||
    field.default !== undefined ||
    field.source ||
    field.immutable ||
    field.autoUpdate ||
    field.nullable !== undefined ||
    field.denormalization ||
    field.denormalizedFrom ||
    validation;

  return (
    <div className="border-t border-zinc-100 dark:border-zinc-700">
      {/* Main Row */}
      <button
        onClick={() => hasDetails && setIsExpanded(!isExpanded)}
        className={`w-full flex items-center py-2 text-left ${hasDetails ? 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 cursor-pointer' : 'cursor-default'}`}
      >
        <div className="w-8 flex justify-center">
          {hasDetails && (
            <svg
              className={`w-3 h-3 text-zinc-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-zinc-800 dark:text-zinc-200">{name}</span>
          {/* Badges */}
          {field.immutable && (
            <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded text-xs">
              immutable
            </span>
          )}
          {field.autoUpdate && (
            <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded text-xs">
              autoUpdate
            </span>
          )}
          {field.source === 'documentId' && (
            <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded text-xs">
              docId
            </span>
          )}
          {field.denormalizedFrom && (
            <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 rounded text-xs">
              denorm
            </span>
          )}
          {/* Enum indicator with tooltip */}
          {enumValues && (
            <div className="relative">
              <span
                className="px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded text-xs cursor-help"
                onMouseEnter={() => setShowEnumTooltip(true)}
                onMouseLeave={() => setShowEnumTooltip(false)}
              >
                {enumRefName ? `enum:${enumRefName}` : 'enum'}
              </span>
              {showEnumTooltip && (
                <div className="absolute left-0 top-full mt-1 z-50 p-2 bg-zinc-800 dark:bg-zinc-900 text-white rounded-lg shadow-lg text-xs min-w-max max-w-xs">
                  <div className="font-medium mb-1">
                    {enumRefName ? `${enumRefName}:` : 'Values:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {enumValues.slice(0, 10).map((v, i) => (
                      <code
                        key={`${i}-${normalizeEnumValue(v)}`}
                        className="px-1.5 py-0.5 bg-orange-500/30 rounded"
                      >
                        {normalizeEnumValue(v)}
                      </code>
                    ))}
                    {enumValues.length > 10 && (
                      <span className="text-zinc-400">+{enumValues.length - 10} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-32">
          <code className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs">
            {getTypeDisplay(field)}
          </code>
        </div>
        <div className="w-24">
          {field.required ? (
            <span className="text-red-500">required</span>
          ) : field.nullable ? (
            <span className="text-zinc-400">nullable</span>
          ) : (
            <span className="text-zinc-400">optional</span>
          )}
        </div>
      </button>

      {/* Expanded Details */}
      {isExpanded && hasDetails && (
        <div className="ml-8 pb-3 pr-4 space-y-2">
          {field.description && (
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 shrink-0">
                Description
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">{field.description}</span>
            </div>
          )}
          {field.source && (
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 shrink-0">Source</span>
              <code className="px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs">
                {field.source}
              </code>
            </div>
          )}
          {field.example !== undefined && (
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 shrink-0">Example</span>
              <code className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs">
                {formatValue(field.example)}
              </code>
            </div>
          )}
          {field.default !== undefined && (
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 shrink-0">Default</span>
              <code className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                {formatValue(field.default)}
              </code>
            </div>
          )}
          {field.denormalizedFrom && (
            <div className="flex gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 shrink-0">
                Denorm From
              </span>
              <code className="px-2 py-0.5 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded text-xs">
                {typeof field.denormalizedFrom === 'string'
                  ? field.denormalizedFrom
                  : `${field.denormalizedFrom.collection}.${field.denormalizedFrom.field}`}
              </code>
            </div>
          )}
          {validation && <ValidationDisplay validation={validation} />}
        </div>
      )}
    </div>
  );
}

// ===========================================
// Validation Display
// ===========================================

interface ValidationDisplayProps {
  validation: FieldValidation;
}

function ValidationDisplay({ validation }: ValidationDisplayProps) {
  const items: { label: string; value: string }[] = [];

  if (validation.min !== undefined) items.push({ label: 'min', value: String(validation.min) });
  if (validation.max !== undefined) items.push({ label: 'max', value: String(validation.max) });
  if (validation.minLength !== undefined)
    items.push({ label: 'minLength', value: String(validation.minLength) });
  if (validation.maxLength !== undefined)
    items.push({ label: 'maxLength', value: String(validation.maxLength) });
  if (validation.minItems !== undefined)
    items.push({ label: 'minItems', value: String(validation.minItems) });
  if (validation.maxItems !== undefined)
    items.push({ label: 'maxItems', value: String(validation.maxItems) });
  if (validation.format) items.push({ label: 'format', value: validation.format });
  if (validation.pattern) items.push({ label: 'pattern', value: validation.pattern });
  if (validation.enum) items.push({ label: 'enum', value: `[${validation.enum.join(', ')}]` });

  if (items.length === 0) return null;

  return (
    <div className="flex gap-2">
      <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 shrink-0">Validation</span>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <code
            key={item.label}
            className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
          >
            {item.label}: {item.value}
          </code>
        ))}
      </div>
    </div>
  );
}
